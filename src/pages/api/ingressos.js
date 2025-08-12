import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const ingressos = await prisma.ingresso.findMany({
        include: {
          cliente: true,
          evento: true,
          setor: true // 🔹 Isso garante que os dados do setor venham no JSON
        },
      });
      return res.status(200).json(ingressos);
    } catch (error) {
      console.error("Erro ao buscar ingressos:", error);
      return res.status(500).json({ error: "Erro ao buscar ingressos" });
    }
  }

  if (req.method === "POST") {
    const { id_cliente, id_evento, id_setor, codigo, status_ingresso } = req.body;

    if (!id_cliente || !id_evento || !id_setor || !codigo || !status_ingresso) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
      await prisma.ingresso.create({
        data: {
          id_cliente,
          id_evento,
          id_setor,
          codigo,
          status_ingresso,
        },
      });
      return res.status(201).json({ message: "Ingresso criado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar ingresso:", error);
      return res.status(500).json({ error: "Erro ao criar ingresso" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      await prisma.ingresso.delete({
        where: { id_ingresso: Number(id) },
      });
      return res.status(204).end();
    } catch (error) {
      console.error("Erro ao deletar ingresso:", error);
      return res.status(500).json({ error: "Erro ao deletar ingresso" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}