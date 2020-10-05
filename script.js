const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

/**
 * Disable / Enable Button
 */
function toggleButton() {
    button.disabled = !button.disabled;
}

/**
 * Passing Joke to VoiceRSS API
 * @param {*} joke 
 */
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    console.log(joke);
    VoiceRSS.speech({
        key: '8ef1aa0adaa64c03bba2029e58a0d4d4',
        src: jokeString,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

/**
 * Get Jokes From Joke API
 */
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = ` ${data.setup} ... ${data.delivery}`; 
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    }
    catch (error) {
        toggleButton();
        console.log('whoops!', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);