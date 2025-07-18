import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                // Tüm yazıları almak için limit'i daha yüksek bir sayıya ayarla veya kaldır (backend'de limit=100 varsayılan)
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/?limit=1000`); // Tümünü getirmek için yeterince yüksek bir limit
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

        fetchAllPosts();
    }, []);

    if (loading) {
        return <div className="text-center py-20 min-h-screen-minus-header-footer">Tüm yazılar yükleniyor...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500 min-h-screen-minus-header-footer">Tüm yazılar yüklenirken bir hata oluştu: {error}</div>;
    }

    return (
        <>
            <Header />
            <main className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen-minus-header-footer">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Tüm Blog Yazıları</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                            >
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">{post.content.substring(0, 150)}...</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 text-sm">{post.date || new Date().toLocaleDateString()}</span>
                                        <Link to={`/post/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                                            Devamını Oku →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AllPosts;