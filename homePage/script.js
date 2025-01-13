const logInBtn = document.getElementById("log-in");
const registerBtn = document.getElementById("sign-up");

document.addEventListener('DOMContentLoaded', () => {
  const lines = document.querySelectorAll('.text-item');

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.display = 'block';
    }, index * 1000);
  });
});

logInBtn.addEventListener('click', () => {
  window.location.href = "../login_and_register/logIn.html";
})

registerBtn.addEventListener('click', () => {
  window.location.href = "../login_and_register/register.html";
})