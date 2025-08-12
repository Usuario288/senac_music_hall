import { NextResponse } from 'next/server';

export function middleware(request) {
  // Sua lógica de middleware aqui. Por exemplo:
  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  
  // A lógica do seu middleware não será aplicada a arquivos estáticos
  // e rotas ignoradas pelo matcher.
  
  return NextResponse.next();
}

// O 'matcher' é a chave para a exceção.
export const config = {
  // O middleware será executado em todas as rotas, exceto:
  // - rotas da API (`/api/`)
  // - arquivos estáticos (`/_next/static/`)
  // - arquivos de imagens, ícones, etc. (`/images/`, `/favicon.ico`)
  // - a pasta '_next' que contém arquivos internos do Next.js
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};