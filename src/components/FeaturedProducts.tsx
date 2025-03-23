import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import aborgue from '../images/aborgue.png';
import cuxa from '../images/cuxa.png';
import musclo from '../images/musclo.png';

// Featured product data
const featuredProducts = [
  {
    id: 1,
    name: "Hamburguer",
    description: `Delicioso hamburguer artesanal com 120gr.`,
    price: "5 por R$ 10.00",
    image: aborgue,
    tag: "Mais Vendido"
  },
  {
    id: 2,
    name: "Coxa com sobrecoxa",
    description: "Corte macio e suculento do querido cocó.",
    price: 11.99,
    image: cuxa,
    tag: "Especial"
  },
  {
    id: 3,
    name: "Musculo com osso",
    description: "Impressionante corte com osso.",
    price: 19.99,
    image: musclo,
    tag: "Premium"
  }
];

const FeaturedProducts = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sectionCurrent = sectionRef.current;
    if (sectionCurrent) {
      observer.observe(sectionCurrent);
    }

    productsRef.current.forEach((product) => {
      if (product) observer.observe(product);
    });

    return () => {
      if (sectionCurrent) {
        observer.unobserve(sectionCurrent);
      }
      productsRef.current.forEach((product) => {
        if (product) observer.unobserve(product);
      });
    };
  }, []);

  return (
    <section 
      className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0B0B0B] via-[#111111] to-[#111111] min-h-screen flex items-center justify-center"
      id="products"
    >
      <div 
        ref={sectionRef}
        className="butcher-container opacity-0 translate-y-10 transition-all duration-700 delay-100 w-full"
      >
        <div className="text-center mb-16">
          <h2 className="section-title text-center text-white">Nossos Destaques</h2>
          <p className="max-w-2xl mx-auto text-textColor-marelo">
            Selecionamos cuidadosamente para sua mesa, unindo tradição e qualidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              ref={el => productsRef.current[index] = el}
              className="premium-card opacity-0 translate-y-10 transition-all duration-700 product-transition bg-black/60"
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                {product.tag && (
                  <span className="absolute top-4 right-4 premium-badge">
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-white/80 mb-2">
                  {product.name}
                </h3>
                <p className=" text-white/40 mb-4 text-sm">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-beef-700">
                    {product.price}
                  </span>
                  <button className="text-beef-600 hover:text-beef-800 transition-colors">
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center text-beef-600 font-medium hover:text-beef-800 transition-colors group"
          >
            Ver todos os produtos
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
