const boardContainer = document.getElementById('board-container');
const rollBtn = document.getElementById('roll-btn');
const diceDisplay = document.getElementById('dice-display');
const currentPlayerSpan = document.getElementById('current-player');
const messageEl = document.getElementById('message');

// Configuration des joueurs (On commence avec 2 joueurs)
const players = [
    { name: 'Rouge', color: '#e94560', pos: 0 },
    { name: 'Bleu', color: '#3498db', pos: 0 }
];

let currentPlayerIndex = 0;
let isRolling = false;

// Crée les pions sur le plateau
function createBoard() {
    boardContainer.innerHTML = ''; // Nettoie le plateau

    // Créer les pions visuels
    players.forEach((p, index) => {
        const pawn = document.createElement('div');
        pawn.id = `pawn-${index}`;
        pawn.style.width = '30px';
        pawn.style.height = '30px';
        pawn.style.borderRadius = '50%';
        pawn.style.backgroundColor = p.color;
        pawn.style.position = 'absolute';
        pawn.style.transition = 'all 0.4s ease-in-out'; // Animation fluide
        pawn.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        pawn.style.zIndex = '10';
        
        // Position de départ (au centre)
        pawn.style.left = '165px'; 
        pawn.style.top = '165px';
        
        boardContainer.appendChild(pawn);
    });
}

// Calcule la position du pion pour faire le tour du plateau
function updatePawnPosition(playerIndex) {
    const pawn = document.getElementById(`pawn-${playerIndex}`);
    const pos = players[playerIndex].pos;
    
    // On simule un tour de 40 cases maximum pour ce prototype
    const steps = 40;
    const posOnSide = pos % steps;
    
    let x, y;
    const boardSize = 360; // Taille du plateau
    const pawnSize = 30;
    const margin = 10;
    const trackSize = boardSize - (margin * 2) - pawnSize;

    if (posOnSide < 10) { // Côté bas (vers la droite)
        x = margin + (posOnSide / 10) * trackSize;
        y = boardSize - margin - pawnSize;
    } else if (posOnSide < 20) { // Côté droit (vers le haut)
        x = boardSize - margin - pawnSize;
        y = margin + ((posOnSide - 10) / 10) * trackSize;
    } else if (posOnSide < 30) { // Côté haut (vers la gauche)
        x = boardSize - margin - pawnSize - ((posOnSide - 20) / 10) * trackSize;
        y = margin;
    } else { // Côté gauche (vers le bas)
        x = margin;
        y = boardSize - margin - pawnSize - ((posOnSide - 30) / 10) * trackSize;
    }

    pawn.style.left = `${x}px`;
    pawn.style.top = `${y}px`;
}

function rollDice() {
    if (isRolling) return;
    isRolling = true;
    messageEl.textContent = "Lancer en cours...";
    rollBtn.disabled = true;
    
    let count = 0;
    // Animation du dé
    const interval = setInterval(() => {
        diceDisplay.textContent = Math.floor(Math.random() * 6) + 1;
        count++;
        if (count > 10) {
            clearInterval(interval);
            finalizeRoll();
        }
    }, 50);
}

function finalizeRoll() {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    diceDisplay.textContent = diceValue;
    
    const currentPlayer = players[currentPlayerIndex];
    currentPlayer.pos += diceValue;
    
    // Condition de victoire (ex: 40 cases pour faire le tour)
    if (currentPlayer.pos >= 40) {
        messageEl.textContent = `🏆 ${currentPlayer.name} a fait le tour et gagne la partie !`;
        messageEl.style.color = currentPlayer.color;
        rollBtn.disabled = true;
        isRolling = false;
        return;
    }

    updatePawnPosition(currentPlayerIndex);
    messageEl.textContent = `${currentPlayer.name} a avancé de ${diceValue} case(s).`;
    
    // Règle du Ludo : Si on fait 6, on rejoue. Sinon, on passe au joueur suivant.
    if (diceValue !== 6) {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    } else {
        messageEl.textContent += " (Il a fait 6, il rejoue !)";
    }
    
    // Met à jour l'affichage du joueur actuel
    currentPlayerSpan.textContent = players[currentPlayerIndex].name;
    currentPlayerSpan.style.color = players[currentPlayerIndex].color;
    
    rollBtn.disabled = false;
    isRolling = false;
}

// Écouteur d'événement sur le bouton
rollBtn.addEventListener('click', rollDice);

// Initialisation au chargement de la page
createBoard();
currentPlayerSpan.textContent = players[0].name;
currentPlayerSpan.style.color = players[0].color;