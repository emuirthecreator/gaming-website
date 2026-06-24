// Game Definitions - 26 Games Total
const GAMES = [
    // Your 4 Suggestions
    {
        id: 'darkroom',
        name: '🌑 Dark Room',
        description: 'An idle game set in darkness. Discover secrets.',
        thumbnail: '🌑'
    },
    {
        id: 'nogeneral',
        name: '🎮 There Is No Game',
        description: 'A meta puzzle game with tricks and surprises',
        thumbnail: '🎮'
    },
    {
        id: 'sortcourt',
        name: '⚖️ Sort The Court',
        description: 'Make decisions as a medieval ruler',
        thumbnail: '⚖️'
    },
    {
        id: 'incredibox',
        name: '🎵 Incredibox',
        description: 'Create beats with colorful characters',
        thumbnail: '🎵'
    },
    // Cool Hidden Gems
    {
        id: 'painter',
        name: '🎨 Infinite Painter',
        description: 'Paint and create beautiful art',
        thumbnail: '🎨'
    },
    {
        id: 'dnagame',
        name: '🧬 DNA Game',
        description: 'Educational puzzle about genetics',
        thumbnail: '🧬'
    },
    {
        id: 'wordle',
        name: '🌍 Wordle Style',
        description: 'Guess the word in 6 tries',
        thumbnail: '🌍'
    },
    {
        id: 'dicewars',
        name: '🎲 Dice Wars',
        description: 'Strategy dice battle game',
        thumbnail: '🎲'
    },
    {
        id: 'simon',
        name: '🔮 Simon Says',
        description: 'Memory pattern game',
        thumbnail: '🔮'
    },
    {
        id: 'breakdance',
        name: '🎪 Breakdance Party',
        description: 'Rhythm and timing game',
        thumbnail: '🎪'
    },
    {
        id: 'gravity',
        name: '💫 Gravity Puzzle',
        description: 'Physics-based puzzle game',
        thumbnail: '💫'
    },
    {
        id: 'adventure',
        name: '🎭 Choose Your Adventure',
        description: 'Interactive story game',
        thumbnail: '🎭'
    },
    {
        id: 'asteroids',
        name: '🚀 Asteroid Dodger',
        description: 'Dodge obstacles with a twist',
        thumbnail: '🚀'
    },
    {
        id: 'tangram',
        name: '🧩 Tangram Puzzle',
        description: 'Shape-fitting puzzle game',
        thumbnail: '🧩'
    },
    {
        id: 'targetpractice',
        name: '🎯 Target Practice',
        description: 'Precision clicking challenge',
        thumbnail: '🎯'
    },
    // Classic Games
    {
        id: 'snake',
        name: '🐍 Snake',
        description: 'Classic snake game - eat food and grow!',
        thumbnail: '🐍'
    },
    {
        id: 'flappy',
        name: '🐦 Flappy Bird',
        description: 'Tap to fly through the pipes',
        thumbnail: '🐦'
    },
    {
        id: 'memory',
        name: '🧠 Memory',
        description: 'Match pairs of cards',
        thumbnail: '🧠'
    },
    {
        id: 'whackmole',
        name: '🔨 Whack-a-Mole',
        description: 'Click moles as fast as you can',
        thumbnail: '🔨'
    },
    {
        id: 'tictactoe',
        name: '✓ Tic Tac Toe',
        description: 'Classic three in a row',
        thumbnail: '✓'
    },
    {
        id: 'hangman',
        name: '🎯 Hangman',
        description: 'Guess the word before time runs out',
        thumbnail: '🎯'
    },
    {
        id: 'pong',
        name: '🏓 Pong',
        description: 'Retro ping pong classic',
        thumbnail: '🏓'
    },
    {
        id: 'spaceinvaders',
        name: '👽 Space Invaders',
        description: 'Shoot down the aliens',
        thumbnail: '👽'
    },
    {
        id: 'tetris',
        name: '🧩 Tetris',
        description: 'Stack blocks to complete lines',
        thumbnail: '🧩'
    },
    {
        id: 'breakout',
        name: '🎾 Breakout',
        description: 'Break all the bricks with the ball',
        thumbnail: '🎾'
    },
    {
        id: '2048',
        name: '2️⃣ 2048',
        description: 'Combine tiles to reach 2048',
        thumbnail: '2️⃣'
    }
];

// Game Engine Base Class
class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId) || this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.gameActive = true;
        this.setupCanvas();
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = 800;
        canvas.height = 600;
        document.getElementById('gameContainer').innerHTML = '';
        document.getElementById('gameContainer').appendChild(canvas);
        return canvas;
    }

    setupCanvas() {
        this.canvas.width = Math.min(800, window.innerWidth - 40);
        this.canvas.height = 600;
    }

    drawText(text, x, y, size = 20, color = 'white') {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, x, y);
    }

    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    clearCanvas() {
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    saveScore(gameName) {
        storage.saveGameScore(gameName, this.score);
    }

    endGame() {
        this.gameActive = false;
    }
}

// ==================== YOUR 4 SUGGESTIONS ====================

