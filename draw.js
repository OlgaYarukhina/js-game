import { draw } from "./draw.js"


export const startTile = [23, 13.5]
export const startingX = startTile[1] * mapSize - 7
export const startingY = startTile[0] * mapSize - 7
export const maxSpeedStart = 3.33
export const pacStartSpeed = maxSpeedStart * 0.8
export const ghostSpeedStart = maxSpeedStart * 0.75

export const pacStart = {
    name: "pacman",
    x: startingX,
    y: startingY,
    speed: pacStartSpeed,
    direction: "",
    nextDirection: "",
    prevX: 0,
    prevY: 0,
    started: false,
    aboutToStart: true,
    lastChangeCoordinates: [],
    div: document.getElementById("pacman")
}
export const blinkyStart = {
    name: "blinky",
    color: "red",
    x: startingX,
    y: startingY - 240,
    speed: ghostSpeedStart,
    direction: "L",
    prevX: 0,
    prevY: 0,
    nextDirection: "L",
    started: false,
    aboutToStart: true,
    reverse : false,
    frightened: false,
    returnToHouse: false,
    movingIntoHouse: false,
    lastChangeCoordinates: [],
    div: document.getElementById("blinky")
}

export const pinkyStart = {
    name: "pinky",
    color: "pink",
    x: startingX,
    y: startingY - 180,
    speed: ghostSpeedStart,
    direction: "U",
    prevX: 0,
    prevY: 0,
    nextDirection: "",
    started: false,
    aboutToStart: false,
    reverse : false,
    frightened: false,
    returnToHouse: false,
    movingIntoHouse: false,
    lastChangeCoordinates: [],
    div: document.getElementById("pinky")
}

export const inkyStart = {
    name: "inky",
    color: "rgb(110, 210, 235)",
    x: startingX - 40,
    y: startingY - 190,
    speed: ghostSpeedStart,
    direction: "U",
    prevX: 0,
    prevY: 0,
    nextDirection: "",
    started: false,
    aboutToStart: false,
    reverse : false,
    frightened: false,
    returnToHouse: false,
    lastChangeCoordinates: [],
    div: document.getElementById("inky")
}

export const clydeStart = {
    name: "clyde",
    color: "orange",
    x: startingX + 40,
    y: startingY - 170,
    speed: ghostSpeedStart,
    direction: "U",
    prevX: 0,
    prevY: 0,
    nextDirection: "",
    started: false,
    aboutToStart: false,
    reverse : false,
    frightened: false,
    returnToHouse: false,
    lastChangeCoordinates: [],
    div: document.getElementById("clyde")
}