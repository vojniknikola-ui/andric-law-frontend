import React, { useState, useEffect } from 'react';
import { getBlogPosts, BlogPost } from '@/lib/services/blogService';

export const BlogList: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getBlogPosts();
                setPosts(data);
            } catch (err) {
                setError('Failed to load blog posts');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map(post => (
                    <div key={post.id} className="border rounded-xl overflow-hidden shadow-lg bg-white p-6">
                        <h2 className="text-[20px] font-serif font-semibold text-brand-900 leading-snug tracking-tight mb-3">
                            {post.title}
                        </h2>
                        {post.summary && (
                            <p className="text-ink-800 mb-5 text-[15px] leading-[1.7]">{post.summary}</p>
                        )}
                        <div className="mt-auto pt-4 text-sm text-ink-600 border-t border-line-200/70">
                            {post.date} • {post.author?.name ?? 'Anonymous'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