// Dark Room - Idle/Text Game
class DarkRoomGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.lightLevel = 0;
        this.clicks = 0;
        this.secrets = 0;
        this.messages = [];
        this.setupControls();
        this.draw();
    }

    setupControls() {
        this.canvas.addEventListener('click', () => {
            this.clicks++;
            this.lightLevel = Math.min(100, this.lightLevel + Math.random() * 5);
            this.score += 5;

            if (this.clicks % 20 === 0) {
                this.secrets++;
                this.messages.push(`🔓 Secret discovered! Total: ${this.secrets}`);
            }
            this.messages.push('✨ You click...');
            if (this.messages.length > 5) this.messages.shift();
        });
    }

    draw() {
        this.clearCanvas();
        
        const brightness = Math.floor((this.lightLevel / 100) * 255);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.lightLevel / 100})`;
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 100 + this.lightLevel * 2, 0, Math.PI * 2);
        this.ctx.fill();

        this.drawText('🌑 Dark Room 🌑', this.canvas.width / 2, 50, 24, '#fff');
        this.drawText('Click to bring light...', this.canvas.width / 2, 100, 16, '#aaa');
        this.drawText(`Light: ${Math.floor(this.lightLevel)}%`, this.canvas.width / 2, 150, 14, '#fff');
        this.drawText(`Secrets: ${this.secrets}`, this.canvas.width / 2, 180, 14, '#fff');
        this.drawText(`Clicks: ${this.clicks}`, this.canvas.width / 2, 210, 14, '#fff');

        let yPos = 280;
        this.messages.forEach(msg => {
            this.drawText(msg, this.canvas.width / 2, yPos, 12, '#888');
            yPos += 30;
        });

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height - 30, 14, '#fff');

        requestAnimationFrame(() => this.draw());
    }
}

// There Is No Game - Puzzle/Trick Game
class ThereIsNoGameGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.stage = 0;
        this.clicks = 0;
        this.buttonX = 400;
        this.buttonY = 300;
        this.buttonSize = 50;
        this.setupControls();
        this.draw();
    }

    setupControls() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (this.stage === 0) {
                if (x > this.buttonX - this.buttonSize && x < this.buttonX + this.buttonSize &&
                    y > this.buttonY - this.buttonSize && y < this.buttonY + this.buttonSize) {
                    this.stage = 1;
                    this.clicks++;
                    this.score += 20;
                }
            } else if (this.stage === 1) {
                this.buttonX = 100 + Math.random() * 600;
                this.buttonY = 200 + Math.random() * 300;
                this.clicks++;
                this.score += 10;
                if (this.clicks > 5) this.stage = 2;
            }
        });
    }

    draw() {
        this.clearCanvas();

        if (this.stage === 0) {
            this.drawText('THERE IS NO GAME', this.canvas.width / 2, 100, 28, '#fff');
            this.drawText('Click the button to continue...', this.canvas.width / 2, 200, 16, '#aaa');
            
            this.ctx.fillStyle = '#ff6600';
            this.ctx.fillRect(this.buttonX - this.buttonSize, this.buttonY - this.buttonSize, this.buttonSize * 2, this.buttonSize * 2);
            this.drawText('?', this.buttonX, this.buttonY + 15, 30, '#fff');
        } else if (this.stage === 1) {
            this.drawText('THERE IS NO GAME', this.canvas.width / 2, 100, 28, '#fff');
            this.drawText('Catch the button!', this.canvas.width / 2, 200, 16, '#aaa');
            
            this.ctx.fillStyle = '#00ff00';
            this.ctx.fillRect(this.buttonX - this.buttonSize, this.buttonY - this.buttonSize, this.buttonSize * 2, this.buttonSize * 2);
            this.drawText('NO!', this.buttonX, this.buttonY + 15, 20, '#000');
        } else if (this.stage === 2) {
            this.drawText('You won? Maybe...', this.canvas.width / 2, this.canvas.height / 2, 24, '#fff');
            this.drawText(`Clicks: ${this.clicks}`, this.canvas.width / 2, this.canvas.height / 2 + 50, 16, '#aaa');
        }

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height - 30, 14, '#fff');
        requestAnimationFrame(() => this.draw());
    }
}

// Sort The Court - Decision/Management Game
class SortTheCourtGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.treasury = 100;
        this.happiness = 50;
        this.petitions = [];
        this.day = 1;
        this.maxDays = 20;
        this.generatePetition();
        this.setupControls();
    }

    generatePetition() {
        const petitionTypes = [
            { text: 'Tax the peasants?', yes: { treasury: 30, happiness: -20 }, no: { treasury: 0, happiness: 10 } },
            { text: 'Build a statue?', yes: { treasury: -20, happiness: 15 }, no: { treasury: 0, happiness: 0 } },
            { text: 'Have a feast?', yes: { treasury: -15, happiness: 20 }, no: { treasury: 0, happiness: 5 } },
            { text: 'Declare war?', yes: { treasury: -50, happiness: -30 }, no: { treasury: 0, happiness: 0 } }
        ];
        const petition = petitionTypes[Math.floor(Math.random() * petitionTypes.length)];
        this.currentPetition = petition;
    }

    setupControls() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (y > 400 && y < 450) {
                if (x < 200) {
                    this.handleDecision(true);
                } else if (x > 400) {
                    this.handleDecision(false);
                }
            }
        });
    }

    handleDecision(isYes) {
        const result = isYes ? this.currentPetition.yes : this.currentPetition.no;
        this.treasury += result.treasury;
        this.happiness += result.happiness;
        this.score += Math.max(0, this.treasury);
        this.day++;

        if (this.day <= this.maxDays) {
            this.generatePetition();
        } else {
            alert(`Game Over!\nTreasury: ${this.treasury}\nHappiness: ${this.happiness}\nScore: ${this.score}`);
            this.saveScore('sortcourt');
            this.endGame();
        }
        this.draw();
    }

    draw() {
        this.clearCanvas();
        this.drawText('⚖️ SORT THE COURT ⚖️', this.canvas.width / 2, 50, 24, '#fff');
        this.drawText(`Day ${this.day}/${this.maxDays}`, this.canvas.width / 2, 100, 16, '#aaa');
        this.drawText(`Treasury: ${this.treasury} | Happiness: ${this.happiness}`, this.canvas.width / 2, 150, 14, '#fff');

        this.drawText(this.currentPetition.text, this.canvas.width / 2, 250, 18, '#ffff00');

        this.ctx.fillStyle = '#00aa00';
        this.ctx.fillRect(50, 400, 120, 50);
        this.drawText('YES', 110, 430, 16, '#fff');

        this.ctx.fillStyle = '#aa0000';
        this.ctx.fillRect(430, 400, 120, 50);
        this.drawText('NO', 490, 430, 16, '#fff');

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height - 20, 12, '#fff');
    }
}

// Incredibox - Beat Making Demo
class IncrediboxGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.beatLength = 16;
        this.currentStep = 0;
        this.characters = [
            { name: 'Bass', color: '#ff0000', sound: 'B' },
            { name: 'Snare', color: '#00ff00', sound: 'S' },
            { name: 'Hat', color: '#0000ff', sound: 'H' },
            { name: 'Melody', color: '#ffff00', sound: 'M' }
        ];
        this.beats = this.characters.map(() => Array(this.beatLength).fill(false));
        this.playing = false;
        this.setupControls();
        this.draw();
    }

    setupControls() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const charHeight = 80;
            const beatWidth = (this.canvas.width - 200) / this.beatLength;

            this.characters.forEach((char, i) => {
                if (y > i * charHeight + 100 && y < (i + 1) * charHeight + 100) {
                    for (let j = 0; j < this.beatLength; j++) {
                        if (x > 150 + j * beatWidth && x < 150 + (j + 1) * beatWidth) {
                            this.beats[i][j] = !this.beats[i][j];
                            if (this.beats[i][j]) this.score += 5;
                        }
                    }
                }
            });

            if (x > 50 && x < 130 && y > this.canvas.height - 80 && y < this.canvas.height - 30) {
                this.playing = !this.playing;
                if (this.playing) this.playBeat();
            }
        });
    }

    playBeat() {
        if (!this.playing) return;
        this.currentStep = (this.currentStep + 1) % this.beatLength;
        setTimeout(() => this.playBeat(), 250);
    }

    draw() {
        this.clearCanvas();
        this.drawText('🎵 INCREDIBOX 🎵', this.canvas.width / 2, 30, 24, '#fff');

        const charHeight = 80;
        const beatWidth = (this.canvas.width - 200) / this.beatLength;

        this.characters.forEach((char, i) => {
            this.ctx.fillStyle = char.color;
            this.ctx.fillRect(10, i * charHeight + 100, 130, 70);
            this.drawText(char.name, 75, i * charHeight + 135, 14, '#000');

            for (let j = 0; j < this.beatLength; j++) {
                this.ctx.fillStyle = this.beats[i][j] ? '#ffff00' : '#333';
                if (j === this.currentStep) this.ctx.fillStyle = '#00ffff';
                this.ctx.fillRect(150 + j * beatWidth, i * charHeight + 100, beatWidth - 2, 70);
            }
        });

        this.ctx.fillStyle = this.playing ? '#00ff00' : '#ff0000';
        this.ctx.fillRect(50, this.canvas.height - 80, 80, 50);
        this.drawText(this.playing ? 'STOP' : 'PLAY', 90, this.canvas.height - 55, 14, '#fff');

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height - 20, 12, '#fff');
        requestAnimationFrame(() => this.draw());
    }
}

// ==================== COOL HIDDEN GEMS ====================

// Simon Says - Memory Pattern Game
class SimonSaysGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.sequence = [];
        this.userSequence = [];
        this.colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
        this.buttons = [];
        this.level = 1;
        this.gameOver = false;
        this.setupControls();
        this.setupButtons();
        this.nextRound();
    }

    setupButtons() {
        const size = 100;
        const gap = 20;
        const startX = (this.canvas.width - (size * 2 + gap)) / 2;
        const startY = (this.canvas.height - (size * 2 + gap)) / 2;

        for (let i = 0; i < 4; i++) {
            const row = Math.floor(i / 2);
            const col = i % 2;
            this.buttons.push({
                x: startX + col * (size + gap),
                y: startY + row * (size + gap),
                size,
                color: this.colors[i],
                index: i,
                active: false
            });
        }
    }

    setupControls() {
        this.canvas.addEventListener('click', (e) => {
            if (this.gameOver) return;
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.buttons.forEach((btn, i) => {
                if (x > btn.x && x < btn.x + btn.size && y > btn.y && y < btn.y + btn.size) {
                    this.userSequence.push(i);
                    this.playSound(i);
                    this.checkSequence();
                }
            });
        });
    }

    playSound(index) {
        this.buttons[index].active = true;
        setTimeout(() => {
            this.buttons[index].active = false;
        }, 200);
    }

    async playSequence() {
        for (let i of this.sequence) {
            await new Promise(resolve => {
                setTimeout(() => {
                    this.playSound(i);
                    resolve();
                }, 500);
            });
        }
    }

    checkSequence() {
        const lastIndex = this.userSequence.length - 1;
        if (this.userSequence[lastIndex] !== this.sequence[lastIndex]) {
            this.gameOver = true;
            alert(`Game Over! Level: ${this.level}\nScore: ${this.score}`);
            this.saveScore('simon');
            return;
        }

        if (this.userSequence.length === this.sequence.length) {
            this.score += this.level * 10;
            this.nextRound();
        }
    }

    nextRound() {
        this.sequence.push(Math.floor(Math.random() * 4));
        this.userSequence = [];
        this.level++;
        this.playSequence();
    }

    draw() {
        this.clearCanvas();
        this.drawText('🔮 SIMON SAYS 🔮', this.canvas.width / 2, 30, 24, '#fff');

        this.buttons.forEach(btn => {
            this.ctx.fillStyle = btn.active ? '#ffff00' : btn.color;
            this.ctx.fillRect(btn.x, btn.y, btn.size, btn.size);
        });

        this.drawText(`Level: ${this.level}`, this.canvas.width / 2, this.canvas.height - 80, 18, '#fff');
        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height - 30, 14, '#fff');

        requestAnimationFrame(() => this.draw());
    }
}

// Wordle Style Game
class WordleGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.words = ['JAVASCRIPT', 'PYTHON', 'GAMING', 'WEBSITE', 'COMPUTER', 'PROGRAMMING'];
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        this.guesses = [];
        this.attempts = 6;
        this.gameOver = false;
        this.won = false;
        this.setupControls();
        this.draw();
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            const letter = e.key.toUpperCase();
            if (/^[A-Z]$/.test(letter) && !this.guesses.includes(letter)) {
                this.guesses.push(letter);
                this.attempts--;
                this.score += 5;

                if (this.word.split('').every(l => this.guesses.includes(l))) {
                    this.won = true;
                    this.gameOver = true;
                    this.score += 50;
                    this.saveScore('wordle');
                } else if (this.attempts <= 0) {
                    this.gameOver = true;
                    this.saveScore('wordle');
                }
            }
        });
    }

    draw() {
        this.clearCanvas();
        this.drawText('🌍 WORDLE 🌍', this.canvas.width / 2, 30, 24, '#fff');

        let display = '';
        for (let letter of this.word) {
            display += (this.guesses.includes(letter) ? letter : '_') + ' ';
        }
        this.drawText(display, this.canvas.width / 2, 150, 28, '#ffff00');

        let y = 250;
        let x = 50;
        for (let i = 65; i < 91; i++) {
            const letter = String.fromCharCode(i);
            this.ctx.fillStyle = this.guesses.includes(letter) ? '#666' : '#0099ff';
            this.ctx.fillRect(x, y, 20, 20);
            this.drawText(letter, x + 10, y + 16, 12, '#fff');
            x += 25;
            if (x > 500) {
                x = 50;
                y += 30;
            }
        }

        this.drawText(`Attempts left: ${this.attempts}`, 150, this.canvas.height - 80, 16, '#ff0000');

        if (this.gameOver) {
            if (this.won) {
                this.drawText('YOU WON!', this.canvas.width / 2, this.canvas.height - 50, 24, '#00ff00');
            } else {
                this.drawText('GAME OVER!', this.canvas.width / 2, this.canvas.height - 50, 24, '#ff0000');
                this.drawText(`Word: ${this.word}`, this.canvas.width / 2, this.canvas.height - 20, 14, '#fff');
            }
        }

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, 20, 12, '#fff');
        requestAnimationFrame(() => this.draw());
    }
}

// Dice Wars - Strategy Game
class DiceWarsGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.playerDice = 10;
        this.enemyDice = 10;
        this.round = 1;
        this.gameOver = false;
        this.setupControls();
        this.draw();
    }

    setupControls() {
        this.canvas.addEventListener('click', (e) => {
            if (this.gameOver) return;
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x > 100 && x < 250 && y > 400 && y < 450 && this.playerDice > 0) {
                this.battle('player');
            } else if (x > 500 && x < 650 && y > 400 && y < 450 && this.playerDice > 0) {
                this.battle('enemy');
            }
        });
    }

    battle(playerChoice) {
        const playerRoll = Math.floor(Math.random() * 6) + 1;
        const enemyRoll = Math.floor(Math.random() * 6) + 1;

        if (playerRoll > enemyRoll) {
            this.enemyDice -= 2;
            this.score += 20;
        } else {
            this.playerDice -= 1;
        }

        this.round++;
        this.playerDice--;

        if (this.playerDice <= 0) {
            this.gameOver = true;
            alert(`GAME OVER!\nEnemy Dice: ${Math.max(0, this.enemyDice)}\nScore: ${this.score}`);
            this.saveScore('dicewars');
        } else if (this.enemyDice <= 0) {
            this.gameOver = true;
            alert(`YOU WIN!\nScore: ${this.score}`);
            this.score += 100;
            this.saveScore('dicewars');
        }
        this.draw();
    }

    draw() {
        this.clearCanvas();
        this.drawText('🎲 DICE WARS 🎲', this.canvas.width / 2, 30, 24, '#fff');

        this.drawText('YOU', 175, 150, 20, '#00ff00');
        this.drawText(`${this.playerDice} Dice`, 175, 200, 24, '#ffff00');

        this.drawText('ENEMY', 625, 150, 20, '#ff0000');
        this.drawText(`${this.enemyDice} Dice`, 625, 200, 24, '#ffff00');

        this.drawText(`Round: ${this.round}`, this.canvas.width / 2, 300, 18, '#fff');

        this.ctx.fillStyle = '#00aa00';
        this.ctx.fillRect(100, 400, 150, 50);
        this.drawText('Attack!', 175, 430, 16, '#fff');

        this.ctx.fillStyle = '#aa0000';
        this.ctx.fillRect(500, 400, 150, 50);
        this.drawText('Defend!', 575, 430, 16, '#fff');

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height - 30, 14, '#fff');
        requestAnimationFrame(() => this.draw());
    }
}

// Choose Your Adventure - Story Game
class AdventureGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.scenes = [
            {
                text: 'You wake up in a mysterious forest. What do you do?',
                choices: [
                    { text: 'Go left', next: 1, score: 10 },
                    { text: 'Go right', next: 2, score: 10 }
                ]
            },
            {
                text: 'You find a dragon! Do you fight or flee?',
                choices: [
                    { text: 'Fight!', next: 3, score: 50 },
                    { text: 'Flee', next: 4, score: 5 }
                ]
            },
            {
                text: 'You find treasure! Continue or leave?',
                choices: [
                    { text: 'Take it', next: 5, score: 30 },
                    { text: 'Leave', next: 4, score: 10 }
                ]
            },
            {
                text: '🎉 You defeated the dragon! YOU WIN!',
                choices: [
                    { text: 'Play Again', next: 0, score: 0 }
                ]
            },
            {
                text: '😅 You safely escaped. Good choice!',
                choices: [
                    { text: 'Play Again', next: 0, score: 0 }
                ]
            },
            {
                text: '💎 You got the treasure and lived happily ever after!',
                choices: [
                    { text: 'Play Again', next: 0, score: 0 }
                ]
            }
        ];
        this.currentScene = 0;
        this.setupControls();
        this.draw();
    }

    setupControls() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.scenes[this.currentScene].choices.forEach((choice, i) => {
                const buttonY = 350 + i * 80;
                if (x > 150 && x < 650 && y > buttonY && y < buttonY + 50) {
                    this.score += choice.score;
                    this.currentScene = choice.next;
                    this.draw();
                }
            });
        });
    }

    draw() {
        this.clearCanvas();
        this.drawText('🎭 CHOOSE YOUR ADVENTURE 🎭', this.canvas.width / 2, 30, 24, '#fff');

        const scene = this.scenes[this.currentScene];
        this.drawText(scene.text, this.canvas.width / 2, 150, 18, '#ffff00');

        scene.choices.forEach((choice, i) => {
            const buttonY = 350 + i * 80;
            this.ctx.fillStyle = '#0099ff';
            this.ctx.fillRect(150, buttonY, 500, 50);
            this.drawText(choice.text, this.canvas.width / 2, buttonY + 28, 16, '#000');
        });

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height - 30, 14, '#fff');
        requestAnimationFrame(() => this.draw());
    }
}

// Target Practice - Precision Game
class TargetPracticeGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.targets = [];
        this.timeLeft = 30;
        this.gameStarted = false;
        this.startGame();
    }

    startGame() {
        this.gameStarted = true;
        this.spawnTargets();

        const timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                clearInterval(timer);
                this.endGame();
                this.saveScore('targetpractice');
                alert(`Time's Up! Score: ${this.score}`);
            }
            this.draw();
        }, 1000);

        this.gameLoop = setInterval(() => {
            if (this.targets.length < 3) {
                this.spawnTargets();
            }
        }, 1000);
    }

    spawnTargets() {
        this.targets.push({
            x: Math.random() * (this.canvas.width - 40),
            y: Math.random() * (this.canvas.height - 100) + 50,
            radius: 20,
            active: true
        });
    }

    setupControls() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.targets.forEach((target, i) => {
                const dist = Math.sqrt((x - target.x) ** 2 + (y - target.y) ** 2);
                if (dist < target.radius) {
                    this.score += 10;
                    this.targets.splice(i, 1);
                }
            });
        });
    }

    draw() {
        this.clearCanvas();
        this.drawText('🎯 TARGET PRACTICE 🎯', this.canvas.width / 2, 30, 24, '#fff');

        this.ctx.fillStyle = '#ff0000';
        this.targets.forEach(target => {
            this.drawCircle(target.x, target.y, target.radius, '#ffff00');
            this.drawCircle(target.x, target.y, target.radius - 5, '#ff0000');
        });

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height - 60, 16, '#fff');
        this.drawText(`Time: ${this.timeLeft}s`, this.canvas.width / 2, this.canvas.height - 30, 14, '#fff');
    }
}

