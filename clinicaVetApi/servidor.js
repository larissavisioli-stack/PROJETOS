//#region IMPORTS
import express from "express";
import { listarTodos, salvarTodos } from "./MANIPULADOR/manipulador_arquivo.js"

const app = express(); //criação da instancia do express
const PORT = 3000;
app.use(express.json()); //convertendo de maneira mais direta (middleware)



//#endregion

//#region LÓGICA

//rotas

//GET - Boas_vindas
app.get("/", (req, res) => {

    res.send("Bem-vindo à API da nossa Clínica Veterinária");

});

//GET / atendimentos
app.get("/atendimentos", async (req, res) => {
    try {
        //o que eu quero que aconteça
        const cadastros = await listarTodos();
        return res.status(200).json(cadastros);
    }

    catch (error) {
        console.log("Erro ao listar atendimentos", error);
        return res.status(500).json({ error: "Não foi possível ler os cadastros" });

    }
});


// POST / atendimentoPost
console
app.post("/atendimentosPost", async (req, res) => {
try{
    //dados do novo cadastro
    const{id, pet, raca, idade, tutor, diaAtendimento, valorGasto} = req.body;

    // Valida os campos obrigatótios
    if(!id || !pet || !raca || !idade || !tutor || !diaAtendimento || !valorGasto){
        return res.status(400).json({error: "Todos oscampos são obrigatórios"});
    }

const novoCadastro = {
    id: Number (id),
    pet: pet,
    raca: raca,
    idade: Number (idade),
    tutor: tutor,
    diaAtendimento: diaAtendimento,
    valorGasto: Number (valorGasto)
};

const cadastros = await listarTodos();
cadastros.push(novoCadastro);

await salvarTodos(cadastros);

return res.status(201).json({ mensagem: "Cadastro realizado com sucesso!"})
}

catch(error){
    console.log("Erro ao salvar cadastro", error);
    return res.status(500).json
    ({error: "Não foi possível salvar o cadastro"});
}
});

// Delete / atendimentos / id:1
app.delete("/atendimentos/:id", async (req, res) => {

    try {

        // Recuperar o id enviado na url e converter para number

        const id = Number(req.params.id); //converte o id para numero

        // Leio os dados cadastrados

        const dados = await listarTodos();

        // Mantém apenas os itens com id diferente

        const dadosAtualizados = dados.filter((atendimento) =>
            atendimento.id !== id)

        // Verificar se deletou
        if (dadosAtualizados.length === dados.length) {
            return res.status(404).json({ erro: "Atendimento não deletado" });
        }

        await salvarTodos(dadosAtualizados);

        return res.status(200).json({ mensage: "Atendimento excluído com sucesso!" });

    } catch (error) {

        console.log("Erro ao deletar cadastros", error);
        return res.status(500).json({ error: "Não foi possível ler os cadastros" });

    }
});

//PUT / atendimentos/:id
app.put("/atendimentos/:id", async(req, res) => {
try {

    
 // Recuperar o id enviado na url e converter para number

    const id = Number(req.params.id); //converte o id para numero

// Leio os dados cadastrados

    const dados = await listarTodos();

// Procurar o id com id informado

    const atendimentoExistente = dados.find(
        (atendimento) => atendimento.id === id
    );

//verificar se encontrou o atendiemnto 

if(!atendimentoExistente){
    return res.status(404).json({ erro: "Atendimento não encontrado"})
}

// se comportar como um novo cadastro 

//dados do novo cadastro
    const{pet, raca, idade, tutor, diaAtendimento, valorGasto} = req.body;

//
// Valida os campos obrigatótios
    if( !pet ||
        !raca ||
        !idade ||
        !tutor ||
        !diaAtendimento ||
        !valorGasto){
            return res.status(400).json({error: "Todos os campos são obrigatórios"})};
   

//criar objeto com os dados do novo cadastrpo 

const atendimentoAtualizado = {
    id: Number (id),
    pet: pet,
    raca: raca,
    idade: Number (idade),
    tutor: tutor,
    diaAtendimento: diaAtendimento,
    valorGasto: Number (valorGasto)
};

//substituir o atendimento exitente pelo atualizado
const dadosAtualizados = dados.map((atendimento) =>
    atendimento.id === id ? atendimentoAtualizado : atendimento 
);

//salvar a lista nova
await salvarTodos(dadosAtualizados);

//mensagem  de resposta
return res.status(200).json({mensagem: "Atendimento atualizado com sucesso !"})


} catch (error) {
    console.log("Erro ao alterar o cadastro", error);
    return res.status(500).json
    ({error: "Não foi possível alterar e salvar o cadastro"});
}
});

//Se não encontrei nenhuma rota - sempre vai ter//

app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});

//#endregion

//#region FUNÇÕES AUXILIARES

app.listen(PORT, () => {

    console.log("Está rodando na porta:", PORT);

});

//#endregion

