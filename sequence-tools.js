// from symbol get 
function lookupGeneId(symbol) {
  const url = `https://rest.ensembl.org/lookup/symbol/homo_sapiens/${symbol}`;

  return fetch(url, {
    headers: { "Accept": "application/json" }
  })
    .then(res => {
      if (!res.ok) throw new Error("Lookup failed");
      return res.json();
    }).then(data => data.id);
}

// get DNA sequence
function fetchSequenceById(id) {
  const url = `https://rest.ensembl.org/sequence/id/${id}`;

  return fetch(url, {
    headers: { "Accept": "text/plain" }
  })
    .then(res => {
      if (!res.ok) throw new Error("Sequence fetch failed");
      return res.text();
    });
}

// get GC content 
function gcContent(seq) {
  const gc = (seq.match(/[GC]/gi) || []).length;
  return ((gc / seq.length) * 100).toFixed(2);
}

//pair
function complement(seq) {
  return seq.replace(/T/g, "U");
}

//complement
function getComplement(seq) {
  const complementMap = {
  A: "T",
  T: "A",
  G: "C",
  C: "G",
  U: "A", }

  return seq.split("")
            .map((n) => complementMap[n] || "")
            .join(""); 
}

document.getElementById("toolsBtn").addEventListener("click", () => {
  const geneInput = document.getElementById("geneInput").value.trim();
  const output = document.getElementById("output");

  if (!geneInput) {
    output.textContent = "Please enter a gene symbol (e.g., TP53).";
    return;
  }

  output.textContent = "Looking up gene ID...";

  lookupGeneId(geneInput)
    .then(id => {
      output.textContent = `Found Ensembl ID: ${id}\nFetching DNA sequence...`;
      return Promise.all([id, fetchSequenceById(id)]);
    })
    .then(([id, seq]) => {
      const gc = gcContent(seq);
      const rna = complement(seq);
      const rev = getComplement(seq);

      output.innerHTML =
        `<strong>Gene:</strong> ${geneInput}<br>` +
        `<strong>Ensembl ID:</strong> ${id}<br><br>` +
        `<strong>Length:</strong> ${seq.length} bases<br>` +
        `<strong>GC Content:</strong> ${gc}%<br><br>` +
        `<strong>DNA Sequence:</strong><br>${seq}<br><br>` +
        `<strong>RNA:</strong><br>${rna}<br><br>` +
        `<strong>Complement:</strong><br>${rev}`;
    })
    .catch(err => {
      output.textContent = "Could not find gene in Ensembl";
    });
});
