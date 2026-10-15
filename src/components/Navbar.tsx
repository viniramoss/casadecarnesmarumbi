import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../logo/LogoMarumbiSemfundoLB.png';

const links = [
  { to: '/', label: 'Catálogo' },
  { to: '/localizacao', label: 'Localização' },
  { to: '/informacoes', label: 'Informações' },
];

// Cabeçalho fixo de todas as páginas, com altura h-16 / md:h-20
// (as páginas compensam com pt-16 / md:pt-20).
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // O catálogo é a página inicial e também cada /catalogo/<unidade>
  const ativo = (to: string) =>
    to === '/' ? pathname === '/' || pathname.startsWith('/catalogo') : pathname === to;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-sm shadow-sm">
      <div className="butcher-container flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Casa de Carnes Marumbi - Catálogo">
          <img
            src={logo}
            alt="Casa de Carnes Marumbi"
            className="h-11 w-auto md:h-14 logo-marumbi"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={ativo(link.to) ? 'page' : undefined}
              className={`relative font-semibold transition-colors pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-gold-500 after:transition-all hover:text-gold-400 hover:after:w-full ${
                ativo(link.to) ? 'text-gold-400 after:w-full' : 'text-white after:w-0'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Botão do menu mobile */}
        <button
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95">
          <nav className="butcher-container py-4 flex flex-col items-center space-y-2">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={ativo(link.to) ? 'page' : undefined}
                className={`block w-full py-2.5 px-4 text-center font-semibold rounded-md transition-colors hover:bg-white/10 ${
                  ativo(link.to) ? 'text-gold-400' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
