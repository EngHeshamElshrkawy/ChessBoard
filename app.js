let main = document.getElementById("main");

let squares = [];

let enPassantSquare = null;

let isPassant = 2;

let whiteTurn = true;


for (let i = 0; i < 8; i++) {
    let rows = [];
    for (let j = 0; j < 8; j++) {
        let square = document.createElement("div");
        let className = (i % 2 == 0) ? (j % 2 == 0) ? "light" : "dark" : (j % 2 != 0) ? "light" : "dark";
        square.classList.add("square");
        square.classList.add(className);
        square.id = 8 * i + j;
        rows.push(square);
        main.appendChild(square);
    }
    squares.push(rows);
}

for (let i = 0; i < 8; i++) {
    squares[1][i].classList.add("black", "pawn", "first");
    squares[6][i].classList.add("white", "pawn", "first");
}

squares[0][0].classList.add("black", "rook", "first");
squares[0][7].classList.add("black", "rook", "first");
squares[0][1].classList.add("black", "knight");
squares[0][6].classList.add("black", "knight");
squares[0][2].classList.add("black", "bishop");
squares[0][5].classList.add("black", "bishop");
squares[0][3].classList.add("black", "queen");
squares[0][4].classList.add("black", "king", "first");


squares[7][0].classList.add("white", "rook", "first");
squares[7][7].classList.add("white", "rook", "first");
squares[7][1].classList.add("white", "knight");
squares[7][6].classList.add("white", "knight");
squares[7][2].classList.add("white", "bishop");
squares[7][5].classList.add("white", "bishop");
squares[7][3].classList.add("white", "queen");
squares[7][4].classList.add("white", "king", "first");

main.addEventListener('click', function (event) {
    clicked(event.target);
})


/** DUMMY FUNCTIONS */
let previousSquare = null;

function clicked(square) {
    let squareClasses = square.classList;
    if (whiteTurn) {
        if (squareClasses.contains("highlighted")) {
            moveTo(square);
        }else if (squareClasses.contains("white")) {
            if (previousSquare === null) {
                previousSquare = square;
                previousSquare.classList.add("clicked");
                highlightMoves(square);
            } else {
                previousSquare.classList.remove("clicked");
                removeHighlight();
                if (previousSquare === square) {
                    previousSquare = null;
                } else {
                    previousSquare = square;
                    previousSquare.classList.add("clicked");
                    highlightMoves(square);
                }
            }
        } else {
            removeHighlight();
            if (!(previousSquare === null)) {
                previousSquare.classList.remove("clicked");
                previousSquare = null;
            }
        }
    } else {
        if (squareClasses.contains("highlighted")) {
            moveTo(square);
        }else if (squareClasses.contains("black")) {
            if (previousSquare === null) {
                previousSquare = square;
                previousSquare.classList.add("clicked");
                highlightMoves(square);
            } else {
                previousSquare.classList.remove("clicked");
                removeHighlight();
                if (previousSquare === square) {
                    previousSquare = null;
                } else {
                    previousSquare = square;
                    previousSquare.classList.add("clicked");
                    highlightMoves(square);
                }
            }
        } else {
            if (!previousSquare === null) {
                previousSquare.classList.remove("clicked");
                removeHighlight();
                previousSquare = null;
            }
        }
    }
}

function highlightMoves(square) {
    //hightlight available moves
    let squareClasses = square.classList;
    if (squareClasses.contains("pawn")) {
        highlightPawnMoves(square);
    } else if (squareClasses.contains("knight")) {
        highlightKnightMoves(square);
    } else if (squareClasses.contains("bishop")) {
        highlightBishopMoves(square);
    } else if (squareClasses.contains("rook")) {
        highlightRookMoves(square);
    } else if (squareClasses.contains("queen")) {
        highlightQueenMoves(square);
    } else if (squareClasses.contains("king")) {
        highlightKingMoves(square);
    } else {
        console.log("SHOULD NOT BE REACHED");
    }

}

