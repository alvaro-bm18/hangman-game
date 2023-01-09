const hangman_stick = [
    "    +----------+",
    "    |          |",
    "    |        ----- ",
    "    |",
    "    |",
    "    |",
    "    |",
    "    |",
    "    |",
    "    |",
    "    |",
    " ---+---"];

const hangman_head = [[3, "       (x - x)"]];
const hangman_armL = [
    [4, "       +-----+"],
    [5, "      /"],
    [6, "    _/ "]
];
const hangman_torso= [
    [5, "|     |"],
    [6, "|_____|"]
];
const hangman_armR = [
    [5, "\\"],
    [6, " \\_"]  
];
const hangman_legL = [
    [7, "       |"],
    [8, "      _|"]
];
const hangman_legR = [
    [7, "     |"],
    [8, "     |_"]
];

const HANG_PARTS = [hangman_head, hangman_armL, hangman_torso, hangman_armR, hangman_legL, hangman_legR];
export {hangman_stick, HANG_PARTS};