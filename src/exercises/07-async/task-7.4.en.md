# Exercise 7.4: Debounce for Auto-save

## Goal

Learn to implement form auto-save with debounce.

## Requirements

Create a draft form:

1. Fields: subject, body
2. Auto-save 1 second after last change
3. "Saved" indicator after saving
4. Save to localStorage

## Hint

Simple debounce implementation:

```typescript
const debounce = (fn: Function, ms: number) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}
```

## Checklist

- [ ] Form contains subject and body fields
- [ ] On input, data is saved to localStorage 1 second after the last change
- [ ] "Saved" indicator is displayed after saving
- [ ] On page reload, data is restored from localStorage

## How to verify

1. Enter text in any field — after 1 second, a "Saved" indicator should appear
2. Type quickly — saving should only happen after a 1-second pause
3. Reload the page — data should be restored
4. Check localStorage in DevTools — data should be there
