"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { makePaymentRequest } from "@/api/payment";

interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  apartment?: string;
}

interface GuestCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (initPoint: string) => void;
  onError?: (error: string) => void;
  installments?: number;
}

export function GuestCheckoutModal({
  isOpen,
  onClose,
  onSuccess,
  onError,
  installments = 12,
}: GuestCheckoutModalProps) {
  const { items } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para datos del cliente
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Estado para dirección
  const [address, setAddress] = useState<ShippingAddress>({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "MX",
    apartment: "",
  });

  // Estado de errores
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar nombre
    if (!customerName.trim()) {
      newErrors.customerName = "El nombre es obligatorio";
    }

    // Validar email
    if (!customerEmail.trim()) {
      newErrors.customerEmail = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      newErrors.customerEmail = "Ingresa un correo electrónico válido";
    }

    // Validar dirección
    if (!address.line1.trim()) {
      newErrors.line1 = "La calle y número son obligatorios";
    }
    if (!address.city.trim()) {
      newErrors.city = "La ciudad es obligatoria";
    }
    if (!address.state.trim()) {
      newErrors.state = "El estado es obligatorio";
    }
    if (!address.postal_code.trim()) {
      newErrors.postal_code = "El código postal es obligatorio";
    } else if (!/^\d{5}$/.test(address.postal_code.trim())) {
      newErrors.postal_code = "El código postal debe tener 5 dígitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!items || items.length === 0) {
      onError?.("No hay productos en el carrito");
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar productos (solo IDs)
      const products = items.map((item) => ({ id: item.id }));

      const response = await makePaymentRequest.post(
        "/mercado-pago/preference",
        {
          products,
          installments,
          shippingAddress: address,
          customerEmail,
          customerName,
        },
      );

      const data = response.data;
      console.log("Respuesta MP:", JSON.stringify(data));
      if (data.mercadoPagoPreference?.init_point) {
        onSuccess(data.mercadoPagoPreference.init_point);
      } else {
        throw new Error("No se recibió la URL de pago");
      }
    } catch (error: any) {
      console.error("Error al crear preferencia:", error);
      onError?.(
        error.response?.data?.error || error.message || "Error inesperado",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "customerName" || name === "customerEmail") {
      if (name === "customerName") setCustomerName(value);
      if (name === "customerEmail") setCustomerEmail(value);
    } else {
      setAddress((prev) => ({ ...prev, [name]: value }));
    }

    // Limpiar error al editar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Completa tus datos
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Necesitamos tu información para procesar el envío y enviarte la
                confirmación.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos personales */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                Datos personales
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={customerName}
                    onChange={handleInputChange}
                    placeholder="Ej: Juan Pérez"
                    disabled={isSubmitting}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.customerName ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={customerEmail}
                    onChange={handleInputChange}
                    placeholder="Ej: juan@correo.com"
                    disabled={isSubmitting}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.customerEmail
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.customerEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customerEmail}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Dirección de envío */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                Dirección de envío
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calle y número <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="line1"
                  value={address.line1}
                  onChange={handleInputChange}
                  placeholder="Ej: Av. Insurgentes Sur 123"
                  disabled={isSubmitting}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.line1 ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                />
                {errors.line1 && (
                  <p className="text-red-500 text-sm mt-1">{errors.line1}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número interior / Depto (opcional)
                </label>
                <input
                  type="text"
                  name="line2"
                  value={address.line2}
                  onChange={handleInputChange}
                  placeholder="Ej: Depto 4B"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    placeholder="Ej: Ciudad de México"
                    disabled={isSubmitting}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    placeholder="Ej: CDMX"
                    disabled={isSubmitting}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código Postal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={address.postal_code}
                    onChange={handleInputChange}
                    placeholder="Ej: 03100"
                    maxLength={5}
                    disabled={isSubmitting}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.postal_code ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.postal_code && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.postal_code}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    País <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={address.country}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="MX">México</option>
                    <option value="US">Estados Unidos</option>
                    <option value="CA">Canadá</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apartamento / Referencia (opcional)
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={address.apartment}
                  onChange={handleInputChange}
                  placeholder="Ej: Edificio B, Piso 3"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 cursor-pointer py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Procesando...
                  </>
                ) : (
                  "Continuar con Mercado Pago"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
