"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, Home, ShoppingBag, Mail, Loader2, AlertCircle, Package, MapPin, Truck } from "lucide-react";
import Script from "next/script";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useCart } from "@/hooks/use-cart";

interface EmailResults {
  ventas: { sent: boolean; error: string | null };
  cliente: { sent: boolean; email: string; error: string | null };
}

interface LineItem {
  description: string;
  quantity: number;
  amount_total: number;
  currency: string;
}

interface ShippingAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

interface ConfirmResponse {
  success: boolean;
  emailsQueued?: boolean;
  emailsSent?: boolean;
  emailResults?: EmailResults;
  customerName?: string;
  customerEmail?: string;
  shippingName?: string;
  shippingAddress?: ShippingAddress | null;
  lineItems?: LineItem[];
  totalAmount?: number;
  currency?: string;
  error?: string;
  message?: string;
}

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const paymentId = searchParams.get("payment_id");
  const paymentStatus = searchParams.get("status");
  const { removeAll } = useCart();

  const [loading, setLoading] = useState(true);
  const [confirmData, setConfirmData] = useState<ConfirmResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cartCleared, setCartCleared] = useState(false);



 const confirmMercadoPagoPayment = async () => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/confirm-mercadopago`,
      { 
        payment_id: paymentId,
        status: paymentStatus,
      }
    );
    setConfirmData(res.data);
    if (res.data.success && !cartCleared) {
      removeAll();
      setCartCleared(true);
    }
  } catch (err: any) {
    console.error("Error confirmando pago MP:", err);
    setConfirmData({ success: true });
    if (!cartCleared) { removeAll(); setCartCleared(true); }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    

    if (paymentId && paymentStatus === "approved") {
      confirmMercadoPagoPayment();
      return;
    }

    setLoading(false);
  }, [sessionId, paymentId]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: currency?.toUpperCase() || "MXN",
    }).format(amount / 100);
  };

  const formatAddress = (addr: ShippingAddress | null) => {
    if (!addr) return null;
    const parts = [
      addr.line1,
      addr.line2,
      addr.city,
      addr.state && addr.postal_code ? `${addr.postal_code} ${addr.state}` : addr.state || addr.postal_code,
      addr.country === "MX" ? "México" : addr.country,
    ].filter(Boolean);
    return parts;
  };

  const isMP = !!paymentId;
  const showDetails = (sessionId || paymentId) && confirmData?.success;

  return (
    <div className="bg-gradient-to-br pt-5 from-blue-50 via-white to-green-50 flex items-center justify-center p-0">
      <div className="max-w-7xl w-full relative">
        {/* ✅ Script de conversión */}
        <Script id="conversion-event">
          {`
            gtag('event', 'conversion', {
              'send_to': 'AW-16830523296/PbBNCOqpj6kaEKDPtdk-'
            });
          `}
        </Script>
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 transform animate-in fade-in-0 slide-in-from-bottom-8 duration-700">
          {/* Header con check */}
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in-50 duration-500 delay-200">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full mx-auto animate-ping opacity-20"></div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 animate-in fade-in-0 duration-500 delay-300">
              ¡Compra Exitosa!
            </h1>
            {confirmData?.customerName && (
              <p className="text-lg text-gray-600 animate-in fade-in-0 duration-500 delay-400">
                Gracias, <span className="font-semibold text-gray-800">{confirmData.customerName}</span>
              </p>
            )}
          </div>

          {/* Detalles de la compra */}
          {showDetails && (
            <div className="mt-8 animate-in fade-in-0 duration-500 delay-500">
              <div className="grid md:grid-cols-2 gap-6">

                {/* Columna izquierda: Productos */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-800">Detalle del pedido</h3>
                  </div>

                  {confirmData.lineItems && confirmData.lineItems.length > 0 ? (
                    <div className="space-y-3">
                      {confirmData.lineItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{item.description}</p>
                            <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold text-gray-800 ml-4">
                            {formatCurrency(item.amount_total, item.currency || "MXN")}
                          </p>
                        </div>
                      ))}

                      {/* Total */}
                      <div className="flex items-center justify-between pt-3 mt-3 border-t-2 border-blue-200">
                        <p className="font-bold text-gray-900">Total</p>
                        <p className="font-bold text-xl text-blue-600">
                          {confirmData.totalAmount ? formatCurrency(confirmData.totalAmount, confirmData.currency || "MXN") : "N/A"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">Pedido procesado correctamente</p>
                      {confirmData.totalAmount && (
                        <p className="font-bold text-xl text-blue-600 mt-2">
                          {formatCurrency(confirmData.totalAmount, confirmData.currency || "MXN")}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Columna derecha: Envío y Correos */}
                <div className="space-y-6">
                  {/* Dirección de envío (solo Stripe la tiene) */}
                  {confirmData.shippingAddress && !isMP && (
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-800">Dirección de envío</h3>
                      </div>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p className="font-semibold">{confirmData.shippingName}</p>
                        {formatAddress(confirmData.shippingAddress)?.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Estado de correos */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-800">Confirmación por correo</h3>
                    </div>

                    <div className="space-y-3">
                      {confirmData.emailResults ? (
                        <>
                          <div className={`flex items-center justify-between p-3 rounded-lg border ${confirmData.emailResults.ventas.sent ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}>
                            <div className="flex items-center gap-3">
                              {confirmData.emailResults.ventas.sent ? (
                                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                              ) : (
                                <Loader2 className="w-4 h-4 text-yellow-600 animate-spin shrink-0" />
                              )}
                              <div className="text-left">
                                <p className="font-medium text-gray-800 text-sm">Equipo de ventas</p>
                                <p className="text-gray-500 text-xs">ventas@salmetexmed.com.mx</p>
                              </div>
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${confirmData.emailResults.ventas.sent ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                              {confirmData.emailResults.ventas.sent ? "✅ Enviado" : "⏳ Enviando"}
                            </span>
                          </div>

                          <div className={`flex items-center justify-between p-3 rounded-lg border ${confirmData.emailResults.cliente.sent ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}>
                            <div className="flex items-center gap-3">
                              {confirmData.emailResults.cliente.sent ? (
                                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                              ) : (
                                <Loader2 className="w-4 h-4 text-yellow-600 animate-spin shrink-0" />
                              )}
                              <div className="text-left">
                                <p className="font-medium text-gray-800 text-sm">Tu confirmación</p>
                                <p className="text-gray-500 text-xs">{confirmData.customerEmail || "No disponible"}</p>
                              </div>
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${confirmData.emailResults.cliente.sent ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                              {confirmData.emailResults.cliente.sent ? "✅ Enviado" : "⏳ Enviando"}
                            </span>
                          </div>

                          {confirmData.emailResults.cliente.sent && confirmData.customerEmail && (
                            <div className="flex items-start gap-2 mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <Truck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                              <p className="text-xs text-blue-700">
                                La información de tu pedido se ha enviado a <span className="font-semibold">{confirmData.customerEmail}</span>. Revisa tu bandeja de entrada.
                              </p>
                            </div>
                          )}
                        </>
                      ) : confirmData.emailsQueued ? (
                        <>
                          <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 border-green-200">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                              <div className="text-left">
                                <p className="font-medium text-gray-800 text-sm">Equipo de ventas</p>
                                <p className="text-gray-500 text-xs">ventas@salmetexmed.com.mx</p>
                              </div>
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                              ✅ Enviado
                            </span>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 border-green-200">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                              <div className="text-left">
                                <p className="font-medium text-gray-800 text-sm">Tu confirmación</p>
                                <p className="text-gray-500 text-xs">{confirmData.customerEmail || "No disponible"}</p>
                              </div>
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                              ✅ Enviado
                            </span>
                          </div>

                          {confirmData.customerEmail && (
                            <div className="flex items-start gap-2 mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <Truck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                              <p className="text-xs text-blue-700">
                                La información de tu pedido se ha enviado a <span className="font-semibold">{confirmData.customerEmail}</span>. Revisa tu bandeja de entrada.
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <Loader2 className="w-4 h-4 text-blue-600 mt-0.5 animate-spin shrink-0" />
                          <p className="text-xs text-blue-700">
                            Enviando confirmación por correo... Los emails se enviarán en los próximos minutos.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && (sessionId || paymentId) && (
            <div className="flex items-center justify-center gap-3 py-8 mt-6">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-gray-600">Procesando tu pedido...</span>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex items-center justify-center gap-2 py-6 mt-6 text-amber-600 bg-amber-50 rounded-xl border border-amber-200">
              <AlertCircle className="w-5 h-5" />
              <span>Hubo un problema: {error}</span>
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 mb-8 mt-8 text-white animate-in fade-in-0 duration-500 delay-700">
            <h3 className="font-semibold mb-2">Gracias por confiar en nosotros</h3>
            <p className="text-blue-100 text-sm">
              Tu salud y la de tus pacientes es nuestra prioridad. Esperamos seguir siendo tu aliado en el cuidado médico.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in-0 duration-500 delay-800">
            <Button
              onClick={() => router.push("/")}
              size="lg"
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Volver al inicio
            </Button>

            <Button
              onClick={() => router.push("/categoria/todos")}
              variant="outline"
              size="lg"
              className="border-2 cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Seguir comprando
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-2">¿Necesitas ayuda? Contáctanos</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <span>📞 +52 1 55 7948 6805</span>
              <span>✉️ contacto@salmetexmed.com.mx</span>
            </div>
          </div>
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-blue-300 rounded-full opacity-10 animate-bounce delay-1000"></div>
      </div>
    </div>
  );
}

const PageSuccess = () => {
  return (
    <Suspense
      fallback={
        <div className="bg-gradient-to-br pt-10 from-blue-50 via-white to-green-50 flex items-center justify-center p-0 min-h-[60vh]">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            <span className="text-gray-600">Cargando...</span>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
};

export default PageSuccess;