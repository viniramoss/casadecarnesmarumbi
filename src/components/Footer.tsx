import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail } from 'lucide-react';
import logo from '../images/LogoMarumbiS.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-butcher-950 text-white">
      <div className="butcher-container py-16">
        <div className="pl-0 md:pl-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="Logo Marumbi" className="w-40 mx-auto md:mx-0" />
            </Link>
            <p className="text-butcher-300 mb-6 max-w-xs">
              Há mais de 5 anos oferecendo as melhores carnes, com tradição e excelência no atendimento.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-beef-600 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div className="text-left">
            <h3 className="font-serif font-bold text-xl mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-butcher-300 hover:text-white transition-colors">Início</Link>
              </li>
              <li>
                <Link to="/products" className="text-butcher-300 hover:text-white transition-colors">Produtos</Link>
              </li>
              <li>
                <a href="#location" className="text-butcher-300 hover:text-white transition-colors">Localização</a>
              </li>
              <li>
                <a href="#contact" className="text-butcher-300 hover:text-white transition-colors">Contato</a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="font-serif font-bold text-xl mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone size={18} className="text-textColor-marelo flex-shrink-0" />
                <div className="ml-3">
                  <a href="tel:+5511999999999" className="text-butcher-300 hover:text-white transition-colors">
                    (41) 99858-3196
                  </a>
                  <br />
                  <a href="tel:+5511999999999" className="text-butcher-300 hover:text-white transition-colors">
                    (41) 99853-2456
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-textColor-marelo flex-shrink-0" />
                <a href="mailto:contato@primecuts.com.br" className="ml-3 text-butcher-300 hover:text-white transition-colors">
                  casadecarnesmarumbicontato@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-4 border-t border-white/10">
        <div className="butcher-container flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="text-butcher-400 text-sm">
            © {currentYear} Marumbi. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li>
                <a href="#" className="text-butcher-400 hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-butcher-400 hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
