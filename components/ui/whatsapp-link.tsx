"use client";

import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

type WhatsAppLinkProps = {
  productName: string;
  type?: "quote" | "info";
  phone?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
};

const PHONE_DEFAULT = "528445954660";

const buildWhatsAppUrl = (phone: string, productName: string, type: "quote" | "info"): string => {
  const message =
    type === "quote"
      ? `Hola, me interesa cotizar el producto: ${productName}. ¿Podrían darme precio y tiempo de entrega?`
      : `Hola, tengo dudas sobre el producto: ${productName}. ¿Me pueden asesorar?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const WhatsAppLink = ({
  productName,
  type = "info",
  phone = PHONE_DEFAULT,
  className,
  size = "md",
  ariaLabel,
}: WhatsAppLinkProps) => {
  const url = buildWhatsAppUrl(phone, productName, type);

  const sizeClasses = {
    sm: "p-2",
    md: "py-2.5 px-3",
    lg: "py-3 px-4",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? `Contactar por WhatsApp sobre ${productName}`}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all",
        sizeClasses[size],
        className
      )}
    >
      <FaWhatsapp className={size === "sm" ? "w-4 h-4" : "w-5 h-5"} aria-hidden="true" />
      {size === "lg" && (
        <span className="font-medium text-sm">WhatsApp</span>
      )}
    </a>
  );
};

export { buildWhatsAppUrl, PHONE_DEFAULT };