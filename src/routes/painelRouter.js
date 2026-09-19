import { Router } from "express";
import { Eleicao } from "../dominio/Eleicao.js";
import { exigirLogin } from "../middlewares/exigirLogin.js";
// Importa os mesmos dados de candidatos e votos usados nas outras páginas, para o relatório apurar os votos reais
import { candidatos } from "../dados/candidatos.js";
import { votos } from "../dados/votos.js";

const painelRouter = Router();

painelRouter.get('/', exigirLogin, (req, res) => {

    const eleicao = new Eleicao();

    res.render('painel', {
        titulo: 'Painel de Controle',
        usuario: req.session.usuarioLogado,
        // Apura os votos de cada candidato cadastrado (antes usava um new Eleicao() vazio, então o relatório nunca tinha dados); inclui a foto para exibir no relatório
        relatorio: candidatos.map(c => ({ nome: c.nome, foto: c.foto, numero: c.numeroUrna, votos: votos.find(v => v.candidatoId === c.numeroUrna)?.votos ?? 0 }))

    })

})


painelRouter.post('/cad-candidato', exigirLogin, (req, res) => {
    const { nome, numero } = req.body;
    const eleicao = new Eleicao();

    try {
        eleicao.cadastrar(nome, numero);

    } catch (error) {
        console.error('Erro ao cadastrar candidato:', error);
        res.status(500).send('Erro ao cadastrar candidato');
    }
    res.redirect('/painel');

});

export default painelRouter;