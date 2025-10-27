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


function setPlayer(){
    const players = [
        {
            name: "default1",
            value: 1
        },
        {
            name: "default2",
            value: 2
        }
    ];

    const getPlayers = () => players;

    const getActivePlayer = () => players[0];

    const setName = (name1 = "player1", name2 = "player2") => {
        if(name1 == "" && name2 == ""){
            players[0].name = "player1";
            players[1].name = "player2";
        }else if (name1 == "") {
            players[0].name = "player1";
        }else if (name2 == "") {
            players[1].name = "player2";
        }else {
            players[0].name = name1;
            players[1].name = name2;
        }
    }

    return {getPlayers, getActivePlayer, setName}
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

function GameController(){
    // 盤面とプレイヤーを作成
    const board = GameBoard();
    const boardArr = board.getBoard();
    const rules = Rules();
    const playersObj = setPlayer();
    const players = playersObj.getPlayers();
    let activePlayer = playersObj.getActivePlayer();

    const startNewGame = () => {
        getPlayersInput();
        board.resetBoard();
        printPlayers();
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
        printResult();
        switchPlayerTurn();
    }

    function setBtns() {
        const targets = document.querySelectorAll(".cells")
        targets.forEach((el) => {
            let v = el.getAttribute("data-position-value");
            el.addEventListener("click",()=>{setValueToBoard(v)}, {once: true});
        });
    }

    function getPlayersInput() {
        const playerOneName = document.querySelector("#playerone").value
        const playerTwoName = document.querySelector("#playertwo").value
        playersObj.setName(playerOneName, playerTwoName);
    }

    function printPlayers() {
        const target = document.querySelector(".message")
        target.innerText = `Now the turn of ${activePlayer.name}`
    }

    function printResult() {
        target = document.querySelector(".resultmessage")  
        if (rules.checkConditions(board.getBoard())) {
            target.innerText = `${activePlayer.name} win the game`
        } else if(!boardArr.includes(0)){
            target.innerText = "Draw"
        }
    }

    return {startNewGame};
}

const game = GameController();
const startBtn = document.querySelector(".startbtn");

startBtn.addEventListener("click", game.startNewGame);