import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

export default function AuthGuard({ children, roles = [] }) {
  const router = useRouter();
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwt.decode(token);

      if (!decoded || (roles.length > 0 && !roles.includes(decoded.perfil))) {
        router.push('/login');
        return;
      }

      setAutenticado(true);
    } catch (err) {
      router.push('/login');
    }
  }, [router, roles]);

  if (autenticado === null) return <p>Carregando...</p>;

  return children;
}