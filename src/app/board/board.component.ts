import { CommonModule } from '@angular/common';
import { Board } from './board';
import { PieceComponent } from '../piece/piece.component';
import { Component } from '@angular/core';
import { Coordinates } from '../models';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  imports: [CommonModule, PieceComponent],
})
export class BoardComponent {
  board = new Board();

  selectCell(coordinates: Coordinates): void {
    if (this.board.isSelectedCell(coordinates)) {
      this.board.selectedCell = null;
      this.board.reachableCells = [];
    } else {
      if (this.board.isReachableCell(coordinates)) {
        const oldCoordinates = this.board.selectedCell;
        if (oldCoordinates) this.board.movePiece(oldCoordinates, coordinates);
      } else {
        this.board.selectedCell = coordinates;
        const piece = this.board.pieceAt(coordinates);
        if (piece.color === this.board.turn) this.board.showValidMovesOf(piece);
        else this.board.reachableCells = [];
      }
    }
  }
}
