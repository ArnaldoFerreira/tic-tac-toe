// line below is here bcs we put our script in the head of the html
//NodeList = Array like Object
window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer =document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    //the only difference is that once you've assigned a value to a variable using const , you can't reassign it to a new value.
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */
    //Notice it's and Array of Arrays
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
// why i <= 7; less than or equal to
//board
        function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i];
                const a = board[winCondition[0]];
                const b = board[winCondition[1]];
                const c = board[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a == b && b === c){
                    roundWon = true;
                    break;
                }
            }
            //?=  Conditional (ternary) operator  Question Mark (?) Operator
            //The conditional (ternary) operator is the only JavaScript operator that takes three operands
            // is frequently used as an alternative to an if...else
            //the ternary operator is an expression form (expressions return a value) of an if/then statement. 
            //var result = (condition) ? (value1) : (value2) ;
            if (roundWon) {
                announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
                isGameActive = false;
                return;
            }
            if (!board.includes(''))
            announce(TIE);
        }

        tiles.forEach((tile, index) => {
            tile.addEventListener('click', () => userAction(tile, index));

        });

        // switch(expr) 
        const announce = (type) => {
            switch(type){
                case PLAYERO_WON:
                    announcer.innerHTML = 'Player <span class="playerO">0</span> Won';
                    break;
                case PLAYERX_WON:
                    announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                    break;
                case TIE:
                    announcer.innerText = 'Tie';
            }
            announcer.classList.remove('hide');
        }

        const isValidAction = (tile) => {
            if (tile.innerHTML === 'X' || tile.innerHTML === 'O'){
                return false;
            }
            return true;
        };


        // it basically chacks whether the tile
        // has a value already. 
        //to make sure players only play empty tiles
        const isvalidAction = (tile) => {
            if (tile.innerText == 'x' || tile.innerText === 'o'){
                return false;
            }
        }

        //it sets the value of the element in the board array
        //at the given position to be equal to the value
        //of the current player variable
        const updateBoard = (index) => {
            board[index] = currentPlayer;
        }

        const changePlayer = () => {
            playerDisplay.classList.remove(`player${currentPlayer}`);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerDisplay.innerText = currentPlayer;
            playerDisplay.classList.add(`player${currentPlayer}`);
        }

        // User interaction function, 
        // this function will be called when a user clicks in a tile
        //isvalidAction function = we will implement this latter
        //currentPlayer
        const userAction = (tile, index) => {
        
            if(isValidAction(tile) && isGameActive) {
                tile.innerText = currentPlayer;
                tile.classList.add(`player${currentPlayer}`);
                updateBoard(index);
                handleResultValidation();
                changePlayer();
            }
        }

        //changePlayer method JavaScript methods are actions that can be performed on objects. A JavaScript method is a property containing a function definition.

        const resetBoard = () => {
            board = ['', '', '', '', '', '', '', '', ''];
            isGameActive = true;
            announcer.classList.add('hide');
            
            if (currentPlayer === 'O') {
                changePlayer();
            }

            tiles.forEach(tile => {
                tile.innerText = '';
                tile.classList.remove('playerX');
                tile.classList.remove('playerO');
            });
        }

    resetButton.addEventListener('click', resetBoard);
});


