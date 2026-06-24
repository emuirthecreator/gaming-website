// Game Save & Storage System
class GameStorage {
    constructor() {
        this.prefix = 'gaming_hub_';
        this.leaderboardKey = this.prefix + 'leaderboard';
        this.userKey = this.prefix + 'user';
        this.initializeUser();
    }

    initializeUser() {
        if (!this.getUser()) {
            const userId = 'user_' + Math.random().toString(36).substr(2, 9);
            this.setUser({
                id: userId,
                username: 'Player_' + Math.random().toString(36).substr(2, 5),
                totalScore: 0,
                gamesPlayed: 0,
                joinDate: new Date().toISOString()
            });
        }
    }

    // User methods
    getUser() {
        const user = localStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    setUser(user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    updateUsername(username) {
        const user = this.getUser();
        user.username = username;
        this.setUser(user);
    }

    // Game save methods
    saveGameScore(gameName, score, gameData = {}) {
        const user = this.getUser();
        const gameKey = this.prefix + gameName + '_' + user.id;
        
        const gameData_saved = {
            gameName,
            score,
            date: new Date().toISOString(),
            data: gameData
        };

        localStorage.setItem(gameKey, JSON.stringify(gameData_saved));

        // Update user total score
        user.totalScore += score;
        user.gamesPlayed += 1;
        this.setUser(user);

        // Add to leaderboard
        this.addToLeaderboard(user.username, gameName, score);
    }

    getGameSave(gameName) {
        const user = this.getUser();
        const gameKey = this.prefix + gameName + '_' + user.id;
        const data = localStorage.getItem(gameKey);
        return data ? JSON.parse(data) : null;
    }

    // Leaderboard methods
    addToLeaderboard(username, gameName, score) {
        let leaderboard = this.getLeaderboard();
        
        const entry = {
            username,
            gameName,
            score,
            date: new Date().toISOString()
        };

        leaderboard.push(entry);
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 100); // Keep top 100

        localStorage.setItem(this.leaderboardKey, JSON.stringify(leaderboard));
    }

    getLeaderboard() {
        const data = localStorage.getItem(this.leaderboardKey);
        return data ? JSON.parse(data) : [];
    }

    getLeaderboardByGame(gameName) {
        const leaderboard = this.getLeaderboard();
        return leaderboard
            .filter(entry => entry.gameName === gameName)
            .slice(0, 10);
    }

    getTopScores(limit = 10) {
        return this.getLeaderboard().slice(0, limit);
    }

    // User stats
    getUserStats() {
        const user = this.getUser();
        const leaderboard = this.getLeaderboard();
        const userScores = leaderboard.filter(entry => entry.username === user.username);
        
        return {
            ...user,
            totalScores: userScores.length,
            highestScore: userScores.length > 0 ? userScores[0].score : 0,
            averageScore: userScores.length > 0 
                ? Math.round(userScores.reduce((a, b) => a + b.score, 0) / userScores.length)
                : 0
        };
    }

    clearAllData() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith(this.prefix));
        keys.forEach(key => localStorage.removeItem(key));
    }
}

const storage = new GameStorage();