import { useState, useEffect } from "react";
import axios from "axios";

export default function CrudEventos() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [eventos, setEventos] = useState([]);

  async function carregarEventos() {
    setEventos((await axios.get("/api/eventos")).data);
  }

  useEffect(() => {
    carregarEventos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("/api/eventos", {
      nome,
      data,
      capacidade_max: Number(capacidade),
    });
    setNome("");
    setData("");
    setCapacidade("");
    carregarEventos();
  }

  async function deletarEvento(id) {
    await fetch(`/api/eventos?id=${id}`, { method: "DELETE" });
    carregarEventos();
  }

  return (
    <div id="crud-eventos" className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Eventos</h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Nome do evento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded-md"
        />
        <input
          type="datetime-local"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Capacidade máxima"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded-md"
        />
        <button className="w-full azul_ocupacao_fundo text-white py-2 rounded-md">
          Criar Evento
        </button>
      </form>

      <ul className="space-y-3">
        {eventos.map((ev) => (
          <li
            key={ev.id_evento}
            className="flex justify-between border p-3 rounded-md"
          >
            <div>
              <p className="font-semibold">{ev.nome}</p>
              <p className="text-sm text-gray-600">
                Data: {new Date(ev.data).toLocaleString()} | Capacidade:{" "}
                {ev.capacidade_max}
              </p>
            </div>
            <button
              onClick={() => deletarEvento(ev.id_evento)}
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