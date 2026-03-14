# 🎓 React Hook Form: От новичка к профи

Интерактивный курс по изучению **React Hook Form** с использованием **TypeScript**, **Zod** и **Yup**.

## 📋 О курсе

Этот проект содержит пошаговые упражнения от простых к сложным. Каждый уровень включает:
- 📚 Краткую теорию
- 💡 Примеры кода
- ✍️ Задания для самостоятельного решения
- ✅ Тесты для проверки

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка проекта
npm run build
```

## 📚 Программа курса

### Уровень 0: Setup
- 0.1: Настройка проекта
- 0.2: Первая форма (Hello World)

### Уровень 1: Основы
- 1.1: useForm, register, handleSubmit
- 1.2: Разные типы полей
- 1.3: formState (errors, isValid, isSubmitting)
- 1.4: setValue, getValues, watch

### Уровень 2: Валидация
- 2.1: Built-in валидация (required, minLength, maxLength)
- 2.2: Patterns (email, phone, password)
- 2.3: Custom validate функции
- 2.4: Cross-field валидация (confirm password)

### Уровень 3: Валидация по схемам
- 3.1: Zod базовая
- 3.2: Yup базовая
- 3.3: Сложные схемы (объекты, массивы, enum)
- 3.4: Кастомные сообщения и i18n
- 3.5: Zod vs Yup сравнение

### Уровень 4: Сложные поля
- 4.1: Radio и Select
- 4.2: Checkbox (single и multi)
- 4.3: Date/Time pickers
- 4.4: File upload (базовый)
- 4.5: Controller для сторонних компонентов

### Уровень 5: Динамические формы
- 5.1: useFieldArray (add/remove)
- 5.2: Условные поля
- 5.3: Зависимые поля
- 5.4: Wizard (multi-step)
- 5.5: Nested field arrays

### Уровень 6: Состояния и UX
- 6.1: Dirty/Touched states
- 6.2: Default values и reset
- 6.3: Focus management при ошибках
- 6.4: Accessibility (ARIA)
- 6.5: Performance оптимизация

### Уровень 7: Асинхронность
- 7.1: Async валидация (server-side)
- 7.2: Загрузка данных (edit mode)
- 7.3: Submit с loading/error
- 7.4: Debounce для автосохранения
- 7.5: File upload с прогрессом

### Уровень 8: Продвинутые техники
- 8.1: Интеграция с MUI/AntD
- 8.2: Кастомные хуки
- 8.3: FormContext (разделение форм)
- 8.4: localStorage persistence
- 8.5: Тестирование (RTL)
- 8.6: Финальный проект

## 📁 Структура проекта

```
src/
├── exercises/           # Упражнения по уровням
│   ├── 00-setup/
│   ├── 01-basic-form/
│   ├── 02-validation/
│   ├── 03-schema-validation/
│   ├── 04-complex-fields/
│   ├── 05-dynamic-forms/
│   ├── 06-states-ux/
│   ├── 07-async/
│   └── 08-advanced/
├── shared/              # Общие компоненты и утилиты
│   ├── components/
│   └── types/
├── App.tsx              # Главный компонент
└── main.tsx             # Точка входа
```

## 🎯 Как работать с упражнениями

1. Откройте папку нужного уровня
2. Прочитайте `README.md` с теорией
3. Изучите файл `task.md` с заданием
4. Откройте `Template.tsx` и следуйте TODO комментариям
5. Напишите код самостоятельно
6. Сверьтесь с решением в **`Cheat.tsx`**
7. Проверьте результат в браузере

## 📁 Структура каждого уровня

```
src/exercises/XX-level/
├── README.md         # Подробная теория с примерами
├── task.md           # Описание заданий
├── Template.tsx      # Шаблон с TODO для самостоятельного решения
├── Solution.tsx      # Решение для интеграции в приложение
├── Cheat.tsx         # 📋 Образец правильного решения (для сверки)
├── index.ts          # Экспорты
└── *Exercise.tsx     # Главный компонент уровня
```

> 💡 **Совет:** Сначала попробуйте решить задание самостоятельно в `Template.tsx`, затем сверьтесь с `Cheat.tsx` для проверки или если застряли.

## 🛠 Технологии

- **React** 18.3
- **TypeScript** 5.6
- **React Hook Form** 7.54
- **Zod** 3.24
- **Yup** 1.6
- **Vite** 6.0
- **Axios** 1.7

## 📝 Лицензия

MIT

---

# 🎓 React Hook Form: From Beginner to Pro

Interactive course to learn **React Hook Form** using **TypeScript**, **Zod** and **Yup**.

## 📋 About the Course

This project contains step-by-step exercises from simple to complex. Each level includes:
- 📚 Brief theory
- 💡 Code examples
- ✍️ Tasks for independent solving
- ✅ Tests for verification

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build the project
npm run build
```

