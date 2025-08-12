import { PrismaClient } from "@prisma/client";


export default async function handler(req, res) {

    const prisma = new PrismaClient();


    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { codigo } = req.body;

    if (!codigo) {
        return res.status(400).json({ valido: false, error: "Código é obrigatório" });
    }

    try {
        const ingresso = await prisma.ingresso.findFirst({
            where: { codigo },
            include: {
                cliente: true,
                evento: true,
            },
        });

        if (!ingresso) {
            return res.status(404).json({ valido: false, error: "Ingresso não encontrado" });
        }

        if (ingresso.status_ingresso === "Validado") {
            return res.status(400).json({ valido: false, error: "Ingresso já foi validado" });
        }

        // Atualiza para validado
        await prisma.ingresso.update({
            where: { id_ingresso: ingresso.id_ingresso },
            data: { status_ingresso: "Validado" },
        });

        return res.status(200).json({
            valido: true,
            cliente: ingresso.cliente,
            evento: ingresso.evento,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ valido: false, error: "Erro interno no servidor" });
    }
}