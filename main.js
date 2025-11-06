const homeBtn = document.getElementById('home_button');
if (homeBtn) {
  homeBtn.addEventListener('click', () => {

    window.location.href = '../index.html';
  });
}


const complement = {
  A: "T",
  T: "A",
  G: "C",
  C: "G",
  U: "A",
};

//Calculator 
const seqField  = document.getElementById('sequence');          
const calcBtn   = document.getElementById('enter_button_calculator');
const output    = document.getElementById('output');

calcBtn.addEventListener('click', e => {
  e.preventDefault();                         

  const seq   = (seqField.value || '').toUpperCase().slice(0, 32);    
  const invalid = /[^ATGCU]/.test(seq) || seq.length === 0;
  const mixed   = seq.includes('T') && seq.includes('U');

  if (invalid || mixed) {
    output.textContent =
      'Invalid sequence. Enter A,T,G,C or A,U,G,C up to 32 characters.';
    return;
  }

  const count = { A:0, T:0, U:0, G:0, C:0 };
  for (const base of seq) count[base]++;

  output.innerHTML =
    `A: ${count.A}  ${seq.includes('U') ? 'U' : 'T'}: ${count.U + count.T}  G: ${count.G}  C: ${count.C}`;
});

//Denature
document.getElementById('enter_button_thermal').addEventListener('click', function (event) {
  event.preventDefault();

  const sequence1 = document.getElementById('sequence').value.toUpperCase();
  const sequence2 = document.getElementById('sequence2').value.toUpperCase();
  const outputElement = document.getElementById('output');

  const isValidDNA = str => /^[ATGC]{1,23}$/.test(str);

  if (sequence1.length !== sequence2.length || !isValidDNA(sequence1) || !isValidDNA(sequence2)) {
    outputElement.textContent =
      'Both sequences must match in length under 35 characters and contain only A, T, G, C.';
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

//Complementary 
function getComplement(seq) {
  return seq
    .split("")
    .map((n) => complement[n] || "")
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn      = document.getElementById("enter_button_pairs");
  const input    = document.getElementById("seqInput");
  const output   = document.getElementById("output");
  const btnToRNA = document.getElementById("toRNA");
  const btnToDNA = document.getElementById("toDNA");

  if (!btn || !input || !output) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const raw = (input.value || "").toUpperCase().slice(0, 32);
    const valid = /^[ATGCU]{1,32}$/.test(raw) &&
                  !(raw.includes("T") && raw.includes("U"));

    if (valid) {
      output.textContent = getComplement(raw);
    } else {
      output.textContent =
        "Invalid sequence entered. Enter a sequence up to 23 characters with A, T, G, or C.";
    }
  });

  if (btnToRNA) {
    btnToRNA.addEventListener("click", () => {
      if (!output.textContent) return;
      output.textContent = output.textContent.replace(/T/g, "U");
    });
  }

  if (btnToDNA) {
    btnToDNA.addEventListener("click", () => {
      if (!output.textContent) return;
      output.textContent = output.textContent.replace(/U/g, "T");
    });
  }
});
