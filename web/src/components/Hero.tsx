import { User } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 dark:from-blue-950 dark:via-gray-950 dark:to-purple-950 text-gray-900 dark:text-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8 flex justify-center animate-fade-in"> {/* Ana ikon animasyonlu */}
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <User size={64} className="text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in animation-delay-200"> {/* Başlık gecikmeli */}
            Merhaba, Ben{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Yusuf Çamağaç
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-400 dark:text-gray-400">
            Yeni başlayan bir yazılımcı olarak modern web teknolojileri ile projeler geliştiriyorum.
            Yaratıcılık ve teknolojinin buluştuğu noktada harika deneyimler oluşturuyorum.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-600"> {/* Butonlar en geç gecikmeli */}
            <a
              href="#projects"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Projelerimi Gör
            </a>
            <a
              href="#contact"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;