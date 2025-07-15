
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
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hakkımda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Yazılım dünyasına yeni adım atan tutkulu bir geliştiriciyim
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Yolculuğum</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Yazılım geliştirme serüvenime yeni başladım ve her gün öğrendiğim yeni teknolojilerle 
                kendimi geliştiriyorum. Modern web teknolojileri üzerine odaklanarak, kullanıcı dostu 
                ve etkileyici web deneyimleri oluşturmaya çalışıyorum.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Sürekli öğrenmeye ve gelişmeye odaklı yaklaşımımla, yazılım dünyasında iz bırakmak 
                için çalışıyorum. Her proje benim için yeni bir öğrenme fırsatı.
              </p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white transform hover:scale-105 transition-transform duration-300">
                <Book className="w-8 h-8 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Sürekli Öğrenme</h4>
                <p>Her gün yeni teknolojiler ve en iyi uygulamaları öğreniyorum</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white transform hover:scale-105 transition-transform duration-300">
                <Users className="w-8 h-8 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Takım Çalışması</h4>
                <p>İşbirlikçi yaklaşımla projeler geliştirir ve deneyim paylaşırım</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white transform hover:scale-105 transition-transform duration-300">
                <MessageSquare className="w-8 h-8 mb-4" />
                <h4 className="text-xl font-semibold mb-2">İletişim</h4>
                <p>Açık iletişim ve geri bildirimlerle sürekli gelişim sağlarım</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Teknolojiler</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg text-center border border-blue-100 hover:border-blue-300 transition-colors duration-300"
              >
                <span className="font-semibold text-gray-800">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
