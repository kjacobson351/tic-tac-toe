
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
        for (let i = 1; i < 4; i++) {
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
    const playerFactory = (name, type, marker = null, turn = null) => {//set plyaer attributes that can be set initially with placeholders for those that need user input.
        return { name, type, marker };
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
        while (wrapper.firstChild) {//removes game select buttons that were in index.html
            wrapper.removeChild(wrapper.firstChild);
        }
        const xBtn = document.createElement("button");//creates marker choice buttons and sets markers to player dependig on choice
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
    }

    const vsComputer = () => {
        const players = playerStuff.setupVsComputer();
        player1 = players.player1
        player2 = players.player2
        const gameMain = document.querySelector(".wrapper")
        const wrapper = document.querySelector(".selection-wrapper");
        const startScreen = document.querySelector(".start-screen")
        while (wrapper.firstChild) {//removes game select buttons
            wrapper.removeChild(wrapper.firstChild);
        }
        const xBtn = document.createElement("button");
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
            player1.marker = `<i class="fa-solid fa-o"></i>`;
            player1.marker = false;
            player2.marker = `<i class="fa-solid fa-x"></i>`;
            player2.turn = true;
            startScreen.style.display = "none";
            gameMain.style.display = "grid";
            gameBoard.renderBoard()
        })
        wrapper.appendChild(xBtn);
        wrapper.appendChild(oBtn);
    }



    //allows only human players to set their marker if it is thier turn.
    const setMarker = (div) => {

        if ((player1.turn == true && player1.type == "human") || (player2.turn == true && player2.type == "human")) {
            divId = div.id
            const row = divId.slice(3, 4)//gets the row and index from slicing the cell ID
            const column = divId.slice(11, 12) - 1;
            let board = gameBoard.board;
            if (player1.turn === true) {
                board["row" + row][column] = player1.marker;

            } else {
                board["row" + row][column] = player2.marker;
            }
            gameBoard.renderBoard()
            toggleTurns()
            if (player2.type == "computer") {
                console.log("computer turn")
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

    

    return {
        playerFactory,
        setupVsPlayer,
        setupVsComputer,
        vsPlayer,
        vsComputer,
        setMarker,
        toggleTurns,
    };
})();



//findOpenMoves()
function findOpenMoves() {
    const board = gameBoard.board;
    const target = "";

    const openMoves = [];
    for (let i = 1; i <= 3; i++) {//this for loop iterates the rows
        let array = board["row" + i];
        

        for (let j = 0; j < 3; j++) {//this for loop iterates the index of each row
            if (array[j] === target) {
                openMoves.push({row: i, index: j});
            }
        }
    }
    console.log(openMoves)
    console.log(openMoves.length)
}

//findOpenMoves()

function findOpenMove (){
   const board = gameBoard.board;
   const openMoves = [];
   const target ="";
   for (let i = 1; i <= 3; i++){
    let array = board['row' + i];
    for (let j = 0; j < array.length; j++) {
        if (array[i] === target){
            openMoves.push({row:i, index:j});
        }
        
    }
   }
   console.log(openMoves)
}

findOpenMove()