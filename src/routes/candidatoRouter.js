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

candidatoRouter.post('/candidatos', (req, res) => {
    const { nome, origem, numeroUrna, foto } = req.body

    const candidatoExiste = candidatos.find(c => c.numeroUrna === Number(numeroUrna))
    if (candidatoExiste) {
        return res.status(400).json({ error: 'Candidato já existe' })
    }

    const novoCandidato = {
        id: candidatos.length + 1,
        nome,
        origem,
        numeroUrna: Number(numeroUrna),
        foto
    }

    candidatos.push(novoCandidato)
    res.status(201).json(novoCandidato)
})

candidatoRouter.put('/candidato/:id', (req, res) => {
    const numero = parseInt(req.params.id)
    const candidato = candidatos.find(c => c.numeroUrna === numero)

    if (!candidato) {
        return res.status(404).json({ error: 'Candidato não encontrado' })
    }

    const { nome, origem, numeroUrna, foto } = req.body

    if (nome) candidato.nome = nome
    if (origem) candidato.origem = origem
    if (numeroUrna) candidato.numeroUrna = Number(numeroUrna)
    if (foto) candidato.foto = foto

    res.json(candidato)
})

candidatoRouter.delete('/candidato/:id', (req, res) => {
    const numero = parseInt(req.params.id)
    const index = candidatos.findIndex(c => c.numeroUrna === numero)

    if (index === -1) {
        return res.status(404).json({ error: 'Candidato não encontrado' })
    }

    const [candidatoRemovido] = candidatos.splice(index, 1)
    res.json(candidatoRemovido)
})

export default candidatoRouter