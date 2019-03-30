
const grid = [];
const GRID_LENGTH = 3;
const WIN_LENGTH = 3; // It must be equal or less than GRID_LENGTH -- select the length to decide win by computing consecutive 'X' or '0' 
let turn = 'X';
var winner = []; // holds the coordinates of winning sequence
var moves = 0;
const totalMoves = GRID_LENGTH*GRID_LENGTH;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) { // single row
    let rowDivs = ''; 
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        let id = colIdx*GRID_LENGTH + rowIdx;
        rowDivs = rowDivs + '<div id = "'+id+'" isClicked = "false" colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() { // rows loop for colum
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() { // displaying grid
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function changeElement(id, click, content) { // this will not completely render the grid but just change attributes
    
    let element = document.getElementById(id);
    element.setAttribute("isClicked",click);
    element.innerHTML = '<span class="cross">'+(content == 1 ? 'X':'0')+'</span>'; 
}

function checkWin(arr, player, rowId, colId) { // it checks win for the current position

    let tempRow =  rowId;
    let tempCol = colId;
    let count = [0,0,0,0];
    let len = WIN_LENGTH-1;
    let maxlen = GRID_LENGTH-1;
    winner = [];
    winner.push([tempRow,tempCol]);

    while (tempRow != 0) {  // up 
         tempRow--;
         if(arr[tempRow][tempCol] != player) {
             break;
         }
         count[0]++;
         winner.push([tempRow,tempCol]); 
     }
     if(count[0] == len) {
        //  console.log("win in up");
        //  console.log("winner is => ",winner);    
         return true;
     }
     tempRow = rowId;
     tempCol = colId;
     while (tempRow != 0 && tempCol != maxlen) { // up right
         tempRow--;
         tempCol++;
         if(arr[tempRow][tempCol] != player) {
            break;
         }
         count[1]++;
         winner.push([tempRow,tempCol]);
     }
     if(count[1] == len) {
        // console.log("win in up right");
        // console.log("winner is => ",winner);
       return true;
     }
     tempRow = rowId;
     tempCol = colId;
     while (tempCol != maxlen) { // right
         tempCol++;
         if(arr[tempRow][tempCol] != player) {
            break;
         }
         count[2]++;
         winner.push([tempRow,tempCol]);
     }
     if(count[2] == len) {
        // console.log("win in right");
        // console.log("winner is => ",winner);
        return true;
     }
     tempRow = rowId;
     tempCol = colId;
     while (tempRow != maxlen && tempCol != maxlen) { // right down
         tempCol++;
         tempRow++;
         if(arr[tempRow][tempCol] != player) {
            break;
         }
         count[3]++;
         winner.push([tempRow,tempCol]);
     }
     if(count[3] == len) {
        // console.log("win in right down");
        // console.log("winner is => ",winner);
        return true;
     }
     tempRow = rowId;
     tempCol = colId;
     while (tempRow != maxlen) { // down
         tempRow++;
         if(arr[tempRow][tempCol] != player) {
            break;
         }
         count[0]++;
         winner.push([tempRow,tempCol]);
     }
     if(count[0] == len) {
        // console.log("win in down");
        // console.log("winner is => ",winner);
        return true;
     }
     tempRow = rowId;
     tempCol = colId;
     while (tempRow != maxlen && tempCol != 0) { // ldown
         tempRow++;
         tempCol--;
         if(arr[tempRow][tempCol] != player) {
            break;
         }
         count[1]++;
         winner.push([tempRow,tempCol]);
     }
     if(count[1] == len) {
        // console.log("win in ldown");
        // console.log("winner is => ",winner);
         return true;
     }
     tempRow = rowId;
     tempCol = colId;
     while (tempCol !=0 ){ // left
         tempCol--;
         if(arr[tempRow][tempCol] != player) {
            break;
         }
         count[2]++;
         winner.push([tempRow,tempCol]);
     }
     if(count[2] == len) {
        // console.log("win in left");
        // console.log("winner is => ",winner);
        return true;         
     }
     tempRow = rowId;
     tempCol = colId;
     while (tempRow!=0 && tempCol !=0){ // lup
         tempCol--;
         tempRow--;
         if(arr[tempRow][tempCol] != player) {
            break;
         }
         count[3]++;
         winner.push([tempRow,tempCol]);
     }
     if(count[3] == len) {
        // console.log("win in lup");
        // console.log("winner is => ",winner);
        return true;
     }
     return false;
}

function computerTurn(moves) {
    
    let bestValue = -1000, bestMove=[];

    for( let row=0; row<GRID_LENGTH; row++) {

        for( let col=0; col<GRID_LENGTH; col++) {
            
            if(grid[row][col] == 0 ) { // searching for empty cell
                
                grid[row][col] = 2; // making move
                moves++; // increment moves count
                console.log("grid provided to getBestMove from computerTurn => ",grid);
                let moveValue = getBestMove(grid,0,false,moves); // checking is this is the best move
                
                moves--;
                grid[row][col]=0;
                
                if(moveValue > bestValue){ // updating values
                    bestMove[0] = row; 
                    bestMove[1] = col; 
                    bestValue = moveValue; 
                }
            }
            
        }
    }
    
    grid[bestMove[0]][bestMove[1]] = 2;
    turn = 'X';
    return bestMove;
}

function evaluateScore(gridArr) {

    let diff = GRID_LENGTH-WIN_LENGTH;
    let len = WIN_LENGTH-1;

    for(let i=0; i<GRID_LENGTH; i++) { // check win for different rows
        
        if(diff == 0) {    
            let win = true;
            for(let j=0; j<len; j++) {
                
                if(gridArr[i][j] != gridArr[i][j+1]){
                    win = false;
                    break;
                }
            }
            if(win){
                if(gridArr[i][0] == 1) {
                    return -10;
                } else if(gridArr[i][0] == 2) {
                    return 10;
                }
            }

        } else {
            
            for(let j=0; j<=diff; j++) {
                let count=0;
                for(let k=j; k<len; k++) {
                    if((gridArr[i][k] != gridArr[i][k+1])){ 
                        count++;
                    }
                    if(count == len){
                        if(gridArr[i][k] == 1) {
                            return -10;
                        } else if(gridArr[i][k] == 2) {
                            return 10;
                        }
                    }
                }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            }
        }

    }

    for(let i=0; i<GRID_LENGTH; i++) { // check win for different cols
        
        if(diff == 0) {    
            let win = true;
            for(let j=0; j<len; j++) {
                
                if(gridArr[j][i] != gridArr[j][i+1]){
                    win = false;
                    break;
                }
            }
            if(win){
                if(gridArr[0][i] == 1) {
                    return -10;
                } else if(gridArr[0][i] == 2) {
                    return 10;
                }
            }

        } else {
            
            for(let j=0; j<=diff; j++) {
                let count=0;
                for(let k=j; k<len; k++) {
                    if((gridArr[k][i] != gridArr[k][i+1])){ 
                        count++;
                    }
                    if(count == len){
                        if(gridArr[k][i] == 1) {
                            return -10;
                        } else if(gridArr[k][i] == 2) {
                            return 10;
                        }
                    }
                }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            }
        }

    }

    let diagonalLength = GRID_LENGTH-WIN_LENGTH;
    for( let i=0; i<=diagonalLength; i++) { // diagonals from left to right
        for(let j=0;j<=diagonalLength;j++) {
            
            let row =i, col=j;
            let win = true;
            for(let k=0;k<len;k++){
                if(gridArr[row][col] != gridArr[row+1][col+1]) {
                    win = false;
                    break;
                }
                row++;col++;
            }
            if(win) {
                if(gridArr[i][j] == 1) {
                    return -10;
                } else if(gridArr[i][j] == 2) {
                    return 10;
                }
            }
        }
    }
    let compLen = GRID_LENGTH - diagonalLength - 1;
    for( let i=0; i>=diagonalLength; i--) { // diagonals from right to left
        for(let j=GRID_LENGTH-1;j>=compLen;j--) {
            
            let row =i, col=j;
            
            let win = true;
            for(let k=0;k<len;k++){
                if(gridArr[row][col] != gridArr[row+1][col-1]) {
                    win = false;
                    break;
                }
                row++;col--;
            }
            if(win) {
                if(gridArr[i][j] == 1) {
                    return -10;
                } else if(gridArr[i][j] == 2) {
                    return 10;
                }
            }
        }
    }
    return 0;
}

function getBestMove(gridArr, depth, isMax, moves) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

    let score = evaluateScore(gridArr);
    let arr = gridArr;

    if(score == 10 || score == -10) {
        return score;
    }

    if(moves==totalMoves){
        return 0;
    }

    if(isMax) {
        let best = -1000;
        for (let i = 0; i<3; i++) 
        { 
            for (let j = 0; j<3; j++) 
            {  
                if (arr[i][j]==0) 
                { 
                    arr[i][j] = 2;
                    moves++;
                    console.log("gridArr or tic tac toe array value in getBestMove for computer turn => ",gridArr);
                    best = Math.max( best, getBestMove(arr, depth+1, !isMax, moves) ); 
                    arr[i][j] = 0;
                    moves--;
                } 
                
            } 
        } 
        return best; 

    } else { 
        let best = 1000; 
        for (let i = 0; i<GRID_LENGTH; i++) 
        { 
            for (let j = 0; j<GRID_LENGTH; j++) 
            {  
                if (arr[i][j]==0) 
                { 
                    arr[i][j] = 1;
                    moves++;
                    console.log("gridArr or tic tac toe array value in getBestMove for opponent turn  => ",gridArr);
                    best = Math.min(best, getBestMove(arr, depth+1, !isMax, moves));     
                    arr[i][j] = 0;
                    moves--; 
                }
            } 
        } 
        return best; 
    } 
}

function onBoxClick() {
    var rowIdx = parseInt(this.getAttribute("rowIdx"));
    var colIdx = parseInt(this.getAttribute("colIdx"));
    let isClicked = this.getAttribute("isClicked");
    
    if( isClicked === "false") {

            moves++; // incrementing move
            turn = '0'; // change turn
            
            grid[colIdx][rowIdx] = 1;

            changeElement(this.id, "true", 1); // changing html code
    
            let win = checkWin(grid, 1, colIdx, rowIdx); // checking win for player
    
            if(win) {
                console.log("You Won");
                return;
            }
            
            if(moves<totalMoves) {

                let move = computerTurn(moves);

                let moveId = move[0]*GRID_LENGTH + move[1];
                changeElement(moveId, "true", 2);
                moves++;
                win = checkWin(grid, 2, move[0], move[1]);
    
                if(win) {
                    console.log("You Lose");
                    return;
                }

            }

        // renderMainGrid();
        // addClickHandlers();
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
