import { Piece } from '../piece/piece';
import { PieceType } from '../piece/models';
import { ColorEnum, Coordinates } from '../models';

export class Board {
  readonly size: number = 8;
  private _turn: ColorEnum = ColorEnum.White;
  private readonly userColor: ColorEnum;
  private _board: (Piece | null)[];
  private _selectedCell: Coordinates | null = null;
  private _reachableCells: Coordinates[] = [];

  constructor(userColor: ColorEnum = ColorEnum.White) {
    this.userColor = userColor;
    const opponentColor = userColor === ColorEnum.White ? ColorEnum.Black : ColorEnum.White;
    this._board = [];

    this._board.push(
      new Piece(opponentColor, PieceType.Rook, { x: 0, y: 0 }),
      new Piece(opponentColor, PieceType.Knight, { x: 1, y: 0 }),
      new Piece(opponentColor, PieceType.Bishop, { x: 2, y: 0 }),
      new Piece(
        opponentColor,
        opponentColor === ColorEnum.Black ? PieceType.Queen : PieceType.King,
        {
          x: 3,
          y: 0,
        }
      ),
      new Piece(
        opponentColor,
        opponentColor === ColorEnum.Black ? PieceType.King : PieceType.Queen,
        {
          x: 4,
          y: 0,
        }
      ),
      new Piece(opponentColor, PieceType.Bishop, { x: 5, y: 0 }),
      new Piece(opponentColor, PieceType.Knight, { x: 6, y: 0 }),
      new Piece(opponentColor, PieceType.Rook, { x: 7, y: 0 })
    );

    for (let i = 0; i < 8; i++) {
      this.board.push(new Piece(opponentColor, PieceType.Pawn, { x: i, y: 1 }));
    }

    for (let i = 0; i < 4; i++) {
      this.board.push(null, null, null, null, null, null, null, null);
    }

    for (let i = 0; i < 8; i++) {
      this.board.push(new Piece(userColor, PieceType.Pawn, { x: i, y: 6 }));
    }

    this.board.push(
      new Piece(userColor, PieceType.Rook, { x: 0, y: 7 }),
      new Piece(userColor, PieceType.Knight, { x: 1, y: 7 }),
      new Piece(userColor, PieceType.Bishop, { x: 2, y: 7 }),
      new Piece(userColor, userColor === ColorEnum.White ? PieceType.Queen : PieceType.King, {
        x: 3,
        y: 7,
      }),
      new Piece(userColor, userColor === ColorEnum.White ? PieceType.King : PieceType.Queen, {
        x: 4,
        y: 7,
      }),
      new Piece(userColor, PieceType.Bishop, { x: 5, y: 7 }),
      new Piece(userColor, PieceType.Knight, { x: 6, y: 7 }),
      new Piece(userColor, PieceType.Rook, { x: 7, y: 7 })
    );
  }

  get board(): (Piece | null)[] {
    return this._board;
  }

  get turn(): ColorEnum {
    return this._turn;
  }

  get selectedCell(): Coordinates | null {
    return this._selectedCell;
  }

  set selectedCell(coordinates: Coordinates | null) {
    this._selectedCell = coordinates;
  }

  set reachableCells(coordinates: Coordinates[]) {
    this._reachableCells = coordinates;
  }

  pieceAt(coordinates: { x: number; y: number }): Piece | null {
    const index = coordinates.y * this.size + coordinates.x;
    return this._board[index];
  }

  isSelectedCell(coordinates: Coordinates): boolean {
    return this._selectedCell?.x === coordinates.x && this._selectedCell?.y === coordinates.y;
  }

  isReachableCell(coordinates: Coordinates): boolean {
    return this._reachableCells.some(cell => cell.x === coordinates.x && cell.y === coordinates.y);
  }

  showPossibleMoves(piece: Piece): void {
    this._reachableCells = this.determineTargetedCells(piece);
  }

  determineTargetedCells(piece: Piece): Coordinates[] {
    const targertedCells: Coordinates[] = [];
    const piecesMoves = piece.getMoves(this.userColor);

    piecesMoves.directions.forEach(direction => {
      if (piecesMoves.limit) {
        const newCoordinates: Coordinates = {
          x: piece.coordinates.x + direction.x,
          y: piece.coordinates.y + direction.y,
        };
        if (this.isValidCoordinates(newCoordinates)) {
          targertedCells.push(newCoordinates);
        }
      } else {
        for (let i = 1; i < this.size; i++) {
          const newCoordinates: Coordinates = {
            x: piece.coordinates.x + direction.x * i,
            y: piece.coordinates.y + direction.y * i,
          };
          if (this.isValidCoordinates(newCoordinates)) {
            targertedCells.push(newCoordinates);

            if (
              this.pieceAt(newCoordinates) !== null &&
              this.pieceAt(newCoordinates)?.color !== this.pieceAt(this._selectedCell!)?.color
            )
              break;
          } else {
            break; // Stop if we go out of bounds
          }
        }
      }
    });
    return targertedCells;
  }

  isValidCoordinates(coordinates: Coordinates): boolean {
    return (
      coordinates.x >= 0 &&
      coordinates.x < this.size &&
      coordinates.y >= 0 &&
      coordinates.y < this.size &&
      (this.pieceAt(coordinates) === null ||
        this.pieceAt(coordinates)?.color !== this.pieceAt(this._selectedCell!)?.color)
    );
  }

  movePiece(oldCoordinates: Coordinates, newCoordinates: Coordinates): void {
    const currentIndex = oldCoordinates.y * this.size + oldCoordinates.x;
    const newIndex = newCoordinates.y * this.size + newCoordinates.x;

    const piece = this.pieceAt(oldCoordinates);
    if (piece) {
      piece.coordinates = newCoordinates;
      this._board[currentIndex] = null;
      this._board[newIndex] = piece;
      piece.hasMoved += 1;
      this.checkForCheck();
    }
    this._selectedCell = null;
    this._turn = this._turn === ColorEnum.White ? ColorEnum.Black : ColorEnum.White;
  }

  checkForCheck(): void {
    this._board.forEach(cell => {
      if (cell instanceof Piece && cell?.color === this._turn) {
        const targertedCells = this.determineTargetedCells(cell);
        const king = targertedCells.filter(target => this.pieceAt(target)?.type === PieceType.King);
        if (king.length > 0) {
          this._reachableCells = king;
        } else {
          this._reachableCells = [];
        }
      }
    });
  }
}