## 📚 Course Program

### Level 0: Setup
- 0.1: Project setup
- 0.2: First form (Hello World)

### Level 1: Basics
- 1.1: useForm, register, handleSubmit
- 1.2: Different field types
- 1.3: formState (errors, isValid, isSubmitting)
- 1.4: setValue, getValues, watch

### Level 2: Validation
- 2.1: Built-in validation (required, minLength, maxLength)
- 2.2: Patterns (email, phone, password)
- 2.3: Custom validate functions
- 2.4: Cross-field validation (confirm password)

### Level 3: Schema Validation
- 3.1: Zod basics
- 3.2: Yup basics
- 3.3: Complex schemas (objects, arrays, enum)
- 3.4: Custom messages and i18n
- 3.5: Zod vs Yup comparison

### Level 4: Complex Fields
- 4.1: Radio and Select
- 4.2: Checkbox (single and multi)
- 4.3: Date/Time pickers
- 4.4: File upload (basic)
- 4.5: Controller for third-party components

### Level 5: Dynamic Forms
- 5.1: useFieldArray (add/remove)
- 5.2: Conditional fields
- 5.3: Dependent fields
- 5.4: Wizard (multi-step)
- 5.5: Nested field arrays

### Level 6: States and UX
- 6.1: Dirty/Touched states
- 6.2: Default values and reset
- 6.3: Focus management on errors
- 6.4: Accessibility (ARIA)
- 6.5: Performance optimization

### Level 7: Async
- 7.1: Async validation (server-side)
- 7.2: Data loading (edit mode)
- 7.3: Submit with loading/error
- 7.4: Debounce for auto-save
- 7.5: File upload with progress

### Level 8: Advanced Techniques
- 8.1: Integration with MUI/AntD
- 8.2: Custom hooks
- 8.3: FormContext (form separation)
- 8.4: localStorage persistence
- 8.5: Testing (RTL)
- 8.6: Final project

## 📁 Project Structure

```
src/
├── exercises/           # Exercises by levels
│   ├── 00-setup/
│   ├── 01-basic-form/
│   ├── 02-validation/
│   ├── 03-schema-validation/
│   ├── 04-complex-fields/
│   ├── 05-dynamic-forms/
│   ├── 06-states-ux/
│   ├── 07-async/
│   └── 08-advanced/
├── shared/              # Shared components and utilities
│   ├── components/
│   └── types/
├── App.tsx              # Main component
└── main.tsx             # Entry point
```

## 🎯 How to Work with Exercises

1. Open the folder of the desired level
2. Read `README.md` with theory
3. Study `task.md` file with the task
4. Open `Template.tsx` and follow TODO comments
5. Write code independently
6. Check your solution against **`Cheat.tsx`**
7. Verify the result in the browser

## 📁 Each Level Structure

```
src/exercises/XX-level/
├── README.md         # Detailed theory with examples
├── task.md           # Task description
├── Template.tsx      # Template with TODO for independent solving
├── Solution.tsx      # Solution for integration into the app
├── Cheat.tsx         # 📋 Sample correct solution (for checking)
├── index.ts          # Exports
└── *Exercise.tsx     # Main level component
```

> 💡 **Tip:** First try to solve the task independently in `Template.tsx`, then check `Cheat.tsx` for verification or if you're stuck.

## 🛠 Technologies

- **React** 18.3
- **TypeScript** 5.6
- **React Hook Form** 7.54
- **Zod** 3.24
- **Yup** 1.6
- **Vite** 6.0
- **Axios** 1.7

## 📝 License

MIT