// ==================== CLASSIC GAMES ====================

// Snake Game
class SnakeGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.snake = [{x: 10, y: 10}];
        this.food = {x: 15, y: 15};
        this.dx = 1;
        this.dy = 0;
        this.gridSize = 20;
        this.setupControls();
        this.gameLoop = setInterval(() => this.update(), 100);
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' && this.dy === 0) { this.dx = 0; this.dy = -1; }
            if (e.key === 'ArrowDown' && this.dy === 0) { this.dx = 0; this.dy = 1; }
            if (e.key === 'ArrowLeft' && this.dx === 0) { this.dx = -1; this.dy = 0; }
            if (e.key === 'ArrowRight' && this.dx === 0) { this.dx = 1; this.dy = 0; }
        });
    }

    update() {
        if (!this.gameActive) return;

        const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};

        if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
            head.y < 0 || head.y >= this.canvas.height / this.gridSize ||
            this.snake.some(s => s.x === head.x && s.y === head.y)) {
            this.endGame();
            this.saveScore('snake');
            alert(`Game Over! Score: ${this.score}`);
            clearInterval(this.gameLoop);
            return;
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.food = {
                x: Math.floor(Math.random() * (this.canvas.width / this.gridSize)),
                y: Math.floor(Math.random() * (this.canvas.height / this.gridSize))
            };
        } else {
            this.snake.pop();
        }

        this.draw();
    }

    draw() {
        this.clearCanvas();
        this.ctx.fillStyle = '#00ff00';
        this.snake.forEach(segment => {
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        });

        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, 20, 16, '#fff');
    }
}