function highlightPawnMoves(square) {
    let newPos;
    let pawnJumps = [7, 9];
    let index = parseInt(square.id);
    let squareClasses = square.classList;
    if (squareClasses.contains("white")) {
        pawnJumps.forEach(function (jump) {
            newPos = index - jump;
            if (document.getElementById(newPos).classList.contains("black")) {
                document.getElementById(newPos).classList.add("highlighted");
            }
        });
        newPos = index - 8;
        if (!document.getElementById(newPos).classList.contains("black") && !document.getElementById(newPos).classList.contains("white")) {
            document.getElementById(newPos).classList.add("highlighted");
            if (squareClasses.contains("first")) {
                newPos = index - 16;
                if (!document.getElementById(newPos).classList.contains("black") && !document.getElementById(newPos).classList.contains("white")) {
                    document.getElementById(newPos).classList.add("highlighted");
                }

            }
        }
    } else {
        pawnJumps.forEach(function (jump) {
            newPos = index + jump;
            if (document.getElementById(newPos).classList.contains("white")) {
                document.getElementById(newPos).classList.add("highlighted");
            }
        });
        newPos = index + 8;
        if (!document.getElementById(newPos).classList.contains("black") && !document.getElementById(newPos).classList.contains("white")) {
            document.getElementById(newPos).classList.add("highlighted");
            if (squareClasses.contains("first")) {
                newPos = index + 16;
                if (!document.getElementById(newPos).classList.contains("black") && !document.getElementById(newPos).classList.contains("white")) {
                    document.getElementById(newPos).classList.add("highlighted");
                }

            }
        }
    }
}

function highlightKnightMoves(square) {
    const knightJumps = [-17, -15, -10, -6, 6, 10, 15, 17];
    knightJumps.forEach(function (jump) {
        let newPos = parseInt(square.id) + jump;
        if (newPos >= 0 && newPos <= 63 && Math.abs((newPos % 8) - (square.id % 8)) <= 2) {
            if (square.classList.contains("white")) {
                if (!document.getElementById(newPos).classList.contains("white")) {
                    document.getElementById(newPos).classList.add("highlighted");
                }
            } else {
                if (!document.getElementById(newPos).classList.contains("black")) {
                    document.getElementById(newPos).classList.add("highlighted");
                }
            }
        }
    });
}

function highlightBishopMoves(square) {
    let index = parseInt(square.id);
    let row = Math.floor(square.id / 8);
    let column = square.id % 8;
    let topLeft = Math.min(row, column);  //-1
    let botRight = Math.min(7 - row, 7 - column);
    let topRight = Math.min(row, 7 - column); //-1
    let botLeft = Math.min(7 - row, column);
    let newPos = 0;


    for (let i = 1; i <= topLeft; i++) {
        newPos = index - (i * 9);
        if ((document.getElementById(newPos).classList.contains("white") && square.classList.contains("white")) || (document.getElementById(newPos).classList.contains("black") && square.classList.contains("black"))) {
            break;
        } else if (document.getElementById(newPos).classList.contains("black") || document.getElementById(newPos).classList.contains("white")) {
            document.getElementById(newPos).classList.add("highlighted");
            break;
        } else {
            document.getElementById(newPos).classList.add("highlighted");
        }
    }

    for (let i = 1; i <= botRight; i++) {
        newPos = index + (i * 9);
        if ((document.getElementById(newPos).classList.contains("white") && square.classList.contains("white")) || (document.getElementById(newPos).classList.contains("black") && square.classList.contains("black"))) {
            break;
        } else if (document.getElementById(newPos).classList.contains("black") || document.getElementById(newPos).classList.contains("white")) {
            document.getElementById(newPos).classList.add("highlighted");
            break;
        } else {
            document.getElementById(newPos).classList.add("highlighted");
        }
    }

    for (let i = 1; i <= topRight; i++) {
        newPos = index - (i * 7);
        if ((document.getElementById(newPos).classList.contains("white") && square.classList.contains("white")) || (document.getElementById(newPos).classList.contains("black") && square.classList.contains("black"))) {
            break;
        } else if (document.getElementById(newPos).classList.contains("black") || document.getElementById(newPos).classList.contains("white")) {
            document.getElementById(newPos).classList.add("highlighted");
            break;
        } else {
            document.getElementById(newPos).classList.add("highlighted");
        }
    }


    for (let i = 1; i <= botLeft; i++) {
        newPos = index + (i * 7);
        if ((document.getElementById(newPos).classList.contains("white") && square.classList.contains("white")) || (document.getElementById(newPos).classList.contains("black") && square.classList.contains("black"))) {
            break;
        } else if (document.getElementById(newPos).classList.contains("black") || document.getElementById(newPos).classList.contains("white")) {
            document.getElementById(newPos).classList.add("highlighted");
            break;
        } else {
            document.getElementById(newPos).classList.add("highlighted");
        }
    }


}

