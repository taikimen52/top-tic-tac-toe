function GameBoard() {
    const row = 3;
    const column = row;
    const board = [];

    for(let i = 0; i < row * column; i++){
        board.push(0);
    }

    const getBoard = () => board;

    const setToken = (boardPosition, value) => {
        board[boardPosition] = value;       
    }

    const resetBoard = () => {
        for (let i =0; i < board.length; i++){
            board[i] = 0;
        }
    };

    function renderBoard() {
        const container = document.querySelector(".board");
        for(let i = 0; i < board.length; i++){
            const div = document.createElement("div");
            div.classList.add("cells")
            div.setAttribute("data-position-value", i);
            div.setAttribute("id", `position${i}`)
            div.innerText = board[i];
            container.appendChild(div);
        }
    }

    function updateBoard(boardPosition, value) {
        const target = document.querySelector(`#position${boardPosition}`);
        target.setAttribute("value", value);
        target.innerText = value;
    }

    return {getBoard,setToken, resetBoard, renderBoard, updateBoard}
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
    const checkConditions= (arr) => {
        const LINES = [
            [0,1,2], [3,4,5], [6,7,8],      // 横
            [0,3,6], [1,4,7], [2,5,8],      // 縦
            [0,4,8], [2,4,6],               // 斜め
        ];

        for(const [a, b, c] of LINES){
            if (arr[a] !== 0 && arr[a] === arr[b] && arr[a] === arr[c]) return true;
        }
        return false; 
    }

    return {checkConditions}
}

function GameController(name1, name2){
    // 盤面とプレイヤーを作成
    const board = GameBoard();
    const rules = Rules();
    const playersObj = setPlayer(name1, name2);
    const players = playersObj.getPlayers();

    //初期専攻プレイヤーを取得
    let activePlayer = players[0];

    const startNewGame = () => {
        console.log(`Start New game with ${activePlayer.name} Token is ${activePlayer.value}`)
        board.resetBoard();
        board.renderBoard();
        setBtns();
    }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const setValueToBoard = (boardPosition) => {
        let value = activePlayer.value;

        board.setToken(boardPosition, value);
        board.updateBoard(boardPosition, value);
        
        if (rules.checkConditions(board.getBoard())) {
            console.log(`${activePlayer} win the game`);
        } else {
            switchPlayerTurn();
        }
    }

    function setBtns() {
        const targets = document.querySelectorAll(".cells")
        targets.forEach((el) => {
            let v = el.getAttribute("data-position-value");
            el.addEventListener("click",()=>{setValueToBoard(v)}, {once: true});
        });
    }

    return {startNewGame, switchPlayerTurn, setValueToBoard, setBtns};
}

const game = GameController("A", "B");
game.startNewGame();