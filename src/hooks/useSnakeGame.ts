import { useState, useEffect, useCallback } from 'react';
import { Position, Direction, GameState } from '../types/game';

const BOARD_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
  { row: 10, col: 10 },
  { row: 10, col: 9 },
  { row: 10, col: 8 },
];

const SPEED_MAP = {
  easy: 200,
  medium: 150,
  hard: 100,
};

export function useSnakeGame(difficulty: 'easy' | 'medium' | 'hard') {
  const [board] = useState(() => 
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0))
  );
  
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ row: 5, col: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved) : 0;
  });

  // Generate random food position
  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        row: Math.floor(Math.random() * BOARD_SIZE),
        col: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some(segment => segment.row === newFood.row && segment.col === newFood.col));
    return newFood;
  }, [snake]);

  // Move snake
  const moveSnake = useCallback(() => {
    if (gameState !== 'playing') return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      // Update head position based on direction
      switch (direction) {
        case 'UP':
          head.row -= 1;
          break;
        case 'DOWN':
          head.row += 1;
          break;
        case 'LEFT':
          head.col -= 1;
          break;
        case 'RIGHT':
          head.col += 1;
          break;
      }

      // Check wall collision
      if (head.row < 0 || head.row >= BOARD_SIZE || head.col < 0 || head.col >= BOARD_SIZE) {
        setGameState('gameOver');
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.row === head.row && segment.col === head.col)) {
        setGameState('gameOver');
        return currentSnake;
      }

      // Add new head
      newSnake.unshift(head);

      // Check food collision
      if (head.row === food.row && head.col === food.col) {
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snakeHighScore', newScore.toString());
          }
          return newScore;
        });
        setFood(generateFood());
      } else {
        // Remove tail if no food eaten
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameState, generateFood, highScore]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState === 'playing') {
        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            if (direction !== 'DOWN') setDirection('UP');
            break;
          case 'ArrowDown':
          case 's':
          case 'S':
            if (direction !== 'UP') setDirection('DOWN');
            break;
          case 'ArrowLeft':
          case 'a':
          case 'A':
            if (direction !== 'RIGHT') setDirection('LEFT');
            break;
          case 'ArrowRight':
          case 'd':
          case 'D':
            if (direction !== 'LEFT') setDirection('RIGHT');
            break;
          case ' ':
            togglePause();
            break;
        }
      } else if (e.key === 'Enter') {
        if (gameState === 'waiting' || gameState === 'gameOver') {
          startGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameState]);

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, SPEED_MAP[difficulty]);

    return () => clearInterval(interval);
  }, [moveSnake, difficulty]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection('RIGHT');
    setScore(0);
    setGameState('playing');
  };

  const togglePause = () => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ row: 5, col: 5 });
    setDirection('RIGHT');
    setScore(0);
    setGameState('waiting');
  };

  return {
    board,
    snake,
    food,
    gameState,
    score,
    highScore,
    startGame,
    togglePause,
    resetGame,
  };
}