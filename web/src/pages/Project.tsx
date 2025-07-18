import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Project = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProject(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <div className="text-center py-20 dark:text-gray-300">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 dark:text-red-400">Proje yüklenirken bir hata oluştu: {error}</div>;
  }

  if (!project) {
    return <div className="text-center py-20 dark:text-gray-300">Proje bulunamadı.</div>;
  }

  return (
    <>
      <Header />
      <main className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"> {/* dark:bg eklendi */}
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 dark:text-gray-50">{project.title}</h1> {/* dark:text eklendi */}
          <p className="text-gray-600 mb-8 dark:text-gray-300">{project.description}</p> {/* dark:text eklendi */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech: string, techIndex: number) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium dark:bg-blue-900 dark:text-blue-100" // dark: sınıfları eklendi
              >
                {tech}
              </span>
            ))}
          </div>
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 mt-4 dark:text-blue-400 dark:hover:text-blue-300" // dark: sınıfları eklendi
            >
              GitHub'da Görüntüle{' '}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link ml-1">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" x2="21" y1="14" y2="3"></line>
              </svg>
            </a>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Project;