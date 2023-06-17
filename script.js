function createGrid(rows, columns) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const square = document.createElement("div");
      square.className = "square";
      square.addEventListener("click", toggleHighlight);
      square.addEventListener("mouseover", highlightSquare);
      square.addEventListener("mouseout", unhighlightSquare);
      grid.appendChild(square);
    }
  }
}

function highlightSquare() {
  this.classList.add("hover");
}

function unhighlightSquare() {
  this.classList.remove("hover");
}

function randomizeHighlights(count) {
  const squares = document.getElementsByClassName("square");
  const totalSquares = squares.length;
  const indices = Array.from({ length: totalSquares }, (_, i) => i);
  

  // Remove the "closest" class from squares
  for (let i = 0; i < squares.length; i++) {
    squares[i].classList.remove("closest");
  }

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * indices.length);
    const highlightIndex = indices[randomIndex];
    const square = squares[highlightIndex];
    square.classList.add("highlight");
    indices.splice(randomIndex, 1);
  }
}

function clearHighlights() {
  const squares = document.getElementsByClassName("square");
  for (let i = 0; i < squares.length; i++) {
    squares[i].classList.remove("highlight");
  }
}

function toggleHighlight() {
  this.classList.toggle("highlight");
}

function divideAndConquer() {
  const squares = document.getElementsByClassName("square");
  const highlightedSquares = document.getElementsByClassName("highlight");

  const closestPairs = findClosestPairs(Array.from(highlightedSquares));

  for (let i = 0; i < squares.length; i++) {
    squares[i].classList.remove("closest");
  }

  for (let i = 0; i < closestPairs.length; i++) {
    closestPairs[i][0].classList.add("closest");
    closestPairs[i][1].classList.add("closest");
  }
}

function findClosestPairs(points) {
  if (points.length < 2) {
    return [];
  }

  const closestPairs = [];
  let minDistance = calculateDistance(points[0], points[1]);

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = calculateDistance(points[i], points[j]);

      if (distance < minDistance) {
        minDistance = distance;
        closestPairs.length = 0;
        closestPairs.push([points[i], points[j]]);
      } else if (distance === minDistance) {
        closestPairs.push([points[i], points[j]]);
      }
    }
  }

  return closestPairs;
}

function calculateDistance(point1, point2) {
  const x1 = point1.offsetLeft + point1.offsetWidth / 2;
  const y1 = point1.offsetTop + point1.offsetHeight / 2;
  const x2 = point2.offsetLeft + point2.offsetWidth / 2;
  const y2 = point2.offsetTop + point2.offsetHeight / 2;

  const dx = x2 - x1;
  const dy = y2 - y1;

  return Math.sqrt(dx * dx + dy * dy);
}

document.getElementById("randomize").addEventListener("click", function () {
  const highlightCount = parseInt(document.getElementById("highlight").value);
  clearHighlights();
  randomizeHighlights(highlightCount);
});

document.getElementById("divideAndConquer").addEventListener("click", divideAndConquer);

document.getElementById("clear").addEventListener("click", function () {
  clearHighlights();
  const closestSquares = document.getElementsByClassName("closest");
  for (let i = closestSquares.length - 1; i >= 0; i--) {
    closestSquares[i].classList.remove("closest");
  }
});

const rowsInput = document.getElementById("rows");
const columnsInput = document.getElementById("columns");

rowsInput.addEventListener("input", function () {
  const rows = parseInt(this.value);
  const columns = parseInt(columnsInput.value);
  createGrid(rows, columns);
});

columnsInput.addEventListener("input", function () {
  const rows = parseInt(rowsInput.value);
  const columns = parseInt(this.value);
  createGrid(rows, columns);
});

// Initialize grid
createGrid(10, 10);