// Flappy Bird Game
class FlappyBirdGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.player = {x: 50, y: this.canvas.height / 2, width: 20, height: 20, velocity: 0};
        this.pipes = [];
        this.gapSize = 150;
        this.pipeWidth = 60;
        this.gravity = 0.6;
        this.flapPower = 15;
        this.pipeGap = 200;
        this.setupControls();
        this.gameLoop = setInterval(() => this.update(), 30);
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ') { this.player.velocity = -this.flapPower; e.preventDefault(); }
        });
    }

    update() {
        if (!this.gameActive) return;

        this.player.velocity += this.gravity;
        this.player.y += this.player.velocity;

        if (this.pipes.length === 0 || this.pipes[this.pipes.length - 1].x < this.canvas.width - this.pipeGap) {
            const topHeight = Math.random() * (this.canvas.height - this.gapSize - 100) + 50;
            this.pipes.push({x: this.canvas.width, topHeight});
        }

        this.pipes = this.pipes.filter(pipe => {
            pipe.x -= 5;
            if (pipe.x < -this.pipeWidth) {
                this.score += 1;
            }
            return pipe.x > -this.pipeWidth;
        });

        if (this.player.y <= 0 || this.player.y + this.player.height >= this.canvas.height) {
            this.endGame();
        }

        this.pipes.forEach(pipe => {
            if (this.player.x + this.player.width > pipe.x &&
                this.player.x < pipe.x + this.pipeWidth &&
                (this.player.y < pipe.topHeight ||
                 this.player.y + this.player.height > pipe.topHeight + this.gapSize)) {
                this.endGame();
            }
        });

        if (!this.gameActive) {
            this.saveScore('flappy');
            alert(`Game Over! Score: ${this.score}`);
            clearInterval(this.gameLoop);
        }

        this.draw();
    }

    draw() {
        this.clearCanvas();
        this.ctx.fillStyle = '#ffff00';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        this.ctx.fillStyle = '#00ff00';
        this.pipes.forEach(pipe => {
            this.ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.topHeight);
            this.ctx.fillRect(pipe.x, pipe.topHeight + this.gapSize, this.pipeWidth, this.canvas.height - pipe.topHeight - this.gapSize);
        });

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, 30, 20, '#fff');
    }
}

