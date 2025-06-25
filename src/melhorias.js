// dentro do confronto, o jogador pode sortear aleatoriaente um casco(-1 ponto) ou uma bomba(-2 pontos)
// quem vence o confronto ganha 1 ponto
// poder selecionar o personagem que vc quiser

const player1 = {
    Nome: "Mario",
    Velocidade: 4,
    Manobrabilidade: 3,
    Poder: 3,
    Pontos: 0,
};

const player2 = {
    Nome: "Luigi",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 4,
    Pontos: 0,
};

const player3 = {
    Nome: "Bowser",
    Velocidade: 5,
    Manobrabilidade: 2,
    Poder: 5,
    Pontos: 0,
};

const player4 = {
    Nome: "Peach",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 2,
    Pontos: 0,
};

const player5 = {
    Nome: "Yoshi",
    Velocidade: 2,
    Manobrabilidade: 4,
    Poder: 3,
    Pontos: 0,
};

const player6 = {
    Nome: "Donkey Kong",
    Velocidade: 2,
    Manobrabilidade: 2,
    Poder: 5,
    Pontos: 0,
};

async function RollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

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
        default: 
            result = "Confronto"
    }

    return result
}


async function LogRollResult(characterName, block, DiceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${DiceResult} + ${attribute} = ${DiceResult + attribute} `);
}

async function PlayRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {

        console.log(`🏁 Rodada: ${round}`)

        let block = await GetRandomBlock()
        console.log(`Bloco: ${block}`)

        let DiceResult1 = await RollDice();
        let DiceResult2 = await RollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "Reta") {
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
            if (powerResult1 > powerResult2 && character2.Pontos > 0) {
                console.log(`${character1.Nome} Venceu o Confronto! ${character2.Nome} Perdeu 1 ponto!🍄`);
                character2.Pontos--;
            }
            if (powerResult1 < powerResult2 && character1.Pontos > 0) {
                character1.Pontos--;
                console.log(`${character2.Nome} Venceu o Confronto! ${character1.Nome} Perdeu 1 ponto!🍄`);
            }
            if (powerResult1 === powerResult2) {
                console.log("Confronto empatado! Nenhum ponto foi perdido!😮")
            }

        }



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


(async function Main() {
    console.log(`🏁🚨 Corrida entre ${player1.Nome} e ${player2.Nome} começando... \n`)

    await PlayRaceEngine(player1, player2);
    await declareWinner(player1, player2)
})();