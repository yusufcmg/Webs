import { Share } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/`);
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

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Projeler yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Projeler yüklenirken bir hata oluştu: {error}</div>;
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Projelerim
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Öğrenme yolculuğumda geliştirdiğim projeler ve deneyimlerim
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div className={`h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center`}>
                <Share size={48} className="text-white" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link to={`/project/${project.id}`} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300">
                  Detayları Gör
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Daha fazla proje yakında...</p>
          {/* Butona Link eklendi */}
          <Link to="/projects/all" className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors duration-300 inline-block">
            Tüm Projeleri Gör
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;