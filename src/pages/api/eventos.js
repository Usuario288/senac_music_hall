import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // GET - Listar eventos
  if (req.method === "GET") {
    try {
      const eventos = await prisma.evento.findMany();
      return res.status(200).json(eventos);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      return res.status(500).json({ error: "Erro ao buscar eventos" });
    }
  }

  // POST - Criar evento
  if (req.method === "POST") {
    const { nome, data, capacidade_max } = req.body;

    // Validação básica
    if (!nome || !data || !capacidade_max) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    try {
      await prisma.evento.create({
        data: {
          nome,
          data: new Date(data),
          capacidade_max: capacidade_max,
        },
      });

      return res.status(201).json({ message: "Evento criado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      return res.status(500).json({ error: "Erro ao criar evento" });
    }
  }

  // DELETE - Deletar evento
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID do evento não fornecido" });
    }

    try {
      const evento = await prisma.evento.findUnique({
        where: { id_evento: parseInt(id) },
      });

      if (!evento) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      await prisma.evento.delete({
        where: { id_evento: parseInt(id) },
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      return res.status(500).json({ error: "Erro ao deletar evento" });
    }
  }

  // PUT - Atualizar evento
  if (req.method === "PUT") {
    const { id_evento, nome, data, capacidade_max } = req.body;

    if (!id_evento || !nome || !data || !capacidade_max) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    try {
      const eventoAtualizado = await prisma.evento.update({
        where: { id_evento: Number(id_evento) },
        data: {
          nome,
          data: new Date(data),
          capacidade_max: Number(capacidade_max),
        },
      });

      return res.status(200).json(eventoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      return res.status(500).json({ error: "Erro ao atualizar evento" });
    }
  }

  // Método não permitido
  return res.status(405).json({ error: "Método não permitido" });
}