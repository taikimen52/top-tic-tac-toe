function GameBoard() {
    const row = 3;
    const column = row;
    const board = [];

    const initBoard = () => {
        for(let i = 0; i < row * column; i++){
            board.push("0");
        }
        return board;
    };

    const getBoard = () => board

    return {initBoard, getBoard}
}


function setPlayer(playerOneName = "player 1", playerTwoName ="player 2"){
    const players = [
        {
            name: playerOneName,
            value: 1
        },
        {
            name: playerTwoName,
            value: 2
        }
    ];

    const getPlayers = () => players;

    const getActivePlayer = () => players[0];

    return {getPlayers, getActivePlayer}
}

function GameController(playerOneName, playerTwoName){

    // 盤面とプレイヤーを作成
    const board = GameBoard();
    const createPlayers = setPlayer(playerOneName, playerTwoName);
    const players = createPlayers.getPlayers();

    //初期専攻プレイヤーを取得
    let activePlayer = createPlayers.getActivePlayer();


    const startNewGame = () => {
        console.log(`Start New game with ${players[0].name}`)
        board.initBoard()
    }
        console.log(board.getBoard())

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // const setValueToBoard = (boardPosition) => {
    // }


    return {startNewGame, switchPlayerTurn}
}

const game = GameController("A", "B");
game.startNewGame();