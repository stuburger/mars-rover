import { Rover } from "./rover";
import { expect, test } from "vitest";

test("turns left correctly", () => {
  let rover = new Rover({
    direction: "N",
    instructions: ["L", "L", "L", "L"],
    position: [1, 2],
    boundary: [5, 5],
  });

  ["W", "S", "E", "N"].forEach((direction) => {
    rover = rover.next();
    expect(rover.direction).toEqual(direction);
  });
});

test("turns right correctly", () => {
  let rover = new Rover({
    direction: "N",
    instructions: ["R", "R", "R", "R"],
    position: [1, 2],
    boundary: [5, 5],
  });

  ["E", "S", "W", "N"].forEach((direction) => {
    rover = rover.next();
    expect(rover.direction).toEqual(direction);
  });
});

test("moving north", () => {
  let rover = new Rover({
    direction: "N",
    instructions: ["M"],
    position: [0, 0],
    boundary: [5, 5],
  });

  rover = rover.next();

  expect(rover.position).toEqual([0, 1]);
});

test("moving south", () => {
  let rover = new Rover({
    direction: "S",
    instructions: ["M"],
    position: [0, 5],
    boundary: [5, 5],
  });

  rover = rover.next();

  expect(rover.position).toEqual([0, 4]);
});

test("moving west", () => {
  let rover = new Rover({
    direction: "W",
    instructions: ["M"],
    position: [5, 0],
    boundary: [5, 5],
  });

  rover = rover.next();

  expect(rover.position).toEqual([4, 0]);
});

test("moving east", () => {
  let rover = new Rover({
    direction: "E",
    instructions: ["M"],
    position: [0, 0],
    boundary: [5, 5],
  });

  rover = rover.next();

  expect(rover.position).toEqual([1, 0]);
});

test("execute all instructions correctly", () => {
  let rover = new Rover({
    direction: "N",
    instructions: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
    position: [1, 2],
    boundary: [5, 5],
  });

  rover = rover.execute();

  expect(rover.position).toEqual([1, 3]);
  expect(rover.direction).toEqual("N");
});
