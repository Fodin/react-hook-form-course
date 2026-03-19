# Exercise 5.1: useFieldArray

## Goal

Learn to work with dynamic field arrays.

## Requirements

Create a form for adding multiple email addresses:

1. Initially one email field
2. "+ Add" button adds a new field
3. "✕" button removes a specific field
4. Validation: at least one email, valid email format

## Interface

```typescript
interface EmailsForm {
  emails: { value: string }[]
}
```