function highlightRookMoves(square) {
    let top = Math.floor(square.id / 8);
    let bot = 7 - top;
    let left = square.id % 8;
    let right = 7 - left;
    let newPos;
    let index = parseInt(square.id);
    for (let i = 1; i <= top; i++) {
        newPos = index - 8 * i;
        if (document.getElementById(newPos).classList.contains("white") && square.classList.contains("white") || document.getElementById(newPos).classList.contains("black") && square.classList.contains("black")) {
            break;
        } else if (document.getElementById(newPos).classList.contains("black") || document.getElementById(newPos).classList.contains("white")) {
            document.getElementById(newPos).classList.add("highlighted");
            break;
        } else {
            document.getElementById(newPos).classList.add("highlighted");
        }
    }

    for (let i = 1; i <= bot; i++) {
        newPos = index + 8 * i;
        if (document.getElementById(newPos).classList.contains("white") && square.classList.contains("white") || document.getElementById(newPos).classList.contains("black") && square.classList.contains("black")) {
            break;
        } else if (document.getElementById(newPos).classList.contains("black") || document.getElementById(newPos).classList.contains("white")) {
            document.getElementById(newPos).classList.add("highlighted");
            break;
        } else {
            document.getElementById(newPos).classList.add("highlighted");
        }
    }


    for (let i = 1; i <= left; i++) {
        newPos = index - i;
        if (document.getElementById(newPos).classList.contains("white") && square.classList.contains("white") || document.getElementById(newPos).classList.contains("black") && square.classList.contains("black")) {
            break;
        } else if (document.getElementById(newPos).classList.contains("black") || document.getElementById(newPos).classList.contains("white")) {
            document.getElementById(newPos).classList.add("highlighted");
            break;
        } else {
            document.getElementById(newPos).classList.add("highlighted");
        }
    }

    for (let i = 1; i <= right; i++) {
        newPos = index + i;
        if (document.getElementById(newPos).classList.contains("white") && square.classList.contains("white") || document.getElementById(newPos).classList.contains("black") && square.classList.contains("black")) {
            break;
        } else if (document.getElementById(newPos).classList.contains("black") || document.getElementById(newPos).classList.contains("white")) {
            document.getElementById(newPos).classList.add("highlighted");
            break;
        } else {
            document.getElementById(newPos).classList.add("highlighted");
        }
    }

}

function highlightQueenMoves(square) {
    highlightBishopMoves(square);
    highlightRookMoves(square);
}