// Memory Game
class MemoryGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.cardSize = 60;
        this.cards = this.generateCards();
        this.flipped = [];
        this.matched = 0;
        this.moves = 0;
        this.setupControls();
    }

    generateCards() {
        const symbols = ['🌟', '🎨', '🎭', '🎪', '🎬', '🎤', '🎧', '🎮'];
        const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
        return cards.map((symbol, i) => ({id: i, symbol, flipped: false, matched: false}));
    }

    setupControls() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.handleClick(x, y);
        });
    }

    handleClick(x, y) {
        const cols = Math.floor(this.canvas.width / (this.cardSize + 10));
        const row = Math.floor(y / (this.cardSize + 10));
        const col = Math.floor(x / (this.cardSize + 10));
        const cardIndex = row * cols + col;

        if (cardIndex < this.cards.length && !this.cards[cardIndex].matched && this.flipped.length < 2) {
            this.cards[cardIndex].flipped = true;
            this.flipped.push(cardIndex);

            if (this.flipped.length === 2) {
                this.moves++;
                this.checkMatch();
            }
        }
        this.draw();
    }

    checkMatch() {
        const [i1, i2] = this.flipped;
        if (this.cards[i1].symbol === this.cards[i2].symbol) {
            this.cards[i1].matched = true;
            this.cards[i2].matched = true;
            this.matched += 2;
            this.score += 10;
            this.flipped = [];

            if (this.matched === this.cards.length) {
                alert(`You Won! Score: ${this.score} in ${this.moves} moves`);
                this.saveScore('memory');
                this.endGame();
            }
        } else {
            setTimeout(() => {
                this.cards[i1].flipped = false;
                this.cards[i2].flipped = false;
                this.flipped = [];
                this.draw();
            }, 600);
        }
    }

    draw() {
        this.clearCanvas();
        const cols = Math.floor(this.canvas.width / (this.cardSize + 10));

        this.cards.forEach((card, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = col * (this.cardSize + 10) + 10;
            const y = row * (this.cardSize + 10) + 10;

            this.ctx.fillStyle = card.matched ? '#00aa00' : card.flipped ? '#0099ff' : '#ff6600';
            this.ctx.fillRect(x, y, this.cardSize, this.cardSize);

            if (card.flipped || card.matched) {
                this.ctx.fillStyle = '#000';
                this.ctx.font = `${this.cardSize}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.fillText(card.symbol, x + this.cardSize / 2, y + this.cardSize);
            }
        });

        this.drawText(`Moves: ${this.moves} | Score: ${this.score}`, this.canvas.width / 2, this.canvas.height - 20, 14, '#fff');
    }
}

// Whack-a-Mole Game
class WhackAMoleGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.moles = Array(9).fill(null).map(() => ({active: false, x: 0, y: 0}));
        this.timeLeft = 30;
        this.gameStarted = false;
        this.startGame();
    }

    startGame() {
        this.gameStarted = true;
        const timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                clearInterval(timer);
                clearInterval(this.gameLoop);
                this.endGame();
                this.saveScore('whackmole');
                alert(`Time's Up! Score: ${this.score}`);
            }
            this.draw();
        }, 1000);

        this.gameLoop = setInterval(() => {
            const randomMole = Math.floor(Math.random() * this.moles.length);
            this.moles[randomMole].active = true;
            setTimeout(() => {
                this.moles[randomMole].active = false;
            }, 600);
        }, 800);
    }

    setupControls() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.moles.forEach((mole, i) => {
                if (mole.active && x > mole.x && x < mole.x + 80 && y > mole.y && y < mole.y + 80) {
                    this.score += 10;
                    mole.active = false;
                }
            });
        });
    }

    draw() {
        this.clearCanvas();
        const cols = 3;
        const moleSize = 80;
        const gap = 20;

        this.moles.forEach((mole, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            mole.x = col * (moleSize + gap) + gap;
            mole.y = row * (moleSize + gap) + gap + 50;

            this.ctx.fillStyle = mole.active ? '#ffaa00' : '#999';
            this.ctx.fillRect(mole.x, mole.y, moleSize, moleSize);

            if (mole.active) {
                this.ctx.fillStyle = '#000';
                this.ctx.font = '40px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('🐭', mole.x + moleSize / 2, mole.y + moleSize / 2 + 15);
            }
        });

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, 25, 20, '#fff');
        this.drawText(`Time: ${this.timeLeft}s`, 100, 25, 20, '#fff');
    }
}

