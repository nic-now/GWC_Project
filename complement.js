const complement = {
  A: "T",
  T: "A",
  G: "C",
  C: "G",
  U: "A",
}

function getComplement(seq) {
  return seq
    .split("")
    .map((n) => complement[n] || "")
    .join("")
}

document.addEventListener("DOMContentLoaded", () => {
  const btn    = document.getElementById("enter_button_pairs"); 
  const input = document.getElementById("sequence")
  const output = document.getElementById("output")
  const btnToRNA = document.getElementById('toRNA'); // toggle to RNA
  const btnToDNA = document.getElementById('toDNA'); // toggle to DNA

  if (!btn || !input || !output) return

  btn.addEventListener("click", (e) => {
    e.preventDefault()

    const raw = (input.value || "").toUpperCase().slice(0, 32)
    const valid = /^[ATGCU]{1,32}$/.test(raw) && !(raw.includes('T') && raw.includes('U')) && (raw.length <= 32);

    if (valid) {
      output.textContent = getComplement(raw)
    } else {
      output.textContent = "Invalid sequence entered. Enter a sequence up to 32 characters with A, T, G, or C."
    }
  });
  
if (btnToRNA) {
    btnToRNA.addEventListener('click', () => {
        if (!output.textContent) return;
    output.textContent = output.textContent.replace(/T/g, 'U');
        });
    }

if (btnToDNA) {
    btnToDNA.addEventListener('click', () => {
        if (!output.textContent) return;
        output.textContent = output.textContent.replace(/U/g, 'T');
        });
    }

});



