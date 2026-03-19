# 📝 Задания Уровня 4

## Как работать с заданиями

1. **Откройте `Template.tsx`** — там находятся все задания уровня
2. **Найдите нужное задание** по номеру (например, `Task4_1_Template`)
3. **Выполняйте TODO-комментарии** прямо в файле
4. **Проверяйте результат** в браузере
5. **Сравните с решением** в `Solution.tsx` после выполнения

---

## Задание 4.1: Controller для кастомных компонентов

### Цель

Научиться интегрировать кастомные компоненты с react-hook-form через Controller.

### Требования

1. Создайте кастомный компонент Select
2. Используйте `Controller` для интеграции с react-hook-form
3. Поле `country` должно быть обязательным
4. Отображайте ошибку валидации

### Интерфейс данных

```typescript
interface CountryForm {
  country: string
}
```

### Подсказка

```typescript
<Controller
  name="country"
  control={control}
  render={({ field }) => <Select {...field} />}
/>
```

---

## Задание 4.2: Radio и Select

### Цель

Научиться работать с radio и select полями.

### Требования

1. `gender`: radio кнопки (male, female, other)
2. `country`: select (USA, Russia, Germany, France)
3. Оба поля обязательные
4. Отображайте выбранное значение

### Интерфейс данных

```typescript
interface ProfileForm {
  gender: 'male' | 'female' | 'other'
  country: 'USA' | 'Russia' | 'Germany' | 'France'
}
```

---

## Задание 4.3: Checkbox

### Цель

Научиться работать с одиночными и множественными checkbox.

### Требования

1. `agree`: одиночный checkbox "Согласен с правилами" (обязательное)
2. `skills`: множественный выбор (React, Vue, Angular, Svelte)
3. Минимум один навык должен быть выбран

### Интерфейс данных

```typescript
interface SkillsForm {
  agree: boolean
  skills: string[]
}
```

---

## Задание 4.4: File Upload

### Цель

Научиться загружать файлы с валидацией.

### Требования

1. Тип файла: только изображения (jpeg, png, gif)
2. Размер: максимум 2MB
3. Предпросмотр изображения после выбора
4. Отображайте ошибку при неверном формате/размере

### Интерфейс данных

```typescript
interface AvatarForm {
  avatar: FileList
}
```

### Подсказка

```typescript
validate: {
  type: v => v[0]?.type.startsWith('image/'),
  size: v => v[0]?.size < 2 * 1024 * 1024
}
```

---

## Задание 4.5: Дата и время

### Цель

Научиться работать с полями даты и времени.

### Требования

1. `birthDate`: date (дата рождения)
2. `appointment`: datetime-local (запись на встречу)
3. Дата рождения: пользователь должен быть старше 18 лет
4. Встреча: не может быть в прошлом

### Интерфейс данных

```typescript
interface DateForm {
  birthDate: string
  appointment: string
}
```

---

## ✅ Чек-лист проверки

- [ ] Controller интегрирован с кастомным компонентом
- [ ] Radio кнопки работают корректно
- [ ] Select отображает и возвращает значение
- [ ] Checkbox одиночный и множественный работают
- [ ] File upload с валидацией типа и размера
- [ ] Предпросмотр изображения реализован
- [ ] Поля даты и времени работают
- [ ] Валидация возраста и будущей даты

---

## 📚 Дополнительные материалы

- [Controller документация](https://react-hook-form.com/docs/useform/controller)
- [useForm документация](https://react-hook-form.com/docs/useform)
