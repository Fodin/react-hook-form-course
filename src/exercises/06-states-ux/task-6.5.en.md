# Exercise 6.5: Performance Optimization

## Goal
Learn to optimize performance.

## Requirements
Create a form with render count tracking:
1. Text field with watch
2. Form render counter
3. Show how watch causes re-renders

## Hint

```typescript
const [renderCount, setRenderCount] = useState(0)
useEffect(() => {
  setRenderCount(c => c + 1)
}, [values])
```
