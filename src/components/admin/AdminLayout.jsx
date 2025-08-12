import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div id="#crud-eventos" className="flex min-h-screen">
      <aside className="w-56 bg-gray-900 text-white p-4 verde_ocupacao_fundo">
        <img className='mb-5' src='/login/login_imagem.png' alt='homem segurando notebook sorrrindo' />
        <h2 className="text-3xl text-center text-gray-800 font-bold mb-6">SISTEMA SENAC MUSIC HALL</h2>
        <nav>
          <ul className="list-none p-0  text-center space-y-3">
            <li className="text-gray-800" >
              <Link href="#crud-usuarios">Usuarios</Link>
            </li>
            <li className="text-gray-800">
              <Link href="#crud-eventos">Eventos</Link>
            </li>
            <li className="text-gray-800">
              <Link href="#crud-setores">Setores</Link>
            </li>
            <li className="text-gray-800">
              <Link href="#crud-ingresso">Ingressos</Link>
            </li>
            <li className="text-gray-800">
              <Link href="#crud-clientes">Clientes</Link>
            </li>
            <li className="text-gray-800">
              <Link href="#crud-clientes">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}