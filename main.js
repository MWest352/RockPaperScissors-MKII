//Rock Paper Scissors game.  5 Rounds.

//Choices
const Selection = {
    ROCK: {
        name: "rock",
      	get beats() {
          return Selection.SCISSORS
        }
    },
    PAPER: {
        name: "paper",
      	get beats() {
          return Selection.ROCK
        }
    }, 
    SCISSORS: {
        name: "scissors",
      	get beats() {
          return Selection.PAPER
        }
    }
};


document.getElementById("Rock").addEventListener('click', buttonClick);
document.getElementById("Paper").addEventListener('click', buttonClick);
document.getElementById("Scissors").addEventListener('click', buttonClick);

function buttonClick(e) {
  	const clicked = e.target.id;
  	console.log("buttonClicked -- Clicked ID: ", clicked);
  
  	let userSelection;

    if(clicked == 'Rock') userSelection = Selection.ROCK;
    else if(clicked == 'Paper') userSelection = Selection.PAPER;
    else if(clicked == 'Scissors') userSelection = Selection.SCISSORS;

  
  	newRound(userSelection);
}

//Computer
const computerSelection = () => {
    const rand = Math.floor(Math.random() * 3) +1;

    switch(rand) {
        case 1: return Selection.ROCK;
        case 2: return Selection.PAPER;
        case 3: return Selection.SCISSORS;
    }
};

const WinnerState = {
    PLAYER_ONE:{},
    PLAYER_TWO:{},
    TIE:{}
};

//Comparative Statement of Inputs
const determineWinner = (playerOne, playerTwo) => {
    if (playerOne.beats === playerTwo) return WinnerState.PLAYER_ONE;
    else if (playerTwo.beats === playerOne) return WinnerState.PLAYER_TWO;
    else if (playerOne === playerTwo) return WinnerState.TIE;
    else{
        console.error(`
        Cant Determine Winner:
        playerOne: ${playerOne}
        playerTwo: ${playerTwo}
        `)
    }
};

//Rounds
const newRound = userSelection => {
    const computer = computerSelection();
    const roundWinner = determineWinner(userSelection, computer);
  
  	// Process the round
  	processRound(roundWinner);
};

class Player{
    constructor(name) {
        this.name = name;
        this.wins = 0;
        this.ties = 0;
        this.losses = 0;
    }

    win = () => this.wins++;
    lose = () => this.losses++;
    tie = () => this.ties++;
}

//Scoreboard Logic tallying wins, losses, ties, and rounds
class Scoreboard {
    constructor(){
        this.playerOne = new Player("Player One");
        this.playerTwo = new Player("Computer");
        this.roundsPlayed  = 1;
    }

    roundPlayed = () => this.roundsPlayed++;
    
    winner = winner => {
        winner.win();
        

        //DOM manipulation for Scoreboard (div/board) must play round to activate
        const board = document.querySelector('#board');

        const content = document.createElement('div');
        content.classList.add('content');
        content.textContent = 'Congratulations ' +`${winner.name}` + '! You won round ' + `${this.roundsPlayed}`+'!';

        board.appendChild(content);
       
        console.log(`Congratulations ${winner.name} you won round ${this.roundsPlayed}`);
        this.roundPlayed();
        
    };

   

    tie = () => {
        this.playerOne.tie();
        this.playerTwo.tie();

        //DOM manipulation for Scoreboard (div/board) must play round to activate
        const board = document.querySelector('#board');

        const content = document.createElement('div');
        content.classList.add('content');
        content.textContent = 'Tie! No Victor!';

        board.appendChild(content);
    
    console.log("Tie! No Victor");
    
    this.roundPlayed();
    };

//Match Completion Message
    matchWinner = () => {
        let message = "";

        if (this.playerOne.wins > this.playerTwo.wins) {
            const board = document.querySelector('#board');

        const content = document.createElement('div');
        content.classList.add('content');
        content.textContent = 'Congratulations, Humanity lives to see another day!';

        board.appendChild(content);
    
        } else if (this.playerTwo.wins > this.playerOne.wins){
            const board = document.querySelector('#board');

        const content = document.createElement('div');
        content.classList.add('content');
        content.textContent = 'ROBOTS WIN.  KILL ALL HUMANS.';

        board.appendChild(content);
    
        } else {
            const board = document.querySelector('#board');

        const content = document.createElement('div');
        content.classList.add('content');
        content.textContent = 'Allright.  We\'ll call it a draw !';

        board.appendChild(content);
    
        }

        message += "\nPlay Another Match?";
        const newMatch = confirm(message);

        if (newMatch) {
          this.reset();
          match();
        }
    };
    
//Scoreboard Display showing wins, losses, ties, and rounds
    printScores = () => {
        const Scoreboard = `
        Scoreboard:
            Rounds Played: ${this.roundsPlayed}
            Player One:
                Wins: ${this.playerOne.wins};
                Losses: ${this.playerOne.losses};
                Ties: ${this.playerOne.ties};
            Player Two:
                Wins: ${this.playerTwo.wins};
                Losses: ${this.playerTwo.losses};
                Ties: ${this.playerTwo.ties};
        `;
        console.log(Scoreboard)
    }
    
    reset = () => {
        this.playerOne = new Player("Player One");
        this.playerTwo = new Player("Computer");
        this.roundsPlayed = 1;
    }
}

const scoreBoard = new Scoreboard();
var rounds; // Is hoisted because of var so can be accessed above declaration

const processRound = roundWinner => {
  if (scoreBoard.roundsPlayed < rounds) {
    switch(roundWinner) {
        case WinnerState.PLAYER_ONE: {
            scoreBoard.winner(scoreBoard.playerOne);
            scoreBoard.playerTwo.lose();
            break;
        }

        case WinnerState.PLAYER_TWO:{
            scoreBoard.winner(scoreBoard.playerTwo);
            scoreBoard.playerOne.lose();
            break;
        }
        case WinnerState.TIE: scoreBoard.tie()
    }
    scoreBoard.printScores();
  } else scoreBoard.matchWinner();
}

//Match logic  One Match = Five Rounds
const match = (inputRounds = 5) => {
    if (isNaN(inputRounds) || inputRounds < 1) {
        console.log("Please Input A Number Greater Than 0");
        inputRounds = 5
    }
  rounds = inputRounds;

//Match/Rounds/Scoreboard execution

};

match();


