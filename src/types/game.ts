export interface Position {
  row: number;
  col: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameState = 'waiting' | 'playing' | 'paused' | 'gameOver';