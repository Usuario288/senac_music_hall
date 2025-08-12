import { useState } from "react";
import axios from "axios";

export default function ValidadorIngresso() {
  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  async function validarIngresso(e) {
    e.preventDefault();
    setMensagem("");

    try {
      const res = await axios.post("/api/validar-ingresso", { codigo });

      if (res.data.valido) {
        setMensagem(`✅ Ingresso válido para ${res.data.cliente.nome} - ${res.data.evento.nome}`);
        setTipoMensagem("sucesso");
      } else {
        setMensagem("❌ Ingresso inválido ou já utilizado.");
        setTipoMensagem("erro");
      }
    } catch (err) {
      setMensagem("⚠ Erro ao validar ingresso.");
      setTipoMensagem("erro");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 mt-5">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Validador de Ingresso</h1>

        <form onSubmit={validarIngresso} className="space-y-4">
          <input
            type="text"
            placeholder="Digite o código do ingresso"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full azul_ocupacao_fundo hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Validar
          </button>
        </form>

        {mensagem && (
          <div
            className={`mt-4 p-3 rounded-md ${tipoMensagem === "sucesso"
                ? "verde_ocupacao_fundo text-green-800 border border-green-400"
                : "bg-red-100 text-red-800 border border-red-400"
              }`}
          >
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}