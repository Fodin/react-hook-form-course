# Задание 6.5: Performance оптимизация

## Цель

Научиться оптимизировать производительность.

## Требования

Создайте форму с отслеживанием количества рендеров:

1. Поле text с watch
2. Счётчик рендеров формы
3. Покажите, как watch вызывает ре-рендеры

## Подсказка

```typescript
const [renderCount, setRenderCount] = useState(0)
useEffect(() => {
  setRenderCount(c => c + 1)
}, [values])
```
