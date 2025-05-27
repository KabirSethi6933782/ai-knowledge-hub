'use client';

import { useEffect, useState } from 'react';

type Document = {
  id?: number;
  title: string;
  content: string;
  tags: string;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDoc, setNewDoc] = useState<Document>({ title: '', content: '', tags: '' });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    setLoading(true);
    fetch('http://localhost:8080/documents')
      .then(res => res.json())
      .then(data => {
        setDocuments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch documents:', err);
        setLoading(false);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDoc),
    });
    if (res.ok) {
      setNewDoc({ title: '', content: '', tags: '' });
      fetchDocuments();
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md mb-8">
        <input
          type="text"
          placeholder="Title"
          value={newDoc.title}
          onChange={e => setNewDoc({ ...newDoc, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={newDoc.content}
          onChange={e => setNewDoc({ ...newDoc, content: e.target.value })}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={newDoc.tags}
          onChange={e => setNewDoc({ ...newDoc, tags: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Document
        </button>
      </form>

      {/* Document list */}
      {loading ? (
        <p>Loading...</p>
      ) : documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map(doc => (
            <li key={doc.id} className="p-4 border rounded bg-white shadow-sm">
              <h2 className="text-xl font-semibold">{doc.title}</h2>
              <p className="mt-2 text-gray-700">{doc.content}</p>
              <p className="mt-1 text-sm text-gray-500">Tags: {doc.tags}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
