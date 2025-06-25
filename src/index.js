//criando personagens
//declarando objetos
const player1 = {
    Nome: "Mario",
    Velocidade: 4,
    Manobrabilidade: 3,
    Poder: 3,
    //precisa colocar pontos:0 para mostrar que mario inicia com 0 pontos
    Pontos: 0,
};

const player2 = {
    Nome: "Luigi",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 4,
    //precisa colocar pontos:0 para mostrar que mario inicia com 0 pontos
    Pontos: 0,
};

const player3 = {
    Nome: "Bowser",
    Velocidade: 5,
    Manobrabilidade: 2,
    Poder: 5,
    //precisa colocar pontos:0 para mostrar que mario inicia com 0 pontos
    Pontos: 0,
};

const player4 = {
    Nome: "Peach",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 2,
    //precisa colocar pontos:0 para mostrar que mario inicia com 0 pontos
    Pontos: 0,
};

const player5 = {
    Nome: "Yoshi",
    Velocidade: 2,
    Manobrabilidade: 4,
    Poder: 3,
    //precisa colocar pontos:0 para mostrar que mario inicia com 0 pontos
    Pontos: 0,
};

const player6 = {
    Nome: "Donkey Kong",
    Velocidade: 2,
    Manobrabilidade: 2,
    Poder: 5,
    //precisa colocar pontos:0 para mostrar que mario inicia com 0 pontos
    Pontos: 0,
};

//para pegar apenas um dado do jogador, está é a estrutura: console.log(player1['Nome'], '|' ,player2['Nome'],'|',player3['Nome'], '|' ,player4['Nome'], '|' ,player5['Nome'], '|' ,player6['Nome']);

//criando a lógica de rolar dados em inglês = roll dice
//math.random = número aleatório
//math.flor arredonda este número para baixo, por isso que temos que somar com o 1, para que o intervalo fique entre 1-6 e não 0-5
//multiplicar por 6 Faz com que o número fique entre 0 e quase 6 (ex: 5.999)
//para que umda função ter que esperar uma coisa terminar para depois acontecer a outra, precisamo colocar a função async que faz com que está função não seja sincronizada 
async function RollDice() {
    return Math.floor(Math.random() * 6) + 1;
}
//para ver como funciona: console.log(Math.floor(Math.random() * 6) + 1)

//criando função para pegar blocos aleatórios
async function GetRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "Reta"
            break;
        case random <= 0.66:
            result = "Curva"
            break;
        default: //é um caso contrario
            result = "Confronto"
    }

    return result
}

