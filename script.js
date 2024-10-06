// Получаем форму и кнопку отправки по ID
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');

// Ссылки на все поля формы
const fields = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  age: document.getElementById('age'),
  gender: document.querySelectorAll('input[name="gender"]'),
  profession: document.getElementById('profession'),
  password: document.getElementById('password'),
  agreement: document.getElementById('agreement')
};

// Ссылки на элементы, в которые будут выводиться сообщения об ошибках
const errors = {
  nameError: document.getElementById('nameError'),
  emailError: document.getElementById('emailError'),
  ageError: document.getElementById('ageError'),
  genderError: document.getElementById('genderError'),
  professionError: document.getElementById('professionError'),
  passwordError: document.getElementById('passwordError'),
  agreementError: document.getElementById('agreementError')
};

// Функция для валидации отдельного поля
function validateField(field, errorElement, validator) {
  if (!validator()) {
    field.classList.add('invalid');
    errorElement.textContent = 'Поле заполнено некорректно';
    return false;
  } else {
    field.classList.remove('invalid');
    errorElement.textContent = '';
    return true;
  }
}

// Функция для проверки всех полей формы
function validateForm() {
  const isNameValid = validateField(fields.name, errors.nameError, () => fields.name.value.length >= 2 && /^[A-Za-zА-Яа-яЁё\s]+$/.test(fields.name.value));
  const isEmailValid = validateField(fields.email, errors.emailError, () => fields.email.validity.valid);
  const isAgeValid = validateField(fields.age, errors.ageError, () => fields.age.value >= 1 && fields.age.value <= 120);
  const isGenderValid = validateField(fields.gender[0].parentNode, errors.genderError, () => [...fields.gender].some(radio => radio.checked));
  const isProfessionValid = validateField(fields.profession, errors.professionError, () => fields.profession.value);
  const isPasswordValid = validatePassword();
  const isAgreementValid = validateField(fields.agreement, errors.agreementError, () => fields.agreement.checked);

  // Отключаем или включаем кнопку в зависимости от валидности формы
  submitBtn.disabled = !(isNameValid && isEmailValid && isAgeValid && isGenderValid && isProfessionValid && isPasswordValid && isAgreementValid);
}

// Функция для валидации пароля
function validatePassword() {
  const password = fields.password.value;
  
  if (password.length < 8) {
    errors.passwordError.textContent = 'Пароль должен быть не менее 8 символов';
    fields.password.classList.add('invalid');
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    errors.passwordError.textContent = 'Пароль должен содержать хотя бы одну заглавную букву';
    fields.password.classList.add('invalid');
    return false;
  }
  if (!/[a-z]/.test(password)) {
    errors.passwordError.textContent = 'Пароль должен содержать хотя бы одну строчную букву';
    fields.password.classList.add('invalid');
    return false;
  }
  if (!/\d/.test(password)) {
    errors.passwordError.textContent = 'Пароль должен содержать хотя бы одну цифру';
    fields.password.classList.add('invalid');
    return false;
  }

  // Если пароль валидный
  fields.password.classList.remove('invalid');
  errors.passwordError.textContent = '';
  return true;
}

// Добавляем события input и blur для всех полей формы
function addInputBlurEvents() {
  // Для поля имени
  fields.name.addEventListener('input', () => validateForm());
  fields.name.addEventListener('blur', () => validateField(fields.name, errors.nameError, () => fields.name.value.length >= 2 && /^[A-Za-zА-Яа-яЁё\s]+$/.test(fields.name.value)));

  // Для поля email
  fields.email.addEventListener('input', () => validateForm());
  fields.email.addEventListener('blur', () => validateField(fields.email, errors.emailError, () => fields.email.validity.valid));

  // Для поля возраста
  fields.age.addEventListener('input', () => validateForm());
  fields.age.addEventListener('blur', () => validateField(fields.age, errors.ageError, () => fields.age.value >= 1 && fields.age.value <= 120));

  // Для поля выбора профессии
  fields.profession.addEventListener('input', () => validateForm());
  fields.profession.addEventListener('blur', () => validateField(fields.profession, errors.professionError, () => fields.profession.value));

  // Для поля пароля
  fields.password.addEventListener('input', () => validateForm());
  fields.password.addEventListener('blur', () => validatePassword());

  // Для чекбокса согласия
  fields.agreement.addEventListener('input', () => validateForm());
}

// Отслеживаем ввод в полях формы (событие input), вызываем функцию валидации
form.addEventListener('input', validateForm);

// Обработчик события отправки формы
form.addEventListener('submit', (event) => {
  event.preventDefault();  // Предотвращаем стандартное поведение (перезагрузку страницы)
  
  if (!submitBtn.disabled) {
    console.log({
      name: fields.name.value,
      email: fields.email.value,
      age: fields.age.value,
      gender: [...fields.gender].find(radio => radio.checked).value,
      profession: fields.profession.value,
      password: fields.password.value
    });
    form.reset();  // Сбрасываем форму после отправки
    submitBtn.disabled = true;  // Отключаем кнопку отправки
  }
});

// Вызываем функцию для добавления обработчиков событий input и blur
addInputBlurEvents();
