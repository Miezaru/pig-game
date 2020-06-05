/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

(function pigGame() {
  var scores, roundScore, activePlayer, gamePlaying, scoreSettings;

  init();
  scoreSettings = 100;

  document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
      // *Random number
      var firstDice = Math.floor(Math.random() * 6) + 1;
      var secondDice = Math.floor(Math.random() * 6) + 1;

      // *Display the result
      var firstDiceDOM = document.querySelector('.firstDice');
      var secondDiceDOM = document.querySelector('.secondDice');
      firstDiceDOM.style.display = 'block';
      secondDiceDOM.style.display = 'block';
      firstDiceDOM.src = 'dice-' + firstDice + '.png';
      secondDiceDOM.src = 'dice-' + secondDice + '.png';

      // * Update round score, IF the rolled number was NOT a 1
      if (firstDice === 6 && secondDice === 6) {
        // *Player looses score
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
      } else if (firstDice !== 1 && secondDice !== 1) {
        // *Add score
        roundScore += firstDice + secondDice;
        document.querySelector(
          '#current-' + activePlayer
        ).textContent = roundScore;
      } else {
        // *Next player
        nextPlayer();
      }
    }
  });

  document
    .querySelector('.input-score-btn')
    .addEventListener('click', function () {
      scoreSettings = document.querySelector('.input-score-input').value;
      document.querySelector('.score-settings').textContent = scoreSettings;
      init();
    });

  document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
      // *Add CURRENT score to GLOBAL score
      scores[activePlayer] += roundScore;

      // *Update the UI
      document.querySelector('#score-' + activePlayer).textContent =
        scores[activePlayer];

      // *Check if player won the game
      if (scores[activePlayer] >= scoreSettings) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.firstDice').style.display = 'none';
        document.querySelector('.secondDice').style.display = 'none';
        document
          .querySelector('.player-' + activePlayer + '-panel')
          .classList.add('winner');
        document
          .querySelector('.player-' + activePlayer + '-panel')
          .classList.remove('active');

        gamePlaying = false;
        // document.querySelector(".btn-roll").style.display = "none";
        // document.querySelector(".btn-hold").style.display = "none";
        // document.querySelectorAll(".player-current-box").style.display = "none";
      } else {
        // *Next player
        nextPlayer();
      }
    }
  });

  function nextPlayer() {
    // *Next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector(".player-0-panel").classList.remove("active");
    //document.querySelector(".player-1-panel").classList.add("active");

    document.querySelector('.firstDice').style.display = 'none';
    document.querySelector('.secondDice').style.display = 'none';
  }

  document.querySelector('.btn-new').addEventListener('click', function () {
    init();

    // document.querySelector(".btn-roll").style.display = "block";
    // document.querySelector(".btn-hold").style.display = "block";
    // document.querySelectorAll(".player-current-box").style.display = "block";
  });

  function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.firstDice').style.display = 'none';
    document.querySelector('.secondDice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
  }

  // document.querySelector("#current-" + activePlayer).textContent = dice;
  // document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";
  // var x = document.querySelector("#score-0").textContent;
})();
