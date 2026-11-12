 //#region // imports e constantes

import express from "express";
import { livros } from "./livros.js"; //importa a lista de livros do arquivo 

const app = express(); //cria uma instância do express
const PORT = 3000; //porta que o servidor vai escutar
app.use(express.json()); //permite que o servidor entenda de requisições com corpo (boby) em json
//#endregion

//#region //lógica do servidor 

//get boas vindas

app.get("/", (req, res) => {
    res.json({ mensagem: "Servidor rodando!" })
});

//get para listar os livros

app.get("/livros", (req, res) => {
    res.json(livros)
});

//get pelo id do livro

app.get("/livros/:id", (req, res) => {
// o id precisa ser convertido para numero, pois o req.params.id é uma string.

const id = Number(req.params.id); //converte o id para numero
const livro = livros.find((le) => le.id === id);
if (!livros){
    return res.status(404). json({mensagem: "Livro não encontrado!"});
}
res.json(livros);
});


// rota os autores terem seu nome exibido em maiúsculo

app.get("/livros/autor/maiusculo", (req, res) => {
    const resultado = autorMaiusculo(livros);
    res.json(resultado);

});
    

//#endregion

//#region  //funções auxiliares

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});

// função para deixar o nome do autor maiusculo

export function autorMaiusculo(livro) {
    return livros.map((livro) => ({
        ...livro,
        autor: livro.autor.toUpperCase()
    }));

};

//#endregion