type Instruction = "L" | "R" | "M";
type Direction = "N" | "E" | "S" | "W";
type Coordinates = [number, number];

/**
  1 2 N
  LMLMLMLMM
 */

interface Input {
  direction: Direction;
  position: Coordinates;
  boundary: Coordinates;
  instructions: Instruction[];
}

const DIRECTIONS: Direction[] = ["N", "E", "S", "W"];

export class Rover {
  instructions: Instruction[];
  position: Coordinates;
  private _direction: number;
  boundary: Coordinates;

  constructor(input: Input) {
    this.boundary = input.boundary;
    this.position = input.position;
    this.instructions = input.instructions;
    this._direction = DIRECTIONS.indexOf(input.direction);
  }

  public get direction(): Direction {
    return DIRECTIONS[this._direction] as Direction;
  }

  static from(rover: Rover, overrides: Partial<Input>) {
    return new Rover({
      boundary: rover.boundary,
      direction: rover.direction,
      instructions: rover.instructions,
      position: rover.position,
      ...overrides,
    });
  }
  next(): Rover {
    const copy = [...this.instructions];
    const instruction = copy.shift();

    const turns = { L: -1, R: 1 };

    if (instruction === "L" || instruction === "R") {
      const index = (this._direction + turns[instruction] + 4) % 4;
      return Rover.from(this, {
        direction: DIRECTIONS[index],
        instructions: copy,
      });
    }

    const [x, y] = this.move();
    const [boundX, boundY] = this.boundary;

    const position: Coordinates = [
      (x + boundX) % boundX,
      (y + boundY) % boundY,
    ];

    return Rover.from(this, { position, instructions: copy });
  }

  execute(): Rover {
    let rover: Rover = this;

    while (!rover.done) {
      rover = rover.next();
    }

    return rover;
  }

  private get done() {
    return this.instructions.length === 0;
  }

  private move(): Coordinates {
    const [x, y] = this.position;

    switch (this.direction) {
      case "N": {
        return [x, y + 1];
      }
      case "E": {
        return [x + 1, y];
      }
      case "W": {
        return [x - 1, y];
      }
      case "S": {
        return [x, y - 1];
      }
    }
  }
}
