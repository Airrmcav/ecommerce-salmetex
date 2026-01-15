import React from 'react';
import { Facebook, Instagram, Phone } from 'lucide-react';
import Link from 'next/link';

const TikTokIcon = ({ className = "" }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const WhatsAppIcon = ({ className = "" }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

const SocialMediaLinks = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/salmetexmed?locale=es_LA',
      icon: Facebook,
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      ariaLabel: 'Síguenos en Facebook'
    },
    {
      name: 'Instagram', 
      url: 'https://www.instagram.com/salmetexmed/', 
      icon: Instagram,
      bgColor: 'bg-pink-600',
      hoverColor: 'hover:bg-pink-700',
      ariaLabel: 'Síguenos en Instagram'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@salmetexmed',
      icon: TikTokIcon,
      bgColor: 'bg-black',
      hoverColor: 'hover:bg-gray-800',
      ariaLabel: 'Síguenos en TikTok'
    }
  ];

  return (
    <main>
      {/* Enlaces sociales en el lado izquierdo */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex">
        <nav 
          role="navigation" 
          aria-label="Enlaces de redes sociales"
          className="flex flex-col space-y-3"
        >
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                className={`
                  ${social.bgColor} ${social.hoverColor}
                  text-white p-3 rounded-r-lg shadow-lg
                  transform transition-all duration-300 ease-in-out
                  hover:translate-x-2 hover:scale-110
                  focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
                  group
                `}
              >
                <IconComponent 
                  className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" 
                />
                <span className="sr-only">{social.ariaLabel}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Botón de WhatsApp en esquina inferior derecha */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="https://wa.me/5218445954660?text=Hola!%20Quiero%20más%20información%20sobre%20su%20servicio"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contáctanos por WhatsApp"
          className="
            flex items-center justify-center
            bg-green-500 hover:bg-green-600
            text-white w-14 h-14 rounded-full shadow-2xl
            transition-all duration-300 ease-in-out
            hover:scale-110 hover:shadow-xl
            focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50
            relative
          "
        >
          {/* Icono de WhatsApp centrado */}
          <WhatsAppIcon className="w-7 h-7" />

          {/* Notificación / ping */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </Link>
      </div>
    </main>
  );
};

export default SocialMediaLinks;