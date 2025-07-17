export enum PieceColor {
  Black = 'black',
  White = 'white',
}

export enum PieceType {
  Pawn = 'pawn',
  Rook = 'rook',
  Bishop = 'bishop',
  Knight = 'knight',
  King = 'king',
  Queen = 'queen',
}

export interface Piece {
  color: PieceColor;
  type: PieceType;
  position: { x: number; y: number };
}
