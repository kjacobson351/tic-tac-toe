
//initialize board
const gameBoard = (() => {
    const board = {
        row1: ["", "", ""],
        row2: ["", "", ""],
        row3: ["", "", ""],
    }

    const resetBoard = () => {
        board.row1 = ["", "", ""];
        board.row2 = ["", "", ""];
        board.row3 = ["", "", ""];
    }


    /*const setMarker = (div) => {
        console.log(div)
        divId = div.id
        const row = divId.slice(3, 4)
        const column = divId.slice(11, 12) - 1;
        //let board = gameBoard.board; this line not needed?
        board["row" + row][column] = player1.marker;
        renderBoard()//doesn't need gamboard.renderBoard()?

    }*/
    //first destroys board then renders board with updated values
    const renderBoard = () => {
        let wrapper = document.querySelector(".wrapper");
        //Board Destruction
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.remove();
        });
        //The for loop iterates through the rows while the forEach method iterates through the row index
        for (let i = 1; i <= 3; i++) {
            let counter = 0;
            gameBoard.board["row" + i].forEach(element => {
                counter++;
                let div = document.createElement("div");
                div.setAttribute("id", `row${i}-column${counter}`);
                div.setAttribute("class", "cell");
                div.addEventListener("click", () => playerStuff.setMarker(div));
                wrapper.appendChild(div);
                div.innerHTML = gameBoard.board["row" + i][counter - 1]
            })
        }
    }
    return {
        board,
        resetBoard,
        /*setMarker,*/
        renderBoard,
    }
})();


//IIFE for player related objects and methods

