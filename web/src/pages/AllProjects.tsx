import { useEffect, useState } from 'react'; // '=>' yerine 'from' olarak düzeltildi
import { Link } from 'react-router-dom';
import { Share } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/?limit=1000`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProjects(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProjects();
    }, []);

    if (loading) {
        return <div className="text-center py-20 min-h-screen-minus-header-footer dark:text-gray-300">Tüm projeler yükleniyor...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500 min-h-screen-minus-header-footer dark:text-red-400">Tüm projeler yüklenirken bir hata oluştu: {error}</div>;
    }

    return (
        <>
            <Header />
            <main className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen-minus-header-footer bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center dark:text-gray-50">Tüm Projeler</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-fade-in animation-delay-${index * 100} dark:bg-gray-800 dark:shadow-xl dark:text-gray-50`}
                            >
                                <div className={`h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center`}>
                                    <Share size={48} className="text-white" />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 dark:text-gray-50">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed dark:text-gray-300">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((tech: string, techIndex: number) => (
                                            <span key={techIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium dark:bg-blue-900 dark:text-blue-100">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <Link to={`/project/${project.id}`} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300">
                                        Detayları Gör
                                    </Link>
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 mt-4 ml-2 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            GitHub →
                                        </a>
                                    )}
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

export default AllProjects;