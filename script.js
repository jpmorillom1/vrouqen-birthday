document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('enter');
  const backgroundAudio = document.getElementById('background-audio');
  if (backgroundAudio) {
    backgroundAudio.muted = false;
    backgroundAudio.play();
  }
});

const notification = document.getElementById('move-cursor-notification');
let mouseMoved = false;

document.addEventListener('mousemove', () => {
  if (!mouseMoved) {
    mouseMoved = true;
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.addEventListener('transitionend', () => notification.style.display = 'none', { once: true });
    }, 2000);
  }
});

const collageContainer = document.getElementById('collage-container');

const imageUrls = [
  'https://i.ibb.co/RpXqZKn5/31fce0d0-bf88-4c63-869f-0a970521009b-removebg-preview.png',
  'https://i.ibb.co/SDRDGn9d/e459fc89-2418-40aa-81f0-270b82dd1ad7-removebg-preview.png',
  'https://i.ibb.co/zW2MLDRQ/621d4dc3-81ec-417c-9b26-6bfbad5bdc0f-removebg-preview.png',
  'https://i.ibb.co/RGQxvxBP/Whats-App-Image-2025-10-03-at-9-49-54-AM-3-removebg-preview.png',
  'https://i.ibb.co/Q7LKQ7Yj/Whats-App-Image-2025-10-03-at-9-49-54-AM-2-removebg-preview.png',
  'https://i.ibb.co/gFXzZwXF/Whats-App-Image-2025-10-03-at-9-49-54-AM-removebg-preview.png',
  'https://i.ibb.co/9mz6yr6c/65f84647-eccf-46ce-bba7-d17adb3aa7db-removebg-preview.png',
  'https://i.ibb.co/TxBRpc0L/Whats-App-Image-2025-10-03-at-9-22-24-AM-1-removebg-preview.png',
  'https://i.ibb.co/fYZy3f4B/Whats-App-Image-2025-10-03-at-9-22-24-AM-removebg-preview.png',
  'https://pluspng.com/img-png/dark-souls-png-download-dark-souls-png-images-transparent-gallery-advertisement-1300.png',
  'https://media.tenor.com/P8hZRpFaYg8AAAAe/shhh-meme-dog.png',
  'https://play-lh.googleusercontent.com/VzwzCxyHai3poLa-gV8Jpd-JickpjK9XYUi43fyK6RqPbInBr3S2rRsbraNhKVs8TbA',
  'https://i.ibb.co/dw0F06H7/ea00d2cb16fccf6ac9a6720ae9587669-removebg-preview.png',
  'https://i.ibb.co/chT1jznT/a0894830318-10-removebg-preview.png',
  'https://i.ibb.co/mKRqdQC/images-removebg-preview.png',
  'https://i.ibb.co/p6rnwY9H/1900x1900-000000-81-0-0-removebg-preview.png'

];

let ticking = false;
let lastSpawn = 0;
const minDelay = 120;
const maxOnScreen = 36;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(spawnIfDue);
  }
}, { passive: true });

function spawnIfDue() {
  const now = performance.now();
  if (now - lastSpawn >= minDelay) {
    spawnAt(mouseX, mouseY);
    lastSpawn = now;
  }
  ticking = false;
}

function spawnAt(x, y) {
  const item = document.createElement('div');
  item.className = 'collage-item';

  const img = document.createElement('img');
  img.className = 'collage-image';
  img.loading = 'lazy';

  const src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
  img.src = src;

  const size = Math.random() * 120 + 80;
  img.style.width = size + 'px';
  img.style.height = 'auto';

  const offsetX = (Math.random() - 0.5) * 80;
  const offsetY = (Math.random() - 0.5) * 80;

  const rotation = Math.random() * 60 - 30;
  item.style.setProperty('--rot', rotation + 'deg');

  item.style.transform = `translate3d(${x + offsetX}px, ${y + offsetY}px, 0) rotate(${rotation}deg)`;

  item.appendChild(img);
  collageContainer.appendChild(item);

  setTimeout(() => {
    if (item.parentNode) {
      item.style.opacity = '0';
      item.addEventListener('transitionend', () => item.remove(), { once: true });
    }
  }, 4500);

  while (collageContainer.children.length > maxOnScreen) {
    collageContainer.removeChild(collageContainer.firstChild);
  }
}
