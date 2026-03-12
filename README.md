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
