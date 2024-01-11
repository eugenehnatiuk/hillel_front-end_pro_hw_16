// ............MODAL ALERT ...............

const storedUsers = localStorage.getItem('usersArray');
// const usersSet = new Set(storedUsers ? JSON.parse(storedUsers) : []);
const usersArray = storedUsers ? JSON.parse(storedUsers) : [];


function isUserExist(email) {
  return usersArray.some(user => user.email === email);
  // for (const user of usersSet) {
  //   if (user.email === email) {
  //     return true;
  //   }
  // }
  // return false;
}

function getCurrentUser(email) {
  for (const user of usersArray) {
    return user.email === email ? user : null;
  }
}

function isPasswordMatch(logInEmail, logInPassword) {
  const user = getCurrentUser(logInEmail);
  return user !== null && user.password === logInPassword;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showAlert(title, text) {
  modalAlert.hidden = false;
  modalAlert.innerHTML = '';
  modalAlert.innerHTML = `<div class="modal-alert__alert">
                <div class="modal-alert__header">
                    <p>${title}</p>
                </div>
                <div class="modal-alert__body">
                    <p>${text}</p>
                </div>
                <span class="modal-alert__btn">Ok</span>
            </div>`;

  const modalAlertBtn = document.querySelector('.modal-alert__btn');
  modalAlertBtn.addEventListener('click', () => {
    modalAlert.hidden = true;
  });
}

// Regestration

const registrationForm = document.querySelector('.action-forms__reg-in');
const modalAlert = document.querySelector('.modal-alert');
const regFormButton = registrationForm.querySelector('input[type="submit"]');

modalAlert.hidden = true;

regFormButton.addEventListener('click', (event) => {
  // debugger;
  event.preventDefault();
  let title = '';
  let text = '';
  const email = registrationForm
    .querySelector('input[type="email"]')
    .value.trim();
  const firstName = registrationForm.querySelector('#firstName').value.trim();
  const secondName = registrationForm.querySelector('#secondName').value.trim();
  const nickname = registrationForm.querySelector('#nickname').value.trim();
  const password = registrationForm.querySelector('#password').value.trim();
  const passwordConfirm = registrationForm
    .querySelector('#passwordConfirm')
    .value.trim();

  let isRegistrationSucceed = false;

  if (
    isValidEmail(email) &&
    !isUserExist(email) &&
    firstName &&
    secondName &&
    nickname &&
    password &&
    passwordConfirm
  ) {
    if (password === passwordConfirm) {
      const newUser = {
        email: email,
        name: firstName,
        secondName: secondName,
        nickname: nickname,
        password: password,
      };
      usersArray.push(newUser);
      localStorage.setItem('usersArray', JSON.stringify(usersArray));

      title = `Registration of <span class="bold">${nickname}</span> is successfull.`;
      text = `Welcome ${firstName} ${secondName}`;

      isRegistrationSucceed = true;
      showAlert(title, text);
      if (isRegistrationSucceed) {
        registrationForm.reset();
      }
    } else {
      showAlert('Error', "Passwords don't match");
    }
  } else {
    if (
      !email &&
      !firstName &&
      !secondName &&
      !nickname &&
      !password &&
      !passwordConfirm
    ) {
      showAlert('Error', 'All fields required for entry');
    } else if (!isValidEmail(email)) {
      title = `Invalid email`;
      text = `Enter valid email`;
      showAlert(title, text);
    } else if (isUserExist(email)) {
      showAlert('Error', `This email: ${email} is alreday exist`);
    }
  }
});

// Login

const logInForm = document.querySelector('.action-forms__log-in');
const logInButton = logInForm.querySelector('input[type="submit"]');

logInButton.addEventListener('click', (event) => {
  event.preventDefault();

  const logInEmail = logInForm
    .querySelector('input[type="email"]')
    .value.trim();
  const logInPassword = logInForm
    .querySelector('input[type="password"]')
    .value.trim();
  let title = '';
  let text = '';

  if (logInEmail && logInPassword) {
    if (isUserExist(logInEmail) && isPasswordMatch(logInEmail, logInPassword)) {
      const currentUser = getCurrentUser(logInEmail);
      title = `Log-in sucseed`;
      text = `Welcomt back, ${currentUser.nickname}`;
      showAlert(title, text);
      logInForm.reset();
    } else {
      showAlert(`Log-in failed`, `Wrong email or password`);
    }
  } else {
    showAlert(`Log-in failed`, `All fields required for entry`);
  }
});


