// pages/api/clientes.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Lista todos os clientes
    try {
      const clientes = await prisma.cliente.findMany();
      return res.status(200).json(clientes);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      return res.status(500).json({ error: "Erro ao buscar clientes" });
    }
  }

  if (req.method === "POST") {
    const { nome, cpf, email } = req.body;

    if (!nome || !cpf || !email) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
      await prisma.cliente.create({
        data: {
          nome,
          cpf,
          email
        },
      });

      return res.status(201).json({ message: "Cliente cadastrado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      return res.status(500).json({ error: "Erro ao criar cliente" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID não fornecido" });
    }

    try {
      await prisma.cliente.delete({
        where: { id_cliente: parseInt(id) },
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      return res.status(500).json({ error: "Erro ao deletar cliente" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}