# Exercise 2.2: Pattern Validation

## Goal

Learn to use RegExp patterns to validate form fields.

## Requirements

Create a form with fields:

1. `phone` — Russian phone number (+7 XXX XXX-XX-XX)
2. `website` — URL (https://...)
3. `hexColor` — HEX color (#FFF or #FFFFFF)
4. `slug` — URL-friendly string (Latin only, digits, hyphen)

Use `pattern` to validate each field.

## Hint

```typescript
const patterns = {
  phone: /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/,
  url: /^https?:\/\/.+\..+$/,
  hex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
}
```

## Checklist

- [ ] All 4 fields are present
- [ ] `phone` accepts format +7 XXX XXX-XX-XX
- [ ] `website` accepts only URLs with http/https
- [ ] `hexColor` accepts #FFF and #FFFFFF, rejects #GGG
- [ ] `slug` accepts `my-slug-123`, rejects `My Slug!`
- [ ] Errors are displayed for invalid input

## How to verify

1. Enter `+7 999 123-45-67` in phone — ok
2. Enter `12345` in phone — error
3. Enter `https://example.com` in website — ok
4. Enter `not-a-url` in website — error
5. Enter `#ff00aa` in hexColor — ok
6. Enter `#xyz` in hexColor — error
7. Enter `my-cool-slug` in slug — ok
