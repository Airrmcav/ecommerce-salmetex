import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/types/product";
import Link from "next/link";
import { CheckCircle, XCircle, Star, Heart, ShoppingCart } from "lucide-react";
import IconButton from "@/components/icon-button";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";


type ProductCardProps = {
  product: ProductType;
  viewMode?: 'grid' | 'list';
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const router = useRouter();
  const { addItem, items } = useCart();
   const { addLoveItems } = useLovedProducts();

  return (
    <div className="relative p-0 transition-all">
      <div className="w-full">
        <div className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 py-1 px-0">
          <div className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden">
            <div className="p-0 h-full flex flex-col">
              <div className="relative overflow-hidden bg-white h-52 flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].alternativeText || product.productName}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-4xl">🏥</span>
                  </div>
                )}

                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={product.active ? "default" : "secondary"}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium ${product.active
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-red-100 text-red-800 border-red-200"
                      }`}
                  >
                    {product.active ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    {product.active ? "Disponible" : "No Disponible"}
                  </Badge>
                </div>

                <IconButton onClick={() => addLoveItems(product)} icon={<Heart className="w-4 h-4 text-gray-800 hover:text-red-500 transition-colors" />} className="absolute top-3 left-3 p-2 rounded-full bg-gray-300/5 backdrop-blur-sm hover:bg-white transition-all duration-200 group-hover:opacity-100" aria-label="Agregar a favoritos" title="Agregar a favoritos" />

                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {product?.category?.categoryName || "Categoría"}
                  </Badge>
                </div>
              </div>
              {/* Content */}
              <div className="p-4 flex-1 flex flex-col min-h-[220px]">
                <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 min-h-[56px] flex items-start">
                  {product.productName}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-[40px]">
                  {product.description || "Equipo médico de alta calidad diseñado para proporcionar resultados precisos y confiables en entornos clínicos profesionales."}
                </p>

                {/* Price */}
                {product.price && product.price > 0.00 && (
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">MXN</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => {
                      
                        router.push(`/${product.slug}`);
                    
                    }}
                    className={`cursor-pointer flex-1 py-2.5 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${product.active
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    disabled={!product.active}
                    aria-label={`Ver detalles de ${product.productName}`}
                  >
                    Ver Detalles
                  </button>
                  <IconButton 
                    onClick={() => addItem(product)} 
                    icon={<ShoppingCart size={20} />} 
                    className={`${(!product.price || product.price <= 0) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white shadow-md hover:shadow-lg`} 
                    disabled={!product.price || product.price <= 0}
                    title={!product.price || product.price <= 0 ? "Este producto no tiene precio definido" : "Agregar al carrito"}
                    aria-label={!product.price || product.price <= 0 ? "Este producto no tiene precio definido" : `Agregar ${product.productName} al carrito`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;