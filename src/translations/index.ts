export const translations = {
  ru: {
    // Общие
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.close': 'Закрыть',
    
    // Навигация
    'nav.title': '📚 Уровни',
    'nav.levels': 'Уровни',
    'nav.level': 'Уровень',
    'nav.setup': 'Setup',
    'nav.basics': 'Основы',
    'nav.validation': 'Валидация',
    'nav.schemas': 'Схемы',
    'nav.complex': 'Сложные поля',
    'nav.dynamic': 'Динамические формы',
    'nav.ux': 'UX',
    'nav.async': 'Асинхронность',
    'nav.advanced': 'Продвинутые',
    
    // Задания
    'task.title': 'Задание',
    'task.description': '📋 Описание задания',
    'task.yourForm': '🎯 Ваша форма:',
    'task.placeholder': 'Ваша форма появится здесь',
    'task.openFile': 'Откройте файл',
    'task.andComplete': 'и выполните задание',
    'task.formReady': '✅ Форма реализована!',
    
    // Теория
    'theory.title': '📚 Теория',
    'theory.loading': 'Загрузка теории...',
    
    // Решение
    'solution.show': '💡 Показать решение',
    'solution.hide': '🙈 Скрыть решение',
    
    // Тема
    'theme.light': 'Светлая',
    'theme.dark': 'Тёмная',
    'theme.toggle': 'Переключить тему',
    
    // Язык
    'language.select': 'Выбрать язык',
    'language.ru': 'Русский',
    'language.en': 'English',
    
    // Прокрутка
    'scroll.top': '↑ Наверх',
    
    // Уровни (описания)
    'level.0.desc': 'Настройка и первая форма',
    'level.1.desc': 'useForm, register, handleSubmit',
    'level.2.desc': 'Built-in и custom валидация',
    'level.3.desc': 'Zod и Yup валидация',
    'level.4.desc': 'Controller, file upload',
    'level.5.desc': 'useFieldArray, wizard',
    'level.6.desc': 'Dirty, reset, a11y, performance',
    'level.7.desc': 'Async validation, API',
    'level.8.desc': 'Интеграции и финальный проект',
  },
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.close': 'Close',
    
    // Navigation
    'nav.title': '📚 Levels',
    'nav.level': 'Level',
    'nav.setup': 'Setup',
    'nav.basics': 'Basics',
    'nav.validation': 'Validation',
    'nav.schemas': 'Schemas',
    'nav.complex': 'Complex Fields',
    'nav.dynamic': 'Dynamic Forms',
    'nav.ux': 'UX',
    'nav.async': 'Async',
    'nav.advanced': 'Advanced',
    
    // Tasks
    'task.title': 'Task',
    'task.description': '📋 Task Description',
    'task.yourForm': '🎯 Your Form:',
    'task.placeholder': 'Your form will appear here',
    'task.openFile': 'Open file',
    'task.andComplete': 'and complete the task',
    'task.formReady': '✅ Form implemented!',
    
    // Theory
    'theory.title': '📚 Theory',
    'theory.loading': 'Loading theory...',
    
    // Solution
    'solution.show': '💡 Show Solution',
    'solution.hide': '🙈 Hide Solution',
    
    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.toggle': 'Toggle theme',
    
    // Language
    'language.select': 'Select language',
    'language.ru': 'Русский',
    'language.en': 'English',
    
    // Scroll
    'scroll.top': '↑ To Top',
    
    // Levels (descriptions)
    'level.0.desc': 'Setup and first form',
    'level.1.desc': 'useForm, register, handleSubmit',
    'level.2.desc': 'Built-in and custom validation',
    'level.3.desc': 'Zod and Yup validation',
    'level.4.desc': 'Controller, file upload',
    'level.5.desc': 'useFieldArray, wizard',
    'level.6.desc': 'Dirty, reset, a11y, performance',
    'level.7.desc': 'Async validation, API',
    'level.8.desc': 'Integrations and final project',
  },
} as const

export type TranslationKey = keyof typeof translations.ru & keyof typeof translations.en
export type Language = 'ru' | 'en'
