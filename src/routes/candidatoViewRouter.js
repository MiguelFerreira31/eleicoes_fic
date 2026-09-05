import { Router } from "express";

import { candidatos } from "../dados/candidatos.js";

const candidatoViewRouter = Router();


candidatoViewRouter.get('/candidatos', (req, res) => {
res.render('home', { titulo: 'Lista de Candidatos', candidatos: candidatos })
})

candidatoViewRouter.get('/candidato/:id', (req, res) => {
    const numero = parseInt(req.params.id)
    const candidato = candidatos.find(c => c.numeroUrna === numero)

    if (!candidato) {
        return res.status(404).render('404', {
            titulo: 'Candidato não encontrado'
        })
    }

res.render('candidatoProfile', { titulo: 'Detalhes do Candidato', candidato: candidato })
})

export default candidatoViewRouter