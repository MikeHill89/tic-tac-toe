//declare dom elements
const boardGridItems = document.querySelectorAll(".grid-item");
const statusDisplay = document.querySelector(".status-display");
statusDisplay.innerText = "Game not started";
const gameMenu = document.querySelector(".game-menu");

//gamecode
const gameBoard = [
	[0,1,2],
	[3,4,5],
	[6,7,8]
];

let moveCounter = 0;

function checkForDraw(){
	if (moveCounter === 9){
		return console.log("it's a draw");
	}
}

function announceWinner(winner){
	statusDisplay.innerText = winner + " wins!";
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
//setup players
const player1 = GameCreatePlayer("Maikel","X");
const player2 = GameCreatePlayer("Jim","O");
let currentPlayer = player1;

//not used at the moment.
function switchPlayers(){
	if (currentPlayer === player1){
		currentPlayer = player2;
	} else{
		currentPlayer = player1
	};
	statusDisplay.innerText = currentPlayer.name + "'s turn.";
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


