import { put, del, list } from '@vercel/blob';

export const uploadImage = async (file: File): Promise<{ id: string; url: string }> => {
  const { url } = await put(`articles/${file.name}`, file, { access: 'public' });
  return { id: file.name, url };
};

export const deleteImage = async (url: string): Promise<void> => {
  await del(url);
};

export const listImages = async (prefix: string = 'articles/') => {
  const { blobs } = await list({ prefix });
  return blobs;
};
