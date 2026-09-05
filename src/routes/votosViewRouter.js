import { Router } from 'express'

import { votos } from '../dados/votos.js'

const votoViewRouter = Router()

// Lista de votos
votoViewRouter.get('/votos', (req, res) => {
    res.render('homeVotos', {
        titulo: 'Lista de Votos',
        votos: votos
    })
})

// Detalhes dos votos de um candidato
votoViewRouter.get('/voto/:id', (req, res) => {
    const numero = parseInt(req.params.id)

    const voto = votos.find(v => v.candidatoId === numero)

    if (!voto) {
        return res.status(404).render('404', {
            titulo: 'Votos não encontrados'
        })
    }

    res.render('votoProfile', {
        titulo: 'Detalhes dos Votos',
        voto: voto
    })
})

export default votoViewRouter
