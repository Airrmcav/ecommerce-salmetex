"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductosRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la ruta correcta
    router.replace('/categoria/todos');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redireccionando...</h1>
        <p className="text-gray-600">Por favor espere mientras le redirigimos a la página correcta.</p>
      </div>
    </div>
  );
}