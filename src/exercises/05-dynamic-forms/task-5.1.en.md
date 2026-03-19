# Exercise 5.1: useFieldArray

## Goal

Learn to work with dynamic field arrays in react-hook-form.

## Requirements

Create a form for adding multiple email addresses:

1. Initially one email field
2. "+ Add" button adds a new field
3. "✕" button removes a specific field
4. Validation: at least one email, valid email format

```typescript
interface EmailsForm {
  emails: { value: string }[]
}
```

## Checklist

- [ ] On open, one email field is displayed
- [ ] "+ Add" button adds a new field
- [ ] "✕" button removes a field
- [ ] Cannot remove the last remaining field (or form won't submit without fields)
- [ ] Invalid email shows an error
- [ ] Empty field shows an error

## How to verify

1. Open the form -- you see one email field
2. Click "+ Add" several times -- new fields appear
3. Remove a field with "✕" -- the field disappears
4. Enter an invalid email -- error is displayed
5. Fill all fields with valid emails and submit -- data is logged to the console
