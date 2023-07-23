
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


    const setMarker = (div) => {
        console.log(div)
        divId = div.id
        const row = divId.slice(3, 4)
        const column = divId.slice(11, 12) - 1;
        //let board = gameBoard.board; this line not needed?
        board["row" + row][column] = player1.marker;
        renderBoard()//doesn't need gamboard.renderBoard()?

    }
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
                div.addEventListener("click", () => gameBoard.setMarker(div));
                wrapper.appendChild(div);
                div.innerText = gameBoard.board["row" + i][counter - 1]
            })
        }
    }
    return {
        board,
        resetBoard,
        setMarker,
        renderBoard,
    }
})();



const playerStuff = (() => {
    const playerFactory = (name, type, marker = null) => {
        return {name, type, marker};
    }

    const setupVsPlayer = () => {
        let player1 = playerFactory("player1", "human");
        let player2 = playerFactory("player2", "human");
        return {player1, player2}
    }

    const setupVsComputer = () => {
        const player1 = playerFactory("player1", "human");
        const player2 = playerFactory("player2", "computer");
        return {player1, player2}
    }

    const vsPlayer = () => {
       const players = playerStuff.setupVsPlayer(); 
       player1 = players.player1
       player2 = players.player2
       wrapper = document.querySelector(".selection-wrapper");
       startScreen = document.querySelector(".start-screen")
       while (wrapper.firstChild) {//removes game select buttons
        wrapper.removeChild(wrapper.firstChild);
       }
       const xBtn = document.createElement("button");
       xBtn.setAttribute("id","x-button");
       xBtn.innerText = "X"
       xBtn.addEventListener("click", () => {
       player1.marker = "X";
       player2.marker = "O";
       startScreen.style.display = "none";
       startScreen.style.height = "100vh"
       gameBoard.renderBoard()

       })
       const oBtn = document.createElement("button");
       oBtn.setAttribute("id","o-button");
       oBtn.innerText = "O"
       oBtn.addEventListener("click", () => {
       player1.marker = "O";
       player2.marker = "X";
       })
       wrapper.appendChild(xBtn);
       wrapper.appendChild(oBtn);
       
    }

       const vsComputer = () => {
        const players = playerStuff.setupVsComputer(); 
        player1 = players.player1
        player2 = players.player2
     }


    return {playerFactory,
           setupVsPlayer,
           setupVsComputer,
           vsPlayer,
           vsComputer,
    };
})();





/*const player1 = playerFactory("kyle", "69")
console.log(player1.marker)*/








