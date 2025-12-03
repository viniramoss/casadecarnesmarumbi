import React, { useEffect, useRef, useState } from "react";
import { Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { getOrderedStores } from '../config/storeConfig';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    const current = sectionRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simula o envio do formulário
    setTimeout(() => {
      toast.success("Mensagem enviada com sucesso!", {
        description: "Entraremos em contato em breve.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section
      className="py-20 bg-gradient-to-b from-[#0B0B0B] via-[#111111] to-[#111111]"
      id="contact"
    >
      <div
        ref={sectionRef}
        className="butcher-container opacity-0 translate-y-10 transition-all duration-700 max-w-5xl mx-auto px-4"
      >
        <div className="text-center mb-16">
          <h2 className="section-title text-center text-white after:left-1/2 after:-translate-x-1/2">
            Informações
          </h2>
          <div className="mx-auto w-16 h-1 bg-gold-500 mb-6"></div>
          <p className="max-w-2xl mx-auto text-textColor-douradoClaro">
            Estamos prontos para atender suas dúvidas e pedidos. Entre em
            contato conosco.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-black/60 p-8 rounded-lg w-full max-w-2xl">
            {getOrderedStores().map((store, index) => (
              <div key={store.id} className={`${index > 0 ? 'mt-8' : ''} p-6 bg-black/30 rounded-lg shadow-inner`}>
                <div className="space-y-2 text-sm">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <Phone className="w-5 h-5 text-black/90" />
                      </div>
                      <div className="ml-4 flex flex-col space-y-2">
                        <h4 className="font-semibold text-white">{store.title}</h4>
                        <a
                          href={store.whatsappLink}
                          className="text-white hover:text-gold-400 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {store.phone}
                        </a>
                        <span className="text-white">
                          SEGUNDA - SABADO →
                          <span className="text-textColor-dourado"> {store.hours.weekdays} </span>
                          / DOMINGO →
                          <span className="text-textColor-dourado">
                            {store.hours.sunday}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
