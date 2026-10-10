import { Router } from "express";
import { exigirLogin } from "../middlewares/exigirLogin.js";
// Importa os mesmos dados de candidatos e votos usados nas outras páginas, para o relatório apurar os votos reais
import { candidatos } from "../dados/candidatos.js";
import { votos } from "../dados/votos.js";

const painelRouter = Router();

painelRouter.get('/', exigirLogin, (req, res) => {

    res.render('painel', {
        titulo: 'Painel de Controle',
        usuario: req.session.usuarioLogado,
        // Apura os votos de cada candidato cadastrado (antes usava um new Eleicao() vazio, então o relatório nunca tinha dados); inclui a foto para exibir no relatório
        relatorio: candidatos.map(c => ({ nome: c.nome, foto: c.foto, numero: c.numeroUrna, votos: votos.find(v => v.candidatoId === c.numeroUrna)?.votos ?? 0 })),

        // Dados crus para as telas de gerenciamento via API (POST/PUT/DELETE)
        candidatosApi: candidatos,
        votosApi: votos

    })

})

export default painelRouter;