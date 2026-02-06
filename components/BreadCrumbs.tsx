import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  backButton?: {
    show: boolean;
    label?: string;
    onClick?: () => void;
  };
  className?: string;
}

export default function Breadcrumb({ 
  items, 
  backButton = { show: true, label: "Volver" },
  className = ""
}: BreadcrumbProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (backButton.onClick) {
      backButton.onClick();
    } else {
      router.back();
    }
  };

  return (
    <div className={`bg-linear-to-r from-white to-gray-50/50  ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-0">
        {/* Back Button */}
        
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center" aria-label="Navegación de migas de pan">
          <div className="flex items-center space-x-3">
            {backButton.show && (
          <button 
            onClick={handleBackClick}
            className="group inline-flex cursor-pointer items-center justify-center bg-blue-500 text-white hover:text-blue-700 hover:bg-blue-50 p-1 rounded-lg transition-all duration-200"
            aria-label="Volver a la página anterior"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
          </button>
        )}
            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                {/* Home icon for first item */}
                {index === 0 && (
                  <Home className="w-4 h-4 text-gray-400 mr-2" />
                )}
                
                {/* Separator */}
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2 shrink-0" />
                )}
                
                {/* Breadcrumb Item */}
                {item.href && !item.isActive ? (
                  <a 
                    href={item.href}
                    className="text-sm text-gray-600  hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-all duration-200 font-medium"
                    aria-label={`Ir a ${item.label}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <div className={`p-3 rounded-md text-sm font-medium ${
                    item.isActive 
                      ? "text-blue-600 bg-blue-100/70 shadow-sm" 
                      : "text-gray-700"
                  }`}>
                    <span className={item.isActive ? "relative" : ""}>
                      {item.label}
                      {item.isActive && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                      )}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Decorative bottom border */}
        {/* <div className="mt-4 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div> */}
      </div>
    </div>
  );
}
