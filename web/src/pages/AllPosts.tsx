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
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/?limit=1000`);
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
        return <div className="text-center py-20 min-h-screen-minus-header-footer dark:text-gray-300">Tüm yazılar yükleniyor...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500 min-h-screen-minus-header-footer dark:text-red-400">Tüm yazılar yüklenirken bir hata oluştu: {error}</div>;
    }

    return (
        <>
            <Header />
            <main className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen-minus-header-footer bg-white dark:bg-gray-900"> {/* dark:bg eklendi */}
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center dark:text-gray-50">Tüm Blog Yazıları</h1> {/* dark:text eklendi */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 dark:bg-gray-800 dark:shadow-xl dark:text-gray-50" /* dark: sınıfları eklendi */
                            >
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 dark:text-gray-50">{post.title}</h3> {/* dark:text eklendi */}
                                    <p className="text-gray-600 mb-4 leading-relaxed dark:text-gray-300">{post.content.substring(0, 150)}...</p> {/* dark:text eklendi */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 text-sm dark:text-gray-400">{post.date || new Date().toLocaleDateString()}</span> {/* dark:text eklendi */}
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