import { useState, useEffect } from "react";
import axios from "axios";

export default function CrudClientes() {
  // Campos do cliente
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  // Lista de clientes
  const [clientes, setClientes] = useState([]);

  // Carrega clientes
  async function carregarClientes() {
    const res = await fetch("/api/clientes");
    const json = await res.json();
    setClientes(json || []);
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  // Cadastrar cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/clientes", {
        nome,
        cpf,
        email,
      });

      if (response.status === 201) {
        alert("Cliente cadastrado com sucesso!");
        setNome("");
        setCpf("");
        setEmail("");
        carregarClientes();
      } else {
        alert("Erro ao cadastrar cliente");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
    }
  };

  // Deletar cliente
  async function deletarCliente(id) {
    await fetch(`/api/clientes?id=${id}`, { method: "DELETE" });
    carregarClientes();
  }

  return (
    <div id="crud-clientes" className="min-h-screen bg-gray-100 flex items-center justify-center px-4 mt-5">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Gerenciar Clientes</h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">Nome:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">CPF:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">E-mail:</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full azul_ocupacao_fundo hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Cadastrar Cliente
          </button>
        </form>

        {/* Lista */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Clientes Existentes</h3>
        <ul className="space-y-3">
          {clientes.map((cli) => (
            <li
              key={cli.id_cliente}
              className="flex justify-between items-center border p-4 rounded-md bg-gray-50 shadow-sm"
            >
              <div>
                <p className="font-medium">{cli.nome}</p>
                <p className="text-sm text-gray-600">
                  CPF: {cli.cpf} | Email: {cli.email}
                </p>
              </div>
              <button
                onClick={() => deletarCliente(cli.id_cliente)}
                className="laranja_ocupacao_fundo hover:bg-red-600 text-white px-3 py-1 rounded-md"
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