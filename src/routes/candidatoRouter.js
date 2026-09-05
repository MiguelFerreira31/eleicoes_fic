import { Router } from "express";

import { candidatos } from "../dados/candidatos.js";

const candidatoRouter = Router();


candidatoRouter.get('/candidatos', (req, res) => {
    res.json(candidatos)
})

candidatoRouter.get('/candidato/:id', (req, res) => {
    const numero = parseInt(req.params.id)
    const candidato = candidatos.find(c => c.numeroUrna === numero)

    if (!candidato) {
        return res.status(404).json({ error: 'Candidato não encontrado' })
    }
    res.json(candidato)
})

export default candidatoRouter