document.getElementById('enter_button_thermal').addEventListener('click', function (event) {
  event.preventDefault();

  const sequence1 = document.getElementById('sequence').value.toUpperCase();
  const sequence2 = document.getElementById('sequence2').value.toUpperCase();
  const outputElement = document.getElementById('output');

  const isValidDNA = str => /^[ATGC]{1,32}$/.test(str);

  if (sequence1.length !== sequence2.length || !isValidDNA(sequence1) || !isValidDNA(sequence2)) {
    outputElement.textContent =
      'Both sequences must match in length, be under 32 characters, and contain only A, T, G, C.';
    return;
  }

  const calculateATPercent = str =>
    (str.split('').filter(base => base === 'A' || base === 'T').length / str.length) * 100;

  const percent1 = calculateATPercent(sequence1);
  const percent2 = calculateATPercent(sequence2);

  outputElement.textContent =
    (percent1 === percent2
      ? 'The sequences will denature at the same time.'
      : (percent1 > percent2 ? 'Sequence 1' : 'Sequence 2') + ' will denature first');
});
