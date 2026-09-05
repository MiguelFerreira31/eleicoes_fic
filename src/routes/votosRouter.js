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


export default votosRouter