function highlightKingMoves(square) {
    let kingJump = [-7, -8, -9, -1, 1, 7, 8, 9];
    let newPos;
    let index = parseInt(square.id);
    let previousClasses = previousSquare.classList;
    kingJump.forEach(function (jump) {
        newPos = index + jump;
        if (newPos >= 0 && newPos <= 63 && Math.abs(newPos % 8 - index) <= 1) {
            if (previousClasses.contains("white")) {
                if (!document.getElementById(newPos).classList.contains("white")) {
                    document.getElementById(newPos).classList.add("highlighted");
                }
            } else {
                if (!document.getElementById(newPos).classList.contains("black")) {
                    document.getElementById(newPos).classList.add("highlighted");
                }
            }
        }

    });

    if (previousClasses.contains("first")) {
        if (previousClasses.contains("white")) {
            if (document.getElementById(63).classList.contains("first")) {
                document.getElementById(63).classList.add("highlighted");
            }
            if (document.getElementById(56).classList.contains("first")) {
                document.getElementById(56).classList.add("highlighted");
            }
        }else{
            if (document.getElementById(0).classList.contains("first")) {
                document.getElementById(0).classList.add("highlighted");
            }
            if (document.getElementById(7).classList.contains("first")) {
                document.getElementById(7).classList.add("highlighted");
            }
        }


    }
}


function moveTo(square) {
    //if black remove everything except tile color, add new piece
    let previousClasses = previousSquare.classList;
    let squareClasses = square.classList;

    if (previousClasses.contains("white")) {
        if (squareClasses.contains("black")) {
            if (squareClasses.contains("light")) {
                square.className = "square light";
            } else {
                square.className = "square dark";
            }
        }

        if (previousClasses.contains("pawn")) {

            previousClasses.remove("white", "pawn");
            squareClasses.add("white", "pawn");

        } else if (previousClasses.contains("knight")) {

            previousClasses.remove("white", "knight");
            squareClasses.add("white", "knight");

        } else if (previousClasses.contains("bishop")) {

            previousClasses.remove("white", "bishop");
            squareClasses.add("white", "bishop");

        } else if (previousClasses.contains("rook")) {

            previousClasses.remove("white", "rook");
            squareClasses.add("white", "rook");

        } else if (previousClasses.contains("queen")) {

            previousClasses.remove("white", "queen");
            squareClasses.add("white", "queen");

        } else if (previousClasses.contains("king")) {
            if(squareClasses.contains("rook") && squareClasses.contains("white")){
                //CASTLE
                if(square.id % 8 === 7){
                    squareClasses.remove("white", "rook");
                    previousClasses.remove("white", "king");
                    document.getElementById(square.id - 1).classList.add("white", "king");
                    document.getElementById(square.id - 2).classList.add("white", "rook");
                }else{
                    squareClasses.remove("white", "rook");
                    previousClasses.remove("white", "king");
                    document.getElementById(previousSquare.id - 1).classList.add("white", "rook");
                    document.getElementById(previousSquare.id - 2).classList.add("white", "king");
                }
            }else{
                previousClasses.remove("white", "king");
                squareClasses.add("white", "king");
            }

        } else {
            console.log("SHOULD NOT BE REACHED");
        }


    } else {
        if (squareClasses.contains("white")) {
            if (squareClasses.contains("light")) {
                square.className = "square light";
            } else {
                square.className = "square dark";
            }
        }

        if (previousClasses.contains("pawn")) {

            previousClasses.remove("black", "pawn");
            squareClasses.add("black", "pawn");

        } else if (previousClasses.contains("knight")) {

            previousClasses.remove("black", "knight");
            squareClasses.add("black", "knight");

        } else if (previousClasses.contains("bishop")) {

            previousClasses.remove("black", "bishop");
            squareClasses.add("black", "bishop");

        } else if (previousClasses.contains("rook")) {

            previousClasses.remove("black", "rook");
            squareClasses.add("black", "rook");

        } else if (previousClasses.contains("queen")) {

            previousClasses.remove("black", "queen");
            squareClasses.add("black", "queen");

        } else if (previousClasses.contains("king")) {

            previousClasses.remove("black", "king");
            squareClasses.add("black", "king");

        } else {
            console.log("SHOULD NOT BE REACHED");
        }
    }


    removeHighlight();
    previousSquare.classList.remove("clicked");
    previousSquare = null;
    whiteTurn = !whiteTurn;

}

function removeHighlight() {
    squares.forEach(function (rows, index) {
        rows.forEach(function (square) {
            square.classList.remove("highlighted");
        });
    });
}

/**working functions */
