import express from 'express'
import path from 'node:path'
import session from 'express-session'


import candidatoRouter from './src/routes/candidatoRouter.js'
import votosRouter from './src/routes/votosRouter.js'
import painelRouter from './src/routes/painelRouter.js'


import candidatoViewRouter from './src/routes/candidatoViewRouter.js'
import votosViewRouter from './src/routes/votosViewRouter.js'

const app = express()

// Configuração do EJS
app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'views'))

// Middleware para receber JSON
app.use(express.json())


app.use(session({
    secret: 'Senac@123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina como true se estiver usando HTTPS
}))

app.use(express.urlencoded({ extended: true }))

// ==============================
// ROTAS DA API
// ==============================

app.use('/api', candidatoRouter)
app.use('/votos', votosRouter)


// ==============================
// ROTAS DAS PÁGINAS
// ==============================

app.use('/', candidatoViewRouter)
app.use('/', votosViewRouter)

app.use('/painel', painelRouter)

// ==============================
// PÁGINA 404
// ==============================

app.use((req, res) => {
    res.status(404).render('404', {
        titulo: 'Página não encontrada'
    })
})


// ==============================
// INICIA O SERVIDOR
// ==============================

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
