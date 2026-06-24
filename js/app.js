// Main Application
let currentGame = null;

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');

    if (event && event.target) {
        event.target.classList.add('active');
    }

    if (sectionId === 'games') {
        loadGames();
    } else if (sectionId === 'leaderboard') {
        loadLeaderboard();
    } else if (sectionId === 'profile') {
        loadProfile();
    }
}

function loadGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';

    GAMES.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div style="font-size: 3em; margin: 10px 0;">${game.thumbnail}</div>
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <div class="game-score" id="score-${game.id}">Best: --</div>
        `;
        gameCard.onclick = () => playGame(game.id);
        gamesGrid.appendChild(gameCard);

        loadGameBestScore(game.id);
    });
}

function loadGameBestScore(gameId) {
    const leaderboard = storage.getLeaderboardByGame(gameId);
    const user = storage.getUser();
    const userScore = leaderboard.find(entry => entry.username === user.username);
    
    if (userScore) {
        document.getElementById(`score-${gameId}`).textContent = `Best: ${userScore.score}`;
    }
}

function playGame(gameId) {
    closeGame();
    document.getElementById('gameModal').style.display = 'block';

    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.id = 'gameCanvas';
    gameContainer.appendChild(canvas);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close Game';
    closeBtn.style.marginTop = '20px';
    closeBtn.style.padding = '10px 20px';
    closeBtn.style.background = '#667eea';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '5px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = closeGame;
    gameContainer.appendChild(closeBtn);

    switch(gameId) {
        case 'darkroom':
            currentGame = new DarkRoomGame();
            break;
        case 'nogeneral':
            currentGame = new ThereIsNoGameGame();
            break;
        case 'sortcourt':
            currentGame = new SortTheCourtGame();
            currentGame.draw();
            break;
        case 'incredibox':
            currentGame = new IncrediboxGame();
            break;
        case 'simon':
            currentGame = new SimonSaysGame();
            currentGame.setupControls();
            currentGame.draw();
            break;
        case 'wordle':
            currentGame = new WordleGame();
            break;
        case 'dicewars':
            currentGame = new DiceWarsGame();
            currentGame.draw();
            break;
        case 'adventure':
            currentGame = new AdventureGame();
            break;
        case 'targetpractice':
            currentGame = new TargetPracticeGame();
            currentGame.setupControls();
            currentGame.draw();
            break;
        case 'snake':
            currentGame = new SnakeGame();
            break;
        case 'flappy':
            currentGame = new FlappyBirdGame();
            break;
        case 'memory':
            currentGame = new MemoryGame();
            currentGame.setupControls();
            currentGame.draw();
            break;
        case 'whackmole':
            currentGame = new WhackAMoleGame();
            currentGame.setupControls();
            currentGame.draw();
            break;
        case 'tictactoe':
            currentGame = new TicTacToeGame();
            break;
        case 'hangman':
            currentGame = new HangmanGame();
            break;
        case 'pong':
            currentGame = new PongGame();
            break;
        case 'spaceinvaders':
            currentGame = new SpaceInvadersGame();
            break;
        case 'painter':
        case 'dnagame':
        case 'breakdance':
        case 'gravity':
        case 'asteroids':
        case 'tangram':
        case 'tetris':
        case 'breakout':
        case '2048':
            gameContainer.innerHTML += `<p style="color: #667eea; font-size: 18px; margin-top: 20px;">⏳ ${GAMES.find(g => g.id === gameId).name} - Coming Soon!</p>`;
            break;
        default:
            gameContainer.innerHTML += `<p style="color: #667eea; font-size: 18px; margin-top: 20px;">Game coming soon!</p>`;
    }
}

function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
    if (currentGame && currentGame.gameLoop) {
        clearInterval(currentGame.gameLoop);
    }
    currentGame = null;
}

function loadLeaderboard() {
    const leaderboard = storage.getTopScores(30);
    const container = document.getElementById('leaderboardContent');
    
    if (leaderboard.length === 0) {
        container.innerHTML = '<p>No scores yet. Play a game to get on the leaderboard!</p>';
        return;
    }

    let html = '<table class="leaderboard-table"><thead><tr><th>Rank</th><th>Player</th><th>Game</th><th>Score</th><th>Date</th></tr></thead><tbody>';
    
    leaderboard.forEach((entry, index) => {
        const date = new Date(entry.date).toLocaleDateString();
        html += `<tr>
            <td>${index + 1}</td>
            <td>${entry.username}</td>
            <td>${entry.gameName}</td>
            <td><strong>${entry.score}</strong></td>
            <td>${date}</td>
        </tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

function loadProfile() {
    const user = storage.getUser();
    const stats = storage.getUserStats();
    const leaderboard = storage.getLeaderboard().filter(e => e.username === user.username);
    
    let html = `
        <div class="profile-card">
            <h3>👤 ${user.username}</h3>
            <p>ID: ${user.id}</p>
            <p>Joined: ${new Date(user.joinDate).toLocaleDateString()}</p>
        </div>

        <div class="profile-stats">
            <div class="stat-card">
                <h3>${stats.gamesPlayed}</h3>
                <p>Games Played</p>
            </div>
            <div class="stat-card">
                <h3>${stats.highestScore}</h3>
                <p>Highest Score</p>
            </div>
            <div class="stat-card">
                <h3>${stats.averageScore}</h3>
                <p>Average Score</p>
            </div>
            <div class="stat-card">
                <h3>${stats.totalScore}</h3>
                <p>Total Score</p>
            </div>
        </div>

        <h3 style="margin-top: 30px;">Your Recent Scores</h3>
        <table class="leaderboard-table">
            <thead>
                <tr><th>Game</th><th>Score</th><th>Date</th></tr>
            </thead>
            <tbody>
    `;

    const recentScores = leaderboard.slice(0, 15);
    if (recentScores.length === 0) {
        html += '<tr><td colspan="3">No scores yet</td></tr>';
    } else {
        recentScores.forEach(entry => {
            const date = new Date(entry.date).toLocaleDateString();
            html += `<tr><td>${entry.gameName}</td><td>${entry.score}</td><td>${date}</td></tr>`;
        });
    }

    html += `
            </tbody>
        </table>

        <div style="margin-top: 30px;">
            <button class="btn-primary" onclick="changeUsername()">Change Username</button>
            <button class="btn-primary" style="background: #ff6b6b; margin-left: 10px;" onclick="resetProfile()">Reset Profile</button>
        </div>
    `;

    document.getElementById('profileContent').innerHTML = html;
}

function changeUsername() {
    const newUsername = prompt('Enter new username:', storage.getUser().username);
    if (newUsername && newUsername.trim() !== '') {
        storage.updateUsername(newUsername.trim());
        loadProfile();
        alert('Username updated!');
    }
}

function resetProfile() {
    if (confirm('Are you sure? This will reset all your data!')) {
        storage.clearAllData();
        storage.initializeUser();
        loadProfile();
        alert('Profile reset!');
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        closeGame();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadGames();
});