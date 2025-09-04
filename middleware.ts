import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Corregir URLs mal formadas de Cloudinary
  if (pathname.includes('backend-ecommerce-87y0.onrender.comhttps//res.cloudinary.com')) {
    const correctedPath = pathname.replace(
      'backend-ecommerce-87y0.onrender.comhttps//res.cloudinary.com',
      'https://res.cloudinary.com'
    );
    return NextResponse.redirect(new URL(correctedPath, request.url));
  }

  // Corregir URLs mal formadas con 'undefined'
  if (pathname.includes('undefined')) {
    const correctedPath = pathname.replace('undefined', '');
    return NextResponse.redirect(new URL(correctedPath, request.url));
  }

  // Redireccionar rutas antiguas de productos
  if (pathname.startsWith('/productos')) {
    if (pathname === '/productos') {
      return NextResponse.redirect(new URL('/categoria/todos', request.url));
    } else {
      // Extraer el slug del producto
      const productSlug = pathname.replace('/productos/', '');
      return NextResponse.redirect(new URL(`/product/${productSlug}`, request.url));
    }
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    // Rutas que pueden contener URLs mal formadas
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};