// components/InfoProduct/PurchaseActions.tsx
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, PhoneCall, MessageCircle, Minus, Plus } from "lucide-react";
import { ProductType } from "@/types/product";

type Props = {
  product: ProductType;
  quantity: number;
  isBuyable: boolean;
  isAvailable: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
  onWhatsApp: (type: "quote" | "info") => void;
  onLove: () => void;
};

const QuantitySelector = ({
  value,
  onIncrement,
  onDecrement,
}: {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) => (
  <div className="flex items-center gap-3">
    <span className="text-sm text-gray-500">Cantidad:</span>
    <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={onDecrement} aria-label="Reducir cantidad" className="w-8 h-8 flex items-center cursor-pointer justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
        <Minus className="w-3 h-3" />
      </button>
      <span className="w-8 text-center text-sm font-medium">{value}</span>
      <button onClick={onIncrement} aria-label="Aumentar cantidad" className="w-8 h-8 flex items-center cursor-pointer justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
        <Plus className="w-3 h-3" />
      </button>
    </div>
  </div>
);

export const PurchaseActions = ({
  product, quantity, isBuyable, isAvailable,
  onIncrement, onDecrement, onAddToCart, onWhatsApp, onLove,
}: Props) => (
  <div className="space-y-3">
    {isBuyable && isAvailable && (
      <QuantitySelector value={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
    )}
    <div className="flex gap-2">
      {isBuyable ? (
        <Button className="flex-1 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white" disabled={!isAvailable} onClick={onAddToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isAvailable ? "Agregar al carrito" : "No disponible"}
        </Button>
      ) : (
        <Button className="flex-1 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white" onClick={() => onWhatsApp("quote")}>
          <PhoneCall className="w-4 h-4 mr-2" />
          Solicitar cotización
        </Button>
      )}
      <Button variant="outline" onClick={onLove} aria-label={`Agregar ${product.productName} a favoritos`} className="px-3 border-gray-200 cursor-pointer hover:border-red-300 hover:bg-red-50 group">
        <Heart className="w-4 h-4 group-hover:fill-red-400 group-hover:text-red-400 transition-all" />
      </Button>
    </div>
    <Button className="w-full bg-green-500 cursor-pointer hover:bg-green-600 text-white" onClick={() => onWhatsApp("info")} aria-label={`Cotizar ${product.productName} por WhatsApp`}>
      <MessageCircle className="w-4 h-4 mr-2" />
      Hablar con un asesor
    </Button>
  </div>
);