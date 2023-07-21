

const gameBoard = (() => {
    const board = {
        row1: ["", "", ""],
        row2: ["", "", ""],
        row3: ["", "", ""],
    }
    const resetBoard = () => {
        board.row1 = ["","",""];
        board.row2 = ["","",""];
        board.row3 = ["","",""];
    }

    const setMarker = (rowNumb, index, marker) => {
        let board = gameBoard.board;
        board["row" + rowNumb][index] = marker;
    }

    const renderBoard = () => {
        let wrapper = document.querySelector(".wrapper");
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.remove();
        });
    let counter = 0;
    gameBoard.board.row1.forEach(element => {
        counter++;
        let div = document.createElement("div");
        div.setAttribute("id",`row1-column${counter}`)
        div.setAttribute("class", "cell")
        wrapper.appendChild(div);
        div.innerText=gameBoard.board.row1[counter-1]
    })
    counter = 0;
    gameBoard.board.row2.forEach(element => {
        counter++;
        let div = document.createElement("div");
        div.setAttribute("id",`row2-column${counter}`)
        div.setAttribute("class", "cell")
        wrapper.appendChild(div);
        div.innerText=gameBoard.board.row2[counter-1]
    })
    counter = 0;
    gameBoard.board.row3.forEach(element => {
        counter++;
        let div = document.createElement("div");
        div.setAttribute("id",`row3-column${counter}`)
        div.setAttribute("class", "cell")
        wrapper.appendChild(div);
        div.innerText=gameBoard.board.row3[counter-1]
    })
    }
    return {
        board,
        resetBoard,
        setMarker,
        renderBoard,
    }
})();

gameBoard.setMarker(1,0,"X");
gameBoard.setMarker(1,1,"");
gameBoard.setMarker(1,2,"X");
gameBoard.setMarker(2,0,"");
gameBoard.setMarker(2,1,"X");
gameBoard.setMarker(2,2,"");
gameBoard.setMarker(3,0,"O");
gameBoard.setMarker(3,1,"");
gameBoard.setMarker(3,2,"O");





/*function renderBoard() {
    let wrapper = document.querySelector(".wrapper");
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.remove();
    });
    let counter = 0;
    gameBoard.board.row1.forEach(element => {
        counter++;
        let div = document.createElement("div");
        div.setAttribute("id",`row1-column${counter}`)
        div.classList.add(`cell`);
        wrapper.appendChild(div);
        div.innerText="";
        div.innerText=gameBoard.board.row1[counter-1]
    })

    counter = 0;
    gameBoard.board.row2.forEach(element => {
        counter++;
        let div = document.createElement("div");
        div.setAttribute("id",`row2-column${counter}`)
        wrapper.appendChild(div);
        div.innerText="";
        div.innerText=gameBoard.board.row2[counter-1]
    })
    counter = 0;
    gameBoard.board.row3.forEach(element => {
        counter++;
        let div = document.createElement("div");
        div.setAttribute("id",`row3-column${counter}`)
        wrapper.appendChild(div);
        div.innerText="";
        div.innerText=gameBoard.board.row3[counter-1]
    })
}*/

function destroyBoad () {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.remove();
    });
}





