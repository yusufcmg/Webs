
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Yusuf Çamağaç
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Ana Sayfa
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Hakkımda
            </a>
            <a href="#projects" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Projeler
            </a>
            <a href="#blog" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Blog
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              İletişim
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Ana Sayfa
              </a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Hakkımda
              </a>
              <a href="#projects" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Projeler
              </a>
              <a href="#blog" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Blog
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                İletişim
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
