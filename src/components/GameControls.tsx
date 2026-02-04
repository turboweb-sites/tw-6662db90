import { Play, Pause, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  gameState: 'waiting' | 'playing' | 'paused' | 'gameOver';
  onStart: () => void;
  onPause: () => void;
  onRestart: () => void;
  isPaused: boolean;
}

export default function GameControls({ gameState, onStart, onPause, onRestart, isPaused }: GameControlsProps) {
  return (
    <div className="flex gap-4 justify-center mt-6">
      {gameState === 'waiting' && (
        <button
          onClick={onStart}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg"
        >
          <Play className="w-5 h-5" />
          Начать игру
        </button>
      )}

      {(gameState === 'playing' || gameState === 'paused') && (
        <>
          <button
            onClick={onPause}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            {isPaused ? 'Продолжить' : 'Пауза'}
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Заново
          </button>
        </>
      )}

      {gameState === 'gameOver' && (
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      )}
    </div>
  );
}