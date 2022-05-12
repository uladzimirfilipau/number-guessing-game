// Установить переменные, необходимые для хранения данных,
// которые будут использоваться программой.
// Первой переменной - randomNumber - присваивается случайное число от 1 до 100,
// вычисленное с использованием математического алгоритма.
var randomNumber = Math.floor(Math.random() * 100) + 1;
// Следующие три переменные сделаны для хранения ссылок на абзацы результатов в HTML
// и используются для вставки полученных значений в абзацы
var guesses = document.querySelector(".guesses");
var lastResult = document.querySelector(".lastResult");
var lowOrHi = document.querySelector(".lowOrHi");
// Следующие две переменных хранят ссылки на форму ввода текста и кнопку отправки
var guessSubmit = document.querySelector(".guessSubmit");
var guessField = document.querySelector(".guessField");
// Последние две переменные сохраняют количество догадок 1
// (используется для отслеживания того, сколько догадок у игрока было),
// и ссылку на кнопку сброса
var guessCount = 1;
var resetButton = document.querySelector(".resetButton");
// Автоматически поместить текстовый курсор в текстовое поле <input>,
// как только загрузится страница.
guessField.focus();
// Первая строка в функции checkGuess объявляет переменную с именем userGuess
// и устанавливает её значение на то, что сейчас введено в текстовое поле.
// Мы также пропускаем это значение через встроенный метод Number(),
// чтобы убедится, что значение точно является числом.
function checkGuess() {
  var userGuess = Number(guessField.value);
  // Проверить равна ли переменная guessCount числу 1
  // (то есть является ли это первой попыткой игрока или нет).
  // Если это так, мы выводим параграф с содержанием 'Предыдущие числа: '.
  // Если нет, ничего не делаем.
  if (guessCount === 1) {
    guesses.textContent = "Папярэднія лікі: ";
  }
  // Добавить текущее значение userGuess в конец параграфа guesses, плюс пробел.
  guesses.textContent += userGuess + " ";
  // Блок условного кода позволяет выборочно запускать код в зависимости от того,
  // является определённое условие истинным или нет.
  if (userGuess === randomNumber) {
    // Проверить, совпадает ли предположение пользователя с randomNumber.
    // Если это так и игра выиграна,
    // тогда показываем игроку поздравительное сообщение с приятным зелёным цветом,
    // очищаем содержимое окна информации о минимуме / максимуме
    // и запускаем функцию, называемую setGameOver()
    lastResult.textContent = "Дакладна! Я загадаў " + userGuess + "!";
    lastResult.style.color = "#0fd";
    lowOrHi.textContent = "";
    setGameOver();
    // Проверить, является ли этот ход последним ходом пользователя.
    // Если это так, программа выполняет то же самое, что и в предыдущем блоке,
    // но выведет сообщение с текстом "!!!Игра окончена!!!".
  } else if (guessCount === 8) {
    lastResult.textContent = "Спробы скончыліся!";
    setGameOver();
    // Этот код запускается только в том случае,
    // если ни один из двух других тестов не возвращает true
    // (т. е. Игрок не догадался правильно, но у него ещё остались догадки).
    // В этом случае мы говорим игроку, что он ошибся,
    // затем мы выполняем ещё один условный тест,
    // чтобы проверить, было ли предположение больше или меньше ответа,
    // показывая дополнительное сообщение.
  } else {
    lastResult.textContent = "Не адгадалі!";
    lastResult.style.color = "#e0121e";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Мой лік больш!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Мой лік менш!";
    }
  }
  // Последние три строки в функции готовят нас к следующей попытке.
  // Мы добавляем 1 к переменной guessCount так как игрок использовал свой ход
  // (++ оператор инкремента — увеличивает на 1),
  // очищаем значение текстового поля и фокусируемся на нем снова,
  // и теперь готовы для ввода следующего ответа.
  guessCount++;
  guessField.value = "";
  guessField.focus();
}
// Добавить обработчик событий к кнопке guessSubmit.
// Это метод, который принимает два входных значения (называемые аргументами)
// тип события, которое мы обработаем (в данном случае click) в виде строки,
// и код, который мы хотим запустить при возникновении события
// (в данном случае функция checkGuess()
guessSubmit.addEventListener("click", checkGuess);

// Добавить функцию setGameOver(), которая должна запускаться после завершения игры.
function setGameOver() {
  // Первые две строки отключают ввод текста и кнопку формы,
  // устанавливая их отключённые свойства как true.
  // Это необходимо, потому что, если бы мы этого не сделали,
  // пользователь мог бы представить больше догадок после завершения игры.
  guessField.disabled = true;
  guessSubmit.disabled = true;
  // Следующие три строки генерируют новый элемент <button>,
  // устанавливают его текстовую метку «Угадать ещё раз»
  // и добавляют её к нижней части нашего HTML.
  // resetButton = document.createElement("button");
  resetButton.classList.add("resetButtonVisible");
  // resetButton.textContent = "Адгадаць другі лік";
  // document.body.appendChild(resetButton);
  // Последняя строка устанавливает обработчик событий на нашей новой кнопке,
  // так что при нажатии на неё запускается функция resetGame()
  resetButton.addEventListener("click", resetGame);
}
// Сбросить на начальные параметры
function resetGame() {
  // Установить значение guessCount на 1
  guessCount = 1;
  // Удалить все пункты информации
  var resetParas = document.querySelectorAll(".resultParas p");
  for (var i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }
  // Удалить кнопку сброса
  resetButton.classList.remove("resetButtonVisible");
  // Включить элементы формы, установить фокус,
  // сделать поле доступным для следующих угадываний
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();
  // Удалить цвет фона из абзаца lastResult
  // lastResult.style.backgroundColor = "white";
  // Создать новое случайное число
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
