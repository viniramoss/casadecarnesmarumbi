import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../images/LogoMarumbiS.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-sm shadow-sm pt-1' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="butcher-container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-20" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/#home">Início</NavLink>
          <NavLink to="/products">Produtos</NavLink>
          <NavLink to="/#location">Localização</NavLink>
          <NavLink to="/#contact">Informações</NavLink>
        </nav>

        {/* Botão do menu mobile */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-textColor-fundoDaMagia/80 animate-slide-in">
          <div className="butcher-container py-4 flex flex-col items-center space-y-4">
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Início
            </MobileNavLink>
            <MobileNavLink to="/products" onClick={() => setIsMobileMenuOpen(false)}>
              Produtos
            </MobileNavLink>
            <MobileNavLink to="/#location" onClick={() => setIsMobileMenuOpen(false)}>
              Localização
            </MobileNavLink>
            <MobileNavLink to="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contato
            </MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (to.startsWith("/#") || to.startsWith("#")) {
      const id = to.replace("/#", "").replace("#", "");
      const element = document.getElementById(id);
      // Só previne o comportamento se o elemento existir
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
      }
      // Se não encontrar o elemento, permite que o Link navegue para a rota
    }
  };

  return (
    <Link 
      to={to} 
      onClick={handleClick}
      className="relative font-medium text-butcher-800 hover:text-beef-600 transition-colors pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-beef-600 after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (to.startsWith('/#') || to.startsWith('#')) {
      const id = to.replace('/#','').replace('#','');
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClick();
  };

  return (
    <Link 
      to={to}
      className="block py-2 px-4 text-butcher-800 hover:bg-butcher-50 rounded-md transition-colors"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
