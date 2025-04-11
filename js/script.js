const functions = [
  { type: "afim", text: "f(x) = 2x + 1" },
  { type: "afim", text: "f(x) = 3x - 1" },
  { type: "afim", text: "f(x) = x - 3" },
  { type: "afim", text: "f(x) = -x + 5" },
  { type: "afim", text: "f(x) = 0,5x" },
  { type: "afim", text: "f(x) = 4x" },
  { type: "afim", text: "f(x) = √x - 1" },
  { type: "afim", text: "f(x) = 2x" },
  { type: "afim", text: "f(x) = x - 9" },
  { type: "afim", text: "f(x) = 2x" },
  { type: "afim", text: "f(x) = -9x" },
  { type: "afim", text: "f(x) = 6x - 14" },
  { type: "afim", text: "f(x) = -√x" },
  { type: "afim", text: "f(x) = 5x - 6" },
  { type: "quadratica", text: "f(x) = x²" },
  { type: "quadratica", text: "f(x) = x² + 1" },
  { type: "quadratica", text: "f(x) = x² - 4" },
  { type: "quadratica", text: "f(x) = x² - 5x + 6" },
  { type: "quadratica", text: "f(x) = -3x²" },
  { type: "quadratica", text: "f(x) = 2x² - 3" },
  { type: "quadratica", text: "f(x) = -2x² + 3" },
  { type: "quadratica", text: "f(x) = 3x²" },
  { type: "quadratica", text: "f(x) = x² - 3" },
  { type: "quadratica", text: "f(x) = 2x² + 4" },
  { type: "quadratica", text: "f(x) = x² - 3x + 9" },
  { type: "quadratica", text: "f(x) = -9x²" },
  { type: "quadratica", text: "f(x) = 10x² + 4" },
  { type: "quadratica", text: "f(x) = -3x² - 8" },
  { type: "exponencial", text: "f(x) = eˣ" },
  { type: "exponencial", text: "f(x) = 2eˣ" },
  { type: "exponencial", text: "f(x) = e⁻ˣ + 2" },
  { type: "exponencial", text: "f(x) = eˣ - 3" },
  { type: "exponencial", text: "f(x) = 10ˣ" },
  { type: "exponencial", text: "f(x) = 0,5ˣ" },
  { type: "exponencial", text: "f(x) = 3ˣ + 1" },
  { type: "exponencial", text: "f(x) = 5ˣ - 1" },
  { type: "exponencial", text: "f(x) = -5ˣ" },
  { type: "exponencial", text: "f(x) = e⁻ˣ" },
  { type: "exponencial", text: "f(x) = 2⁻ˣ" },
  { type: "logaritmica", text: "f(x) = log₁₀(x)" },
  { type: "logaritmica", text: "f(x) = ln(x)" },
  { type: "logaritmica", text: "f(x) = log₂(x)" },
  { type: "logaritmica", text: "f(x) = ln(x + 1)" },
  { type: "logaritmica", text: "f(x) = ln(2x)" },
  { type: "logaritmica", text: "f(x) = log₁₀(x - 2)" },
  { type: "logaritmica", text: "f(x) = log₁₀(x + 4)" },
  { type: "logaritmica", text: "f(x) = log₃(3x + 1)" },
  { type: "logaritmica", text: "f(x) = log₂(x)" },
  { type: "logaritmica", text: "f(x) = log₃(x + 5)" },
  { type: "logaritmica", text: "f(x) = log₂(5x)" }
];

let counts = { afim: 0, quadratica: 0, exponencial: 0, logaritmica: 0 };
let timerStarted = false, startTime = 0, timerInterval = null;

function formatTime(t) {
  return t < 10 ? `0${t}` : t;
}

function updateTimer() {
  const elapsed = Date.now() - startTime;
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  document.getElementById("timer").textContent = `Tempo: ${formatTime(minutes)}:${formatTime(seconds)}`;
}

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").textContent = "Tempo: 00:00";
  timerStarted = false;
}

function updateCounts() {
  document.getElementById("afimCount").textContent = `${counts.afim}/14`;
  document.getElementById("quadraticaCount").textContent = `${counts.quadratica}/14`;
  document.getElementById("exponencialCount").textContent = `${counts.exponencial}/11`;
  document.getElementById("logaritmicaCount").textContent = `${counts.logaritmica}/11`;
}

function checkWin() {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 50) {
    stopTimer();
    setTimeout(() => {
      alert("Você finalizou o jogo!");
    }, 300);
  }
}

function renderCards() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";
  functions.sort(() => Math.random() - 0.5).forEach(func => {
    const card = document.createElement("div");
    card.className = "carta";
    card.textContent = func.text;
    card.dataset.type = func.type;
    container.appendChild(card);
  });
}

function resetGame() {
  for (let key in counts) counts[key] = 0;
  updateCounts();
  renderCards();
  setupSortable();
  resetTimer();
}

function setupSortable() {
  const container = document.getElementById("cardContainer");
  const dropAreas = document.querySelectorAll(".drop-area");

  dropAreas.forEach(area => {
    Sortable.create(area, {
      group: "shared",
      animation: 150,
      onAdd: function (evt) {
        const card = evt.item;
        const correctType = card.dataset.type;
        const targetType = area.dataset.area;

        if (correctType === targetType) {
          card.remove();
          counts[targetType]++;
          updateCounts();
          checkWin();
        } else {
          // devolve se errado
          container.appendChild(card);
        }

        startTimer();
      }
    });
  });

  Sortable.create(container, {
    group: "shared",
    animation: 150
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  setupSortable();
  updateCounts();
  resetTimer();
});

