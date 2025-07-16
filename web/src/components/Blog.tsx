import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/`); // Ortam değişkeni kullanıldı
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Blog yazıları yüklenirken bir hata oluştu: {error}</div>;
  }

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog Yazılarım
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Yazılım ve teknoloji hakkında düşüncelerim ve paylaşımlarım
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {/* Blog yazılarının tam içeriği yerine kısa bir özet gösterebilirsiniz */}
                  {post.content.substring(0, 150)}...
                </p>

                <div className="flex items-center justify-between">
                  {/* post.date alanı backend'den gelmiyorsa varsayılan bir tarih gösterir */}
                  <span className="text-gray-500 text-sm">{post.date || new Date().toLocaleDateString()}</span>
                  <Link to={`/post/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                    Devamını Oku →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Daha fazla yazı yakında...</p>
          <button className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors duration-300">
            Tüm Yazıları Gör
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;