const playerStuff = (() => {
    const playerFactory = (name, type, marker = null, turn = null, win = false) => {//set plyaer attributes that can be set initially with placeholders for those that need user input.
        return { name, type, marker, win };
    }

    const setupVsPlayer = () => {
        let player1 = playerFactory("player1", "human");
        let player2 = playerFactory("player2", "human");
        return { player1, player2 }
    }

    const setupVsComputer = () => {
        const player1 = playerFactory("player1", "human");
        const player2 = playerFactory("player2", "computer");
        return { player1, player2 }
    }

    const vsPlayer = () => {// sets attributes that required user input
        const players = playerStuff.setupVsPlayer();
        player1 = players.player1;
        player2 = players.player2;
        const gameMain = document.querySelector(".wrapper")
        const wrapper = document.querySelector(".selection-wrapper");
        const startScreen = document.querySelector(".start-screen")
        const pvp = document.getElementById("player-v-player")
        const pc = document.getElementById("player-v-computer")
        const xButton = document.getElementById("x-button");
        const oButton = document.getElementById("o-button");
        xButton.style.display = "block";
        oButton.style.display = "block";
        /*while (wrapper.firstChild) {//removes game select buttons that were in index.html
            wrapper.removeChild(wrapper.firstChild);
        }*/
        pvp.style.display = "none";
        pc.style.display = "none";
    }
    /* const xBtn = document.createElement("button");//creates marker choice buttons and sets markers to player dependig on choice
     xBtn.setAttribute("id", "x-button");
     xBtn.innerText = "X"
     xBtn.addEventListener("click", () => {
         player1.marker = `<i class="fa-solid fa-x"></i>`;
         player1.turn = true;
         player2.marker = `<i class="fa-solid fa-o"></i>`;
         player2.turn = false;
         startScreen.style.display = "none";//to switch from setup screen to game screen
         gameMain.style.display = "grid";
         gameBoard.renderBoard()
     })
     const oBtn = document.createElement("button");
     oBtn.setAttribute("id", "o-button");
     oBtn.innerText = "O"
     oBtn.addEventListener("click", () => {
         player1.marker = `<i class="fa-solid fa-o"></i>`;
         player1.turn = false
         player2.marker = `<i class="fa-solid fa-x"></i>`;
         player2.turn = true;
         startScreen.style.display = "none";
         gameMain.style.display = "grid";
         gameBoard.renderBoard()
     })
     wrapper.appendChild(xBtn);
     wrapper.appendChild(oBtn);
 }*/

    const vsComputer = () => {
        console.log("vs computer ran")
        const players = playerStuff.setupVsComputer();
        player1 = players.player1
        player2 = players.player2
        const gameMain = document.querySelector(".wrapper")
        const wrapper = document.querySelector(".selection-wrapper");
        const startScreen = document.querySelector(".start-screen")
        const pvp = document.getElementById("player-v-player")
        const pc = document.getElementById("player-v-computer")
        const xButton = document.getElementById("x-button");
        const oButton = document.getElementById("o-button");
        xButton.style.display = "block";
        oButton.style.display = "block";
        /*while (wrapper.firstChild) {//removes game select buttons
            wrapper.removeChild(wrapper.firstChild);
        }*/

        pvp.style.display = "none";
        pc.style.display = "none";
    }
    /*const xBtn = document.createElement("button");
    xBtn.setAttribute("id", "x-button");
    xBtn.innerText = "X"
    xBtn.addEventListener("click", () => {
        player1.marker = `<i class="fa-solid fa-x"></i>`;
        player1.turn = true;
        player2.marker = `<i class="fa-solid fa-o"></i>`;
        player2.turn = false
        startScreen.style.display = "none";
        gameMain.style.display = "grid";
        gameBoard.renderBoard()
    })
    const oBtn = document.createElement("button");
    oBtn.setAttribute("id", "o-button");
    oBtn.innerText = "O"
    oBtn.addEventListener("click", () => {
        console.log("O ran")
        player1.marker = `<i class="fa-solid fa-o"></i>`;
        player1.turn = false;
        player2.marker = `<i class="fa-solid fa-x"></i>`;
        player2.turn = true;
        //player2.type = "computer"
        console.log(player2.type)
        startScreen.style.display = "none";
        gameMain.style.display = "grid";
        gameBoard.renderBoard()
        findOpenMoves()
        computerMove()
        toggleTurns()
    })
    wrapper.appendChild(xBtn);
    wrapper.appendChild(oBtn);
}*/

    //allows only human players to set their marker if it is thier turn.
    const setMarker = (div) => {

        if ((player1.turn == true && player1.type == "human" && player1.win == false) || (player2.turn == true && player2.type == "human" && player2.win == false)) {
            divId = div.id
            const row = divId.slice(3, 4)//gets the row and index from slicing the cell ID
            const column = divId.slice(11, 12) - 1;
            let board = gameBoard.board;
            if (player1.turn === true && board["row" + row][column] === "") {
                board["row" + row][column] = player1.marker;
                gameBoard.renderBoard()
                winCheck()
                toggleTurns()

            } else if (player2.turn === true && board["row" + row][column] === "") {
                board["row" + row][column] = player2.marker;
                gameBoard.renderBoard()
                winCheck()
                toggleTurns()
            }


            if (player2.type === "computer" && player2.turn === true && player2.win == false) {
                findOpenMoves()
                computerMove()
                winCheck()
                toggleTurns();

            }
        }

    }
    //changes players turn with each round played
    const toggleTurns = () => {
        if (player1.turn == true) {
            player1.turn = false;
            player2.turn = true;
        } else {
            player1.turn = true;
            player2.turn = false;
        }
    }

    const openMoves = () => {
        const boardMoves = {
            row1: ["", "", ""],
            row2: ["", "", ""],
            row3: ["", "", ""],
        }
    }

    const findOpenMoves = () => {
        const board = gameBoard.board;
        const openMoves = [];
        const target = "";
        for (let i = 1; i <= 3; i++) {//this for loop iterates the rows
            let array = board["row" + i];
            for (let j = 0; j < 3; j++) {//this for loop iterates the index of each row
                if (array[j] === target) {
                    openMoves.push({ row: i, index: j });
                }
            }
        }
        boardMoves = openMoves;
    }
    const computerMove = () => {
        board = gameBoard.board;
        randomnum = Math.floor(Math.random() * boardMoves.length);
        board['row' + boardMoves[randomnum].row][boardMoves[randomnum].index] = player2.marker
        findOpenMoves()
        gameBoard.renderBoard()




    }



    return {
        playerFactory,
        setupVsPlayer,
        setupVsComputer,
        vsPlayer,
        vsComputer,
        setMarker,
        toggleTurns,
        openMoves,
        findOpenMoves,
        computerMove,
    };
})();


