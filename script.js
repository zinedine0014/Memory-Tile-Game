
// wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // select all the tiles in the DOM
  const tiles = document.querySelectorAll('.tile');
  // selecting the score -> <span class="score">0<span>
  const score_span = document.querySelector('.score');
  // selecting the restart button
  const restartButton = document.querySelector('.restart-btn');

  // will contain all the colors that we will use on the tiles
  let colors = ['red', 'green', 'blue', 'pink', 'magenta', 'yellow', 'orange', 'cyan'];
  // will 
  let generated_colors = [];
  let flippedCart1 = false;
  let flippedCart2 = false;
  let firstTileIndex = -1;
  let score = 0;

  // Function to restart the game
  function restart_game() {
    score = 0;
    score_span.innerText = score.toString();
    generated_colors = [];
    flippedCart1 = false;
    flippedCart2 = false;
    firstTileIndex = -1;

    // Shuffle function for arrays
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // Duplicate the colors array
    colors = [...colors, ...colors];
    shuffle(colors);

    // Assign colors to tiles
    tiles.forEach((tile, i) => {
      generated_colors[i] = colors[i];
      tile.innerText = '?';
      tile.style.backgroundColor = '#ffffff71';
    });
  }

  restart_game();

  tiles.forEach((tile, i) => {
    tile.addEventListener('click', () => {
      if (!flippedCart1 && !flippedCart2) {
        // First tile flip
        tile.style.backgroundColor = generated_colors[i];
        flippedCart1 = true;
        firstTileIndex = i;
      } else if (flippedCart1 && !flippedCart2 && i !== firstTileIndex) {
        // Second tile flip
        tile.style.backgroundColor = generated_colors[i];
        flippedCart2 = true;

        // Compare colors after a short delay
        setTimeout(() => {
          if (generated_colors[i] === generated_colors[firstTileIndex]) {
            // Match found
            score++;
            score_span.innerText = score.toString();
            flippedCart1 = false;
            flippedCart2 = false;

            // Check if the game is won
            if (score === tiles.length / 2) {
              alert('Congratulations! You won the game.');
              restart_game(); // Restart the game after winning
            }
          } else {
            // No match, flip tiles back
            tiles[firstTileIndex].style.backgroundColor = '#ffffff71';
            tile.style.backgroundColor = '#ffffff71';
            flippedCart1 = false;
            flippedCart2 = false;
          }
        }, 500); // Adjust delay as needed
      }
    });
  });

  restartButton.addEventListener('click', () => {
    restart_game();
  });

});
