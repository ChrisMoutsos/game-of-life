var main = function() {
  "use strict";
  var board = new Board();
  var clicking = false,
      started = false,
      evolver = 0,
      index;
  var x, y, oldRow, oldCol, offset, oldCell;

  $("#rowinput").val(board.rows);
  $("#colinput").val(board.cols);

  board.draw();

  board.updateGenerationText();
  board.updateLiveCellsText();
  board.updateMaxCellsText();

  //Resize button
  $("#resize").click(function() {
    $("#startstop").val("Start");
    board.resize(parseInt($("#rowinput").val(), 10),
                parseInt($("#colinput").val(), 10));
    started = false;
    clearInterval(evolver);
    evolver = 0;
  });
  //Resize forms keypress
  $(".sizeinput").keypress(function(e) {
    if (e.which == '13') {
      $("#atartstop").val("Start");
      board.resize(parseInt($("#rowinput").val(), 10),
                  parseInt($("#colinput").val(), 10));
      started = false;
      clearInterval(evolver);
      evolver = 0;
    }
  });

  //Start/stop button
  $("#startstop").click(function() {
    if (started) {
      $(this).val("Start");
      started = false;
      clearInterval(evolver);
      evolver = 0;
    }
    else {
      $(this).val("Pause");
      started = true;
      evolver = setInterval(board.evolve.bind(board), board.speed);
    }
  });

  //Reset button
  $("#reset").click(function() {
    $("#startstop").val("Start");
    board.clear();

    started = false;
    clearInterval(evolver);
    evolver = 0;
    board.gen = 0;
    board.maxCells = 0;
    board.updateGenerationText();
    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  //Random button
  $("#random").click(function() {
    board.clear();
    board.aliveCells = [];
    board.updatedCells = [];
    board.cellsToUnkill = [];
    for (var i = 0; i < board.rows*board.cols; i++) {
      if (Math.floor(Math.random()*3) === 0) {
        board.cellsToUnkill.push(i);
      }
    }
    board.unkillCells();
    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  //Speed button
  $("#speedselect").change(function() {
    board.speed = this.value;
    if (started) {
      clearInterval(evolver);
      evolver = setInterval(board.evolve.bind(board), board.speed);
    }
  });

  //Rainbow button
  $("#rainbow").change(function() {
    board.rainbowOn = $(this).is(":checked");
  });

  //Pattern buttons
  $(".patternbutton").click(function() {
    $("#startstop").val("Start");
    board.clear();

    started = false;
    clearInterval(evolver);
    evolver = 0;
    board.gen = 0;
    board.maxCells = 0;
    board.updateGenerationText();
  });

  $("#stilllifes").click(function() {
    var topLeft = Math.floor(board.rows/4)*board.cols + Math.floor(board.cols/4);
    var topRight = Math.floor(board.rows/4)*board.cols + Math.floor(3*board.cols/4);
    var bottomLeft = Math.floor(3*board.rows/4)*board.cols + Math.floor(board.cols/4);
    var bottomRight = Math.floor(3*board.rows/4)*board.cols + Math.floor(3*board.cols/4);
    board.cellsToUnkill = [ //Square
                     topLeft, topLeft+1, topLeft + board.cols, topLeft+board.cols+1,
                     //Beehive
                     topRight+1, topRight+2, topRight+board.cols, topRight+board.cols+3,
                     topRight+2*board.cols+1, topRight+2*board.cols+2,
                     //Loaf
                     bottomLeft+1, bottomLeft+2, bottomLeft+board.cols, bottomLeft+board.cols+3,
                     bottomLeft+2*board.cols+1, bottomLeft+2*board.cols+3, bottomLeft+3*board.cols+2,
                     //Boat
                     bottomRight, bottomRight+1, bottomRight+board.cols,
                     bottomRight+board.cols+2, bottomRight+2*board.cols+1 ];
    board.unkillCells();

    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  $("#oscillators").click(function() {
    var topLeft = Math.floor(board.rows/4)*board.cols + Math.floor(board.cols/4);
    var topRight = Math.floor(board.rows/4)*board.cols + Math.floor(3*board.cols/4);
    var bottomLeft = Math.floor(3*board.rows/4)*board.cols + Math.floor(board.cols/4);
    var bottomRight = Math.floor(3*board.rows/4)*board.cols-8*board.cols + Math.floor(2.5*board.cols/4);
    board.cellsToUnkill = [ //Blinker
                     topLeft, topLeft+1, topLeft+2,
                     //Toad
                     topRight+1, topRight+2, topRight+3,
                     topRight+board.cols, topRight+board.cols+1, topRight+board.cols+2,
                     //Beacon
                     bottomLeft, bottomLeft+1, bottomLeft+board.cols, 
                     bottomLeft+board.cols+1, bottomLeft+2*board.cols+2, bottomLeft+2*board.cols+3, 
                     bottomLeft+3*board.cols+2, bottomLeft+3*board.cols+3,
                     //Pulsar
                     bottomRight+2, bottomRight+3, bottomRight+4, 
                     bottomRight+8, bottomRight+9, bottomRight+10,
                     bottomRight+2*board.cols, bottomRight+3*board.cols, bottomRight+4*board.cols,
                     bottomRight+2*board.cols+5, bottomRight+3*board.cols+5, bottomRight+4*board.cols+5,
                     bottomRight+2*board.cols+7, bottomRight+3*board.cols+7, bottomRight+4*board.cols+7,
                     bottomRight+2*board.cols+12, bottomRight+3*board.cols+12, bottomRight+4*board.cols+12,
                     bottomRight+5*board.cols+2, bottomRight+5*board.cols+3, bottomRight+5*board.cols+4,
                     bottomRight+5*board.cols+8, bottomRight+5*board.cols+9, bottomRight+5*board.cols+10,
                     bottomRight+7*board.cols+2, bottomRight+7*board.cols+3, bottomRight+7*board.cols+4,
                     bottomRight+7*board.cols+8, bottomRight+7*board.cols+9, bottomRight+7*board.cols+10,
                     bottomRight+8*board.cols, bottomRight+9*board.cols, bottomRight+10*board.cols,
                     bottomRight+8*board.cols+5, bottomRight+9*board.cols+5, bottomRight+10*board.cols+5,
                     bottomRight+8*board.cols+7, bottomRight+9*board.cols+7, bottomRight+10*board.cols+7,
                     bottomRight+8*board.cols+12, bottomRight+9*board.cols+12, bottomRight+10*board.cols+12,
                     bottomRight+12*board.cols+2, bottomRight+12*board.cols+3, bottomRight+12*board.cols+4,
                     bottomRight+12*board.cols+8, bottomRight+12*board.cols+9, bottomRight+12*board.cols+10
                     ];
                     
    board.unkillCells();

    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  $("#glider").click(function() {
    var topLeft = Math.floor(board.rows/4)*board.cols + Math.floor(board.cols/4);
    board.cellsToUnkill = [ //Glider
                     topLeft+2, topLeft+board.cols+2, topLeft+2*board.cols+2,
                     topLeft+board.cols, topLeft+2*board.cols+1 ];
    board.unkillCells();

    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  $("#glidergun").click(function() {
    var topLeft = Math.floor(board.rows/4)*board.cols + Math.floor(board.cols/5);
    board.cellsToUnkill = [ //Glider gun
                     topLeft+24, topLeft+board.cols+22, topLeft+board.cols+24,
                     topLeft+2*board.cols+12, topLeft+2*board.cols+13, topLeft+2*board.cols+20,
                     topLeft+2*board.cols+21, topLeft+2*board.cols+34, topLeft+2*board.cols+35,
                     topLeft+3*board.cols+34, topLeft+3*board.cols+35, topLeft+3*board.cols+11, 
                     topLeft+3*board.cols+15, topLeft+3*board.cols+20, topLeft+3*board.cols+21,
                     topLeft+4*board.cols, topLeft+4*board.cols+1, topLeft+4*board.cols+10, 
                     topLeft+4*board.cols+16,topLeft+4*board.cols+20, topLeft+4*board.cols+21, 
                     topLeft+5*board.cols, topLeft+5*board.cols+1, topLeft+5*board.cols+10, 
                     topLeft+5*board.cols+14, topLeft+5*board.cols+16, topLeft+5*board.cols+17,
                     topLeft+5*board.cols+22, topLeft+5*board.cols+24, topLeft+6*board.cols+10, 
                     topLeft+6*board.cols+16, topLeft+6*board.cols+24, topLeft+7*board.cols+11, 
                     topLeft+7*board.cols+15, topLeft+8*board.cols+12, topLeft+8*board.cols+13 ];
    board.unkillCells();

    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  $("#lwss").click(function() {
    var topLeft = Math.floor(board.rows/2)*board.cols + Math.floor(board.cols/4);
    board.cellsToUnkill = [ //Lightweight spaceship
                     topLeft, topLeft+3, topLeft+board.cols+4,
                     topLeft+2*board.cols, topLeft+2*board.cols+4,
                     topLeft+3*board.cols+1, topLeft+3*board.cols+2,
                     topLeft+3*board.cols+3, topLeft+3*board.cols+4 ];
    board.unkillCells();

    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  $("#acorn").click(function() {
    var topLeft = Math.floor(board.rows/2)*board.cols + Math.floor(board.cols/2);
    board.cellsToUnkill = [ //Acorn
                     topLeft+1, topLeft+board.cols+3, topLeft+2*board.cols,
                     topLeft+2*board.cols+1, topLeft+2*board.cols+4,
                     topLeft+2*board.cols+5, topLeft+2*board.cols+6 ];
    board.unkillCells();

    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  $("#diehard").click(function() {
    var topLeft = Math.floor(board.rows/2)*board.cols + Math.floor(board.cols/2);
    board.cellsToUnkill = [ //Diehard
                     topLeft+6, topLeft+board.cols, topLeft+board.cols+1,
                     topLeft+2*board.cols+1, topLeft+2*board.cols+5, topLeft+2*board.cols+6,
                     topLeft+2*board.cols+7 ];
    board.unkillCells();

    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  $("#mininfgrowth").click(function() {
    var topLeft = Math.floor(board.rows/2)*board.cols + Math.floor(board.cols/2);
    board.cellsToUnkill = [ //Minimal cell infinite growth
                     topLeft+5*board.cols, topLeft+5*board.cols+2, topLeft+4*board.cols+2,
                     topLeft+board.cols+4, topLeft+2*board.cols+4, topLeft+3*board.cols+4,
                     topLeft+6, topLeft+board.cols+6, topLeft+2*board.cols+6,
                     topLeft+board.cols+7 ];
    board.unkillCells();

    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  $("#onerowinfgrowth").click(function() {
    var topLeft = Math.floor(board.rows/2)*board.cols + Math.floor(board.cols/4);
    board.cellsToUnkill = [ //One row infinite growth
                     topLeft, topLeft+1, topLeft+2,
                     topLeft+3, topLeft+4, topLeft+5,
                     topLeft+6, topLeft+7, topLeft+9,
                     topLeft+10, topLeft+11, topLeft+12,
                     topLeft+13, topLeft+17, topLeft+18,
                     topLeft+19, topLeft+26, topLeft+27,
                     topLeft+28, topLeft+29, topLeft+30,
                     topLeft+31, topLeft+32, topLeft+34,
                     topLeft+35, topLeft+36, topLeft+37,
                     topLeft+38 ];
    board.unkillCells();
    
    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  $("#rpentomino").click(function() {
    var topLeft = Math.floor(board.rows/2)*board.cols + Math.floor(board.cols/2);
    board.cellsToUnkill = [ //R-pentomino
                     topLeft+1, topLeft+2, topLeft+board.cols,
                     topLeft+board.cols+1, topLeft+2*board.cols+1 ];
    board.unkillCells();
    
    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  //Make cells clickable and drag-on-able
  $(document).on("mousedown", ".board", function(e) {
    clicking = true;
    oldCell = board.getCellFromMouse(e);
    board.toggleCell(oldCell);
    board.updateLiveCellsText();
    board.updateMaxCellsText();
  });

  $(document).on("mousemove", ".board", function(e) {
    if (clicking) {
      var cell = board.getCellFromMouse(e);
      if (cell != oldCell) {
        oldCell = cell;
        board.toggleCell(oldCell);
        board.updateLiveCellsText();
        board.updateMaxCellsText();
      }
    }
  });

  $(document).on("mouseup", function() {
    clicking = false;
  });
  
};

function Board() {
  this.aliveCells = [];
  this.activeCells = [];
  this.cellIsAlive = [];
  this.cellsToKill = [];
  this.cellsToUnkill = [];
  this.gen = 0;
  this.cols = 175; 
  this.rows = 100;
  this.speed = 1;
  this.sqSize = 5;
  this.maxCells = 0;
  this.maxCellGen = 0;
  this.rainbowOn = false;
  this.rainbowColors = [ "#A83939", "#A839A5", "#3964A8", "#39A896", "#42A839", "#FF9721", "#FFFB21" ];

  for (var i = 0; i < this.rows*this.cols; i++)
    this.cellIsAlive[i] = 0;
}

Board.prototype.resize = function(newRows, newCols) {
  this.rows = newRows;
  this.cols = newCols;
  
  $(".board").remove();
  $(".boardcontainer").append("<canvas class='board' id='board' width='"+ 
              ((this.cols)*this.sqSize-1).toString() + "' height='" + ((this.rows)*this.sqSize-1).toString() + "'></canvas>");
              
  this.draw();
};

Board.prototype.clear = function() {
  this.activeCells = [];
  this.cellsToKill = [];
  this.cellsToUnkill = [];
  
  for (var i = 0; i < this.aliveCells.length; i++)
    this.cellsToKill[i] = this.aliveCells[i];
  this.killCells();
};

Board.prototype.erase = function() {
  var cx = document.querySelector(".board").getContext("2d");
  cx.clearRect(0, 0, $(".board").width, $(".board").height);
};

Board.prototype.killCells = function() {
  var cx = document.querySelector(".board").getContext("2d");
  var row, col; //0 <= row < this.rows
  var index;
  
  for (var i = 0; i < this.cellsToKill.length; i++) {
    index = this.aliveCells.indexOf(this.cellsToKill[i]);
    this.aliveCells.splice(index, 1);
    
    row = Math.floor(this.cellsToKill[i]/this.cols);
    col = Math.floor(this.cellsToKill[i]%this.cols);
    this.cellIsAlive[this.cellsToKill[i]] = 0;
    cx.clearRect(col*this.sqSize, row*this.sqSize, this.sqSize-1, this.sqSize-1);
  }
  
  this.cellsToKill = [];
};

Board.prototype.unkillCells = function() {
  var cx = document.querySelector(".board").getContext("2d");
  cx.fillStyle = "#872F6D";
  var row, col; //0 <= row < this.rows
  var randIndex;
  
  for (var i = 0; i < this.cellsToUnkill.length; i++) {
    if (this.rainbowOn) {
       randIndex = Math.floor(Math.random() * this.rainbowColors.length);
       cx.fillStyle = this.rainbowColors[randIndex];
    }

    this.aliveCells.push(this.cellsToUnkill[i]);
    
    row = Math.floor(this.cellsToUnkill[i]/this.cols);
    col = Math.floor(this.cellsToUnkill[i]%this.cols);
    this.cellIsAlive[this.cellsToUnkill[i]] = 1;
    cx.fillRect(col*this.sqSize, row*this.sqSize, this.sqSize-1, this.sqSize-1);
  }
  
  this.cellsToUnkill = [];
};

Board.prototype.toggleCell = function(cell) {
  var cx = document.querySelector(".board").getContext("2d");
  cx.fillStyle = "#872F6D";
  var row, col; //0 <= row < this.rows
  var index, randIndex;
  
  row = Math.floor(cell/this.cols);
  col = Math.floor(cell%this.cols);
  
  if (this.queryCell(cell)) {
    index = this.aliveCells.indexOf(cell);
    this.aliveCells.splice(index, 1);
    this.cellIsAlive[cell] = 0;
    cx.clearRect(col*this.sqSize, row*this.sqSize, this.sqSize-1, this.sqSize-1);
  }
  else {
    if (this.rainbowOn) {
       randIndex = Math.floor(Math.random() * this.rainbowColors.length);
       cx.fillStyle = this.rainbowColors[randIndex];
    }
    this.aliveCells.push(cell);
    this.cellIsAlive[cell] = 1;
    cx.fillRect(col*this.sqSize, row*this.sqSize, this.sqSize-1, this.sqSize-1);
  }
};

Board.prototype.getCellFromMouse = function(e) {
  return Math.floor((e.pageY - $(".board").offset().top)/this.sqSize)*this.cols 
         + Math.floor((e.pageX - $(".board").offset().left)/this.sqSize);
};

Board.prototype.queryCell = function(cell) {
  var row = Math.floor(cell/this.cols);
  var col = Math.floor(cell%this.cols);
  var cx = document.querySelector(".board").getContext("2d");
  var imgd = cx.getImageData((col+0.5)*this.sqSize, (row+0.5)*this.sqSize, 1, 1);
  var pix = imgd.data;

  return (pix[3] === 0) ? false : true;
};

Board.prototype.draw = function() {
  var cx = document.querySelector(".board").getContext("2d");
  cx.beginPath();

  //Draw the column lines
  for (var c = 1; c <= this.cols; c++) {
    cx.moveTo(c*this.sqSize-0.5, 0.5);
    cx.lineTo(c*this.sqSize-0.5, $(".board").height()+0.5);
  }
  //Draw the row lines
  for (var r = 1; r <= this.rows; r++) {
    cx.moveTo(0.5, r*this.sqSize-0.5);
    cx.lineTo($(".board").width()+0.5, r*this.sqSize-0.5);
  }
  cx.strokeStyle = "#dddddd";
  cx.stroke();

};

Board.prototype.getActiveCellsFromAliveCells = function() {
  var directions = [ -this.cols, -this.cols+1, 1, this.cols+1, 
                     this.cols, this.cols-1, -1, -this.cols-1 ];
  
  this.activeCells = [];

  //Put cell and all neighbors of alive cells in activeCells
  for (var i = 0; i < this.aliveCells.length; i++) {
    this.activeCells.push(this.aliveCells[i]);

    for (var d = 0; d < directions.length; d++) {
        var dir = directions[d];
        
        //Wrap disabled
        if (!$('#wrap').is(':checked')) { 
          //If we're on the left edge, don't wrap
          if ((this.aliveCells[i]+1)%this.cols === 1) {
            if (dir === -1 || dir === -this.cols-1 || dir === this.cols-1) {
              continue;
            }
          }
          //If we're on the right edge, don't wrap
          if ((this.aliveCells[i]+1)%this.cols === 0) {
            if (dir === 1 || dir === -this.cols+1 || dir === this.cols+1) {
              continue;
            }
          }
        
          //If we're out of bounds, don't do it
          if (this.aliveCells[i]+dir < 0 || this.aliveCells[i]+dir >= this.rows*this.cols) {
            continue;
          }
        }
        else { //Wrap enabled
          //Adjust top/bottom wrap-around
          if (this.aliveCells[i]+dir < 0) {
            dir += this.rows*this.cols;
          }
          else if (this.aliveCells[i]+dir >= this.rows*this.cols) {
            dir -= this.rows*this.cols;
          }
        }
        
      this.activeCells.push(this.aliveCells[i]+dir);
      }
    
  }
  
  this.activeCells.sort(function(a, b) { return a - b});
};

Board.prototype.increaseGen = function() {
  this.gen++;
  this.updateGenerationText();
};

Board.prototype.evolve = function() {
  var neighborCount = 0,
      $cell, 
      index;
  
  this.updatedCells = [];
  this.getActiveCellsFromAliveCells();
  
  //For each active cell, count the number of times it is touched by a neighbor
  for (var j = 0; j < this.activeCells.length; j++) {
    
    index = this.aliveCells.indexOf(this.activeCells[j]);
    neighborCount = (index == -1) ? 1 : 0;
    
    while (j+1 < this.activeCells.length && this.activeCells[j] == this.activeCells[j+1] ) {
      neighborCount++;
      j++;
    }
    
    //Life or death!

    //Death
    if (neighborCount < 2 || neighborCount > 3) { 
      //If it was previously alive, update it
      if (index > -1) {
       this.updatedCells.push(this.activeCells[j]);
       this.cellsToKill.push(this.activeCells[j]);
      }
    }
    //Life
    else if (neighborCount == 3) {
      //If it was previously dead, update it
      if (index == -1) {
        this.updatedCells.push(this.activeCells[j]);
        this.cellsToUnkill.push(this.activeCells[j]);
      }
    }
  }
  
  this.killCells();
  this.unkillCells();
  
  this.increaseGen();
  this.updateLiveCellsText();
  this.updateMaxCellsText();
};

Board.prototype.updateGenerationText = function() {
  $(".generation").text("Generation: " + this.gen.toString());
};

Board.prototype.updateLiveCellsText = function() {
  $(".livecells").text("Live cells: " + this.aliveCells.length);
};

Board.prototype.updateMaxCellsText = function() {
  if (this.aliveCells.length > this.maxCells) {
    this.maxCells = this.aliveCells.length;
    this.maxCellGen = this.gen;
  }
  $(".maxcells").text("Max cells: " + this.maxCells + " (gen " + this.maxCellGen + ")");
};

Array.prototype.eraseDuplicates = function() {
  var isDup;
  var dups = [];
  return this.filter(function(x) {
    isDup = dups[x];
    dups[x] = true;
    return !isDup;
  });
};

$(document).ready(main);
