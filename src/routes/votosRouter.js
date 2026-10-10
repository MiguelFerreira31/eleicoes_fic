import { Router } from 'express'

import { votos } from '../dados/votos.js'

const votosRouter = Router()


// ==============================
// LISTAR TODOS OS VOTOS
// GET /api/votos
// ==============================

votosRouter.get('/', (req, res) => {
    res.json(votos)
})


// ==============================
// BUSCAR VOTOS POR CANDIDATO
// GET /api/votos/:id
// ==============================

votosRouter.get('/:id', (req, res) => {

    const numero = parseInt(req.params.id)

    const candidatoVotos = votos.find(
        v => v.candidatoId === numero
    )

    if (!candidatoVotos) {
        return res.status(404).json({
            error: 'Votos não encontrados'
        })
    }

    res.json(candidatoVotos)
})


// ==============================
// CRIAR VOTOS PARA UM CANDIDATO
// POST /api/votos
// ==============================

votosRouter.post('/', (req, res) => {

    const { candidatoId } = req.body

    const votoExiste = votos.find(
        v => v.candidatoId === Number(candidatoId)
    )

    if (votoExiste) {
        return res.status(400).json({
            error: 'Votos para esse candidato já existem'
        })
    }

    const novoVoto = {
        id: votos.length + 1,
        candidatoId: Number(candidatoId),
        votos: 0
    }

    votos.push(novoVoto)
    res.status(201).json(novoVoto)
})


// ==============================
// ATUALIZAR VOTOS DE UM CANDIDATO
// PUT /api/votos/:id
// ==============================

votosRouter.put('/:id', (req, res) => {

    const numero = parseInt(req.params.id)

    const candidatoVotos = votos.find(
        v => v.candidatoId === numero
    )

    if (!candidatoVotos) {
        return res.status(404).json({
            error: 'Votos não encontrados'
        })
    }

    const { votos: quantidadeVotos } = req.body
    candidatoVotos.votos = Number(quantidadeVotos)

    res.json(candidatoVotos)
})


// ==============================
// REMOVER VOTOS DE UM CANDIDATO
// DELETE /api/votos/:id
// ==============================

votosRouter.delete('/:id', (req, res) => {

    const numero = parseInt(req.params.id)

    const index = votos.findIndex(
        v => v.candidatoId === numero
    )

    if (index === -1) {
        return res.status(404).json({
            error: 'Votos não encontrados'
        })
    }

    const [votoRemovido] = votos.splice(index, 1)
    res.json(votoRemovido)
})


export default votosRouter
