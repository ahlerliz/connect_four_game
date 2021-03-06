"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

/* */
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 1; i <= HEIGHT; i++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.querySelector("#board");

  // Creates a table row element called top, setting attributes and 
  // adding an event listener for clicking
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // In the Header of the table, create a width number of cells and 
  // appending the header to the table.
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    let row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      let cell = document.createElement("td");

      // TODO: add an id, y-x, to the above table cell element
      // you'll use this later, so make sure you use y-x
      cell.setAttribute("id", `${y}-${x}`);
      // console.log("y-x:", y-x);

      // TODO: append the table cell to the table row
      row.append(cell);

    }
    // TODO: append the row to the html board
    htmlBoard.append(row);

  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y-- ){
    if (board[y][x] === undefined){
      return y;
    }
  }
  return undefined;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let gamePiece = document.createElement('div');
  let cell = document.getElementById(`${y}-${x}`);
  gamePiece.classList.add("piece");
  gamePiece.classList.add(`p${currPlayer}`);
  cell.append(gamePiece);
  console.log("checking what cell", cell);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(clickEvent) {
  // get x from ID of clicked cell
  let x = +clickEvent.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === undefined) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // let fullBoard = false;

  // for (let row of Board) {
  //   for (let cell of row) {
  //     if (cell === undefined) {
  //       fullBoard = false;
  //       break;
  //     }
  //   }
  //   fullBoard = true;
  // }

  let fullBoard = board.every(function(row) {
    return row.every(function(cell) {
      // console.log("cell:", cell !== undefined);
      return cell !== undefined;
    })
  });

  // TODO: check if all cells in board are filled; if so call, call endGame
  if (fullBoard === true) {
    endGame("Tie Game!!! Play again :)");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = (currPlayer === 1) ? (currPlayer = 2) : (currPlayer = 1);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    for (let cell of cells){
      let [y, x] = cell
      if ((y < 0 || y >= HEIGHT) || (x < 0 || x >= WIDTH)){
        return false;
      }
      if (board[y][x] !== currPlayer){
        return false;
      }
    }
    return true;
  // for each cell in cells, get element by class (convert y, x), 
  // check if none are undefined & if IDs match


  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y - 1, x + 1], [y - 2, x + 2], [y - 3, x + 3]] ;
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]] ;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
