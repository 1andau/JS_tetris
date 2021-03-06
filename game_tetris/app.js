let main = document.querySelector(".main");

let playfield = [                          //все соответсвия, каждый отдельный ряд представляет собой массив
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],

];

 let gameSpeed = 100;

function draw() {   //выносим весь код в отдельную функцию, она будет постоянно обновялть элемент 
  let mainInnerHTML = "";
  for (let y = 0; y < playfield.length; y++) {  //нам нужно полностью пройтись по всем рядам которые есть в ряду playfield
                                                 //счетчик называем "y", так как мы булем проходить сверху вниз по всем рядам



    for (let x = 0; x < playfield[y].length; x++) {  //вложенный цикл для первого ряда нулей по горизонтали, который будет проходиться по ним, выбираем 
                                          //playfield, т.е все поле, "y" - каждай отдельный ряд, length - кол-во элементов в каждом отдельном ряду
      if (playfield[y][x] === 1) {
        mainInnerHTML += '<div class="cell movingCell"></div>'; // эта строка отображает в консоли множество div, в которой хранится вся нужная разметка 
      } else if (playfield[y][x] === 2) {
        mainInnerHTML += '<div class="cell fixedCell"></div>';
      } else {
        mainInnerHTML += '<div class="cell"></div>';
      }
    }
  }

  main.innerHTML = mainInnerHTML; //тут мы присвоили main'u разметку movingCell
}

function canTetroMoveDown() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        if (y === playfield.length - 1 || playfield[y + 1][x] === 2) {
          return false;
        }
      }
    }
  }

  return true;
}

function moveTetroDown() {
  if (canTetroMoveDown()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      for (let x = 0; x < playfield[y].length; x++) {
        if (playfield[y][x] === 1) {
          playfield[y + 1][x] = 1;
          playfield[y][x] = 0;
        }
      }
    }
  } else {
    fixTetro();
  }
}

// Двигаем фигирку влево
function canTetroMoveLeft() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        if (x === 0 || playfield[y][x - 1] === 2) {
          return false;
        }
      }
    }
  }

  return true;
}

function moveTetroLeft() {
  if (canTetroMoveLeft()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      for (let x = 0; x < playfield[y].length; x++) {
        if (playfield[y][x] === 1) {
          playfield[y][x - 1] = 1;
          playfield[y][x] = 0;
        }
      }
    }
  }
}

// Двигаем фигирку вправо
function canTetroMoveRight() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        if (x === 9 || playfield[y][x + 1] === 2) {
          return false;
        }
      }
    }
  }

  return true;
}

function moveTetroRight() {
  if (canTetroMoveRight()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      for (let x = 9; x >= 0; x--) {
        if (playfield[y][x] === 1) {
          playfield[y][x + 1] = 1;
          playfield[y][x] = 0;
        }
      }
    }
  }
}

function removeFullLines() {
  let canRemoveLine = true;
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] !== 2) {
        canRemoveLine = false;
      }
    }
    if (canRemoveLine) {
      playfield.splice(y, 1);
    }
  }
}

function fixTetro() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        playfield[y][x] = 2;
      }
    }
  }

  removeFullLines();

  playfield[0] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
  playfield[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
}

draw();

document.onkeydown = function (e) {
  if (e.keyCode === 37) {
    moveTetroLeft();
  } else if (e.keyCode === 39) {
    moveTetroRight();
  } else if (e.keyCode === 40) {
    moveTetroDown();
  }
  draw();
};

function startGame() {
  moveTetroDown();
  draw();
  setTimeout(startGame, gameSpeed);
}

setTimeout(startGame, gameSpeed);
