import { Router } from "express";
import { Eleicao } from "../dominio/Eleicao.js";
import { exigirLogin } from "../middlewares/exigirLogin.js";

const painelRouter = Router();

painelRouter.get('/', exigirLogin, (req, res) => {

    const eleicao = new Eleicao();

    res.render('painel', {
        titulo: 'Painel de Controle',
        usuario: req.session.usuarioLogado,
        relatorio: eleicao.apurarVotos()

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