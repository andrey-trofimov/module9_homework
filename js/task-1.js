/* Task 1

Вам дана заготовка и результат, который вы 
должны получить. Ваша задача — написать код, 
который будет преобразовывать XML в JS-объект 
и выводить его в консоль. 

<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>

{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/
function task1() {
  // Создание экземпляра класса DOMParser.
  // Он позволит нам парсить XML
  let parser = new DOMParser();

  // XML, который мы будем парсить
  let xmlStr = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
  `;

  // Парсинг XML
  let xmlDOM = parser.parseFromString(xmlStr, "text/xml");

  // Получение всех DOM-нод коллекций
  let listNode = xmlDOM.querySelector("list");
  let studentNode = listNode.querySelectorAll("student");
  let nameNode = listNode.querySelectorAll("name");
  let firstNode = listNode.querySelectorAll("first");
  let secondNode = listNode.querySelectorAll("second");
  let ageNode = listNode.querySelectorAll("age");
  let profNode = listNode.querySelectorAll("prof");

  // Создаем массив для атрибутов
  let nameAttr = [];

  // Получение данных из атрибутов
  nameNode.forEach((name, index) => (nameAttr[index] = name.getAttribute("lang")));

  // Создаем пустой массив
  let list = [];

  // Заполняем массив объектами
  studentNode.forEach(function (student, index) {
    list[index] = {
      name: `${firstNode[index].textContent} ${secondNode[index].textContent}`,
      age: ageNode[index].textContent,
      prof: profNode[index].textContent,
      lang: nameAttr[index],
    };
  });

  // Создаем результирующий объект
  let result = { list };

  console.log("result", result);
}

task1();
