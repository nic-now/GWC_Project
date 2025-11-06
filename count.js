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
