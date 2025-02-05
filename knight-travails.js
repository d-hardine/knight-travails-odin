//the board
let board = [];
for(let i = 0; i <= 7; i++) {
    for(let j = 0; j <= 7; j++) {
        board.push([i,j]);
    }
};
//console.log(board);

//all knight moves
let moves = [];
for(let i = 0; i <= board.length - 1; i++) {
    moves.push([board[i]]);

    //first L
    let firstPosibility = moves[i][0][0] + 1
    let secondPosibility = moves[i][0][1] + 2
    //second L
    let thirdPosibility = moves[i][0][0] + 2
    let fourthPosibility = moves[i][0][1] + 1
    //third L
    let fifthPosibility = moves[i][0][0] + 1
    let sixthPosibility = moves[i][0][1] - 2
    //fourth L
    let seventhPosibility = moves[i][0][0] - 2
    let eighthPosibility = moves[i][0][1] + 1
    //first L inversed
    let firstPosibilityInversed = moves[i][0][0] - 1
    let secondPosibilityInversed = moves[i][0][1] - 2
    //second L inversed
    let thirdPosibilityInversed = moves[i][0][0] - 2
    let fourthPosibilityInversed = moves[i][0][1] - 1
    //third L inversed
    let fifthPosibilityInversed = moves[i][0][0] - 1
    let sixthPosibilityInversed = moves[i][0][1] + 2
    //fourth L inversed
    let seventhPosibilityInversed = moves[i][0][0] + 2
    let eighthPosibilityInversed = moves[i][0][1] - 1

    if(firstPosibility <= 7 && secondPosibility <= 7) //first L
        moves[i].push([firstPosibility, secondPosibility])
    if(thirdPosibility <= 7 && fourthPosibility <= 7) //second L
        moves[i].push([thirdPosibility, fourthPosibility]);
    if(firstPosibilityInversed >= 0 && secondPosibilityInversed >= 0 && firstPosibilityInversed <= 7 && secondPosibilityInversed <= 7) //first L inversed
        moves[i].push([firstPosibilityInversed, secondPosibilityInversed]);
    if(thirdPosibilityInversed >= 0 && fourthPosibilityInversed >= 0 && thirdPosibilityInversed <= 7 && fourthPosibilityInversed <= 7) //second L inversed
        moves[i].push([thirdPosibilityInversed, fourthPosibilityInversed]);
    if(fifthPosibility <= 7 && sixthPosibility <= 7 && fifthPosibility >= 0 && sixthPosibility >= 0) //third L
        moves[i].push([fifthPosibility, sixthPosibility])
    if(seventhPosibility <= 7 && sixthPosibility <= 7 && seventhPosibility >= 0 && eighthPosibility >= 0) //fourth L
        moves[i].push([seventhPosibility, eighthPosibility])
    if(fifthPosibilityInversed <= 7 && sixthPosibilityInversed <= 7 && fifthPosibilityInversed >= 0 && sixthPosibilityInversed >= 0) //third L inversed
        moves[i].push([fifthPosibilityInversed, sixthPosibilityInversed])
    if(seventhPosibilityInversed <= 7 && eighthPosibilityInversed <= 7 && seventhPosibilityInversed >= 0 && eighthPosibilityInversed >= 0) //fourth L inversed
        moves[i].push([seventhPosibilityInversed, eighthPosibilityInversed])
};
console.log(moves)

//the graph
const adjacencyList = new Map();

//add nodes
function addNode(board) {
    adjacencyList.set(board, [])
}
board.forEach(addNode)
//console.log(adjacencyList)

//add edges, no direction
function addEdge(knightNode, knightMoves1, knightMoves2, knightMoves3, knightMoves4, knightMoves5, knightMoves6, knightMoves7, knightMoves8) {
    if(knightMoves1) {
        adjacencyList.get(knightNode).push(knightMoves1)
    }
    if(knightMoves2) {
        adjacencyList.get(knightNode).push(knightMoves2)
    }
    if(knightMoves3) {
        adjacencyList.get(knightNode).push(knightMoves3)
    }
    if(knightMoves4) {
        adjacencyList.get(knightNode).push(knightMoves4)
    }
    if(knightMoves5) {
        adjacencyList.get(knightNode).push(knightMoves5)
    }
    if(knightMoves6) {
        adjacencyList.get(knightNode).push(knightMoves6)
    }
    if(knightMoves7) {
        adjacencyList.get(knightNode).push(knightMoves7)
    }
    if(knightMoves8) {
        adjacencyList.get(knightNode).push(knightMoves8)
    }
}

for(let i = 0; i < moves.length; i++) {
    addEdge(moves[i][0], moves[i][1], moves[i][2], moves[i][3], moves[i][4], moves[i][5], moves[i][6], moves[i][7], moves[i][8])
}
//console.log(adjacencyList)