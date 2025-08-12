import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminUser() {

  //  INFO USER
  const [email, setEmail] = useState("");
  const [confEmail, setConfEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [funcaoSelecionada, setfuncaoSelecionada] = useState("Vendedor");

  // ERRO E ENVIAR
  const [usuarios, setUsuarios] = useState([]);
  const [erros, setErros] = useState({});
  const [podeEnviar, setPodeEnviar] = useState(false);

  // useEffect PRINCIPAL
  useEffect(() => {
    const emailValido = email.includes("@") && email.includes(".");
    const emailsIguais = email === confEmail;
    const senhaValida = senha.length >= 6;
    const senhasIguais = senha === confSenha;
    const cpfValido = cpf.length === 11;

    setErros({
      email:
        emailsIguais && emailValido ? "" : "E-mails inválidos ou diferentes",
      senha:
        senhasIguais && senhaValida ? "" : "Senhas diferentes ou muito curtas",
    });

    setPodeEnviar(
      cpfValido && emailValido && emailsIguais && senhaValida && senhasIguais
    );
  }, [email, confEmail, senha, confSenha]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/usuarios", {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha,
        perfil: funcaoSelecionada,
      });

      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");

        carregarUsuarios();
      } else {
        alert("Erro ao cadastrar, tente de outra forma!");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
    }
  };

  async function carregarUsuarios() {
    const res = await fetch("/api/usuarios");
    const json = await res.json();
    setUsuarios(json || []);
    console.log(usuarios);
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function deletarUsuario(id) {
    await fetch(`/api/usuarios?id=${id}`, { method: "DELETE" });
    carregarUsuarios();
  }

  return (
    <div id="crud-user" className="min-h-screen bg-gray-100 flex items-center justify-center px-4 mt-5">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Gerenciar Usuários
        </h1>
        <form onSubmit={handleSubmit} noValidate className="space-y-4 mb-8">
          <div className="mb-4">
            {" "}
            <label className="block mb-1 text-gray-700 font-medium">
              Nome Completo:
            </label>{" "}
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">CPF:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">
              Email:
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">
              Confirmar Email:
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confEmail}
              onChange={(e) => setConfEmail(e.target.value)}
              required
            />
            {erros.email && (
              <span className="text-red-500 text-sm">{erros.email}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">
              Senha:
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">
              Confirmar Senha:
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confSenha}
              onChange={(e) => setConfSenha(e.target.value)}
              required
            />
            {erros.senha && (
              <span className="text-red-500 text-sm">{erros.senha}</span>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-medium">
              Escolha o seu perfil:
            </label>
            <select
              name="funcao"
              id="funcao"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={funcaoSelecionada}
              onChange={(e) => {
                setfuncaoSelecionada(e.target.value);
                setErros((prev) => ({ ...prev, funcao: "" }));
              }}
            >
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Validador">Validador</option>
            </select>
            {erros.funcao && (
              <span className="text-red-500 text-sm">{erros.funcao}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full azul_ocupacao_fundo hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            disabled={!podeEnviar}
          >
            Cadastrar Usuário
          </button>
        </form>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Usuários Existentes
        </h3>

        <ul className="space-y-3">
          {usuarios.map((user) => (
            <li
              key={user.id_usuario}
              className="flex justify-between items-center border p-4 rounded-md bg-gray-50 shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-900">{user.nome}</p>
                <p className="text-sm text-gray-600">
                  CPF: {user.cpf} | Email: {user.email} | Perfil: {user.perfil}
                </p>
              </div>
              <button
                onClick={() => deletarUsuario(user.id_usuario)}
                className="laranja_ocupacao_fundo hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-200"
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