// Tic Tac Toe
class TicTacToeGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.board = Array(9).fill(null);
        this.playerX = true;
        this.gameOver = false;
        this.winner = null;
        this.setupControls();
        this.draw();
    }

    setupControls() {
        this.canvas.addEventListener('click', (e) => {
            if (this.gameOver) return;
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const cellSize = 120;
            const offsetX = (this.canvas.width - 360) / 2;
            const offsetY = (this.canvas.height - 360) / 2;

            const col = Math.floor((x - offsetX) / cellSize);
            const row = Math.floor((y - offsetY) / cellSize);

            if (col >= 0 && col < 3 && row >= 0 && row < 3) {
                const index = row * 3 + col;
                if (!this.board[index]) {
                    this.board[index] = this.playerX ? 'X' : 'O';
                    this.playerX = !this.playerX;
                    this.score += 5;
                    this.checkWinner();
                }
            }
        });
    }

    checkWinner() {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let line of lines) {
            if (this.board[line[0]] && this.board[line[0]] === this.board[line[1]] && this.board[line[1]] === this.board[line[2]]) {
                this.winner = this.board[line[0]];
                this.gameOver = true;
                this.score += 50;
                this.saveScore('tictactoe');
                return;
            }
        }

        if (!this.board.includes(null)) {
            this.gameOver = true;
            this.score += 20;
            this.saveScore('tictactoe');
        }
    }

    draw() {
        this.clearCanvas();
        this.drawText('✓ TIC TAC TOE ✓', this.canvas.width / 2, 30, 24, '#fff');

        const cellSize = 120;
        const offsetX = (this.canvas.width - 360) / 2;
        const offsetY = (this.canvas.height - 360) / 2;

        for (let i = 0; i < 9; i++) {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const x = offsetX + col * cellSize;
            const y = offsetY + row * cellSize;

            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, cellSize, cellSize);

            if (this.board[i]) {
                this.drawText(this.board[i], x + cellSize / 2, y + cellSize / 2 + 20, 40, this.board[i] === 'X' ? '#ff0000' : '#00ff00');
            }
        }

        if (this.gameOver) {
            this.drawText(this.winner ? `${this.winner} Wins!` : 'Draw!', this.canvas.width / 2, 550, 20, '#ffff00');
        } else {
            this.drawText(`Turn: ${this.playerX ? 'X' : 'O'}`, this.canvas.width / 2, 550, 16, '#fff');
        }

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height - 20, 12, '#fff');
        requestAnimationFrame(() => this.draw());
    }
}

