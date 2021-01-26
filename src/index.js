/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
// const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
// const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
  let cookieParse = parseCookie();
  let filterValue = filterNameInput.value;

  listTable.innerHTML = '';
  filterCookie(cookieParse, isMatching, filterValue);
});

const isMatching = (full, str) => {
  return full.toLowerCase().indexOf(str.toLowerCase()) > -1;
};

addButton.addEventListener('click', () => {
  let cookieName = document.querySelector('#add-name-input');
  let cookieValue = document.querySelector('#add-value-input');

  document.cookie = `${cookieName.value}=${cookieValue.value}`;
  listTable.innerHTML = '';
  if (filterNameInput.value === '') {
    let cookie = parseCookie();

    makeCookie(cookie);
  } else {
    let filterCookie = parseFilterCookie(filterNameInput.value);

    makeCookie(filterCookie);
  }  
});

function createRow(key, cookie) {
  let tr = document.createElement('tr');
  let thName = document.createElement('th');
  let thValue = document.createElement('th');
  let delButton = document.createElement('button');

  thName.innerHTML = key;
  thValue.innerHTML = cookie[key];
  listTable.append(tr);
  tr.append(thName);
  tr.append(thValue);
  delButton.textContent = 'удалить';
  tr.append(delButton);
  delButton.addEventListener('click', () => {
    listTable.removeChild(tr);
    document.cookie = key + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
  });
}

function makeCookie(cookie) {
  for (let key of Object.keys(cookie)) {
    createRow(key, cookie);
  }
}

function filterCookie(cookie, isMatching, filterValue) {
  for (let key in cookie) {
    if (typeof(key) != 'undefined' && typeof(cookie[key]) != 'undefined') {
      if (isMatching(key, filterValue) || isMatching(cookie[key], filterValue)) {
        createRow(key, cookie);
      }
    }
  }
}

function parseCookie() {
  let cookie = document.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');

      prev[name] = value;
      
      return prev;
  }, {});
  
  return cookie;
}

function parseFilterCookie(filterValue) {
  let cookie = document.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');

      if (isMatching(name, filterValue) || isMatching(value, filterValue)) {
          prev[name] = value;
      }

      return prev;
  }, {});

  return cookie;
}

let result = parseCookie();

makeCookie(result);