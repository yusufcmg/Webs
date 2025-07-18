import { Book, Users, MessageSquare } from 'lucide-react';

const About = () => {
  const skills = [
    'HTML & CSS',
    'JavaScript',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Git & GitHub',
    'Responsive Design',
    'Web Performansı'
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 dark:text-gray-50">
            Hakkımda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-400">
            Yazılım dünyasına yeni adım atan tutkulu bir geliştiriciyim
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div></div> {/* Empty for alignment with the left card above */}
          <div>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white transform hover:scale-105 transition-transform duration-300 animate-fade-in animation-delay-300">
                <Book className="w-8 h-8 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Sürekli Öğrenme</h4>
                <p>Her gün yeni teknolojiler ve en iyi uygulamaları öğreniyorum</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white transform hover:scale-105 transition-transform duration-300 animate-fade-in animation-delay-400">
                <Users className="w-8 h-8 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Takım Çalışması</h4>
                <p>İşbirlikçi yaklaşımla projeler geliştirir ve deneyim paylaşırım</p>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white transform hover:scale-105 transition-transform duration-300 animate-fade-in animation-delay-500">
                <MessageSquare className="w-8 h-8 mb-4" />
                <h4 className="text-xl font-semibold mb-2">İletişim</h4>
                <p>Açık iletişim ve geri bildirimlerle sürekli gelişim sağlarım</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8 dark:text-gray-50">Teknolojiler</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl text-gray-900 font-semibold text-center shadow-md dark:from-blue-900 dark:to-purple-900 dark:text-gray-50 dark:shadow-xl"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;