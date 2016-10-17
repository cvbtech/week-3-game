var wins = 0;

function isInArray(value, array) {
	return array.indexOf(value) > -1;
}

function countMatches(word, array) {
	var matches=0;

	for (var i=0; i<array.length; i++) {

		matches = matches + (word.split(array[i]).length-1);

	}

	return matches;
}

function wordProgress(word, array, guessesRemaining) {
	var wordDisplay = "";

	wordDisplay = '<p>';

	for (var i=0; i<word.length; i++)
	{
		if (array.indexOf(word[i]) > -1 || guessesRemaining == 0)
		{
			wordDisplay += word[i] + ' ';
		} else {
			wordDisplay += '_ ';
		}
	}

	wordDisplay += '</p>';

	return wordDisplay;

}

function playGame() {

	//wordList Array
	var wordList=['madonna', 'determined', 'javascript', 'apache', 'prince', 'pizza', 'walking', 'google', 'peanut', 'apple', 'sandwich', 'kangaroo', 'jump', 'igloo', 'random', 'given', 'piano', 'chicago', 'typewriter', 'zoology', 'biology', 'xylophone', 'jungle', 'peppermint', 'english', 'orlando', 'cotton'];

	//choose random word from word list
	var randomWordChoice = wordList[Math.floor(Math.random() * wordList.length)];

	var playerInput;
	var playerInputArray = [];
	var matches = 0;
	var alphaExp = /^[a-zA-Z]+$/;
	var missedGuesses = 0;
	var maxGuesses = 6;
	var guessesRemaining = maxGuesses;
	var keyPressCount = 0;

	//get keystroke
	document.onkeyup = function(event) {	
		if (keyPressCount === 0)
		{
			document.getElementById('start').innerHTML='<h1 class="start">To play, enter any letter from a-z</h1>';
			document.getElementById('warning').innerHTML='';
		} 

		//increment keyPressCount
		keyPressCount++;
		
		//set playerInput to lowercase keystroke value
		playerInput = String.fromCharCode(event.keyCode).toLowerCase();

		//ignore keystrokes that have already been entered
		if (playerInput != '' && isInArray(playerInput, playerInputArray) === false)
		{
			//check # of matches against word length
			if (matches < randomWordChoice.length)
			{
				//push keystroke is letter into input array
				if (playerInput.match(alphaExp) != null)
				{
					playerInputArray.push(playerInput);
				}

				//check to see if keystroke letter is in word
				if(isInArray(playerInput, randomWordChoice) === true)
				{
					//document.getElementById('warning').innerHTML='<p>playerInput + ' in word</p>';
				} else {
					if (playerInput.match(alphaExp)==null)
					{
						document.getElementById('warning').innerHTML='<p class="warning">Only enter letters a-z</p>';
					} else {
						document.getElementById('warning').innerHTML='<p class="warning">Sorry, the letter ' + playerInput + ' is not in the word</p>';
						missedGuesses++;
						guessesRemaining = maxGuesses - missedGuesses;

						if (guessesRemaining == 0)
						{
							document.getElementById('warning').innerHTML='<h1 class="status">You Lost!!!</h1><p>Press any key to play again.</p>';

							playGame();
						}
					}
				}
			}

			document.getElementById('progress').innerHTML=(wordProgress(randomWordChoice, playerInputArray, guessesRemaining));

			//set the number of matches (accounting for words that have duplicate letters
			matches = countMatches(randomWordChoice, playerInputArray);
			
			if (matches === randomWordChoice.length)
			{
				document.getElementById('warning').innerHTML='<h1 class="status">You Won!!!</h1><p>Press any key to play again.</p>';
				wins++;

				playGame();
			}

			var html = 
			'<p>Wins: ' + wins + '</p>' +
			'<p class="guesses">Number of Guesses Remaining: ' + guessesRemaining + '</p>' +
			'<p>Letters Already Guessed: ' + playerInputArray + '</p>';

			document.getElementById('html').innerHTML=html;
		
			
		} else {
			document.getElementById('warning').innerHTML='<p class="warning">You already guessed ' + playerInput + '</p>';
		}

	}

}

