//the board
let board = [];
for(let i = 0; i <= 7; i++) {
    for(let j = 0; j <= 7; j++) {
        board.push([i,j]);
    }
};

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
    if(firstPosibilityInversed >= 0 && secondPosibilityInversed >= 0) //first L inversed
        moves[i].push([firstPosibilityInversed, secondPosibilityInversed]);
    if(thirdPosibilityInversed >= 0 && fourthPosibilityInversed >= 0) //second L inversed
        moves[i].push([thirdPosibilityInversed, fourthPosibilityInversed]);
    if(fifthPosibility <= 7 && sixthPosibility <= 7 && fifthPosibility >= 0 && sixthPosibility >= 0) //third L
        moves[i].push([fifthPosibility, sixthPosibility])
    if(seventhPosibility <= 7 && eighthPosibility <= 7 && seventhPosibility >= 0 && eighthPosibility >= 0) //fourth L
        moves[i].push([seventhPosibility, eighthPosibility])
    if(fifthPosibilityInversed <= 7 && sixthPosibilityInversed <= 7 && fifthPosibilityInversed >= 0 && sixthPosibilityInversed >= 0) //third L inversed
        moves[i].push([fifthPosibilityInversed, sixthPosibilityInversed])
    if(seventhPosibilityInversed <= 7 && eighthPosibilityInversed <= 7 && seventhPosibilityInversed >= 0 && eighthPosibilityInversed >= 0) //fourth L inversed
        moves[i].push([seventhPosibilityInversed, eighthPosibilityInversed])
};
//console.log(moves)

//the graph
const adjacencyList = new Map();

//add nodes
function addNode(board) {
    adjacencyList.set(board, [])
}
board.forEach(addNode)

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


//Hashing the board
import { HashMap } from "./hashmap.js";

function indexOfCustom (parentArray, searchElement) { //JS can't compare between object, this is the hack
    for ( let i = 0; i < parentArray.length; i++ ) {
        if ( parentArray[i][0] == searchElement[0] && parentArray[i][1] == searchElement[1] ) {
            return i;
        }
    }
    return -1;
}

let hashedBoard = new HashMap();

for(let i=0; i < board.length; i++) {
    //console.log(board[i].toString(), indexOfCustom(board, board[i]))
    hashedBoard.set(board[i].toString(), indexOfCustom(board, board[i]))
}
//hashedBoard.print()
//console.log(hashedBoard.get('2,3'))
//console.log(board[hashedBoard.get('5,2')])
//console.log(adjacencyList.get(board[hashedBoard.get('0,0')]))


//depth first search, this is not the solution
function dfs(start, end, visited = new Set()) {
    start = board[hashedBoard.get(start.toString())]
    end = board[hashedBoard.get(end.toString())]
    visited.add(`${start.toString()}`);
    let destinations = adjacencyList.get(start);
    for(let i = 0; i < destinations.length; i++) {
        if(destinations[i][0] === end[0] && destinations[i][1] === end[1]) {
            console.log(destinations[i], `found the ${end}`);
            return;
        }

        if(!visited.has(`${destinations[i].toString()}`)) {
            console.log(destinations[i])
            dfs(destinations[i], end, visited)
        }
    }
}

//breadth first search, this is the real solution.
// All alhorithm console logs has been disabled. Feel free to enable them for more algorithm explanation
function knightmoves(start, end, connection = [], costs = []) {
    start = board[hashedBoard.get(start.toString())]
    end = board[hashedBoard.get(end.toString())]
    const queue = [[null, start]];
    const visited = new Set();
    visited.add(`${start.toString()}`)

    while(queue.length > 0) {
        //console.log('the queue: ', queue); //this is important
        const proccessing = queue.shift();
        //console.log('proccessing: ', proccessing[1]);
        const edges = adjacencyList.get(board[hashedBoard.get(proccessing[1].toString())]);
        //console.log('edges of the proccessed vertex: ', edges)
        for(let i = 0; i < edges.length; i++) {
            if(edges[i][0] === end[0] && edges[i][1] === end[1]) {
                if(proccessing[0] === null) {
                    //console.log(`BFS found ${end}`);
                    let results = [start, end]
                    console.log(`You made it in ${results.length -  1} move(s)! Here's your path:`)
                    for(let i = 0; i < results.length; i++)
                        console.log(results[i]);
                    return results
                }
                //console.log(`BFS found ${end}`);
                connection[hashedBoard.get(edges[i].toString())] = proccessing[1];
                //console.log('the vertex before ' + proccessing[1] + ' is ' + proccessing[0] +  " so it's connection cost is " + costs[connection.indexOf(proccessing[0])] + " + 1")
                costs[hashedBoard.get(edges[i].toString())] = costs[connection.indexOf(proccessing[0])] + 1
                
                //now return the shortest path
                let results = [];
                let lastNode = edges[i];
                while(lastNode) {
                    results.push(lastNode);
                    //console.log(lastNode, hashedBoard.get(lastNode.toString()))
                    lastNode = connection[hashedBoard.get(lastNode.toString())];
                }
                results.reverse();
                console.log(`You made it in ${results.length -  1} move(s)! Here's your path:`)
                for(let i = 0; i < results.length; i++)
                    console.log(results[i]);
                return results
            }
            if(!visited.has(`${edges[i].toString()}`)) {
                visited.add(`${edges[i].toString()}`);
                queue.push([proccessing[1], edges[i]]);
                //console.log(edges[i], ' pushed to queue');
                connection[hashedBoard.get(edges[i].toString())] = proccessing[1];
                //console.log(`${edges[i]} is pushed to ${proccessing[1]} inside path arrays`);
                if(proccessing[1] === start) {
                    costs[hashedBoard.get(edges[i].toString())] = 1;
                }else {
                    //console.log('JANCOOOOK', proccessing[0].toString(), connection.indexOf(proccessing[0]))
                    //console.log('the vertex before ' + proccessing[1] + ' is ' + proccessing[0] +  " so it's connection cost is " + costs[connection.indexOf(proccessing[0])] + " + 1")
                    costs[hashedBoard.get(edges[i].toString())] = costs[connection.indexOf(proccessing[0])] + 1
                }
            }
        }
    }
}

knightmoves([0,0],[1,2])
