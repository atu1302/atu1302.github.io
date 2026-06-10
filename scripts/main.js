const checkbox = document.querySelector('#myCheckbox');
checkbox.addEventListener('change', function() {
  if (this.checked) {
    this.style.display = 'none';
  }
});

  const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "Logic will get you from A to B; imagination will take you everywhere."
];

function showRandomSentence() {
  // Pick a random index from 0 to array length - 1
 var randomIndex = Math.floor((Math.random()*Sentence.length)); //random number from [0,Sentence.length)
$("#sentence-div").text( Sentence[randomIndex] );
}

// Run once on page load
window.onload = showRandomSentence;
