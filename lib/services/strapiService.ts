const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://involvement-saves-andrews-actions.trycloudflare.com';
const API_TIMEOUT = 10000;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = API_TIMEOUT): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(408, 'Request timeout');
    }
    throw error;
  }
};

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  summary?: string | null;
  imageUrl?: string | null;
  date: string;
  publishedAt: string;
  author: {
    name: string;
  } | null;
}

const normalizeItem = (item: any): BlogPost => {
  const coverUrl = item.cover?.url || item.coverImage?.url;
  const imageUrl = coverUrl || null;
  const rawDate = item.publishDate || item.publishedAt || item.createdAt || new Date().toISOString();
  const dateInstance = new Date(rawDate);

  let content = item.content || null;
  if (!content && item.blocks) {
    content = item.blocks
      .filter((block: any) => block.__component === 'shared.rich-text')
      .map((block: any) => block.body)
      .join('\n\n');
  }

  return {
    id: item.id,
    slug: item.slug || String(item.id),
    title: item.title || '',
    content: content || null,
    summary: item.summary || item.description || null,
    imageUrl,
    date: dateInstance.toLocaleDateString(),
    publishedAt: dateInstance.toISOString(),
    author: item.author ? { name: item.author.name } : null,
  };
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
    try {
        const response = await fetchWithTimeout(
            `${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc&pagination[limit]=100`
        );
        
        if (!response.ok) {
            throw new ApiError(response.status, `Failed to fetch posts: ${response.statusText}`);
        }
        
        const data = await response.json();
        const list = Array.isArray(data.data) ? data.data : [];
        return list.map(normalizeItem);
    } catch (error) {
        console.error('Error fetching posts:', error);
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, 'Network error');
    }
};

export const getBlogPost = async (slugOrId: string): Promise<BlogPost> => {
    const tryBySlug = async () => {
        const response = await fetchWithTimeout(
            `${STRAPI_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slugOrId)}&populate=*`
        );

        if (!response.ok) {
            throw new ApiError(response.status, `Failed to fetch post: ${response.statusText}`);
        }

        const data = await response.json();
        const item = data.data && Array.isArray(data.data) ? data.data[0] : data.data;
        if (!item) {
            throw new ApiError(404, 'Post not found');
        }
        return normalizeItem(item);
    };

    const tryById = async () => {
        const response = await fetchWithTimeout(
            `${STRAPI_URL}/api/articles?filters[id][$eq]=${encodeURIComponent(slugOrId)}&populate=*`
        );

        if (!response.ok) {
            throw new ApiError(response.status, `Failed to fetch post by id: ${response.statusText}`);
        }

        const data = await response.json();
        const item = Array.isArray(data.data) ? data.data[0] : data.data;
        if (!item) {
            throw new ApiError(404, 'Post not found');
        }
        return normalizeItem(item);
    };

    try {
        const result = await tryBySlug();
        return result;
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            try {
                return await tryById();
            } catch (fallbackError) {
                if (fallbackError instanceof ApiError) throw fallbackError;
                throw new ApiError(500, 'Network error');
            }
        }

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(500, 'Network error');
    }
};

export const getAuthors = async (): Promise<{ id: number; name: string }[]> => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/authors`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const list = Array.isArray(json.data) ? json.data : [];
        return list.map((a: any) => ({ id: a.id, name: a.name || a.attributes?.name || 'Unknown' }));
    } catch (err) {
        console.error('Error fetching authors:', err);
        throw err;
    }
};

export { uploadImage, deleteImage, listImages } from './blobService';

export const createArticle = async (articleData: any) => {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const res = await fetch(`${STRAPI_URL}/api/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ data: articleData }),
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Create article failed ${res.status}: ${text}`);
        }

        const json = await res.json();
        return normalizeItem(json.data);
    } catch (err) {
        console.error('Error creating article:', err);
        throw err;
    }
};
