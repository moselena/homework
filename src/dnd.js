/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
  let divsize = ((Math.random() * 100) + 50).toFixed();
  let color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
  var posx = (Math.random() * document.documentElement.clientWidth - divsize).toFixed();
  var posy = (Math.random() * document.documentElement.clientWidth - divsize).toFixed();
  let newDiv = document.createElement('div');
  newDiv.classList.add('draggable-div');
  newDiv.style.cssText = `width: ${divsize}px;
      height: ${divsize}px;
      background-color: ${color};
      position: absolute;
      left: ${posx}px;
      top: ${posy}px`;
  return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
  document.querySelector('body').addEventListener('mousedown', (event) => {
    const { target, clientX, clientY, pageX, pageY } = event;
    const shiftX = clientX - target.getBoundingClientRect().left;
    const shiftY = clientY - target.getBoundingClientRect().top;
    moveAt(pageX, pageY);

    function moveAt({ pageX, pageY }) {
        target.style.left = pageX - shiftX + 'px';
        target.style.top = pageY - shiftY + 'px';
    }

    document.addEventListener('mousemove', moveAt);
    target.onmouseup = () => {
      document.removeEventListener('mousemove', moveAt);
      target.onmouseup = null;
    };
  });
  document.body.ondragstart = () => false;
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
