/* Task 4

Напишите код приложения, интерфейс которого представляет собой 
2 input и кнопку submit. В input можно ввести любое число. 
При клике на кнопку происходит следующее:

Если оба числа не попадают в диапазон от 100 до 300 или введено 
не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос 
c помощью fetch по URL https://picsum.photos/200/300, где первое 
число — ширина картинки, второе — высота.
Пример: если пользователь ввёл 150 и 200, 
то запрос будет вида https://picsum.photos/150/200.
После получения данных вывести ниже картинку на экран.

Подсказка: получение данных из input.
const value = document.querySelector('input').value;
*/

document.addEventListener("DOMContentLoaded", function () {
  // Найдем кнопку 4-го задания
  const btnTask4 = document.querySelector("#task-4__btn");

  // Отследим клик по кнопке 4-го задания
  btnTask4.addEventListener("click", getPicture);
});

function getPicture() {
  // Найдем поля ввода 4-го задания
  let value1 = document.querySelector("#task-4__input-1").value;
  let value2 = document.querySelector("#task-4__input-2").value;
  let gallery = document.querySelector(".gallery");

  // Проверим введенное значение
  if (
    value1 < 100 ||
    value1 > 300 ||
    value2 < 100 ||
    value2 > 300 ||
    isNaN(+value1) ||
    isNaN(+value2)
  ) {
    return alertError();
  }

  // Сформируем адрес
  let url = `https://picsum.photos/${value1}/${value2}/`;

  fetch(url)
    .then((response) => {
      // Найдем место для картинки и выведем её
      gallery.innerHTML = `<img src=${response.url} />`;
    })
    .catch(() => {
      // Сообщим об ошибке с картинкой
      console.log("Ошибка при загрузке картинки");
    })
    .finally(() => {
      gallery.className = "gallery";
    });

  // Сообщим об ошибке в введенных данных
  function alertError() {
    gallery.innerHTML = "одно из чисел вне диапазона от 100 до 300";
    gallery.className += " gallery--error";
  }
}
