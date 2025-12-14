const logoutBtn = document.getElementById('logoutBtn');
const modal = document.getElementById('logoutModal');
const confirmBtn = document.getElementById('confirmLogout');
const cancelBtn = document.getElementById('cancelLogout');

// Show modal on logout click
logoutBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Cancel logout
cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Confirm logout
confirmBtn.addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'login.html';
});
