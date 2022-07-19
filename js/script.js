
// access for users 
const player_X = prompt("Welcome ! \n\nWho is PLAYER 😀 ? : ");
if (player_X != null){
    document.getElementById("playerx").innerHTML =
  " " + player_X + ' 😀' ;
}else{
    prompt("Player 😀', you have to  enter your name");
}
const player_O = prompt("\nWho is PLAYER 🦄, ? : ");
if (player_O != null){
    document.getElementById("playero").innerHTML =
    " " + player_O + ' 🦄' ;
}else{
    prompt("Player 🦄, you have to  enter your name");
}
// end conditions user

window.addEventListener('DOMContentLoaded', () => {
 // create a new, shallow-copied Array
    const boxes = Array.from(document.querySelectorAll('.box'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const reader = document.querySelector('.reader');

    let board = ['', '', '', '', '', '', '', '', ''];
    // sound box start
    var  NumOfbox = document.querySelectorAll('.box').length;
   for (var i = 0; i < NumOfbox; i++){
    document.querySelectorAll('.box')[i].addEventListener('click', function (){
         var audio = new Audio('sounds/game.wav');
         audio.play();
     });   
}
    //end sound
    let currentPlayer = '😀';
    let openGame = true;
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TATA = 'TATA';


    /* Indexes within the board
0  |  1  |  2
- -| - - | - - - 
3  |  4  |  5 
- -| - - | - - -  
6  |  7  |  8
 
 */
   // winningConditions

    const winningBe = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < 7; i++) {
            const winCondition = winningBe[i];
            const x = board[winCondition[0]];
            const y = board[winCondition[1]];
            const z = board[winCondition[2]];
            if (x === '' || y === '' || z === '') {
                continue;
            }
            if (x === y && y === z) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === '😀' ? PLAYERX_WON : PLAYERO_WON);
            openGame = false;
            return;
        }

    if (!board.includes(''))
        announce(TATA);


    }

    const announce = (type) => {
        
        var audio = new Audio('sounds/yes-win.wav');
        var audiolost = new Audio('sounds/losing.wav');
        if(type === 'PLAYERO_WON' ){
                reader.innerHTML = 'Player <span class="playerO">' + player_O + ' </span> Won 🦄 ';
                audio.play();
            
        }else if(type === 'PLAYERX_WON'){
            reader.innerHTML = 'Player <span class="playerX"> ' + player_X + ' </span> Won 😀 ';
            audio.play();
           
        } else{
                reader.innerText = 'No one wins';
                audiolost.play();
                
        }
        reader.classList.remove('hide');
       // reader.innerHTML = '<button id="reset" class="btn btn-warning">Reset</button>';
    };

    const isValidAction = (box) => {
        if (box.innerText === '😀' || box.innerText === '🦄'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === '😀' ? '🦄' : '😀';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (box, index) => {
        if(isValidAction(box) && openGame) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        openGame = true;
        reader.classList.add('hide');

        if (currentPlayer === '🦄') {
            changePlayer();
        }

        boxes.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    }

    boxes.forEach( (box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
