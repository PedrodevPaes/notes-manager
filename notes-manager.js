const fs = require("node:fs")
const path= require("node:path")
const readline=require("node:readline")


    function askFilePath(question){
        const rl = readline.createInterface({input:process.stdin, output:process.stdout})
        return new Promise((resolve)=>{
            rl.question(question, (answer)=>{
                resolve(answer)
                rl.close()
            })
        })
    }
    
     async function choice(){
        let input
        do {
            input= await askFilePath(
            `escolha uma opção:
            1. Criar anotação
            2. listar arquivos salvos
            3. Ler anotação
            4. Excluir anotação
            5. Sair
        `)
        switch (input) {
            case "1":
                await createNote()
                break;
            case "2":
                await listNotes()
                break;
            case "3":
                await readNote()
                break;
            case "4":
                await deleteNote()
                break;
            case "5":
                console.log("Saindo ...")
                break;
            default:
                wrongAnswer()
                break;
        }
        
    } while (input!="5");
}

async function createNote() {
    const newName=await askFilePath("Nome da nova anotação?")
    const newNote=await askFilePath("Qual o conteúdo da nova anotação?")
    const filePath = path.resolve(newName);
    fs.writeFileSync(filePath,newNote,"utf-8")
    
}
async function listNotes() {
    const files = fs.readdirSync('.');


    if (files.length === 0) {
        console.log("Nenhuma anotação salva.");
        return;
    }

    console.log("\nAnotações salvas:");
    files.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });
}

async function readNote() {
    const nameNote=await askFilePath("Nome da anotação para ver?")
    const readfilePath = path.resolve(nameNote);
    const content = fs.readFileSync(readfilePath,"utf-8")
    console.log(`${nameNote}
        ${content}`)

}
async function deleteNote() {
    try {
        const nameNote = await askFilePath("Nome da anotação para excluir? ");
        const filePath = path.resolve(nameNote);

        if (!fs.existsSync(filePath)) {
            console.log("Anotação não encontrada.");
            return;
        }

        fs.unlinkSync(filePath);
        names = names.filter((name) => name !== nameNote);

        console.log(`Anotação "${nameNote}" excluída com sucesso!`);
    } catch (error) {
        console.error("Erro ao excluir a anotação:", error.message);
    }
}
    

function wrongAnswer() {
    console.log("Opção invalida! Tente novamente!")
}

choice()