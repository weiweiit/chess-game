import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Piece } from './piece';

@Component({
  selector: 'app-piece',
  standalone: true,
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.scss',
  imports: [NgClass],
})
export class PieceComponent {
  @Input() piece!: Piece;
}
