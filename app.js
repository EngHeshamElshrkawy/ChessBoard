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
    squares[1][i].classList.add("black", "pawn");
    squares[6][i].classList.add("white", "pawn");
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
            if(previouslySelected.classList.contains("pawn")){
                if(previouslySelected.classList.contains("white")){
                    square.classList.add("white", "pawn");
                    previouslySelected.classList.remove("white", "pawn");
                }else{
                    square.classList.add("black", "pawn");
                    previouslySelected.classList.remove("black", "pawn");
                }
            }else{
                if(previouslySelected.classList.contains("knight")){
                    if(previouslySelected.classList.contains("white")){
                        square.classList.add("white", "knight");
                        previouslySelected.classList.remove("white", "knight");
                    }else{
                        square.classList.add("black", "knight");
                        previouslySelected.classList.remove("black", "knight");
                    }
                }

            } 
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
        if(squareClasses.contains("white")){
            document.getElementById((square.id-8)).classList.add("clicked");
            document.getElementById((square.id-16)).classList.add("clicked");
        }else{
            document.getElementById((parseInt(square.id)+8)).classList.add("clicked");
            document.getElementById((parseInt(square.id)+16)).classList.add("clicked");
        }
    }else if(squareClasses.contains("knight")){
        if(squareClasses.contains("white")){
            document.getElementById((square.id-17)).classList.add("clicked");
            document.getElementById((square.id-15)).classList.add("clicked");
        }else{
            document.getElementById((parseInt(square.id)+17)).classList.add("clicked");
            document.getElementById((parseInt(square.id)+15)).classList.add("clicked");   
        } 
    }
}