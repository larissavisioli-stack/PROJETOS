//#region  IMPORTS
import fs from "node:fs/promises";
import path from "node:path";
import { json } from "node:stream/consumers";
import { fileURLToPath } from "node:url";

//não importa onde será chamado, sempre vai conseguir encontrar o arquivo//

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const caminhoDados = path.join(__dirname, "..", "BD", "tabela_atendimentos.json");

//#endregion

//#region  LÓGICA

//ListarTodos - ler um arquivo local

export async function listarTodos() {

    const conteudo = await fs.readFile(caminhoDados, "utf-8");
    return JSON.parse(conteudo);
}

//Escrever/Salvar

//salvarTodos - escrever em um arquivo local

export async function salvarTodos(cadastros) {
    
    await fs.writeFile(
        caminhoDados, 
        JSON.stringify(cadastros, null, 2),
        "utf-8"
    );
}

//#endregion

//#region FUNÇÕES AUXILIARES
//#endregion