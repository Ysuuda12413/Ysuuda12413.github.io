function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'admin' && password === 'duyundz') {
      window.location.href = 'https://ysuuda12413.github.io/logined.html';
    } else if (window.location.href === 'https://ysuuda12413.github.io/logined.html') {
      window.location.href = 'https://ysuuda12413.github.io/';
      alert('Chưa đăng nhập');
    } else {
      alert('Login failed');
    }
  }