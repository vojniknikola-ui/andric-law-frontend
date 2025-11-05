import React, { useEffect, useState } from 'react';
import { uploadImage, createArticle } from '@/lib/services/blogService';

export const CreateArticle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setAuthors([{ id: 1, name: 'Adv. Nikola Andrić' }]);
    setAuthorId(1);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      let coverImageUrl: string | undefined;
      if (file) {
        const uploaded = await uploadImage(file);
        coverImageUrl = uploaded.url;
      }

      const articlePayload: any = {
        title,
        content,
        summary,
        status: 'published',
        publishDate: new Date().toISOString(),
      };

      if (authorId) articlePayload.author = { name: authors.find(a => a.id === authorId)?.name || 'Unknown' };
      if (coverImageUrl) articlePayload.imageUrl = coverImageUrl;

      const created = await createArticle(articlePayload);
      setMessage('Article created: ' + created.title);
      setTitle('');
      setSummary('');
      setContent('');
      setFile(null);
    } catch (err: any) {
      console.error(err);
      setMessage('Failed to create article: ' + (err.message || String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Article</h2>

      {message && <div className="mb-4 text-sm text-green-700">{message}</div>}

      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Summary</label>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full p-2 border rounded" rows={3} />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded" rows={8} required />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Author</label>
        <select value={authorId ?? ''} onChange={(e) => setAuthorId(Number(e.target.value))} className="w-full p-2 border rounded">
          {authors.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Cover image</label>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </div>

      <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded">
        {isSubmitting ? 'Publishing...' : 'Publish Article'}
      </button>
    </form>
  );
};
