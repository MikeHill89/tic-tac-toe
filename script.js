//declare dom elements
const boardGridItems = document.querySelectorAll(".grid-item");
const turnDisplay = document.querySelector(".turn-display");
const gameBoardGrid = document.querySelector(".game-board");
const gameStartMenu = document.querySelector(".startpanel");
const gameStartBtn = document.getElementById("startgame");
const rematchBtn = document.getElementById("rematchgame");
const player1InputEl = document.getElementById("player1");
const player2InputEl = document.getElementById("player2");
const showWinner = document.querySelector(".announce-winner");
const resetRematchMenu = document.querySelector(".rematch-restart");
let player1;
let player2;
let currentPlayer;
//gamecode
let gameBoard = [
	[0,1,2],
	[3,4,5],
	[6,7,8]
];

let moveCounter = 0;

function startGame(){
    //create players from input
    const player1Name = player1InputEl.value; 
    const player2Name = player2InputEl.value; 
    player1 = GameCreatePlayer(player1Name,"X");
    player2= GameCreatePlayer(player2Name,"O");
    //hide and show elements
    turnDisplay.classList.remove("hidden");
    gameBoardGrid.classList.remove("hidden");
    gameStartBtn.classList.add("hidden")
    gameStartMenu.classList.add("hidden");
    currentPlayer = player1;
    turnDisplay.innerText = `It's ${currentPlayer.name} turn!`;
}
function clearGameBoard(){
  boardGridItems.forEach(item => {
    item.innerText = "";
    gameBoard = [
	[0,1,2],
	[3,4,5],
	[6,7,8]
];;
 });    
}

function startRematch(){
    turnDisplay.classList.remove("hidden");
    gameBoardGrid.classList.remove("hidden");
    gameStartBtn.classList.add("hidden")
    gameStartMenu.classList.add("hidden");
    resetRematchMenu.classList.add("hidden");
    showWinner.innerText = "";
    clearGameBoard();
}

gameStartBtn.addEventListener("click",startGame);
rematchBtn.addEventListener("click",startRematch);

function checkForDraw(){
	if (moveCounter === 9){
		return console.log("it's a draw");
	}
}
function announceWinner(winner){
    resetRematchMenu.classList.remove("hidden");
    showWinner.innerText = `${winner} has won the game!`;
    turnDisplay.classList.add("hidden");
}

function checkForWin() {
	for (let i = 0; i < gameBoard.length; i++) {
		if (
			gameBoard[i][0] === gameBoard[i][1] &&
			gameBoard[i][1] === gameBoard[i][2]
		) {
			console.log("Row win");
			announceWinner(currentPlayer.name);
			return true; // Row win
		}
		if (
			gameBoard[0][i] === gameBoard[1][i] &&
			gameBoard[1][i] === gameBoard[2][i]
		) {
			announceWinner(currentPlayer.name);
			console.log("Column win");
			return true; // Column win
		}
	}

	if (
		(gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) ||
		(gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0])
	) {
		announceWinner(currentPlayer.name);
		console.log("Diagonal win");
		return true; // Diagonal win
	}
	checkForDraw();
	switchPlayers();
	return false;
}

function updateGameBoard(item){
	//convert the data cell to an integer and subtract 1 to match array counting from 0
	item = parseInt(item) - 1;
	//iterate over the array of arrays called gameBoard, check for match and update value at index position.
	for( i = 0; i < gameBoard.length; i++){
		for (let j = 0; j < gameBoard.length; j++){
			if (item === gameBoard[i][j]){
				gameBoard[i][j] = currentPlayer.symbol;
			}
		}
	}
	moveCounter++;
	console.log("Array index matching " + item + " has been updated");
}

//factory function to create players
function GameCreatePlayer(name, symbol){
	return{
		name: name,
		symbol: symbol,
	}
}

//not used at the moment.
function switchPlayers(){
	if (currentPlayer === player1){
		currentPlayer = player2;
	} else{
		currentPlayer = player1
	};
    turnDisplay.innerText = `It's ${currentPlayer.name} turn!`;
}

function placePlayerSymbol(item){;
	item.innerText = currentPlayer.symbol
	console.log(currentPlayer.name + " " + "placed a " + currentPlayer.symbol);
}

boardGridItems.forEach( item => {
	item.addEventListener("click", () => {
		const clickedItem = item.getAttribute("data-cell");
		const itemContent = item.innerText;
		//check cell availability
		if (itemContent !== ""){
			console.log("cell is already filled out");
			return;
		} else {
			placePlayerSymbol(item);
			updateGameBoard(clickedItem);
			checkForWin();
		}
		
	})
});

    
