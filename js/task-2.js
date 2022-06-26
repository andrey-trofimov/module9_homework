/* Task 2

Вам дана заготовка и результат, который 
вы должны получить. Ваша задача — написать 
код, который будет преобразовывать 
JSON в JS-объект и выводить его в консоль.

{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}

{
  list: [
    { name: 'Petr', age: 20, prof: 'mechanic' },
    { name: 'Vova', age: 60, prof: 'pilot' },
  ]
}
*/

function task2() {
  // Оъект, который будем парсить
  let userJson = `
    {
        "list": [
         {
          "name": "Petr",
          "age": "20",
          "prof": "mechanic"
         },
         {
          "name": "Vova",
          "age": "60",
          "prof": "pilot"
         }
        ]
       }
    `;

  // Парсим объект в результирующий объект
  let result = JSON.parse(userJson);
  console.log(result);
}

task2();
