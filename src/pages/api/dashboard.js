import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Totais por status
      const status = await prisma.ingresso.groupBy({
        by: ["status_ingresso"],
        _count: { status_ingresso: true },
      });

      // Ocupação por setor
      const setores = await prisma.setor.findMany({
        include: {
          ingresso: {
            where: {
              status_ingresso: { in: ["Emitido", "Validado"] },
            },
          },
        },
      });

      const dadosSetores = setores.map(s => ({
        setor: s.perfil_setor,
        capacidade: s.capacidade_setor,
        ocupados: s.ingresso.length,
      }));

      return res.status(200).json({ status, setores: dadosSetores });
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
      return res.status(500).json({ error: "Erro ao carregar dashboard" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}