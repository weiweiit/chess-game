import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieceComponent } from './piece/piece.component';
import { BoardComponent } from './board/board.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent, PieceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
