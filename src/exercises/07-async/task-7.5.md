# Задание 7.5: Async defaultValues и isLoading

## Цель

Научиться загружать начальные данные формы асинхронно.

## Требования

Создайте форму редактирования пользователя:

1. Данные загружаются асинхронно через async `defaultValues`
2. Пока данные загружаются — показывать скелетон/спиннер (используйте `isLoading`)
3. Поля: `name`, `email`, `bio` (textarea)
4. Добавьте кнопку "Обновить данные" которая использует `values` для синхронизации с внешним state
5. Валидация: все поля обязательные, email должен быть валидным

## Интерфейс данных

```typescript
interface UserForm {
  name: string
  email: string
  bio: string
}
```

## Подсказка

```typescript
// Имитация загрузки с сервера
const fetchUser = async (): Promise<UserForm> => {
  await new Promise(r => setTimeout(r, 1500))
  return { name: 'John Doe', email: 'john@example.com', bio: 'Разработчик' }
}

const { register, formState: { isLoading } } = useForm<UserForm>({
  defaultValues: fetchUser,
})

if (isLoading) return <div>Загрузка...</div>
```
