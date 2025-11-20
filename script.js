const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const scores = document.getElementById("scores");

// Save score to Local Storage
function saveScore() {
  const name = nameInput.value.trim();
  const score = Number(scoreInput.value.trim());

  if (!name || !score) {
    alert("Please enter both name and score");
    return;
  }

  // Get existing scores
  let scoreList = JSON.parse(localStorage.getItem("scores")) || [];

  // Add new score
  scoreList.push({ name, score });

  // Save back to localStorage
  localStorage.setItem("scores", JSON.stringify(scoreList));

  // Clear input fields
  nameInput.value = "";
  scoreInput.value = "";

  showScores();
}

// Show scores in div
function showScores() {
  let scoreList = JSON.parse(localStorage.getItem("scores")) || [];

  // If no scores
  if (scoreList.length === 0) {
    scores.innerHTML = "No scores yet";
    return;
  }

  // Sort in descending order (highest score first)
  scoreList.sort((a, b) => b.score - a.score);

  // Build table
  let table = `
    <table border="1" cellpadding="5">
      <tr>
        <th>Name</th>
        <th>Score</th>
      </tr>
  `;

  scoreList.forEach(item => {
    table += `
      <tr>
        <td>${item.name}</td>
        <td>${item.score}</td>
      </tr>
    `;
  });

  table += "</table>";

  scores.innerHTML = table;
}

// Load scores on page load
window.onload = showScores;
