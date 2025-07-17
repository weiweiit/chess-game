import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Piece, PieceType, PieceColor } from '../piece/piece.model';
import { PieceComponent } from '../piece/piece.component';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  imports: [CommonModule, PieceComponent],
})
export class BoardComponent {
  pieces: (Piece | null)[][] = [
    [
      { color: PieceColor.Black, type: PieceType.Rook, position: { x: 0, y: 0 } },
      { color: PieceColor.Black, type: PieceType.Knight, position: { x: 1, y: 0 } },
      { color: PieceColor.Black, type: PieceType.Bishop, position: { x: 2, y: 0 } },
      { color: PieceColor.Black, type: PieceType.King, position: { x: 3, y: 0 } },
      { color: PieceColor.Black, type: PieceType.Queen, position: { x: 4, y: 0 } },
      { color: PieceColor.Black, type: PieceType.Bishop, position: { x: 5, y: 0 } },
      { color: PieceColor.Black, type: PieceType.Knight, position: { x: 6, y: 0 } },
      { color: PieceColor.Black, type: PieceType.Rook, position: { x: 7, y: 0 } },
    ],
    Array.from({ length: 8 }, (_, x) => ({
      color: PieceColor.White,
      type: PieceType.Pawn,
      position: { x, y: 1 },
    })),
    ...Array.from({ length: 4 }, _ => Array(8).fill(null)),
    Array.from({ length: 8 }, (_, x) => ({
      color: PieceColor.Black,
      type: PieceType.Pawn,
      position: { x, y: 6 },
    })),
    [
      { color: PieceColor.White, type: PieceType.Rook, position: { x: 0, y: 7 } },
      { color: PieceColor.White, type: PieceType.Knight, position: { x: 1, y: 7 } },
      { color: PieceColor.White, type: PieceType.Bishop, position: { x: 2, y: 7 } },
      { color: PieceColor.White, type: PieceType.Queen, position: { x: 3, y: 7 } },
      { color: PieceColor.White, type: PieceType.King, position: { x: 4, y: 7 } },
      { color: PieceColor.White, type: PieceType.Bishop, position: { x: 5, y: 7 } },
      { color: PieceColor.White, type: PieceType.Knight, position: { x: 6, y: 7 } },
      { color: PieceColor.White, type: PieceType.Rook, position: { x: 7, y: 7 } },
    ],
  ];
}
