let main = document.getElementById("main");

let squares = [];

let previouslySelected;

for(let i = 0; i < 8; i++){
    let rows = [];
    for(let j = 0; j < 8; j++){
        let square = document.createElement("div");
        let className = (i % 2 == 0) ? (j % 2 == 0) ? "light" : "dark"  : (j % 2 != 0) ? "light" : "dark";
        square.classList.add("square");
        square.classList.add(className);
        square.id = 8*i+j;
        rows.push(square);
        main.appendChild(square);
    }
    squares.push(rows);
}

for(let i = 0; i < 8 ; i++){
    squares[1][i].classList.add("black", "pawn", "first");
    squares[6][i].classList.add("white", "pawn", "first");
}

squares[0][0].classList.add("black", "rook");
squares[0][7].classList.add("black", "rook");
squares[0][1].classList.add("black", "knight");
squares[0][6].classList.add("black", "knight");
squares[0][2].classList.add("black", "bishop");
squares[0][5].classList.add("black", "bishop");
squares[0][3].classList.add("black", "queen");
squares[0][4].classList.add("black","king");


squares[7][0].classList.add("white", "rook");
squares[7][7].classList.add("white", "rook");
squares[7][1].classList.add("white", "knight");
squares[7][6].classList.add("white", "knight");
squares[7][2].classList.add("white", "bishop");
squares[7][5].classList.add("white", "bishop");
squares[7][3].classList.add("white", "queen");
squares[7][4].classList.add("white","king");

main.addEventListener('click', function(event){
    clicked(event.target);
})


function clicked(square){
    if(!square.classList.contains("white") && !square.classList.contains("black")){
        if(square.classList.contains("clicked")){
            movePiece(square);
        }
        clearSelection();
    }else{
        clearSelection();
        if(square === previouslySelected){
            square.classList.remove("clicked");
            previouslySelected = null;
        }else{
            square.classList.add("clicked");
            previouslySelected = square;
            highlightPossibleMoves(square);
        }
    }
}

function clearSelection(){
    squares.forEach(function(rows, index){
        rows.forEach(function(square){
            if(square.classList.contains("clicked")){
                square.classList.remove("clicked");
            }
        });
    });
}

function highlightPossibleMoves(square){
    let squareClasses = square.classList;
    if(squareClasses.contains("pawn")){
        pawnMoves(square, squareClasses);
    }else if(squareClasses.contains("knight")){
        knightMoves(square);
    }else if(squareClasses.contains("bishop")){
        bishopMoves(square);
    }
}

function pawnMoves(square, squareClasses){
    let newPos;
    if(squareClasses.contains("white")){
        newPos = square.id-8;
        if(!document.getElementById(newPos).classList.contains("white") && !document.getElementById(newPos).classList.contains("black")){
            document.getElementById(newPos).classList.add("clicked");
            if(!document.getElementById((square.id-16)).classList.contains("black") &&
             !document.getElementById((square.id-16)).classList.contains("white") &&
             squareClasses.contains("first")){
                document.getElementById((square.id-16)).classList.add("clicked");
            }
        }
    }else{
        newPos = parseInt(square.id)+8;
        if(!document.getElementById(newPos).classList.contains("white") && !document.getElementById(newPos).classList.contains("black")){
            document.getElementById(newPos).classList.add("clicked");
            if(!document.getElementById(parseInt(square.id)+16).classList.contains("black") &&
             !document.getElementById(parseInt(square.id)+16).classList.contains("white") &&
             squareClasses.contains("first")){
                document.getElementById(parseInt(square.id)+16).classList.add("clicked");
            }
        }
    }
}


function knightMoves(square){
    const knightJumps = [-17, -15, -10, -6, 6, 10, 15, 17];
    knightJumps.forEach(function(jump){
        let newPos = parseInt(square.id) + jump;
        if(newPos >= 0 &&newPos <= 63 && Math.abs((newPos % 8) - (square.id % 8)) <= 2){
            if(!document.getElementById(newPos).classList.contains("white")){
                document.getElementById(newPos).classList.add("clicked");
            }
        }
    });
}

