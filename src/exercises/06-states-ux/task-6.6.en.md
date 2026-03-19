# Exercise 6.6: setFocus, resetField, and getFieldState

## Goal

Learn to use advanced field management methods: programmatic focus, resetting individual fields, and reading field state.

## Requirements

Create a profile editing form:

1. Fields: `name`, `email`, `phone` (all required)
2. On mount — auto-focus the `name` field via `setFocus`
3. On failed submit — focus the first field with an error via `onInvalid` callback
4. A "Reset" button next to each field — resets that field via `resetField`
5. Below each field, display status via `getFieldState`:
   - "Modified" if `isDirty`
   - "Touched" if `isTouched`
6. Use `delayError: 500` for smooth error appearance

## Data interface

```typescript
interface ProfileForm {
  name: string
  email: string
  phone: string
}
```

## Checklist

- [ ] Form with three required fields: `name`, `email`, `phone`
- [ ] On load, focus is automatically on the `name` field
- [ ] On submit with errors, focus moves to the first invalid field
- [ ] "Reset" button next to each field resets only that field
- [ ] isDirty and isTouched statuses are displayed below each field
- [ ] Errors appear with a 500ms delay

## How to verify

1. Refresh the page — focus should be on the `name` field
2. Modify a field value — "Modified" status should appear
3. Click the "Reset" button for a field — its value and statuses should reset
4. Submit an empty form — focus moves to the first empty field, errors appear after ~500ms
