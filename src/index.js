/* eslint-disable linebreak-style */
const missedShots = [];
const guesses = [];
let turn = 0;
function Ship(coords) {
  this.hits = [];
  this.positions = coords.map((coord) => ({
    coord,
    isHit: false,
  }));
  this.hit = function (val) {
    const index = getIndex(val, this.positions);
    this.positions[index].isHit = true;
    this.hits.push(val);
    return this.isSunk();
  };
  this.isSunk = function () {
    // return this.hits.every((val) => this.positions.includes(val));
    return this.positions.every(({ isHit }) => isHit);
  };
}
function getIndex(val, array) {
  const pos = array.find(
    ({ coord }) => coord[0] === val[0] && coord[1] === val[1]
  );
  const index = array.indexOf(pos);
  return index;
}
// module.exports = Ship;.
const defender = new Ship([
  [0, "A"],
  [2, "C"],
  [1, "B"],
  [3, "A"],
  [2, "A"],
]);

const GameBoard = (ship) => {
  this.receiveAttack = (val) => {
    const index = getIndex(val, ship.positions);
    if (index === -1) {
      console.log("Ooops coordinates not found");
      return false;
    } else if (ship.positions[index].isHit === true) {
      missedShots.push(val);
      console.log("Missed it mate !!!!");
      return false;
    } else {
      ship.hit(val);
      console.log("Bullseye!");
      return ship.isSunk();
    }
  };
  return {
    receiveAttack,
  };
};

function Player(positions,name) {
  this.name = name;
  this.ship = new Ship(positions);
  this.positions = positions;
  this.takeTurn = (enemy, coordinates) => {
    return GameBoard(enemy.ship).receiveAttack(coordinates);
  };
}
function comGuesses(player) {
  const index = Math.floor(Math.random() * player.ship.positions.length);
  if (guesses.indexOf(index) > -1) {
    return;
  } else {
    let coord = player.ship.positions[index].coord;
    guesses.push(coord);
    comAttack(coord); //Added this line
    return coord;
  }
}
function comAttack(coords) { // added this for dom manipulation
  const player1Board = Array.from(document.querySelectorAll("#player1 .area"));
  return (player1Board.find(
    (c) =>
      JSON.parse(c.id)[0] === coords[0] && JSON.parse(c.id)[1] === coords[1]
  ).style.background = "red");
}
// const gameloop = (coords) => {
//   const player1 = new Player([
//     [0, 0],
//     [2, 2],
//     [1, 1],
//     [3, 3],
//     [2, 1],
//   ]);
//   const player2 = new Player([
//     [0, 2],
//     [2, 1],
//     [1, 3],
//     [3, 0],
//     [2, 0],
//   ]);
//   let turn = 0;
//   let winner;
//   while (true) {
//     const p1turn = turn % 2 === 0;
//     let attacker;
//     let defender;
//     let coordinates;
//     if (p1turn) {
//       coordinates = coords; // changed this from getcoordinates()
//       attacker = player1;
//       defender = player2;
//     } else {
//       coordinates = comGuesses(player1);
//       attacker = player2;
//       defender = player1;
//     }
//     const isSunk = attacker.takeTurn(defender, coordinates);
//     if (isSunk) {
//       winner = attacker;
//       break;
//     }
//     turn++;
//   }
//   console.log(winner);
// };
// function getCoordinates() {
//   const str = prompt("Enter coords");
//   const arr = str.split(",");
//   return [+arr[0], arr[1]];
// }

const player1 = new Player([
  [0, 0],
  [2, 2],
  [1, 1],
  [2, 3],
  [2, 1],
],"player1");
const player2 = new Player([
  [0, 2],
  [2, 1],
  [1, 3],
  [1, 0],
  [2, 0],
],'player2');
function attack(e) {
  let coords = JSON.parse(e.id);
  let attacker = player1;
  let defender = player2;
  e.style.background = "red";
  handleGame(attacker,defender,coords)
  turn++;
}
function checkWinner(arr){
  return arr.find((player) => player.ship.isSunk() === false);
}
function handleGame(p1,p2,coords){
  let winner;
  let attacker = p1;
  let defender = p2;
 let isSunk =  attacker.takeTurn(defender,coords);
  if(!isSunk){
    defender.takeTurn(attacker,comGuesses(attacker))
  }else{
    let arr = [attacker,defender];
    winner = checkWinner(arr);
    setTimeout(()=> {alert(winner.name + 'wins !!!!!');} ,100)
  }
}

