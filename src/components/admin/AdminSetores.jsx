import { useState, useEffect } from "react";
import axios from "axios";

export default function CrudSetores() {
  const [idEvento, setIdEvento] = useState("");
  const [perfilSetor, setPerfilSetor] = useState("Publico Geral");
  const [capacidade, setCapacidade] = useState("");
  const [setores, setSetores] = useState([]);
  const [eventos, setEventos] = useState([]);

  async function carregarDados() {
    setEventos((await axios.get("/api/eventos")).data);
    setSetores((await axios.get("/api/setores")).data);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("/api/setores", {
      id_evento: Number(idEvento),
      perfil_setor: perfilSetor,
      capacidade_setor: Number(capacidade),
    });
    setIdEvento("");
    setPerfilSetor("Publico Geral");
    setCapacidade("");
    await carregarDados();
  }

  async function deletarSetor(id) {
    await fetch(`/api/setores?id=${id}`, { method: "DELETE" });
    carregarDados();
  }

  return (
    <div id="crud-setores" className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Setores</h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <select
          value={idEvento}
          onChange={(e) => setIdEvento(e.target.value)}
          onFocus={carregarDados}
          required
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value="">Selecione Evento</option>
          {eventos.map((ev) => (
            <option key={ev.id_evento} value={ev.id_evento}>
              {ev.nome}
            </option>
          ))}
        </select>

        <select
          value={perfilSetor}
          onChange={(e) => setPerfilSetor(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value="Publico_Geral">Publico Geral</option>
          <option value="VIP">VIP</option>
          <option value="Imprensa">Imprensa</option>
        </select>

        <input
          type="number"
          placeholder="Capacidade do setor"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded-md"
        />

        <button className="w-full azul_ocupacao_fundo  text-white py-2 rounded-md">
          Criar Setor
        </button>
      </form>

      <ul className="space-y-3">
        {setores.map((set) => (
          <li
            key={set.id_setor}
            className="flex justify-between border p-3 rounded-md"
          >
            <div>
              <p className="font-semibold">
                {set.perfil_setor} - {set.capacidade_setor}
              </p>
              <p className="text-sm text-gray-600">
                Evento: {set.evento?.nome || "—"}
              </p>
            </div>
            <button
              onClick={() => deletarSetor(set.id_setor)}
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
