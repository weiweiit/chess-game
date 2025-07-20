import { PieceMoves, PieceType } from './models';
import { ColorEnum, Coordinates } from '../models';

export class Piece {
  private _color!: ColorEnum;
  private _type!: PieceType;
  private _coordinates!: Coordinates;
  private _hasMoved = 0;

  constructor(color: ColorEnum, type: PieceType, coordinates: Coordinates) {
    this.color = color;
    this.type = type;
    this.coordinates = coordinates;
  }

  get color(): ColorEnum {
    return this._color;
  }

  set color(value: ColorEnum) {
    this._color = value;
  }

  get type(): PieceType {
    return this._type;
  }

  set type(value: PieceType) {
    this._type = value;
  }

  get coordinates(): Coordinates {
    return this._coordinates;
  }

  set coordinates(value: Coordinates) {
    this._coordinates = value;
  }

  get hasMoved(): number {
    return this._hasMoved;
  }

  set hasMoved(value: number) {
    this._hasMoved = value;
  }

  getMoves(userColor: ColorEnum): PieceMoves {
    if (this.type === PieceType.Pawn) {
      const pawnMoves = this.getPawnMoves();
      return this.color !== userColor
        ? pawnMoves
        : {
            directions: pawnMoves.directions.map(dir => ({ x: -dir.x, y: -dir.y })),
            limit: pawnMoves.limit,
          };
    } else if (this.type === PieceType.Knight) {
      return this.getKnightMoves();
    } else if (this.type === PieceType.Bishop) {
      return this.getBishopMoves();
    } else if (this.type === PieceType.Rook) {
      return this.getRookMoves();
    } else if (this.type === PieceType.Queen) {
      return this.getQueenMoves();
    } else if (this.type === PieceType.King) {
      return this.getKingMoves();
    }
    return { directions: [], limit: null };
  }

  getPawnMoves(): PieceMoves {
    return {
      directions: [{ x: 0, y: 1 }],
      limit: this.hasMoved === 0 ? 2 : 1,
    };
  }

  getKnightMoves(): PieceMoves {
    return {
      directions: [
        { x: 1, y: 2 },
        { x: 2, y: 1 },
        { x: 2, y: -1 },
        { x: 1, y: -2 },
        { x: -1, y: -2 },
        { x: -2, y: -1 },
        { x: -2, y: 1 },
        { x: -1, y: 2 },
      ],
      limit: 1,
    };
  }

  getBishopMoves(): PieceMoves {
    return {
      directions: [
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: -1 },
        { x: -1, y: 1 },
      ],
      limit: null,
    };
  }

  getRookMoves(): PieceMoves {
    return {
      directions: [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
      ],
      limit: null,
    };
  }

  getQueenMoves(): PieceMoves {
    const bishopMoves = this.getBishopMoves();
    const rookMoves = this.getRookMoves();
    return {
      directions: [...bishopMoves.directions, ...rookMoves.directions],
      limit: null,
    };
  }

  getKingMoves(): PieceMoves {
    const bishopMoves = this.getBishopMoves();
    const rookMoves = this.getRookMoves();
    return {
      directions: [...bishopMoves.directions, ...rookMoves.directions],
      limit: 1,
    };
  }
}
