import { WORDS } from './words.js';
import { hangman_stick, HANG_PARTS } from './hangman-graphs.js';

const $ = _ => document.querySelector(_);
const click = ($element, funct) => $element.addEventListener('click', funct);

const $word = $('#word');
const $attemps = $('#attemps');
const $hang_graph = $('#hangman_graph');
const $cover = $('#cover_graph_hangman');
const $cover_container = $('#game_ini_lightbox');
const $game_container = $('#game-visuals');
const lightBox = $('#lightbox_message');

const setCover = () => {
    $cover.value = hangman_stick.join('\n');
    Object.keys(HANG_PARTS).map( (part,ind) => {
        let hangman_graph = $cover.value.split('\n');
        HANG_PARTS[part].map(partArray => {
            hangman_graph[partArray[0]] += partArray[1];
        });
        $cover.value = hangman_graph.join('\n');
    });
};
const addPartHangman = (attemp) => {
    let textHangman = $hang_graph.value.split('\n');

    let parts = Object.keys(HANG_PARTS);
    let partItself = HANG_PARTS[parts[5 - attemp]];

    partItself.map( part => textHangman[part[0]] += part[1] );
    $hang_graph.value = textHangman.join('\n');
};
const updateMessage = (status, word) => {
    setTimeout(() => {
        lightBox.style.display = 'flex';

        const msg = $('.message');
        msg.innerText = `¡Has ${status === true ? 'ganado' : 'perdido'}!`;
        const face = $('.face');
        face.innerText = status === true ? '\\ (* u *) /' : '_(x - x)_';
        const word_show = $('.word-showed');
        word_show.innerText = word;

        word_show.className = '';
        word_show.className = `word-showed ${status === true ? 'win' : 'lose'}`;
    }, 1000);
};
const printAlphabet = () => {
    const alpha_container = $('#alphabet-option');
    for (let i = 65; i <= 90; i++) {

        let alpha_letter = String.fromCharCode(i);

        let letter = document.createElement('button');
        letter.setAttribute('id', `letter_${alpha_letter}`);
        letter.classList.add('letter');
        letter.innerText = alpha_letter;

        click(letter, e => {
            e.preventDefault();
            e.target.disabled = true;
            game.checkLetter(alpha_letter);
        });

        alpha_container.appendChild(letter);
    }
}

const game = (function () {
    let word = '';
    let user_word = [];
    let shadow_word = [];
    let attempts = 0;

    function youLoose() {
        invalidBtns();
        updateMessage(false, word);
        $word.classList.add('lose');
    }
    function youWin() {
        invalidBtns();
        updateMessage(true, word);
        $word.classList.add('win');
    }
    function invalidBtns() {
        let btns = document.querySelectorAll('.letter');
        Array.from(btns).map(btn => btn.disabled = true);
    }
    function user_wordHTML(user_w) {
        $word.innerText = '';
        user_w.map(l => {
            let span = document.createElement('span');
            span.innerText = l;
            $word.appendChild(span);
        });
    }
    return {
        setDifficulty(difficulty) {
            $cover_container.style.display = 'none';
            $game_container.style.display = 'flex';

            user_word = [];
            shadow_word = [];

            let wordCollection = WORDS[difficulty];
            word = wordCollection[Math.floor(Math.random() * wordCollection.length)];
            word = word.toUpperCase();

            Array.from(word).map(letter => {
                user_word.push('*');
                shadow_word.push(letter);
            });

            attempts = 6;

            user_wordHTML(user_word);
            $attemps.innerText = attempts;
            $hang_graph.value = hangman_stick.join('\n');
            printAlphabet();
        },
        checkLetter(letter) {

            if (word.includes(letter)) {
                shadow_word.map((letter_w, index) => {
                    if (letter_w === letter) user_word[index] = letter;
                });
                user_wordHTML(user_word);
                if (word === user_word.join('')) youWin();
            }
            else {
                attempts--;
                addPartHangman(attempts);
                $attemps.innerText = attempts;
                if (attempts === 0) youLoose();
            }
        },
    };
})();

click($('#btn_facil'), () => { game.setDifficulty(0); });
click($('#btn_normal'), () => { game.setDifficulty(1); });
click($('#btn_dificil'), () => { game.setDifficulty(2); });
click($('#new-game'), () => {location.reload()});
(() => {setCover();})();