function createHearts() {
    const numHearts = 20; // Số lượng trái tim bạn muốn hiển thị

    for (let i = 0; i < numHearts; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      document.body.appendChild(heart);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    createHearts();
  });