// Hangman
class HangmanGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.words = ['JAVASCRIPT', 'PROGRAMMING', 'GAMING', 'DEVELOPER', 'WEBSITE', 'COMPUTER'];
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        this.guessed = [];
        this.wrong = 0;
        this.maxWrong = 6;
        this.gameOver = false;
        this.won = false;
        this.setupControls();
        this.draw();
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            const letter = e.key.toUpperCase();
            if (/^[A-Z]$/.test(letter) && !this.guessed.includes(letter)) {
                this.guessed.push(letter);
                if (!this.word.includes(letter)) {
                    this.wrong++;
                } else {
                    this.score += 5;
                }

                const wordComplete = this.word.split('').every(l => this.guessed.includes(l));
                if (wordComplete) {
                    this.won = true;
                    this.gameOver = true;
                    this.score += 50;
                    this.saveScore('hangman');
                } else if (this.wrong >= this.maxWrong) {
                    this.gameOver = true;
                    this.saveScore('hangman');
                }
            }
        });
    }

    draw() {
        this.clearCanvas();
        this.drawText('🎯 HANGMAN 🎯', this.canvas.width / 2, 30, 24, '#fff');

        let display = '';
        for (let letter of this.word) {
            display += (this.guessed.includes(letter) ? letter : '_') + ' ';
        }
        this.drawText(display, this.canvas.width / 2, 150, 28, '#ffff00');

        let y = 250;
        let x = 50;
        for (let i = 65; i < 91; i++) {
            const letter = String.fromCharCode(i);
            this.ctx.fillStyle = this.guessed.includes(letter) ? '#666' : '#0099ff';
            this.ctx.fillRect(x, y, 20, 20);
            this.drawText(letter, x + 10, y + 16, 12, '#fff');
            x += 25;
            if (x > 500) {
                x = 50;
                y += 30;
            }
        }

        this.drawText(`Wrong: ${this.wrong}/${this.maxWrong}`, 100, this.canvas.height - 80, 16, '#ff0000');

        if (this.gameOver) {
            if (this.won) {
                this.drawText('YOU WON!', this.canvas.width / 2, this.canvas.height - 50, 24, '#00ff00');
            } else {
                this.drawText('GAME OVER!', this.canvas.width / 2, this.canvas.height - 50, 24, '#ff0000');
                this.drawText(`Word: ${this.word}`, this.canvas.width / 2, this.canvas.height - 20, 14, '#fff');
            }
        }

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, 20, 12, '#fff');
        requestAnimationFrame(() => this.draw());
    }
}

