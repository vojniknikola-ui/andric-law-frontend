import { useQuery } from '@tanstack/react-query';
import { getBlogPosts, BlogPost } from '../services/blogService';

export const blogPostsKey = ['blog-posts'];

export const useBlogPosts = () => {
  return useQuery<BlogPost[]>({
    queryKey: blogPostsKey,
    queryFn: getBlogPosts,
  });
};

export default useBlogPosts;
