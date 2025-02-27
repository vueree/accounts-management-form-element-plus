Управление учетными записями с Element Plus

Этот проект представляет собой интерфейс для управления учетными записями с использованием Vue 3, TypeScript, Pinia и Element Plus.

📌 Функциональность
	•	Просмотр списка учетных записей
	•	Добавление новой учетной записи
	•	Редактирование существующих учетных записей
	•	Удаление учетных записей с подтверждением
	•	Поддержка типов учетных записей: LDAP и Локальная
	•	Валидация данных (логин, пароль)
	•	Возможность добавления меток для учетных записей

🚀 Установка и запуск

1️⃣ Установка зависимостей

yarn install

2️⃣ Запуск проекта в режиме разработки

yarn dev

🛠️ Технологии
	•	Vue 3 + Composition API
	•	Element Plus (UI-компоненты)
	•	TypeScript
	•	Pinia (хранилище состояния)
	•	Vite (сборка проекта)
	•	SCSS (модули стилей)

📂 Структура проекта

📂 src
 ┃  📜 App.vue           # Корневой компонент
 ┃  📜 main.ts           # Корневой компонент
 ┣ 📂 components          # Компоненты Vue
 ┃ ┣ 📜 AccountForm.vue   # Основная форма управления учетными записями
 ┃ ┣ 📜 AccountItem.vue   # Компонент для отдельной учетной записи
 ┃ ┗ 📜 App.vue           # Корневой компонент
 ┣ 📂 stores              # Pinia store
 ┃ ┗ 📜 accountStore.ts   # Управление списком учетных записей
 ┣ 📂 types               # Типы данных TypeScript
 ┃ ┗ 📜 index.ts          # Интерфейсы и типы
 ┣ 📂 composables         # Логические хуки
 ┃ ┗ 📜 useFormLogic.ts  # Управление формой
 ┃ ┗ 📜 useAccountStore.ts  # Работа со стэйтом
 ┃ ┗ 📜 useValidation.ts  # Валидация данных

🎨 Используемые компоненты Element Plus
	•	ElButton – кнопки действий
	•	ElCard – карточки для отображения учетных записей
	•	ElInput – поля ввода
	•	ElSelect – выпадающий список
	•	ElTag – отображение меток
	•	ElTooltip – всплывающие подсказки
	•	ElDialog – диалоговое окно подтверждения
	•	ElAlert – уведомления

📜 Лицензия

Этот проект распространяется под лицензией MIT.
