import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<any>(null); // 'any' tipi geçici olarak kullanıldı, Post şemasına uygun tip belirlenebilir
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`); // Ortam değişkeni kullanıldı
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div className="text-center py-20">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Yazı yüklenirken bir hata oluştu: {error}</div>;
  }

  if (!post) {
    return <div className="text-center py-20">Yazı bulunamadı.</div>;
  }

  return (
    <>
      <Header />
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-8">{post.content}</p>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Post;