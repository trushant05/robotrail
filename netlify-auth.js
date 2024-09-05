netlifyIdentity.init();
document.getElementById('login-button').addEventListener('click', () => {
  netlifyIdentity.open();
});

