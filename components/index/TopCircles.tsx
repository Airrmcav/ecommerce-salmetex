"use client";

const quickLinks = [
  { id: 1, title: "Mesas de cirugía",       link: "/categoria/mesas-quirurgicas",         image: "/carousel/mesa.png"       },
  { id: 2, title: "Lámparas de cirugía",    link: "/categoria/lamparas-de-cirugia",       image: "/carousel/lampara.png"    },
  { id: 3, title: "Monitores",              link: "/categoria/equipos-de-signos-vitales", image: "/carousel/monitor.jpg"    },
  { id: 4, title: "Ultrasonidos",             link: "/categoria/equipo-de-ultrasonido",                image: "/carousel/2.png"  },
  { id: 5, title: "Insumos médicos",        link: "/insumos-medicos",                     image: "/carousel/insumos2.png"   },
  { id: 6, title: "IMSS Bienestar",         link: "/imss-bienestar",                      image: "/carousel/imss.png"       },
  { id: 7, title: "La clínica es Nuestra",  link: "/la-clinica-es-nuestra",               image: "/carousel/clinica.png"    },
];

const TopCircles = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-center h-full">
      <div className="flex gap-3 md:gap-7 justify-center items-center flex-wrap">
        {quickLinks.map((link) => (
          <a key={link.id} href={link.link} className="group relative flex flex-col items-center">
            <div
              className="w-16 h-16 md:w-17 md:h-17 rounded-full overflow-hidden shadow-xl
                         transform transition-all duration-300 group-hover:scale-110
                         border-2 border-white/20 bg-blue-800 backdrop-blur-sm"
            >
              <img src={link.image} alt={link.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/15 transition-all duration-300" />
            </div>
            <span className="mt-2 text-white font-normal text-xs md:text-sm text-center drop-shadow-md group-hover:text-blue-200 transition-colors duration-300">
              {link.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopCircles;  