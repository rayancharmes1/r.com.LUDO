// Version simplifiée pour démarrer.
// Un vrai plateau de Ludo complet est complexe.
// Ceci est un squelette fonctionnel que l'on peut améliorer ensemble.

const players = ['Rouge', 'Vert', 'Jaune', 'Bleu'];
const colors = ['#e94560', '#2ecc71', '#f1c40f', '#3498db'];
let currentPlayerIndex = 0;
let diceValue = 0;

const board = document.getElementById('board');
const rollButton = document.getElementById('roll-dice');
const diceResult = document.getElementById('dice-result');
const currentPlayerSpan = document.getElementById('current-player');

// Crée une grille visuelle simple (pas encore le vrai chemin)
function initBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 15 * 15; i++) {
        const cell = document.createElement('div');
        cell.style.border = '1px solid #0f3460';
        board.appendChild(cell);
    }
}

function rollDice() {
    diceValue = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `Dé : ${diceValue}`;
    
    // Logique simple : si 6, on peut rejouer (à améliorer)
    if (diceValue === 6) {
        alert(`${players[currentPlayerIndex]} a fait 6 ! Il/Elle peut rejouer.`);
        // Ne change pas de joueur
    } else {
        // Passe au joueur suivant
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    }
    currentPlayerSpan.textContent = players[currentPlayerIndex];
    currentPlayerSpan.style.color = colors[currentPlayerIndex];
}

rollButton.addEventListener('click', rollDice);

initBoard();
currentPlayerSpan.textContent = players[0];
currentPlayerSpan.style.color = colors[0];