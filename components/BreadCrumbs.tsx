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
  className = "",
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
    <div className={`bg-linear-to-r from-white to-gray-50/50 ${className}`}>
      <div className="max-w-7xl mx-auto  py-2">
        <nav
          className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0"
          aria-label="Navegación de migas de pan"
        >
          {/* Botón de regreso */}
          {backButton.show && (
            <button
              onClick={handleBackClick}
              className="group inline-flex cursor-pointer items-center gap-1 self-start sm:self-auto sm:mr-3 bg-blue-500 text-white hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-lg transition-all duration-200"
              aria-label="Volver a la página anterior"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span className="text-xs sm:hidden">{backButton.label ?? "Volver"}</span>
            </button>
          )}

          {/* Items del breadcrumb */}
          <div className="flex flex-wrap items-center gap-y-0.5">
            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                {/* Home icon solo en el primer item */}
                {index === 0 && (
                  <Home className="w-3.5 h-3.5 text-gray-400 mr-1 shrink-0" />
                )}

                {/* Separador */}
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1 shrink-0" />
                )}

                {/* Item con link */}
                {item.href && !item.isActive ? (
                  <a
                    href={item.href}
                    className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-1.5 py-0.5 rounded-md transition-all duration-200 font-medium"
                    aria-label={`Ir a ${item.label}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <div
                    className={`px-1.5 py-0.5 rounded-md text-xs sm:text-sm font-medium ${
                      item.isActive
                        ? "text-blue-600 bg-blue-100/70 shadow-sm"
                        : "text-gray-700"
                    }`}
                  >
                    <span className={item.isActive ? "relative" : ""}>
                      {item.label}
                      {item.isActive && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full" />
                      )}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}