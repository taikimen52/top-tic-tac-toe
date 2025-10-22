function Gameboard() {
    const row = 3;
    const column = 3;
    const board = [];

    for(let i = 0; i < row; i++){
        board[i] = [];
        for(let j = 0; j < column; j++){
            board[i].push(Cell());
        }
    }
    
    const getBoard = () => board;

    return {getBoard}
}

function Cell(){
    let token = 0;
}

function GameController(playerOneName = "player 1", playerTwoName = "player 2"){

    // 盤面を作成
    const board = Gameboard();

    // プレイヤーを配列に入れ、どちらがアクティブか判断
    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };


}