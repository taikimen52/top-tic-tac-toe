function GameBoard() {
    const row = 3;
    const column = row;
    const board = [];

    const getBoard = () => {
        for(let i = 0; i < row * column; i++){
            board.push(0);
        }
        return board;
    };

    const setToken = (boardPosition, activePlayer) => {
        board[boardPosition] = activePlayer.value;
    }

    return {board, getBoard, setToken}
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
        board.getBoard();
    }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const setValueToBoard = (boardPosition) => {
        board.setToken(boardPosition, activePlayer);
        switchPlayerTurn();
    }

    return {startNewGame, switchPlayerTurn, setValueToBoard}
}

const game = GameController("A", "B");
game.startNewGame();
game.setValueToBoard(7);