# Exercise 8.2: Custom Hooks

## Goal

Learn to create reusable hooks for working with forms.

## Requirements

Create a `useFormPersist` hook for saving form to localStorage:

1. Hook takes form name and default values
2. Returns `{ stored, save, clear }`
3. Use the hook in an article form (title, content)

## Hint

Example hook API:

```typescript
const { stored, save, clear } = useFormPersist('article-form', {
  title: '',
  content: '',
})
```

## Checklist

- [ ] `useFormPersist` hook accepts a key and default values
- [ ] `stored` returns saved data or defaults
- [ ] `save` saves data to localStorage
- [ ] `clear` removes saved data
- [ ] Article form uses the hook to restore data

## How to verify

1. Enter text in the article form fields
2. Trigger save (e.g., via button or automatically)
3. Reload the page — data should be restored
4. Click "Clear" — data should be removed from localStorage
