import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // GET - Listar setores
  if (req.method === "GET") {
    try {
      const setores = await prisma.setor.findMany({
        include: { evento: true }, // opcional: traz dados do evento
      });
      return res.status(200).json(setores);
    } catch (error) {
      console.error("Erro ao buscar setores:", error);
      return res.status(500).json({ error: "Erro ao buscar setores" });
    }
  }

  // POST - Criar setor
  if (req.method === "POST") {
    const { id_evento, perfil_setor, capacidade_setor } = req.body;

    if (!id_evento || !perfil_setor || !capacidade_setor) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    try {
      await prisma.setor.create({
        data: {
          id_evento: Number(id_evento),
          perfil_setor,
          capacidade_setor: Number(capacidade_setor),
        },
      });

      return res.status(201).json({ message: "Setor criado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar setor:", error);
      return res.status(500).json({ error: "Erro ao criar setor" });
    }
  }

  // DELETE - Deletar setor
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID do setor não fornecido" });
    }

    try {
      const setor = await prisma.setor.findUnique({
        where: { id_setor: Number(id) },
      });

      if (!setor) {
        return res.status(404).json({ error: "Setor não encontrado" });
      }

      await prisma.setor.delete({
        where: { id_setor: Number(id) },
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Erro ao deletar setor:", error);
      return res.status(500).json({ error: "Erro ao deletar setor" });
    }
  }

  // PUT - Atualizar setor
  if (req.method === "PUT") {
    const { id_setor, id_evento, perfil_setor, capacidade_setor } = req.body;

    if (!id_setor || !id_evento || !perfil_setor || !capacidade_setor) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    try {
      const setorAtualizado = await prisma.setor.update({
        where: { id_setor: Number(id_setor) },
        data: {
          id_evento: Number(id_evento),
          perfil_setor,
          capacidade_setor: Number(capacidade_setor),
        },
      });

      return res.status(200).json(setorAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar setor:", error);
      return res.status(500).json({ error: "Erro ao atualizar setor" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}