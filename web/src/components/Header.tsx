import { useState } from 'react'; // useEffect kaldırıldı
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // isLoggedIn state'i ve useEffect artık gerekli değil
  const location = useLocation();

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
    // Eğer ana sayfada değilsek, önce ana sayfaya yönlendir, sonra kaydır
    if (location.pathname !== '/') {
      e.preventDefault(); // Varsayılan Link davranışını engelle
      window.location.href = `/#${sectionId}`; // Önce ana sayfaya git ve hash'i ekle
    } else {
      // Zaten ana sayfadaysak sadece kaydır
      scrollToSection(sectionId);
    }
  };


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
            <Link to="/" onClick={(e) => handleNavLinkClick(e, 'home')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Ana Sayfa
            </Link>
            <Link to="/" onClick={(e) => handleNavLinkClick(e, 'about')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Hakkımda
            </Link>
            <Link to="/" onClick={(e) => handleNavLinkClick(e, 'projects')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Projeler
            </Link>
            <Link to="/" onClick={(e) => handleNavLinkClick(e, 'blog')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Blog
            </Link>
            <Link to="/" onClick={(e) => handleNavLinkClick(e, 'contact')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              İletişim
            </Link>
            {/* Admin/Giriş Yap linkleri artık burada olmayacak */}
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
              <Link to="/" onClick={(e) => handleNavLinkClick(e, 'home')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Ana Sayfa
              </Link>
              <Link to="/" onClick={(e) => handleNavLinkClick(e, 'about')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Hakkımda
              </Link>
              <Link to="/" onClick={(e) => handleNavLinkClick(e, 'projects')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Projeler
              </Link>
              <Link to="/" onClick={(e) => handleNavLinkClick(e, 'blog')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Blog
              </Link>
              <Link to="/" onClick={(e) => handleNavLinkClick(e, 'contact')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                İletişim
              </Link>
              {/* Admin/Giriş Yap linkleri artık burada olmayacak */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;