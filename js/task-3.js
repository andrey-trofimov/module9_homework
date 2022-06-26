/* Task 3

Напишите код приложения, интерфейс которого представляет собой input и кнопку. 
В input можно ввести любое число. При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, 
где get-параметр limit — это введённое число.
Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.

Подсказка: получение данных из input.
const value = document.querySelector('input').value;
*/
document.addEventListener("DOMContentLoaded", () => {
  // Найдем кнопку
  const btnTask3 = document.querySelector("#task-3__btn");

  // Отследим клик по кнопке
  btnTask3.addEventListener("click", getGallery);
});

function getGallery() {
  let result = "";

  // Зададим адрес сервера
  let userUrl = " https://picsum.photos/v2/list?limit=";

  // Найдем поле ввода и место для галлереи
  let value = document.querySelector("#task-3__input").value;
  let gallery = document.querySelector(".gallery");

  // Проверим введенное значение
  if (!(value > 0 && value < 11)) return alertError();

  // Объявим экземпляр класса XMLHttpRequest
  let xhr = new XMLHttpRequest();

  // Инициализируем запрос
  xhr.open("GET", `${userUrl}${value}`, true);

  // Отправляем запрос
  xhr.send();

  // Обрабатываем ответ сервера
  xhr.onload = function () {
    if (xhr.status != 200) {
      // HTTP ошибка?
      // Если статус не 200, то обрабатываем отдельно
      // (200 указывает, что запрос выполнен успешно)
      console.log("Статус ответа: ", xhr.status);
    } else {
      // Ответ получаем в формате JSON, распарсим его
      let serverResponse = JSON.parse(xhr.response);

      console.log("script 3", serverResponse);

      // Формируем галлерею
      for (let i = 0; i < value; i++) {
        result += `
        <div class="gallery__items">
            <img src=${serverResponse[i].download_url} width="100%" />
        </div>
        `;
      }

      // Выводим галлерею
      gallery.innerHTML = result;
      gallery.className = "gallery";
    }
  };

  // Сообщаем об ошибке
  function alertError() {
    gallery.innerHTML = "число вне диапазона от 1 до 10";
    gallery.className += " gallery--error";
  }
}
