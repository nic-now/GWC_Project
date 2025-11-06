const complement = {
  A: "T",
  T: "A",
  G: "C",
  C: "G",
}

function getComplement(seq) {
  return seq
    .split("")
    .map((n) => complement[n] || "")
    .join("")
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form")
  const input = document.getElementById("seqInput")
  const output = document.getElementById("output")
  const btnToRNA = document.getElementById('toRNA'); // toggle to RNA
  const btnToDNA = document.getElementById('toDNA'); // toggle to DNA

  if (!form || !input || !output) return

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const raw = (input.value || "").toUpperCase().slice(0, 23)
    const valid = /^[ATGCU]{1,23}$/.test(raw) && !(raw.includes('T') && raw.includes('U'));

    if (valid) {
      output.textContent = getComplement(raw)
    } else {
      output.textContent = "Invalid sequence entered. Enter a sequence up to 32 characters with A, T, G, or C."
    }
  });
  
if (btnToRNA) {
    btnToRNA.addEventListener('click', () => {
        if (!output.textContent) return; // nothing to toggle
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
