import express from 'express';
import cors from 'cors';

import userRouter from './src/router/userRouter.js';
import authRouter from './src/router/authRouter.js';
import shceduleRouter from './src/router/scheduleRouter.js';

import Config from './config.js';
const config = new Config();

config.pre_fligth_check();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/schedule', shceduleRouter);

//Populate Database

//Teste
app.get('/api', (req, res) =>{
    res.status(200).json({message:"Api funcionando"})
})

//Port - Listen
app.listen(port, (err) => {
    if (err) {
        console.log("Ocorreu um erro ao iniciar o servidor:", err);
        return;
    }
    console.log(`Servidor está rodando na porta ${port}`);
});

export default app;