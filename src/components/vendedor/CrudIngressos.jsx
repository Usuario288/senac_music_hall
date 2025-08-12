import { useState, useEffect } from "react";
import axios from "axios";

export default function CrudIngressos() {
  // Campos do formulário
  const [idCliente, setIdCliente] = useState("");
  const [idEvento, setIdEvento] = useState("");
  const [idSetor, setIdSetor] = useState("");
  const [codigo, setCodigo] = useState("");
  const [statusIngresso, setStatusIngresso] = useState("Emitido");

  // Listas
  const [clientes, setClientes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [ingressos, setIngressos] = useState([]);

  // Mensagens
  const [erro, setErro] = useState("");

  // Carregar dados do servidor
  async function carregarDados() {
    try {
      setClientes((await axios.get("/api/clientes")).data);
      setEventos((await axios.get("/api/eventos")).data);
      setSetores((await axios.get("/api/setores")).data);
      setIngressos((await axios.get("/api/ingressos")).data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  // Criar ingresso
  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      await axios.post("/api/ingressos", {
        id_cliente: Number(idCliente),
        id_evento: Number(idEvento),
        id_setor: Number(idSetor),
        codigo: codigo,
        status_ingresso: statusIngresso,
      });
      carregarDados();
      setCodigo("");
      alert("Ingresso cadastrado!");
    } catch (err) {
      setErro(err.response?.data?.error || "Erro ao cadastrar ingresso");
    }
  }

  // Deletar ingresso
  async function deletarIngresso(id) {
    await fetch(`/api/ingressos?id=${id}`, { method: "DELETE" });
    carregarDados();
  }

  return (
    <div id="crud-ingresso" className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Ingressos</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <select className="border-r-1" value={idCliente} onChange={(e) => setIdCliente(e.target.value)} required>
          <option value="">Selecione Cliente</option>
          {clientes.map((c) => (
            <option key={c.id_cliente} value={c.id_cliente}>
              {c.nome}
            </option>
          ))}
        </select>

        <select className="border-r-1" value={idEvento} onChange={(e) => setIdEvento(e.target.value)} required>
          <option value="">Selecione Evento</option>
          {eventos.map((e) => (
            <option key={e.id_evento} value={e.id_evento}>
              {e.nome}
            </option>
          ))}
        </select>

        <select className="border-r-1" value={idSetor} onChange={(e) => setIdSetor(e.target.value)} required>
          <option value="">Selecione Setor</option>
          {setores
            .filter((s) => s.id_evento === Number(idEvento))
            .map((s) => (
              <option key={s.id_setor} value={s.id_setor}>
                {s.perfil_setor}
              </option>
            ))}
        </select>

        <input className="border-r-1 text-center w-49"
          type="text"
          placeholder="Código do ingresso"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />

        <select className="border-r-1" value={statusIngresso} onChange={(e) => setStatusIngresso(e.target.value)}>
          <option value="Emitido">emitido</option>
          <option value="Pendente">pendente</option>
          <option value="Validado">validado</option>
        </select>

        {erro && <p className="text-red-500">{erro}</p>}

        <button className="w-full azul_ocupacao_fundo  text-white py-2 rounded-md">
          Cadastrar Ingresso
        </button>
      </form>

      {/* Lista */}
      <ul className="space-y-3">
        {ingressos.map((ing) => (
          <li
            key={ing.id_ingresso}
            className="flex justify-between items-center  p-3 rounded-md"
          >
            <div>
              <p className="font-semibold">
                {ing.codigo} - {ing.status_ingresso}
              </p>
              <p className="text-sm text-gray-600">
                Cliente: {ing.cliente?.nome} | Evento: {ing.evento?.nome} | Setor:{" "}
                {ing.setor?.perfil_setor}
              </p>
            </div>
            <button
              onClick={() => deletarIngresso(ing.id_ingresso)}
              className="laranja_ocupacao_fundo text-white px-3 py-1 rounded-md"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
