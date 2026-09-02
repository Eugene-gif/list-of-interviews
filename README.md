# 🚀 [Список интервью](https://list-of-interviews-eta.vercel.app/auth)

Минималистичный трекер собеседований на современном стеке Vue 3 + TypeScript + PrimeVue + Supabase, решающий проблему разрозненного хранения информации о процессах найма. Приложение со встроенной JWT-авторизацией предоставляет защищенное пространство для CRUD-управления карточками интервью, ведения их внутренних этапов и наблюдение аналитики по каждому интервью. Главная ценность продукта — в скорости структурирования данных и возможности отслеживать статистику по компаниям в реальном времени с помощью наглядной таблицы.

---

## 📌 Оглавление

- [Функционал](#-функционал)
- [Технологический стек](#-технологический-стек)
- [Быстрый старт](#-быстрый-старт)

---

## ✨ Функционал

Основные возможности и ключевые особенности приложения:

- ⚡ **Высокая производительность:** понятный, простой и быстрый интерфейс.
- 🔒 **Безопасность:** поддержка современных стандартов авторизации.
- 📱 **Адаптивность:** отображение на любых устройствах.
- 🛠 **Интеграции:** поддержка внешних API и сервисов.

---

## 🛠 Технологический стек

Список основных технологий, библиотек и фреймворков, использованных в проекте:

| Слой / Компонент | Технология                                                | Версия       |
| :--------------- | :-------------------------------------------------------- | :----------- |
| **Frontend**     | Vue3 / Vite / TypeScript / Vue-Router / Pinia / PrimeVue3 | `^3.5.40`    |
| **Backend**      | Supabase / PostgREST                                      | `14.5`       |
| **Database**     | Postgres                                                  | `17.6.1.155` |

---

## 🚀 Быстрый старт

### Требования

Перед началом убедитесь, что у вас установлены:

- Node.js (версии 22.18.0 или выше)
- Менеджер пакетов npm или yarn

### Установка и запуск

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/Eugene-gif/list-of-interviews
   cd list-of-interviews
   ```

2. **Настройте переменные окружения:**
   Создайте файл `.env` в корневом каталоге по шаблону `.env.example`:

   ```env
   VITE_SUPABASE_URL=ВАШ URL
   VITE_SUPABASE_PUBLISHABLE_KEY=ВАШ КЛЮЧ
   ```

3. **Установите зависимости:**

   ```bash
   npm install
   ```

4. **Запустите проект в режиме разработки:**
   ```bash
   npm run dev
   ```
   Проект будет доступен по адресу: `http://localhost:5173/`

---


## Рекомендуемые настройки IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Рекомендуемые настройки браузера

- Браузеры на основе Chromium (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)


