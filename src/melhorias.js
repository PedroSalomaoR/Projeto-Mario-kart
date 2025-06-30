const person1 = {
    Nome: "Mario",
    Velocidade: 4,
    Manobrabilidade: 3,
    Poder: 3,
    Pontos: 0
};

const person2 = {
    Nome: "Luigi",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 4,
    Pontos: 0
};

const person3 = {
    Nome: "Bowser",
    Velocidade: 5,
    Manobrabilidade: 2,
    Poder: 5,
    Pontos: 0
};

const person4 = {
    Nome: "Peach",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 2,
    Pontos: 0
};

const person5 = {
    Nome: "Yoshi",
    Velocidade: 2,
    Manobrabilidade: 4,
    Poder: 3,
    Pontos: 0
};

const person6 = {
    Nome: "Donkey Kong",
    Velocidade: 2,
    Manobrabilidade: 2,
    Poder: 5,
    Pontos: 0
};

const mapa = {
  '1': person1,
  '2': person2,
  '3': person3,
  '4': person4,
  '5': person5,
  '6': person6
};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function selectPerson() {
  return new Promise((resolve) => {
    console.log("Bem-Vindo(a) ao Mario Kart!🍄🐢 \n");
    console.log(`[1] ${person1.Nome}`);
    console.log(`[2] ${person2.Nome}`);
    console.log(`[3] ${person3.Nome}`);
    console.log(`[4] ${person4.Nome}`);
    console.log(`[5] ${person5.Nome}`);
    console.log(`[6] ${person6.Nome}`);

    rl.question('Selecione o Primeiro Corredor (1 a 6): ', (P1) => {
      rl.question('Selecione o Segundo Corredor (1 a 6): ', (P2) => {
        const player1 = mapa[P1];
        const player2 = mapa[P2];

        if (!player1 || !player2) {
          console.log("❌ Número inválido. Encerrando.");
          rl.close();
          process.exit();
        } else if (player1 === player2) {
          console.log("❌ Os jogadores devem ser diferentes.");
          rl.close();
          process.exit();
        }

        rl.close();
        resolve({ player1, player2 });
      });
    });
  });
}

async function RollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function GetRandomBlock() {
  let random = Math.random();

  if (random < 0.33) return "Reta";
  else if (random < 0.66) return "Curva";
  else return "Confronto";
}

async function LogRollResult(characterName, block, DiceResult, attribute) {
  console.log(`${characterName} 🎲 rolou um dado de ${block} ${DiceResult} + ${attribute} = ${DiceResult + attribute}`);
}

async function PlayRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada: ${round}`);

    let block = await GetRandomBlock();
    console.log(`Bloco: ${block}`);

    let DiceResult1 = await RollDice();
    let DiceResult2 = await RollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "Reta") {
      totalTestSkill1 = DiceResult1 + character1.Velocidade;
      totalTestSkill2 = DiceResult2 + character2.Velocidade;

      await LogRollResult(character1.Nome, "Velocidade", DiceResult1, character1.Velocidade);
      await LogRollResult(character2.Nome, "Velocidade", DiceResult2, character2.Velocidade);
    }

    if (block === "Curva") {
      totalTestSkill1 = DiceResult1 + character1.Manobrabilidade;
      totalTestSkill2 = DiceResult2 + character2.Manobrabilidade;

      await LogRollResult(character1.Nome, "Manobrabilidade", DiceResult1, character1.Manobrabilidade);
      await LogRollResult(character2.Nome, "Manobrabilidade", DiceResult2, character2.Manobrabilidade);
    }

    if (block === "Confronto") {
      let powerResult1 = DiceResult1 + character1.Poder;
      let powerResult2 = DiceResult2 + character2.Poder;

      console.log(`${character1.Nome} Confrontou ${character2.Nome}! 🥊`);

      await LogRollResult(character1.Nome, "Poder", DiceResult1, character1.Poder);
      await LogRollResult(character2.Nome, "Poder", DiceResult2, character2.Poder);

      let sorteioItem = Math.random();

      if (powerResult1 > powerResult2) {
        if (sorteioItem >= 0.5) {
          console.log(`${character1.Nome} Venceu o Confronto! Jogou um casco no ${character2.Nome} 🐢`);
          if (character2.Pontos > 0) character2.Pontos--;
        } else {
          console.log(`${character1.Nome} Venceu o Confronto! Jogou uma bomba no ${character2.Nome} 💣`);
          if (character2.Pontos > 1) character2.Pontos -= 2;
          else if (character2.Pontos === 1) character2.Pontos--;
        }
      } else if (powerResult1 < powerResult2) {
        if (sorteioItem >= 0.5) {
          console.log(`${character2.Nome} Venceu o Confronto! Jogou um casco no ${character1.Nome} 🐢`);
          if (character1.Pontos > 0) character1.Pontos--;
        } else {
          console.log(`${character2.Nome} Venceu o Confronto! Jogou uma bomba no ${character1.Nome} 💣`);
          if (character1.Pontos > 1) character1.Pontos -= 2;
          else if (character1.Pontos === 1) character1.Pontos--;
        }
      } else {
        console.log("Confronto empatado! Nenhum ponto foi perdido! 😮");
      }
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.Nome} marcou 1 ponto!`);
      character1.Pontos++;
    } else if (totalTestSkill1 < totalTestSkill2) {
      console.log(`${character2.Nome} marcou 1 ponto!`);
      character2.Pontos++;
    }

    console.log("-----------------------------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("\n🏁 Resultado Final:");
  console.log(`${character1.Nome}: ${character1.Pontos} ${character1.Pontos === 1 ? 'Ponto' : 'Pontos'}`);
  console.log(`${character2.Nome}: ${character2.Pontos} ${character2.Pontos === 1 ? 'Ponto' : 'Pontos'}`);

  if (character1.Pontos > character2.Pontos) {
    console.log(`\n${character1.Nome} venceu a corrida! Parabéns! 🏆`);
  } else if (character1.Pontos < character2.Pontos) {
    console.log(`\n${character2.Nome} venceu a corrida! Parabéns! 🏆`);
  } else {
    console.log("\nA corrida terminou empatada! 🟰");
  }

  setTimeout(() => process.exit(), 200);
}

(async function Main() {
  const { player1, player2 } = await selectPerson();
  console.log(`\n🍄 Corrida entre ${player1.Nome} e ${player2.Nome} iniciando! 🏁\n`);
  await PlayRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
