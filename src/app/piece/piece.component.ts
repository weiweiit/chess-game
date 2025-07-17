import { Component, Input } from '@angular/core';
import { Piece } from './piece.model';

@Component({
  selector: 'app-piece',
  standalone: true,
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.scss',
})
export class PieceComponent {
  @Input() piece!: Piece;
}
