"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ProductoRedirect() {
  const router = useRouter();
  const params = useParams();
  const { productSlug } = params;

  useEffect(() => {
    // Redirigir a la ruta correcta de producto
    if (productSlug) {
      router.replace(`/product/${productSlug}`);
    } else {
      router.replace('/categoria/todos');
    }
  }, [router, productSlug]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redireccionando...</h1>
        <p className="text-gray-600">Por favor espere mientras le redirigimos a la página correcta.</p>
      </div>
    </div>
  );
}