function getNumbersFromString(str) {
  let numb = String(str).match(/\d/g);
  if (!numb) return '';
  numb = numb.join("");
  return numb;
}
function isPhoneValid(phone) {
  if (!phone) return false
  return true;
}
function isNameValid(name) {
  return name && String(name).length > 0
}
function isEmailValid(email) {
  return email && String(email).length > 0
}


function onSuccess(type, res, form) {
  switch(type) {
    case 'callme':
      showSuccess('Спасибо за обращение! Уже набираем вам!');
      close(z('.pp'));
      form.querySelector('input[name="name"]').value = '';
      form.querySelector('input[name="phone"]').value = '';
      break;
    case 'feedback':
      showSuccess('Спасибо за обращение! Свяжемся с вами в ближайшее время!');
      form.querySelector('input[name="name"]').value = '';
      form.querySelector('input[name="phone"]').value = '';
      form.querySelector('input[name="email"]').value = '';
      form.querySelector('textarea').value = '';
      break;
    case 'select_machine':
      showSuccess('Спасибо за обращение! Свяжемся и обсудим стоимость размещения в ближайшее время!');
      form.querySelector('input[name="name"]').value = '';
      form.querySelector('input[name="phone"]').value = '';
      break;
  }
}

function showSuccess(msg) {
  const successbar = z('#successbar');
  successbar.querySelector('.cont').innerHTML = '';
  const p = document.createElement('p');
  p.innerHTML = msg;
  successbar.querySelector('.cont').appendChild(p);
  successbar.classList.remove('hidden');
  setTimeout(() => {
    successbar.classList.add('opened');
  }, 10)
  setTimeout(() => {
    successbar.classList.remove('opened');
    setTimeout(() => {
      successbar.classList.add('hidden');
    }, 210)
  }, 4000)
}


function showError(errs, form) {
  console.warn(errs);
  const errList = [];
  const errorbar = z('#errorbar');
  Object.keys(errs).forEach(param => {
    if (!errs[param] && param === 'name') {
      errList.push('Поле <b>имя</b> не заполнено');
      form.querySelector('input[name="name"]').classList.add('err');
    }
    if (!errs[param] && param === 'phone') {
      errList.push('Поле <b>телефон</b> заполнено не верно');
      // form.querySelector('.custom-phone-input').classList.add('err')
      form.querySelector('input[name="phone"]').classList.add('err');
    }
    if (!errs[param] && param === 'email') {
      errList.push('Поле <b>email</b> заполнено не верно');
      form.querySelector('input[name="email"]').classList.add('err');
    }
    if (!errs[param] && param === 'machines') {
      errList.push('Оборудование не выбрано');
      // form.querySelector('input[name="email"]').classList.add('err');
    }
  });
  if (!errList.length) return;

  errorbar.querySelector('.cont').innerHTML = '';
  errList.forEach(err => {
    const p = document.createElement('p');
    p.innerHTML = err;
    errorbar.querySelector('.cont').appendChild(p);
  });
  errorbar.classList.remove('hidden');
  setTimeout(() => {
    errorbar.classList.add('opened');
  }, 10)
  setTimeout(() => {
    errorbar.classList.remove('opened');
    setTimeout(() => {
      errorbar.classList.add('hidden');
    }, 210)
  }, 4000)
}


function onServerError(res, form) {
  const errs = {};
  Object.keys(res.errors).forEach(param => {
    errs[param] = false;
  });
  showError(errs, form);
}

// CALL ME
z('.pp .call-me') && z('.pp .call-me').on('click', ev => {
  ev.preventDefault();
  const form = ev.target.parentElement;
  const name = z('.pp input[name="name"]').value;
  const phone = z('.pp input[name="phone"]').value;

  form.querySelector('input[name="name"]').classList.remove('err');
  form.querySelector('input[name="phone"]').classList.remove('err');

  const nameIsValid = isNameValid(name);
  const phoneIsValid = isNameValid(phone);
  if (!nameIsValid || !phoneIsValid) {
    showError({
      phone: phoneIsValid,
      name: nameIsValid
    }, form);
    return;
  }

  Rails.ajax({
    type: 'POST',
      url: 'https://miningup.ru/api/feedbacks/message',
      data: objectToFormData({feedback: {
        name,
        phone,
        message: '[HOTEL: call me]',
        email: 'from@hotel.com'
      }}),
    success: res => onSuccess('callme', res, form),
    error: res => onServerError(res, form)
  });
});

// FEEDBACK
z('button#feedback') && z('button#feedback').on('click', ev => {
  ev.preventDefault();
  const form = z('section#contacts form');
  const name = form.querySelector('input[name="name"]').value;
  const phone = form.querySelector('input[name="phone"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const message = form.querySelector('textarea').value;

  form.querySelector('input[name="name"]').classList.remove('err');
  form.querySelector('input[name="phone"]').classList.remove('err');
  form.querySelector('input[name="email"]').classList.remove('err');

  const nameIsValid = isNameValid(name);
  const phoneIsValid = isNameValid(phone);
  const emailIsValid = isNameValid(email);
  if (!nameIsValid || !phoneIsValid || !emailIsValid) {
    showError({
      phone: phoneIsValid,
      name: nameIsValid,
      email: emailIsValid
    }, form);
    return;
  }

  Rails.ajax({
    type: 'POST',
      url: 'https://miningup.ru/api/feedbacks/message',
      data: objectToFormData({feedback: {
        name,
        phone,
        message: '[HOTEL: feedback]\n' + message,
        email
      }}),
    success: res => onSuccess('feedback', res, form),
    error: res => onServerError(res, form)
  });
});


// SELECT MACHINE
z('button#select-machine') && z('button#select-machine').on('click', ev => {
  ev.preventDefault();
  const form = z('section#calc .form');
  const name = form.querySelector('input[name="name"]').value;
  const phone = form.querySelector('input[name="phone"]').value;

  form.querySelector('input[name="name"]').classList.remove('err');
  form.querySelector('input[name="phone"]').classList.remove('err');

  const nameIsValid = isNameValid(name);
  const phoneIsValid = isNameValid(phone);
  const machinesIsValid = Boolean(window.SELECTED_MODELS_MESSAGE);
  if (!nameIsValid || !phoneIsValid || !machinesIsValid) {
    showError({
      phone: phoneIsValid,
      name: nameIsValid,
      machines: machinesIsValid
    }, form);
    return;
  }

  Rails.ajax({
    type: 'POST',
      url: 'https://miningup.ru/api/feedbacks/message',
      data: objectToFormData({feedback: {
        name,
        phone,
        message: '[HOTEL: select machines]\n' + window.SELECTED_MODELS_MESSAGE,
        email: 'from@hotel.com'
      }}),
    success: res => onSuccess('select_machine', res, form),
    error: res => onServerError(res, form)
  });
});




// MASK
[
  $('.pp input[name="phone"]'),
  $('section#contacts input[name="phone"]'),
  $('section#calc input[name="phone"]'),
].forEach($input => {
  $input.mask('+7 (999) 999-99-99')
});