//para o código não ficar repetitivo usamos está função para exibir mensagens
async function LogRollResult(characterName, block, DiceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${DiceResult} + ${attribute} = ${DiceResult + attribute} `);
}

//criando função de começar corrida
async function PlayRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        //estrutura deste for: começa no round 1, vai até o round 5, e a cada repetição é somado 1 ao valor do round, por isso round++
        console.log(`🏁 Rodada: ${round}`)

        //sortear bloco
        let block = await GetRandomBlock()
        console.log(`Bloco: ${block}`)


        //rolar os dados
        let DiceResult1 = await RollDice();
        let DiceResult2 = await RollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        //utilizamos 3 sinais de = para comparar strings
        if (block === "Reta") {
            //como na reta, o componente velocidade é o mais importante, vai ser ele quem vamos somar ao  valordado
            totalTestSkill1 = DiceResult1 + character1.Velocidade
            totalTestSkill2 = DiceResult2 + character2.Velocidade

            await LogRollResult(
                character1.Nome,
                "Velocidade",
                DiceResult1,
                character1.Velocidade)

            await LogRollResult(
                character2.Nome,
                "Velocidade",
                DiceResult2,
                character2.Velocidade)

        }

        if (block === "Curva") {
            //resultado do dado + manobrabilidade
            totalTestSkill1 = DiceResult1 + character1.Manobrabilidade
            totalTestSkill2 = DiceResult2 + character2.Manobrabilidade

            await LogRollResult(
                character1.Nome,
                "Manobrabilidade",
                DiceResult1,
                character1.Manobrabilidade)

            await LogRollResult(
                character2.Nome,
                "Manobrabilidade",
                DiceResult2,
                character2.Manobrabilidade)
        }

        if (block === "Confronto") {
            let powerResult1 = DiceResult1 + character1.Poder
            let powerResult2 = DiceResult2 + character2.Poder

            console.log(`${character1.Nome} Confrontou ${character2.Nome}! 🥊`);

            await LogRollResult(
                character1.Nome,
                "Poder",
                DiceResult1,
                character1.Poder)

            await LogRollResult(
                character2.Nome,
                "Poder",
                DiceResult2,
                character2.Poder)
            //if ternario : character2.Pontos -=
            //  powerResult1 > powerResult2 && character2.Pontos > 0 ? 1 : 0;
            //mesma coisa que : 
            if (powerResult1 > powerResult2 && character2.Pontos > 0) {
                console.log(`${character1.Nome} Venceu o Confronto! ${character2.Nome} Perdeu 1 ponto!🍄`);
                character2.Pontos--;
                //faz o jogador 2 perder 1 ponto se ele tiver
            }
            if (powerResult1 < powerResult2 && character1.Pontos > 0) {
                character1.Pontos--;
                console.log(`${character2.Nome} Venceu o Confronto! ${character1.Nome} Perdeu 1 ponto!🍄`);
            }
            //character2.Pontos -= faz o character 2 perder 1 ponto e armazenar os pontos que ele te agr
            //character1.Pontos -=
            //  powerResult1 < powerResult2 && character1.Pontos > 0 ? 1 : 0
            //somente se oq estiver entre () for verdade ele executará oq vier na sequencia do ?
            //console.log(powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto foi perdido!😮" : "");
            if (powerResult1 === powerResult2) {
                console.log("Confronto empatado! Nenhum ponto foi perdido!😮")
            }

        }


        //teste de vencedores
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.Nome} Marcou um ponto!`);
            character1.Pontos++;
        } else if (totalTestSkill1 < totalTestSkill2) {
            console.log(`${character2.Nome} Marcou um ponto!`);
            character2.Pontos++;
        }
        console.log('-----------------------------------------------')
    }
}

async function declareWinner(character1, character2) {
    console.log("🏁 Resultado Final: ")
    console.log(`${character1.Nome} : ${character1.Pontos} Ponto(s)`);
    console.log(`${character2.Nome} : ${character2.Pontos} Ponto(s)`);
    if (character1.Pontos > character2.Pontos) {
        console.log(`\n${character1.Nome} Venceu a corrida! Parabéns! 🏆`)
    }else if (character1.Pontos < character2.Pontos) {
        console.log(`\n${character2.Nome} Venceu a corrida! Parabéns! 🏆`)
    } else {
        console.log("A corrida terminou empatada! ")
    }
}

//criando a função principal
(async function Main() {
    console.log(`🏁🚨 Corrida entre ${player1.Nome} e ${player2.Nome} começando... \n`)

    await PlayRaceEngine(player1, player2);
    await declareWinner(player1, player2)
})();
// (async function Main() { ... })();
// ⇨ Isso é uma função assíncrona **auto-invocável** (também chamada de IIFE - Immediately Invoked Function Expression).
// ⇨ Ela é executada automaticamente assim que o script é lido.
// async
// ⇨ Permite que a função use "await" para esperar uma Promise ser resolvida antes de continuar.
// await PlayRaceEngine(player1, player2)
// ⇨ Faz com que a função Main espere a execução completa de PlayRaceEngine antes de continuar.
// ⇨ Importante em situações assíncronas, como tempo de espera, animações ou chamadas a APIs.
// Template Strings:
// `🏁🚨 Corrida entre ${player1.Nome} e ${player2.Nome} começando... \n`
// ⇨ As crases (``) permitem o uso de interpolação de variáveis com `${}`.
// ⇨ `\n` é uma **quebra de linha** no terminal.
// NomeFuncao();
// ⇨ Sintaxe usada para chamar (executar) uma função no JavaScript.
// Exemplo de auto-invocação simples:
// (async function main() { console.log("Hello, World!"); })();
// ⇨ Essa função roda automaticamente sem precisar ser chamada manualmente depois