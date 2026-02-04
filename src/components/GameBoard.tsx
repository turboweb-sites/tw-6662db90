import { Position } from '../types/game';

interface GameBoardProps {
  board: number[][];
  snake: Position[];
  food: Position;
  gameState: 'waiting' | 'playing' | 'paused' | 'gameOver';
}

export default function GameBoard({ board, snake, food, gameState }: GameBoardProps) {
  const isSnakeHead = (row: number, col: number) => {
    return snake.length > 0 && snake[0].row === row && snake[0].col === col;
  };

  const isSnakeBody = (row: number, col: number) => {
    return snake.some((segment, index) => index > 0 && segment.row === row && segment.col === col);
  };

  const isFood = (row: number, col: number) => {
    return food.row === row && food.col === col;
  };

  return (
    <div className="relative">
      {/* Overlay for non-playing states */}
      {gameState !== 'playing' && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
          <div className="text-center">
            {gameState === 'waiting' && (
              <p className="text-2xl font-bold text-white">Нажмите "Начать игру"</p>
            )}
            {gameState === 'paused' && (
              <p className="text-2xl font-bold text-yellow-400">ПАУЗА</p>
            )}
          </div>
        </div>
      )}

      {/* Game Grid */}
      <div className="inline-grid grid-cols-20 gap-0 bg-gray-800 p-1 rounded-lg border-4 border-gray-700">
        {board.map((row, rowIndex) => (
          row.map((_, colIndex) => {
            const head = isSnakeHead(rowIndex, colIndex);
            const body = isSnakeBody(rowIndex, colIndex);
            const foodCell = isFood(rowIndex, colIndex);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-5 h-5
                  ${head ? 'bg-green-400 border-2 border-green-600' : ''}
                  ${body ? 'bg-green-500 border border-green-600' : ''}
                  ${foodCell ? 'bg-red-500 rounded-full' : ''}
                  ${!head && !body && !foodCell ? 'bg-gray-900' : ''}
                `}
              />
            );
          })
        ))}
      </div>
    </div>
  );
}