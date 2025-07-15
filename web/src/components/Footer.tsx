
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Yusuf Çamağaç
            </h3>
            <p className="text-gray-400 mt-2">Yazılım dünyasında iz bırakma yolculuğu</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300">
              Ana Sayfa
            </a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">
              Hakkımda
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors duration-300">
              Projeler
            </a>
            <a href="#blog" className="text-gray-400 hover:text-white transition-colors duration-300">
              Blog
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">
              İletişim
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Yusuf Çamağaç. Tüm hakları saklıdır. 💻 ile yapıldı.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
