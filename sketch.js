let words = [];
let draggedWord = null;
let saveButton, resetButton;

function setup() {
  createCanvas(1300, 1700);  // Establecemos un tamaño fijo para el canvas
  textSize(16);
  textAlign(CENTER, CENTER);

  let exampleWords = [
    "Cuando", "la", "única", "salida", "es", "destruir", "a", "quienes", "destruyen",
    "y", "lo", "que", "permanece", "empiece", "a", "caer", "Cuando", "el", "silencio",
    "sea", "más", "puro", "que", "sus", "palabras", "más", "puro", "que", "sus", "balbuceos",
    "sus", "ojos", "sus", "mentiras", "Cuando", "la", "necesidad", "de", "destruir", "nos", "encuentre",
    "y", "busquemos", "el", "caos", "para", "poder", "renacer", "en", "el", "polvo", "de", "sus", "agravios",
    "Cuando", "ya", "no", "haya", "nada", "Nada", "más", "que", "perder", "Y", "solo", "queden", "los", "dejos",
    "de", "lo", "que", "una", "vez", "fue", "Desde", "nuestros", "cadáveres", "desde", "nuestras", "grietas",
    "desde", "nuestras", "cenizas", "Desde", "nuestras", "manos", "callosas", "Desde", "lo", "profundo",
    "de", "nuestras", "gargantas", "en", "gritos", "ahogados", "en", "lágrimas", "secas", "Ahí", "Solo", "ahí",
    "Nacerá", "la", "venganza", "Colectiva"
  ];

  let colWidth = (width - 100) / 11;  // Ajustamos el ancho de la columna para el tamaño fijo
  let colX = [100 + 40, 100 + colWidth + 40, 120 + colWidth * 2];
  let colY = [50, 50, 50];

  exampleWords.forEach((word, index) => {
    let colIndex = index % 3;
    let x = colX[colIndex];
    let y = colY[colIndex];
    words.push(new Word(word, x, y));
    colY[colIndex] += 42;
  });

  saveButton = createButton('Guardar como JPG');
  saveButton.position(20, height - 80);
  saveButton.mousePressed(saveAsJpg);

  resetButton = createButton('Restablecer');
  resetButton.position(20, height - 120);
  resetButton.mousePressed(resetText);
}

function draw() {
  background(0);

  fill(255);
  noStroke();
  rect(550, 0, width - 550, height);  // El área de la derecha siempre tiene un tamaño fijo

  words.forEach(word => word.display());
}

function mousePressed() {
  words.forEach(word => {
    if (word.isMouseOver()) {
      draggedWord = word;
      word.startDragging();
    }
  });
}

function mouseReleased() {
  if (draggedWord) {
    draggedWord.stopDragging();
    draggedWord = null;
  }
}

function mouseDragged() {
  if (draggedWord) {
    draggedWord.drag(mouseX, mouseY);
  }
}

function saveAsJpg() {
  saveCanvas('mi_composicion', 'jpg'); // Guardamos el canvas como JPG
}

function resetText() {
  words.forEach(word => {
    word.resetPosition();
  });
}

class Word {
  constructor(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.initialX = x; // Guardamos la posición inicial
    this.initialY = y;
    this.size = textWidth(text) + 20;
    this.isDragging = false;
  }

  display() {
    let isInCommunityArea = this.x > 400;  // El límite de la zona de la derecha

    if (this.isDragging) {
      fill(255, 50);
    } else {
      fill(isInCommunityArea ? 0 : 255);
    }

    stroke(isInCommunityArea ? 255 : 0);
    let rectX = this.x - this.size / 2;
    rect(rectX, this.y, this.size, 30);

    fill(this.isDragging ? 255 : isInCommunityArea ? 255 : 0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(this.text, this.x, this.y + 15);
  }

  isMouseOver() {
    let rectX = this.x - this.size / 2;
    return mouseX > rectX && mouseX < rectX + this.size && mouseY > this.y && mouseY < this.y + 30;
  }

  startDragging() {
    this.isDragging = true;
  }

  stopDragging() {
    this.isDragging = false;
  }

  drag(newX, newY) {
    this.x = newX;
    this.y = newY - 15;
  }

  resetPosition() {
    this.x = this.initialX; // Restablecemos la posición inicial
    this.y = this.initialY;
  }
}
