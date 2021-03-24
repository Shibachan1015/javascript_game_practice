const damageRange = 0.3;

const playerData = {
  name: "プレイヤー",
  hp: 100,
  attack: 5,
  deffence: 2,
};

const enemiesData = [
  {
    name: "スライム",
    hp: 50,
    attack: 3,
    deffence: 1,
  },
  {
    name: "フェアリー",
    hp: 60,
    attack: 4,
    deffence: 2,
  },
  {
    name: "ガーゴイル",
    hp: 100,
    attack: 5,
    deffence: 2,
  }
];

const enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];

playerData["maxHp"] = playerData["hp"];
enemyData["maxHp"] = enemyData["hp"];

function insertText(id, text) {
  document.getElementById(id).textContent = text;
}

function damageCalculation(attack, deffence) {
  const maxDamage = attack * (1 + damageRange);
  minDamage = attack * (1 - damageRange);
  attackDamage = Math.floor(
    Math.random() * (maxDamage - minDamage) + minDamage
  );

  const damage = attackDamage - deffence;

  if (damage < 1) {
    return 0;
  } else {
    return damage;
  }
}

insertText("playerName", playerData["name"]);
insertText("currentPlayerHp", playerData["hp"]);
insertText("maxPlayerHp", playerData["hp"]);

insertText("enemyName", enemyData["name"]);
insertText("currentEnemyHp", enemyData["hp"]);
insertText("maxEnemyHp", enemyData["hp"]);

document.getElementById("attack").addEventListener("click", function () {
  let endGame = false;

  const playerDamage = damageCalculation(
      playerData["attack"],
      enemyData["deffence"]
    ),
    enemyDamage = damageCalculation(
      enemyData["attack"],
      playerData["deffence"]
    );

  enemyData["hp"] -= playerDamage;
  playerData["hp"] -= enemyDamage;

  insertText("currentEnemyHp", enemyData["hp"]);
  insertText("currentPlayerHp", playerData["hp"]);

  console.log((enemyData["hp"] / enemyData["maxHp"]) * 100 + "%");
  document.getElementById("currentEnemyHpGaugeValue").style.width =
    (enemyData["hp"] / enemyData["maxHp"]) * 100 + "%";
  document.getElementById("currentPlayerHpGaugeValue").style.width =
    (playerData["hp"] / playerData["maxHp"]) * 100 + "%";

  if (enemyData["hp"] <= 0) {
    alert("勝利");
    endGame = true;

    enemyData["hp"] = 0;
    insertText("currentEnemyHp", enemyData["hp"]);
    document.getElementById("currentEnemyHpGaugeValue").style.width = "0%";
  } else if (playerData["hp"] <= 0) {
    alert("敗北");
    endGame = true;

    playerData["hp"] = 0;
    insertText("currentPlayerHp", playerData["hp"]);
    document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";
  }

  if (endGame) {
    this.classList.add("deactive");
  }
});
