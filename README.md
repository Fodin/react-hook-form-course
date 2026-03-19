# 🎓 React Hook Form: От новичка к профи

Интерактивный курс по изучению **React Hook Form** с использованием **TypeScript**, **Zod** и **Yup**.

## 📋 О курсе

Пошаговые упражнения от простых к сложным. Каждый уровень включает теорию, примеры кода и задания для самостоятельного решения. Интерфейс поддерживает 🇷🇺 русский и 🇬🇧 английский языки.

## 🚀 Быстрый старт

```bash
npm install
npm run dev
```

Откройте браузер по адресу `http://localhost:5173`

## 📖 Как работать с курсом

Курс разделён на два каталога:

- 🖊️ **`exercises/`** — здесь вы пишете код:
  - `TaskX_X.tsx` — файлы заданий с TODO
  - `Cheat.tsx` — образец решения для сверки

- 📚 **`src/exercises/`** — теория и описания заданий:
  - `README.md` — подробная теория
  - `task-X.X.md` — описание каждого задания
  - `Solution.tsx` — решение, интегрированное в приложение

### 🗺️ Рекомендуемый порядок

1. 📖 Прочитайте теорию — блок «Теория» на странице уровня
2. 🔍 Изучите задание — блок «Задание X.X» под формой
3. ✏️ Откройте `exercises/XX-level/TaskX_X.tsx` и следуйте TODO
4. 🌐 Проверьте результат в браузере
5. 💡 Сверьтесь с `Cheat.tsx` если застряли

## 🎯 Программа курса

### ⚙️ Уровень 0: Setup
- 0.1: Первая форма
- 0.2: Вывод данных на страницу

### 🧱 Уровень 1: Основы
- 1.1: Форма регистрации с разными типами полей
- 1.2: Отслеживание значений с watch
- 1.3: setValue и getValues
- 1.4: formState — ошибки и валидность

### ✅ Уровень 2: Валидация
- 2.1: Built-in валидация (required, minLength, maxLength)
- 2.2: Pattern валидация (email, phone, password)
- 2.3: Custom валидация с validate
- 2.4: Cross-field валидация

### 🛡️ Уровень 3: Валидация по схемам
- 3.1: Базовая валидация с Zod
- 3.2: Валидация с Yup
- 3.3: Сложные схемы (объекты, массивы, enum)
- 3.4: Кастомные сообщения и refine
- 3.5: Сравнение Zod vs Yup
- 3.6: superRefine и discriminatedUnion

### 🧩 Уровень 4: Сложные поля
- 4.1: Controller для кастомных компонентов
- 4.2: Radio и Select
- 4.3: Checkbox
- 4.4: File Upload
- 4.5: Дата и время

### 🔄 Уровень 5: Динамические формы
- 5.1: useFieldArray (add/remove)
- 5.2: Условные поля
- 5.3: Зависимые поля
- 5.4: Wizard (multi-step форма)

### 🎨 Уровень 6: Состояния и UX
- 6.1: Dirty/Touched states
- 6.2: Reset и default values
- 6.3: Focus management
- 6.4: Accessibility (ARIA)
- 6.5: Performance оптимизация
- 6.6: setFocus, resetField и getFieldState

### ⏳ Уровень 7: Асинхронность
- 7.1: Async валидация
- 7.2: Загрузка данных (edit mode)
- 7.3: Submit с loading/error
- 7.4: Debounce для автосохранения
- 7.5: Async defaultValues и isLoading

### 🏆 Уровень 8: Продвинутые техники
- 8.1: Интеграция с UI-библиотекой
- 8.2: Кастомные хуки
- 8.3: FormContext
- 8.4: localStorage Persistence
- 8.5: Финальный проект
- 8.6: useFormState и тестирование

## 📁 Структура проекта

```
exercises/                    # ✏️ Файлы для работы студента
├── 00-setup/                 # TaskX_X.tsx + Cheat.tsx
├── ...
└── 08-advanced/

src/
├── exercises/                # 📚 Теория, задания, решения
│   ├── 00-setup/             # README.md, task-0.1.md, Solution.tsx
│   ├── ...
│   └── 08-advanced/
├── components/               # 🧩 UI-компоненты приложения
├── hooks/                    # 🪝 Хуки (тема, язык, прогресс и др.)
├── translations/             # 🌍 Переводы интерфейса
├── App.tsx                   # 🏠 Главное приложение с роутингом
└── main.tsx                  # 🚪 Точка входа
```

## 🔧 Полезные команды

```bash
npm run dev          # 🚀 Запуск dev-сервера
npm run build        # 📦 Сборка проекта
npm run lint         # 🔍 Линтинг
npm run format       # 💅 Форматирование кода
npx tsc --noEmit     # 🔬 Проверка типов
```

## 🛠️ Технологии

- ⚛️ **React** 18.3
- 🔷 **TypeScript** 5.6
- 📝 **React Hook Form** 7.54
- 💎 **Zod** 3.24
- 🧪 **Yup** 1.6
- ⚡ **Vite** 8.0

## 🔗 Дополнительные ресурсы

