import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function GraficoIngressos() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const res = await axios.get("/api/ingressos");
        const ingressos = res.data;

        const status = ["Emitido", "Pendente", "Validado"];
        const cores = ["#1331a1", "#f44528", "#a2ca02"];

        const contagem = status.map((s, i) => ({
          name: s,
          value: ingressos.filter((ing) => ing.status_ingresso === s).length,
          fill: cores[i],
        }));

        setDados(contagem);
      } catch (err) {
        console.error("Erro ao carregar dados do gráfico", err);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="mt-20 max-w-lg mx-auto bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">
        Ingressos por Status
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dados}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {dados.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}