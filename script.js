function GameBoard() {
    const row = 3;
    const column = row;
    const board = [];

    for(let i = 0; i < row * column; i++){
        board.push(0);
    }

    const getBoard = () => board;

    const setToken = (boardPosition, activePlayer) => {
        board[boardPosition] = activePlayer.value;
    }

    const resetBoard = () => board.forEach((el) => 0);

    const getRow = () => row;

    return {getBoard, setToken, resetBoard}
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

function Rules () {
    const victory = false;

    const winTheGame = () => victory = true;

    const checkConditions= (arr, row) => {
        for(let i = 0; i < row; i++){
            if(!arr[i] === 0 && arr[i] === arr[i+row] && arr[i+row] === arr[i+ro*2])
        }
        // 行：連続した3つ（0,1,2/3,4,5/6,7,8）に0以外の同じ値のトークンがあればトークンの値を持つ方のプレイヤーが勝利
        if(arr[i])
        // 列：n+row*iが全て同じトークンなら勝利
        // 0+row+1 or row-1+row*iが同じトークンなら勝利
    } 
    return {checkConditions};
}

function GameController(playerOneName, playerTwoName){
    // 盤面とプレイヤーを作成
    const board = GameBoard();
    console.log(board)
    const players = setPlayer(playerOneName, playerTwoName);

    //初期専攻プレイヤーを取得
    let activePlayer = players.getActivePlayer();
    console.log(activePlayer);


    const startNewGame = () => {
        console.log(`Start New game with ${activePlayer.name}`)
        board.resetBoard();
    }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const setValueToBoard = (boardPosition) => {
        board.setToken(boardPosition, activePlayer);
        switchPlayerTurn();
    }

    return {startNewGame, switchPlayerTurn, setValueToBoard};
}

const game = GameController("A", "B");
game.startNewGame();
game.setValueToBoard(7);
console.log(game);