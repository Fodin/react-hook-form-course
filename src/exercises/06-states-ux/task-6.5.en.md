# Exercise 6.5: Performance Optimization

## Goal

Understand how `watch` affects component re-renders and learn to track render count.

## Requirements

Create a form with render count tracking:

1. A text field subscribed via `watch`
2. A render counter for the form component
3. Show how `watch` causes re-renders on every value change

## Hint

```typescript
const renderCount = useRef(0)
renderCount.current++
```

## Checklist

- [ ] A text field whose value is tracked via `watch`
- [ ] Render counter displayed on screen
- [ ] Counter increments with every keystroke
- [ ] The effect of `watch` on re-render count is clearly visible

## How to verify

1. Open the form — the render counter should show an initial value
2. Type into the field — the counter should increment with each character
3. Verify the field value is displayed in real time (result of `watch`)