- 📝 [React Hook Form](https://react-hook-form.com/)
- 💎 [Zod](https://zod.dev/)
- 🧪 [Yup](https://github.com/jquense/yup)
- ⚛️ [React](https://react.dev/)
- 🔷 [TypeScript](https://www.typescriptlang.org/)

## 📄 Лицензия

MIT

---

# 🎓 React Hook Form: From Beginner to Pro

Interactive course to learn **React Hook Form** using **TypeScript**, **Zod** and **Yup**.

## 📋 About the Course

Step-by-step exercises from simple to complex. Each level includes theory, code examples, and tasks for independent solving. The interface supports 🇷🇺 Russian and 🇬🇧 English.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open browser at `http://localhost:5173`

## 📖 How to Work with the Course

The course is split into two directories:

- 🖊️ **`exercises/`** — where you write code:
  - `TaskX_X.tsx` — task files with TODO comments
  - `Cheat.tsx` — reference solution for checking

- 📚 **`src/exercises/`** — theory and task descriptions:
  - `README.md` — detailed theory
  - `task-X.X.md` — description of each task
  - `Solution.tsx` — solution integrated into the app

### 🗺️ Recommended workflow

1. 📖 Read the theory — "Theory" block on the level page
2. 🔍 Study the task — "Task X.X" block below the form
3. ✏️ Open `exercises/XX-level/TaskX_X.tsx` and follow TODOs
4. 🌐 Check the result in the browser
5. 💡 Compare with `Cheat.tsx` if stuck

## 🎯 Course Program

### ⚙️ Level 0: Setup
- 0.1: First form
- 0.2: Displaying data on the page

### 🧱 Level 1: Basics
- 1.1: Registration form with different field types
- 1.2: Tracking values with watch
- 1.3: setValue and getValues
- 1.4: formState — errors and validity

### ✅ Level 2: Validation
- 2.1: Built-in validation (required, minLength, maxLength)
- 2.2: Pattern validation (email, phone, password)
- 2.3: Custom validation with validate
- 2.4: Cross-field validation

### 🛡️ Level 3: Schema Validation
- 3.1: Basic Zod validation
- 3.2: Yup validation
- 3.3: Complex schemas (objects, arrays, enum)
- 3.4: Custom messages and refine
- 3.5: Zod vs Yup comparison
- 3.6: superRefine and discriminatedUnion

### 🧩 Level 4: Complex Fields
- 4.1: Controller for custom components
- 4.2: Radio and Select
- 4.3: Checkbox
- 4.4: File Upload
- 4.5: Date and time

### 🔄 Level 5: Dynamic Forms
- 5.1: useFieldArray (add/remove)
- 5.2: Conditional fields
- 5.3: Dependent fields
- 5.4: Wizard (multi-step form)

### 🎨 Level 6: States and UX
- 6.1: Dirty/Touched states
- 6.2: Reset and default values
- 6.3: Focus management
- 6.4: Accessibility (ARIA)
- 6.5: Performance optimization
- 6.6: setFocus, resetField and getFieldState

### ⏳ Level 7: Async
- 7.1: Async validation
- 7.2: Data loading (edit mode)
- 7.3: Submit with loading/error
- 7.4: Debounce for auto-save
- 7.5: Async defaultValues and isLoading

### 🏆 Level 8: Advanced Techniques
- 8.1: UI library integration
- 8.2: Custom hooks
- 8.3: FormContext
- 8.4: localStorage Persistence
- 8.5: Final project
- 8.6: useFormState and testing

## 📁 Project Structure

```
exercises/                    # ✏️ Student work files
├── 00-setup/                 # TaskX_X.tsx + Cheat.tsx
├── ...
└── 08-advanced/

src/
├── exercises/                # 📚 Theory, tasks, solutions
│   ├── 00-setup/             # README.md, task-0.1.md, Solution.tsx
│   ├── ...
│   └── 08-advanced/
├── components/               # 🧩 UI components
├── hooks/                    # 🪝 Hooks (theme, language, progress, etc.)
├── translations/             # 🌍 Interface translations
├── App.tsx                   # 🏠 Main app with routing
└── main.tsx                  # 🚪 Entry point
```

## 🔧 Useful Commands

```bash
npm run dev          # 🚀 Start dev server
npm run build        # 📦 Build project
npm run lint         # 🔍 Linting
npm run format       # 💅 Code formatting
npx tsc --noEmit     # 🔬 Type checking
```

## 🛠️ Technologies

- ⚛️ **React** 18.3
- 🔷 **TypeScript** 5.6
- 📝 **React Hook Form** 7.54
- 💎 **Zod** 3.24
- 🧪 **Yup** 1.6
- ⚡ **Vite** 8.0

## 🔗 Additional Resources

- 📝 [React Hook Form](https://react-hook-form.com/)
- 💎 [Zod](https://zod.dev/)
- 🧪 [Yup](https://github.com/jquense/yup)
- ⚛️ [React](https://react.dev/)
- 🔷 [TypeScript](https://www.typescriptlang.org/)

## 📄 License

MIT