function bishopMoves(square){
    let index = parseInt(square.id);
    let row = Math.floor(square.id / 8);
    let column = square.id % 8;
    let startLeft = Math.min(row, column);  //-1
    let endRight  = Math.min(7-row, 7-column);
    let startRight = Math.min(row, 7-column); //-1
    let endLeft = Math.min(7-row, column);
    let newPos = 0;
  

    for(let i = 1; i <= startLeft; i++){
        newPos = index - (i * 9);
        if((document.getElementById(newPos).classList.contains("white") && square.classList.contains("white")) || (document.getElementById(newPos).classList.contains("black") && square.classList.contains("black"))){
            break;
        }else if(document.getElementById(newPos).classList.contains("black") ||document.getElementById(newPos).classList.contains("white")){
            document.getElementById(newPos).classList.add("clicked");
            break;
        }else{
            document.getElementById(newPos).classList.add("clicked");
        }
    }

    for(let i = 1; i <= endRight; i++){
        newPos = index + (i * 9);
        if((document.getElementById(newPos).classList.contains("white") && square.classList.contains("white")) || (document.getElementById(newPos).classList.contains("black") && square.classList.contains("black"))){
            break;
        }else if(document.getElementById(newPos).classList.contains("black") ||document.getElementById(newPos).classList.contains("white")){
            document.getElementById(newPos).classList.add("clicked");
            break;
        }else{
            document.getElementById(newPos).classList.add("clicked");
        }
    }

    for(let i = 1; i <= startRight; i++){
        newPos = index - (i * 7);
        if((document.getElementById(newPos).classList.contains("white") && square.classList.contains("white")) || (document.getElementById(newPos).classList.contains("black") && square.classList.contains("black"))){
            break;
        }else if(document.getElementById(newPos).classList.contains("black") ||document.getElementById(newPos).classList.contains("white")){
            document.getElementById(newPos).classList.add("clicked");
            break;
        }else{
            document.getElementById(newPos).classList.add("clicked");
        }
    }


    for(let i = 1; i <= endLeft; i++){
        newPos = index + (i * 7);
        if((document.getElementById(newPos).classList.contains("white") && square.classList.contains("white")) || (document.getElementById(newPos).classList.contains("black") && square.classList.contains("black"))){
            break;
        }else if(document.getElementById(newPos).classList.contains("black") ||document.getElementById(newPos).classList.contains("white")){
            document.getElementById(newPos).classList.add("clicked");
            break;
        }else{
            document.getElementById(newPos).classList.add("clicked");
        }
    }

}




function movePiece(square){
    if(previouslySelected.classList.contains("pawn")){
        if(previouslySelected.classList.contains("white")){
            square.classList.add("white", "pawn");
            previouslySelected.classList.remove("white", "pawn");
            if(previouslySelected.classList.contains("first")){
                previouslySelected.classList.remove("first");
            }
        }else{
            square.classList.add("black", "pawn");
            previouslySelected.classList.remove("black", "pawn");
            if(previouslySelected.classList.contains("first")){
                previouslySelected.classList.remove("first");
            }
        }
    }else if(previouslySelected.classList.contains("knight")){
            if(previouslySelected.classList.contains("white")){
                square.classList.add("white", "knight");
                previouslySelected.classList.remove("white", "knight");
            }else{
                square.classList.add("black", "knight");
                previouslySelected.classList.remove("black", "knight");
            }
    }else if(previouslySelected.classList.contains("bishop")){
        if(previouslySelected.classList.contains("white")){
            square.classList.add("white", "bishop");
            previouslySelected.classList.remove("white", "bishop");
        }else{
            square.classList.add("black", "bishop");
            previouslySelected.classList.remove("black", "bishop");
        }
    }
} 
