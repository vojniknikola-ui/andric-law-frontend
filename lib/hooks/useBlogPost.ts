import { useQuery } from '@tanstack/react-query';
import { getBlogPost, BlogPost } from '../services/blogService';

export const blogPostKey = (slugOrId: string) => ['blog-post', slugOrId];

export const useBlogPost = (slugOrId: string | undefined) => {
  return useQuery<BlogPost>({
    queryKey: slugOrId ? blogPostKey(slugOrId) : ['blog-post', 'missing'],
    queryFn: () => {
      if (!slugOrId) {
        return Promise.reject(new Error('Missing slug'));
      }
      return getBlogPost(slugOrId);
    },
    enabled: Boolean(slugOrId),
  });
};

export default useBlogPost;
