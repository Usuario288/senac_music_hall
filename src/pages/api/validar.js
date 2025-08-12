import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // POST - Validar ingresso por código
  if (req.method === "POST") {
    const { codigo } = req.body;

    if (!codigo) {
      return res.status(400).json({ error: "Código do ingresso é obrigatório" });
    }

    try {
      // Busca ingresso pelo código
      const ingresso = await prisma.ingresso.findUnique({
        where: { codigo_qr: codigo },
      });

      if (!ingresso) {
        return res.status(404).json({ error: "Ingresso não encontrado" });
      }

      if (ingresso.status_ingresso === "Validado") {
        return res.status(400).json({ error: "Ingresso já validado" });
      }

      // Atualiza status do ingresso
      await prisma.ingresso.update({
        where: { id_ingresso: ingresso.id_ingresso },
        data: { status_ingresso: "Validado" },
      });

      // Registra validação
      await prisma.validacao.create({
        data: {
          id_ingresso: ingresso.id_ingresso,
          data: new Date(),
        },
      });

      return res.status(200).json({ message: "Ingresso validado com sucesso!" });
    } catch (error) {
      console.error("Erro ao validar ingresso:", error);
      return res.status(500).json({ error: "Erro ao validar ingresso" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}