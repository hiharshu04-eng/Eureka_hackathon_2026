const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfHQgx9RACzwFYOu4Bx-BZkP_52aThIsDQkno-u0VpV4lVvxg/viewform?usp=publish-editor';

// 1. Open Google Form on click
const actionButtons = document.querySelectorAll('.reg-action, .btn-main, #openFormBtn');
actionButtons.forEach(btn => {
  btn.addEventListener('click', (event) => {
    if (FORM_URL && !FORM_URL.includes('PASTE_YOUR_COPIED')) {
      event.preventDefault();
      window.open(FORM_URL, '_blank');
    }
  });
});

// 2. Simple FAQ toggle
const faqCards = document.querySelectorAll('.faq-box');
faqCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('open');
  });
});

// 3. Countdown timer logic
const hackDate = new Date();
hackDate.setDate(hackDate.getDate() + 10);

function refreshTimer() {
  const diff = hackDate.getTime() - new Date().getTime();
  if (diff <= 0) return;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('d').innerText = String(d).padStart(2, '0');
  document.getElementById('h').innerText = String(h).padStart(2, '0');
  document.getElementById('m').innerText = String(m).padStart(2, '0');
  document.getElementById('s').innerText = String(s).padStart(2, '0');
}

setInterval(refreshTimer, 1000);
refreshTimer();