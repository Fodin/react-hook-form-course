# Exercise 2.2: Pattern Validation

## Goal
Learn to use RegExp patterns.

## Requirements
Create a form with fields:
1. `phone` — Russian phone number (+7 XXX XXX-XX-XX)
2. `website` — URL (https://...)
3. `hexColor` — HEX color (#FFF or #FFFFFF)
4. `slug` — URL-friendly string (Latin only, digits, hyphen)

Use `pattern` to validate each field.

## Hint with Patterns

```typescript
const patterns = {
  phone: /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/,
  url: /^https?:\/\/.+\..+$/,
  hex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
}
```
