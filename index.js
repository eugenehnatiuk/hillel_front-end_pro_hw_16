(function () {
  // .............SWITCHER and FORM TRANSLATE X................

  const switcher = document.getElementById('switch');
  const switchMark = document.querySelector('.acces-section__switcher label');
  const regInForm = document.querySelector('.action-forms__reg-in');
  const logInForm = document.querySelector('.action-forms__log-in');
  const regForms = document.querySelector('.action-forms');

  switcher.addEventListener('click', ({ target: { checked } }) => {
    if (checked) {
      switchMark.classList.add('checked');
      regInForm.reset();
      regForms.classList.add('move');
    } else {
      switchMark.classList.remove('checked');
      logInForm.reset();
      regForms.classList.remove('move');
    }
  });

  // PASSWORD VISABILITY

  const passwordSections = document.querySelectorAll(
    '.action-forms__password-box'
  );

    passwordSections.forEach((passwordSection) => {
      const passwordInput = passwordSection.querySelector('input');
      const passwordInputSvg = passwordSection.querySelector('svg');
      let isPasswordVisible = false;

      function showPassword() {
        isPasswordVisible = true;
        passwordInput.type = 'text';
        passwordInput.style.color = '#fff';
        passwordInputSvg.classList.add('visible');
        // passwordInput.focus();
      }

      function hidePassword() {
        isPasswordVisible = false;
        passwordInput.type = 'password';
        passwordInput.style.color = '#153416';
        passwordInputSvg.classList.remove('visible');
        // passwordInput.focus();
      }

      passwordSection.addEventListener('click', ({ target }) => {
        if (target === passwordInputSvg) {
          isPasswordVisible ? hidePassword() : showPassword();
        }
      });
      // debugger
      document.addEventListener('click', ({ target }) => {
        if (!passwordInputSvg.contains(target)) {
          hidePassword();
        }
      });
    });

  //.................Placeholder...............

  const previousPlaceholders = new Map();

  document.addEventListener(
    'focus',
    (event) => {
      const { target } = event;
      if (target.tagName === 'INPUT' && target.placeholder) {
        previousPlaceholders.set(target, target.placeholder);
        target.placeholder = '';
      }
    },
    true
  );

  document.addEventListener(
    'blur',
    (event) => {
      const { target } = event;
      if (target.tagName === 'INPUT' && previousPlaceholders.has(target)) {
        target.placeholder = previousPlaceholders.get(target);
        previousPlaceholders.delete(target);
      }
    },
    true
  );
})();


// const div = document.querySelector('div');
  
//   addEventListener.call(div, 'click', ({ target: { tagName } }) => {
//     if (tagName === 'DIV') {
//       console.log(`Я нажал ${tagName}`);
//     }
//   });