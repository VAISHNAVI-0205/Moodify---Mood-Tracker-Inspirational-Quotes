function signup() {
    const uname = document.getElementById("newUsername").value;
    const pass = document.getElementById("newPassword").value;
  
    if (!uname || !pass) {
      alert("Please enter a username and password.");
      return;
    }
  
    localStorage.setItem("moodifyUser", JSON.stringify({ username: uname, password: pass }));
    alert("Account created! Now you can login.");
    document.getElementById("newUsername").value = "";
    document.getElementById("newPassword").value = "";
    showLoginForm();
  }
  
  function login() {
    const uname = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
  
    const stored = JSON.parse(localStorage.getItem("moodifyUser"));
  
    if (stored && uname === stored.username && pass === stored.password) {
      document.getElementById("authScreen").style.display = "none";
      document.getElementById("app").style.display = "block";
      loadMoods();
      showChart();
    } else {
      document.getElementById("loginMsg").innerText = "Invalid username or password!";
    }
  }
  
  function showSignupForm() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("signupBox").style.display = "block";
  }
  
  function showLoginForm() {
    document.getElementById("signupBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
  }
  
  function saveMood() {
    const mood = document.getElementById("mood").value;
    const note = document.getElementById("note").value;
    const date = new Date().toLocaleString();
  
    const entry = { mood, note, date };
    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods.push(entry);
    localStorage.setItem("moods", JSON.stringify(moods));
  
    document.getElementById("note").value = "";
    loadMoods();
    showChart();
    showQuote(mood); // Ensure this function is triggered with the correct mood
  }
  
  function loadMoods() {
    const list = document.getElementById("moodList");
    list.innerHTML = "";
    const moods = JSON.parse(localStorage.getItem("moods")) || [];
  
    moods.forEach((entry, index) => {
      const li = document.createElement("li");
      li.textContent = `${entry.date} - ${entry.mood} - ${entry.note}`;
      li.onclick = function () { clearMood(index); };
      list.appendChild(li);
    });
  }
  
  function clearMood(index) {
    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods.splice(index, 1);
    localStorage.setItem("moods", JSON.stringify(moods));
    loadMoods();
    showChart();
  }
  
  function clearMoods() {
    localStorage.removeItem("moods");
    loadMoods();
    showChart();
    document.getElementById("quoteBox").innerText = "";
  }
  
  function showQuote(mood) {
    const quotes = {
      happy: [
        "😊 The purpose of our lives is to be happy.",
        "🌈 Happiness is not something ready-made. It comes from your own actions.",
        "🎉 Do more of what makes you happy."
      ],
      sad: [
        "💪 Tough times never last, but tough people do.",
        "🌌 Stars can't shine without darkness.",
        "🌤️ Every day may not be good... but there's something good in every day."
      ],
      angry: [
        "🕊️ For every minute you remain angry, you give up sixty seconds of peace.",
        "😌 Speak when you are angry and you will make the best speech you will ever regret.",
        "🧘 Stay calm. Stay humble. Stay kind."
      ],
      neutral: [
        "☔ Life isn’t about waiting for the storm to pass. It’s about learning to dance in the rain.",
        "🍃 Sometimes you just need to breathe, trust, let go, and see what happens.",
        "📅 One day or day one. You decide."
      ]
    };
  
    const selected = quotes[mood] || ["💫 Keep going. You're doing great!"];
    const random = selected[Math.floor(Math.random() * selected.length)];
    document.getElementById("quoteBox").innerText = random; // Display the selected quote
  }
  
  function showChart() {
    const moods = JSON.parse(localStorage.getItem("moods")) || [];
    const counts = { happy: 0, sad: 0, angry: 0, neutral: 0 };
  
    moods.forEach(entry => counts[entry.mood]++);
  
    const ctx = document.getElementById("moodChart").getContext("2d");
    if (window.moodChart) window.moodChart.destroy();
  
    window.moodChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Happy', 'Sad', 'Angry', 'Neutral'],
        datasets: [{
          label: 'Mood Count',
          data: [counts.happy, counts.sad, counts.angry, counts.neutral],
          backgroundColor: ['#4caf50', '#2196f3', '#f44336', '#ff9800']
        }]
      }
    });
  }
  
