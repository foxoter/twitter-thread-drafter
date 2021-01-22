'use strict';

const addTweetButton = document.querySelector('.add-btn');
const clearButton = document.querySelector('.clear-btn');
const container = document.querySelector('.tweets-container');
let counter = 1;

function validator(event) {
  const input = event.target;
  const error = input.parentElement.querySelector('.error');
  const maxLength = 140;
  let excessiveLength = 0;
  error.classList.remove('error-on');
  addTweetButton.classList.remove('add-btn-tip');
  if (input.value.length > maxLength) {
    excessiveLength = input.value.length - maxLength;
    input.setCustomValidity(`– ${excessiveLength}`);
    error.textContent = input.validationMessage;
    error.classList.add('error-on');
    addTweetButton.classList.add('add-btn-tip');
  }
}

function contentSaver(event) {
  const input = event.target;
  const counter = input.parentElement.querySelector('.counter').textContent.slice(0, -1);
  localStorage[counter] = input.value;
}

function renderTweet(id, value) {
  counter += 1;
  const markup = `
    <div class="tweet">
      <p class="counter">${id}.</p>
      <textarea 
        class="input"
        placeholder="Type here"
        rows="4"
        cols="50"
        >${value}</textarea>
      <span class="error"></span>
    </div>
`;
  const shell = document.createElement('div');
  shell.insertAdjacentHTML('beforeend', markup);
  const tweet = shell.firstElementChild;
  return tweet;
}

function setHandlers(tweet) {
  tweet.addEventListener('input', validator);
  tweet.addEventListener('input', contentSaver);
}

function addTweet(id, value) {
  const tweet = renderTweet(id, value);
  setHandlers(tweet);
  container.appendChild(tweet);
}

function renderStorage() {
  if (localStorage[1]) {
    for (let i = 1; i <= localStorage.length; i++) {
      if (localStorage[i]) {
        addTweet(i, localStorage[i]);
      }
    }
    return
  }
  addTweet(counter, '');
}

renderStorage();

function clearStorage() {
  if (confirm('Are you sure?')) {
    localStorage.clear();
  }
  location.reload();
}

addTweetButton.addEventListener('click', function () {
  addTweet(counter, '');
});

clearButton.addEventListener('click', clearStorage);