// Pong Game
class PongGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.ball = {x: this.canvas.width / 2, y: this.canvas.height / 2, radius: 8, dx: 5, dy: 5};
        this.paddle1 = {x: 10, y: this.canvas.height / 2 - 50, width: 10, height: 100, dy: 0};
        this.paddle2 = {x: this.canvas.width - 20, y: this.canvas.height / 2 - 50, width: 10, height: 100, dy: 0};
        this.score1 = 0;
        this.score2 = 0;
        this.setupControls();
        this.gameLoop = setInterval(() => this.update(), 30);
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'w' || e.key === 'W') this.paddle1.dy = -5;
            if (e.key === 's' || e.key === 'S') this.paddle1.dy = 5;
            if (e.key === 'ArrowUp') this.paddle2.dy = -5;
            if (e.key === 'ArrowDown') this.paddle2.dy = 5;
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'w' || e.key === 'W' || e.key === 's' || e.key === 'S') this.paddle1.dy = 0;
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') this.paddle2.dy = 0;
        });
    }

    update() {
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        if (this.ball.y - this.ball.radius < 0 || this.ball.y + this.ball.radius > this.canvas.height) {
            this.ball.dy = -this.ball.dy;
        }

        this.paddle1.y = Math.max(0, Math.min(this.canvas.height - this.paddle1.height, this.paddle1.y + this.paddle1.dy));
        this.paddle2.y = Math.max(0, Math.min(this.canvas.height - this.paddle2.height, this.paddle2.y + this.paddle2.dy));

        if (this.ball.x - this.ball.radius < this.paddle1.x + this.paddle1.width &&
            this.ball.y > this.paddle1.y && this.ball.y < this.paddle1.y + this.paddle1.height) {
            this.ball.dx = -this.ball.dx;
            this.score1++;
            this.score += 10;
        }

        if (this.ball.x + this.ball.radius > this.paddle2.x &&
            this.ball.y > this.paddle2.y && this.ball.y < this.paddle2.y + this.paddle2.height) {
            this.ball.dx = -this.ball.dx;
            this.score2++;
        }

        if (this.ball.x < 0 || this.ball.x > this.canvas.width) {
            this.ball = {x: this.canvas.width / 2, y: this.canvas.height / 2, radius: 8, dx: 5, dy: 5};
        }

        this.draw();
    }

    draw() {
        this.clearCanvas();
        
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.paddle1.x, this.paddle1.y, this.paddle1.width, this.paddle1.height);
        this.ctx.fillRect(this.paddle2.x, this.paddle2.y, this.paddle2.width, this.paddle2.height);

        this.drawCircle(this.ball.x, this.ball.y, this.ball.radius, '#ffff00');

        this.drawText(`${this.score1}  -  ${this.score2}`, this.canvas.width / 2, 30, 24, '#fff');
        this.drawText(`Total Score: ${this.score}`, this.canvas.width / 2, this.canvas.height - 20, 12, '#fff');
    }
}

// Space Invaders
class SpaceInvadersGame extends GameEngine {
    constructor() {
        super('gameCanvas');
        this.player = {x: this.canvas.width / 2 - 20, y: this.canvas.height - 50, width: 40, height: 40};
        this.enemies = [];
        this.bullets = [];
        this.spawnEnemies();
        this.setupControls();
        this.gameLoop = setInterval(() => this.update(), 30);
    }

    spawnEnemies() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 4; j++) {
                this.enemies.push({
                    x: i * 120 + 50,
                    y: j * 60 + 20,
                    width: 30,
                    height: 30,
                    dx: 2
                });
            }
        }
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.player.x -= 20;
            if (e.key === 'ArrowRight') this.player.x += 20;
            if (e.key === ' ') {
                this.bullets.push({x: this.player.x + 20, y: this.player.y, width: 5, height: 15});
                e.preventDefault();
            }
        });
    }

    update() {
        if (!this.gameActive) return;

        this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.width, this.player.x));

        this.bullets = this.bullets.filter(b => b.y > 0);
        this.bullets.forEach(b => b.y -= 10);

        this.enemies.forEach(e => e.x += e.dx);

        let changeDirection = false;
        this.enemies.forEach(e => {
            if (e.x < 0 || e.x + e.width > this.canvas.width) changeDirection = true;
        });

        if (changeDirection) {
            this.enemies.forEach(e => {
                e.dx = -e.dx;
                e.y += 40;
            });
        }

        this.enemies = this.enemies.filter(e => {
            let hit = false;
            this.bullets.forEach((b, bi) => {
                if (b.x < e.x + e.width && b.x + b.width > e.x &&
                    b.y < e.y + e.height && b.y + b.height > e.y) {
                    this.bullets.splice(bi, 1);
                    hit = true;
                    this.score += 10;
                }
            });
            return !hit;
        });

        this.enemies.forEach(e => {
            if (e.y + e.height > this.player.y) {
                this.endGame();
                this.saveScore('spaceinvaders');
                alert(`Game Over! Score: ${this.score}`);
                clearInterval(this.gameLoop);
            }
        });

        if (this.enemies.length === 0) {
            this.spawnEnemies();
        }

        this.draw();
    }

    draw() {
        this.clearCanvas();

        this.ctx.fillStyle = '#00ff00';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        this.ctx.fillStyle = '#ffff00';
        this.bullets.forEach(b => this.ctx.fillRect(b.x, b.y, b.width, b.height));

        this.ctx.fillStyle = '#ff0000';
        this.enemies.forEach(e => this.ctx.fillRect(e.x, e.y, e.width, e.height));

        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, 30, 16, '#fff');
    }
}
