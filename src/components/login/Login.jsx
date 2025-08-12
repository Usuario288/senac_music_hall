import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({ email: "", senha: "" });
  const [podeEnviar, setPodeEnviar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const emailValido = email.includes("@") && email.includes(".");
    const senhaValida = senha.length > 0;

    setErros({
      email: emailValido ? "" : "E-mail inválido",
      senha: senhaValida ? "" : "Senha obrigatória",
    });

    setPodeEnviar(emailValido && senhaValida);
  }, [email, senha]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!podeEnviar) return;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (res.ok) {
      const { token } = data;
      localStorage.setItem("token", token);

      try {
        // Decodificar token
        const decoded = jwt.decode(token);

        switch (decoded.perfil) {
          case "Administrador":
            router.push("/admin/");
            break;
          case "Vendedor":
            router.push("/vendedor/");
            break;
          case "Validador":
            router.push("/validador/");
            break;
          default:
            router.push("/");
        }
      } catch (err) {
        alert("Token inválido");
      }
    } else {
      alert(data.error || "Login inválido");
    }
  };

  return (
    <div className="mt-80 max-w-sm mx-auto p-6 bg-white shadow-md rounded-md mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <img className="m-auto mb-5" src="login/login_imagem.png" alt="Logo" width={200} height={200}/>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          {erros.email && <p className="text-red-500 text-sm">{erros.email}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          {erros.senha && <p className="text-red-500 text-sm">{erros.senha}</p>}
        </div>

        <button
          type="submit"
          disabled={!podeEnviar}
          className={`w-full py-2 rounded-md ${
            podeEnviar
              ? "azul_ocupacao_fundo text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
