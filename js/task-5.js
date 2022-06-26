/* Task 5

Написать код приложения, интерфейс которого состоит из 
двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
(Вместо заголовков использовал атрибут placeholder)

При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является 
числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;

Если число во втором input не попадает в диапазон от 1 до 10 или не является 
числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;

Если и первый, и второй input не в диапазонах или не являются числами — 
выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;

Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL 
https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это 
число из первого input, а GET-параметр limit — это введённое число второго input. 

Пример: если пользователь ввёл 5 и 7, то запрос будет вида 
https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки 
из последнего успешно выполненного запроса (использовать localStorage).
*/

document.addEventListener("DOMContentLoaded", function () {
  const btnTask5 = document.querySelector("#task-5__btn");
  // Отследим клик по кнопке 5-го задания
  btnTask5.addEventListener("click", getFinalGallery);
  showLastImages();
});

function showLastImages() {
  // Найдем поля 5-го задания
  let page = document.querySelector("#task-5__input-1");
  let limit = document.querySelector("#task-5__input-2");
  let gallery = document.querySelector(".gallery");

  // Проверим была ли предидущая загрузка
  if (localStorage.getItem("result5")) {
    result = localStorage.getItem("result5");

    // Заполним поля предидущими значениями
    page.value = localStorage.getItem("page");
    limit.value = localStorage.getItem("limit");
    gallery.innerHTML = result;
  }
}

function getFinalGallery() {
  // Найдем поля ввода 5-го задания
  let page = document.querySelector("#task-5__input-1").value;
  let limit = document.querySelector("#task-5__input-2").value;
  let gallery = document.querySelector(".gallery");
  //   page = page.value;
  //   limit = limit.value;

  // Проверим введенное значение
  if ((page < 1 || page > 10 || isNaN(+page)) && (limit < 1 || limit > 10 || isNaN(+limit))) {
    let errorMsg = "Номер страницы и лимит вне диапазона от 1 до 10";
    return alertError(errorMsg);
  }

  if (page < 1 || page > 10 || isNaN(+page)) {
    let errorMsg = "Номер страницы вне диапазона от 1 до 10";
    return alertError(errorMsg);
  }

  if (limit < 1 || limit > 10 || isNaN(+limit)) {
    let errorMsg = "Лимит вне диапазона от 1 до 10";
    return alertError(errorMsg);
  }

  // сохраним пользовательские данные в localstorage
  localStorage.setItem("page", page);
  localStorage.setItem("limit", limit);

  // Сформируем адрес
  let url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

  // Сохраним адрес в localstorage
  localStorage.setItem("url", url);

  // Запросим объект с галлереей
  fetch(url)
    .then((response) => {
      // json() -- это промис, поэтому он обрабатывается отдельно
      return response.json();
    })
    .then((obj) => {
      let result = "";

      for (let i = 0; i < limit; i++) {
        result += `
          <div class="gallery__items">
              <img src=${obj[i].download_url} width="100%" />
          </div>
          `;
      }

      // Выведем картинки
      gallery.innerHTML = result;

      // Сохраним картинки в localstorage
      localStorage.setItem("result5", result);
    })
    .catch((error) => {
      // Сообщим об ошибке с галлереей
      console.log("Ошибка при загрузке галлереи", error);
    })
    .finally(() => {
      gallery.className = "gallery";
    });

  // Сообщим об ошибке в введенных данных
  function alertError(errorMsg) {
    gallery.innerHTML = errorMsg;
    gallery.className += " gallery--error";
  }
}
