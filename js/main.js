'use strict'

// Pieces Types
const BOMB = '💣';
const FLAG = '🏴‍☠️';

const BOARD_SIZE_BEGINNER = { SIZE: 4, MINES: 2 };
const BOARD_SIZE_MEDIUM = { SIZE: 8, MINES: 14 };
const BOARD_SIZE_EXPERT = { SIZE: 12, MINES: 32 };

var gtime = []
var gBoard = []
var gLevel = BOARD_SIZE_BEGINNER;

//Init the Game
function initGame() {

    // // var arr = [];
    // gLevel = BOARD_SIZE_BEGINNER || BOARD_SIZE_MEDIUM || BOARD_SIZE_EXPERT;
    gBoard = buildBoard();
    renderBoard(gBoard)


}

function setLevel(newLevel) {
    gLevel = newLevel;
    initGame();
}

//Build Board with Mines & Numbers
function buildBoard() {
    //#region SetEmpty Board
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false };
        }
    }
    //#endregion

    //#region Set Mines
    for (var mines = 0; mines < gLevel.MINES;) {

        var i = getRandomInt(0, board.length);
        var j = getRandomInt(0, board[i].length);

        if (!board[i][j].isMine) {
            board[i][j].isMine = true;
            mines++;
        }
    }
    //#endregion

    setMinesNegsCount(board);

    consoleBoard(board);
    console.log(board);

    return board;
}


function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        var row = board[i]
        strHtml += '<tr>'
        for (var j = 0; j < row.length; j++) {
            var cell = ' ';// = row[j]
            if (row[j].isShown || row[j].isMarked) {
                if (row[j].isMarked)
                    cell = FLAG;
                else if (row[j].isMine)
                    cell = BOMB;
                else
                    cell = row[j].minesAroundCount;
            }

            var className = 'white';
            var tdId = `cell-${i}-${j}`

            strHtml += `<td id="${tdId}" class="${className}" onclick="onCellClicked(this)"  oncontextmenu="javascript:cellMarked(this);return false;">
                            ${cell}
                        </td>`

        }
        strHtml += '</tr>'
    }
    var elMat = document.querySelector('.game-board')
    elMat.innerHTML = strHtml
    if (checkGameOver()) {
        alert("you win");
    }
}




function setMinesNegsCount(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j].minesAroundCount = countMinedAround(board, i, j);
        }
    }
}



function countMinedAround(board, rowIdx, colIdx) {
    var negsCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (board[i][j].isMine)
                negsCount++
        }
    }
    return negsCount;
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: + parts[2] }
    return coord
}

function gameOver() {
    alert('Game Over');
    initGame();
}

//Check if Wining
function checkGameOver() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked)
                return false;
        }
    }

    if (countMarkedOnBoard() > gLevel.MINES)
        return false;

    return true;
}


function countMarkedOnBoard() {
    var markedOnBoard = 0;
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMarked)
                markedOnBoard++
        }
    }
    return markedOnBoard;
}

function cellMarked(elCell) {
    var cellCoord = getCellCoord(elCell.id);
    var piece = gBoard[cellCoord.i][cellCoord.j];
    if (!piece.isShown)
        piece.isMarked = !piece.isMarked;

    renderBoard(gBoard);
}
function onCellClicked(elCell) {

    var cellCoord = getCellCoord(elCell.id);
    var piece = gBoard[cellCoord.i][cellCoord.j];
    if (!piece.isMarked) {
        piece.isShown = true;
        renderBoard(gBoard);
        if (piece.isMine) {
            setTimeout(gameOver, 0);
        }
    }
    expandShown(elCell)


}

function consoleBoard(board) {
    var rowText = '';
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine)
                rowText += '\t' + BOMB;
            else
                rowText += '\t' + board[i][j].minesAroundCount;
        }
        rowText += "\n";
    }
    console.log(rowText);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
}

function expandShown(elCell) {
    var pos = elCell.id
    console.log(elCell);
    var splitPos = pos.split('-')
    var row = Number(splitPos[1])
    var col = Number(splitPos[2])
    var currenElament = gBoard[row][col]

    for (var i = 0; i < row.length; i++) {
        for (var l = 0; l < col.length; j++) {


        }
    }
    console.log(gBoard[row][col]);

}

// function startTime(Board, timer) {
//     for (var i = 0; i < Board.isShown; i++) {
//     }
//     return
// }

function timer() {
    //sec
    var elSec = document.querySelector('.sec')
    var currSec = elSec.innerText
    currSec++
    elSec.innerText = currSec
    //min
    var elMin = document.querySelector('.min')
    var currMin = elMin.innerText
    if (currSec > 60) {
        currMin++
        elMin.innerText = currMin
        //need to reset the sec
        currSec = 0
        elSec.innerText = currSec
    }
    return gBoard
}
