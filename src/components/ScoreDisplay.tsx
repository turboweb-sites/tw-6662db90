import { Trophy, Target } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  highScore: number;
  gameState: 'waiting' | 'playing' | 'paused' | 'gameOver';
}

export default function ScoreDisplay({ score, highScore, gameState }: ScoreDisplayProps) {
  return (
    <div className="flex justify-center gap-8 mb-6">
      <div className="bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-700">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          <span className="text-gray-400">Счёт:</span>
          <span className="text-2xl font-bold text-white">{score}</span>
        </div>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-700">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-gray-400">Рекорд:</span>
          <span className="text-2xl font-bold text-white">{highScore}</span>
          {gameState === 'playing' && score === highScore && score > 0 && (
            <span className="text-yellow-400 animate-pulse ml-2">NEW!</span>
          )}
        </div>
      </div>
    </div>
  );
}