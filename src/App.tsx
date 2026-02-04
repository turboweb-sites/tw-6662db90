import { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import ScoreDisplay from './components/ScoreDisplay';
import { useSnakeGame } from './hooks/useSnakeGame';
import { Trophy, Gamepad2 } from 'lucide-react';

export default function App() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const game = useSnakeGame(difficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gamepad2 className="w-8 h-8 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Snake Game
            </h1>
            <Gamepad2 className="w-8 h-8 text-pink-400" />
          </div>
          <p className="text-gray-400">Используйте стрелки или WASD для управления</p>
        </div>

        {/* Score and High Score */}
        <ScoreDisplay 
          score={game.score} 
          highScore={game.highScore}
          gameState={game.gameState}
        />

        {/* Game Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700">
          {/* Difficulty Selector */}
          {game.gameState === 'waiting' && (
            <div className="mb-6">
              <p className="text-center text-gray-400 mb-3">Выберите сложность:</p>
              <div className="flex gap-3 justify-center">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      difficulty === level
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {level === 'easy' ? 'Легко' : level === 'medium' ? 'Средне' : 'Сложно'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Game Board */}
          <GameBoard 
            board={game.board}
            snake={game.snake}
            food={game.food}
            gameState={game.gameState}
          />

          {/* Controls */}
          <GameControls
            gameState={game.gameState}
            onStart={game.startGame}
            onPause={game.togglePause}
            onRestart={game.resetGame}
            isPaused={game.gameState === 'paused'}
          />

          {/* Game Over Message */}
          {game.gameState === 'gameOver' && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-900/50 rounded-lg border border-red-700">
                <Trophy className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Игра окончена!</span>
              </div>
              {game.score === game.highScore && game.score > 0 && (
                <p className="text-yellow-400 mt-2 animate-pulse">🎉 Новый рекорд! 🎉</p>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Управление: ↑↓←→ или WASD • Пробел: Пауза • Enter: Старт/Рестарт</p>
        </div>
      </div>
    </div>
  );
}