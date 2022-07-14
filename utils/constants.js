const crashTestErrorText = 'Сервер сейчас упадёт';
const serverErrorText = 'Server Error';

const notFoundErrorText = 'Запрашиваемой страницы не существует';

const notFoundFilmErrorText = 'Такой фильм не найден';
const forbiddenErrorFilmText = 'Нет доступа к удалению фильма';
const badRequestErrorFilmText = 'Некорректный id фильма';
const notCorrectImageErrorText = 'Некорректный адрес картинки';

const conflictErrorEmailText = 'Такой email уже занят';
const badRequestUserErrorText = 'Пользователь не найден';
const badRequestUserIdErrorText = 'Некорректный id пользователя';
const notFoundUserErrorText = 'Запрашиваемый пользователь не найден';

const unauthorizedErrorText = 'Некорректные данные почты или пароля';
const needAuthErrorText = 'Необходима авторизация';
const emailErrorText = 'Некорректный адрес почты';

const regularExpression = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

function validationErrorText(errObject) {
  return `Некорректные данные: ${errObject}`;
}

module.exports = {
  validationErrorText,
  crashTestErrorText,
  serverErrorText,
  notFoundErrorText,
  notFoundFilmErrorText,
  forbiddenErrorFilmText,
  badRequestErrorFilmText,
  notCorrectImageErrorText,
  conflictErrorEmailText,
  notFoundUserErrorText,
  badRequestUserErrorText,
  badRequestUserIdErrorText,
  unauthorizedErrorText,
  needAuthErrorText,
  emailErrorText,
  regularExpression,
};
