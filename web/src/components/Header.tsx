import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react'; // Sun ve Moon ikonları eklendi
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes'; // Yeni: useTheme hook'u import edildi

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme(); // Yeni: useTheme hook'u kullanıldı

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Sayfa içi kaydırma işlevi
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Link'e tıklandığında hem menüyü kapatacak hem de kaydırma yapacak handler
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    toggleMenu(); // Menüyü kapat
    if (location.pathname !== '/') {
      e.preventDefault();
      window.location.href = `/#${sectionId}`;
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 dark:bg-gray-900/90"> {/* Dark moda uyum için */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Yusuf Çamağaç
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8"> {/* items-center eklendi */}
            <Link to="/" onClick={(e) => handleNavLinkClick(e, 'home')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium dark:text-gray-300 dark:hover:text-blue-400">
              Ana Sayfa
            </Link>
            <Link to="/" onClick={(e) => handleNavLinkClick(e, 'about')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium dark:text-gray-300 dark:hover:text-blue-400">
              Hakkımda
            </Link>
            <Link to="/" onClick={(e) => handleNavLinkClick(e, 'projects')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium dark:text-gray-300 dark:hover:text-blue-400">
              Projeler
            </Link>
            <Link to="/" onClick={(e) => handleNavLinkClick(e, 'blog')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium dark:text-gray-300 dark:hover:text-blue-400">
              Blog
            </Link>
            <Link to="/" onClick={(e) => handleNavLinkClick(e, 'contact')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium dark:text-gray-300 dark:hover:text-blue-400">
              İletişim
            </Link>
            {/* Tema değiştirme butonu eklendi */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center"> {/* flex items-center eklendi */}
            {/* Tema değiştirme butonu mobil menüde */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-700 mr-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t dark:bg-gray-800 dark:border-gray-700">
              <Link to="/" onClick={(e) => handleNavLinkClick(e, 'home')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400">
                Ana Sayfa
              </Link>
              <Link to="/" onClick={(e) => handleNavLinkClick(e, 'about')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400">
                Hakkımda
              </Link>
              <Link to="/" onClick={(e) => handleNavLinkClick(e, 'projects')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400">
                Projeler
              </Link>
              <Link to="/" onClick={(e) => handleNavLinkClick(e, 'blog')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400">
                Blog
              </Link>
              <Link to="/" onClick={(e) => handleNavLinkClick(e, 'contact')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400">
                İletişim
              </Link>
              {/* Mobil menüde tema değiştirme butonu kaldırıldı, üstteki mobil buton kullanılıyor. */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;