function winCheck() {
  
    let boardArray = [];
    const board = gameBoard.board;
    const winMessage = document.querySelector(".win-message");
    const game = document.querySelector(".wrapper")
    //check all row win conditionts for both player 1 and 2
    for (let i = 1; i <= 3; i++) {
        if (board["row" + i][0] === board["row" + i][1] && board["row" + i][2] === board["row" + i][0] && board["row" + i][0] != "") {
            if (player1.turn === true) {
                player1Win();
                

            } else {
                player2Win();
                

            }
        }
    }
    //check all column win conditions
    for (let i = 0; i <= 2; i++) {
        if (board.row1[i] === board.row2[i] && board.row3[i] ===
            board.row1[i] && board.row1[i] != "") {
            if (player1.turn === true) {
                player1Win();
                

            } else {
                player2Win();
                

            }
        }
    }
    //check diagonal win conditions
    if (board.row1[0] === board.row2[1] && board.row3[2] === board.row1[0] && board.row1[0] != "") {
        if (player1.turn === true) {
            player1Win();
            

        } else {
            player2Win();
            

        }
    }
    if (board.row3[0] === board.row2[1] && board.row1[2] === board.row3[0] && board.row3[0] != "") {
        if (player1.turn === true) {
            player1Win();
            

        } else {
            player2Win();
            

        }
    }
    
    for (i=0; i <= 2; i++){
        boardArray.push(board.row1[i]);
        boardArray.push(board.row2[i]);
        boardArray.push(board.row3[i]);
        if (!boardArray.includes("") && boardArray.length == 9){
            draw();
        }
    }

}

function draw() {
    const winMessage = document.querySelector(".win-message");
    const game = document.querySelector(".wrapper")
    const buttons = document.querySelector(".reset-buttons")

    winMessage.innerHTML = `It's a draw`
    winMessage.style.display = "block";
    buttons.style.display = "flex"
    game.style.webkitFilter = "blur(3px)"
    player1.win = true; 
}

function player1Win() {
    player1.turn = false;
    player2.turn = false;
    const winMessage = document.querySelector(".win-message");
    const game = document.querySelector(".wrapper")
    const buttons = document.querySelector(".reset-buttons")

    winMessage.innerHTML = `${player1.marker} WINS!`
    winMessage.style.display = "block";
    buttons.style.display = "flex"
    game.style.webkitFilter = "blur(3px)"
    player1.win = true;





}

function player2Win() {
    player1.turn = false;
    player2.turn = false;
    const winMessage = document.querySelector(".win-message");
    const game = document.querySelector(".wrapper")
    const buttons = document.querySelector(".reset-buttons")
    winMessage.innerHTML = `${player2.marker} WINS!`
    winMessage.style.display = "block";
    buttons.style.display = "flex"
    game.style.webkitFilter = "blur(3px)"
    player2.win = true





}


function playAgain() {
    const winMessage = document.querySelector(".win-message");
    const game = document.querySelector(".wrapper")
    const buttons = document.querySelector(".reset-buttons")
    winMessage.style.display = "none";
    game.style.webkitFilter = "";
    buttons.style.display = "none"
    gameBoard.resetBoard();
    gameBoard.renderBoard();
    player1.win = false
    player2.win = false

}

function restart() {
    const winMessage = document.querySelector(".win-message");
    const game = document.querySelector(".wrapper")
    const buttons = document.querySelector(".reset-buttons")
    const startScreen = document.querySelector(".start-screen")
    const select = document.querySelector("selection-wrapper");
    const xButton = document.getElementById("x-button");
    const oButton = document.getElementById("o-button");
    gameBoard.resetBoard();
    gameBoard.renderBoard();
    game.style.webkitFilter = "";
    startScreen.style.display = "flex"
    winMessage.style.display = "none";
    buttons.style.display = "none";
    game.style.display = "none";
    player1.win = false
    player2.win = false
    const pvp = document.getElementById("player-v-player")
    const pc = document.getElementById("player-v-computer")
    pvp.style.display = "";
    pc.style.display = "";
    xButton.style.display = "none"
    oButton.style.display = "none"
}

function xButton() {
    const startScreen = document.querySelector(".start-screen")
    const gameMain = document.querySelector(".wrapper")
    player1.marker = `<i class="fa-solid fa-x"></i>`;
    player1.turn = true;
    player2.marker = `<i class="fa-solid fa-o"></i>`;
    player2.turn = false;
    startScreen.style.display = "none";//to switch from setup screen to game screen
    gameMain.style.display = "grid";
    gameBoard.renderBoard()
}

function oButton() {
    const startScreen = document.querySelector(".start-screen")
    const gameMain = document.querySelector(".wrapper")
    player1.marker = `<i class="fa-solid fa-o"></i>`;
    player1.turn = false
    player2.marker = `<i class="fa-solid fa-x"></i>`;
    player2.turn = true;
    startScreen.style.display = "none";
    gameMain.style.display = "grid";
    gameBoard.renderBoard()
    if (player2.type === "computer"){
    playerStuff.findOpenMoves()
    playerStuff.computerMove()
    playerStuff.toggleTurns()
    }
}