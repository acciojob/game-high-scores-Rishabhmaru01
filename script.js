const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const scores = document.getElementById("scores");

// Save score to Local Storage
function saveScore() {
  const name = nameInput.value.trim();
  const score = scoreInput.value.trim();

  if (!name || !score) {
    alert("Please enter both name and score");
    return;
  }

  // Get existing scores from localStorage
  let scoreList = JSON.parse(localStorage.getItem("scores")) || [];

  // Add new score
  scoreList.push({ name, score });

  // Save updated list
  localStorage.setItem("scores", JSON.stringify(scoreList));

  // Clear input fields
  nameInput.value = "";
  scoreInput.value = "";

  showScores();
}

// Show scores in div
function showScores() {
  // Get scores
  let scoreList = JSON.parse(localStorage.getItem("scores")) || [];

  // If empty → show text
  if (scoreList.length === 0) {
    scores.innerHTML = "<p>No scores yet</p>";
    return;
  }

  // Build table
  let table = `
    <table border="1" cellpadding="5">
      <tr>
        <th>Name</th>
        <th>Score</th>
      </tr>
  `;

  scoreList.forEach((item) => {
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

// Load scores on page refresh
window.onload = showScores;
