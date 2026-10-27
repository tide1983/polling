import './style.css';
import { interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, catchError, filter } from 'rxjs/operators';

// URL нашего локального сервера
const SERVER_URL = 'http://localhost:3001/messages/unread';

// Находим тело таблицы в DOM
const tableBody = document.getElementById('messages-body');

// 1. Создаем поток, который испускает значения каждые 3 секунды
const polling$ = interval(3000).pipe(
  // 2. switchMap отменяет предыдущий HTTP-запрос, если он не успел завершиться,
  // и запускает новый.
  switchMap(() => 
    ajax.getJSON(SERVER_URL).pipe(
      // 3. Обработка ошибок. Если сервер вернул не 200 или упал,
      // мы перехватываем ошибку и возвращаем фейковый успешный ответ с пустым массивом.
      catchError((error) => {
        console.warn('Ошибка сервера, считаем что новых сообщений нет', error);
        return of({ status: 'ok', messages: [] }); 
      })
    )
  ),
  // 4. Из всего ответа сервера нам нужен только массив messages
  map((response) => response.messages),
  // 5. Если массив пустой, не пропускаем его дальше (не дергаем DOM зря)
  filter((messages) => messages && messages.length > 0)
);

// 6. Подписываемся на наш поток
polling$.subscribe((messages) => {
  messages.forEach((msg) => {
    // --- Форматирование даты ---
    // msg.received приходит в секундах, new Date() ждет миллисекунды
    const date = new Date(msg.received * 1000);
    
    // Получаем часы и минуты, добавляем ведущий ноль (padStart)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы с 0
    const year = date.getFullYear();
    
    // Формат: ЧЧ:ММ ДД.ММ.ГГГГ
    const formattedDate = `${hours}:${minutes} ${day}.${month}.${year}`;

    // --- Обрезка темы ---
    let subject = msg.subject;
    if (subject.length > 15) {
      subject = subject.substring(0, 15) + '...';
    }

    // --- Создание строки таблицы ---
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${msg.from}</td>
      <td>${subject}</td>
      <td>${formattedDate}</td>
    `;

    // ВАЖНО: Добавляем сообщение в САМЫЙ ВЕРХ таблицы (prepend)
    tableBody.prepend(tr);
  });
});

console.log('Приложение запущено, ждем сообщений...');