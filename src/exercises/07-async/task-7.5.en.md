# Exercise 7.5: Async defaultValues and isLoading

## Goal

Learn to load initial form data asynchronously.

## Requirements

Create a user edit form:

1. Data is loaded asynchronously via async `defaultValues`
2. While data is loading — show a skeleton/spinner (use `isLoading`)
3. Fields: `name`, `email`, `bio` (textarea)
4. Add a "Refresh data" button that uses `values` for syncing with external state
5. Validation: all fields required, email must be valid

## Data interface

```typescript
interface UserForm {
  name: string
  email: string
  bio: string
}
```

## Hint

Server loading simulation:

```typescript
const fetchUser = async (): Promise<UserForm> => {
  await new Promise(r => setTimeout(r, 1500))
  return { name: 'John Doe', email: 'john@example.com', bio: 'Developer' }
}
```

## Checklist

- [ ] Skeleton/spinner is shown when the form opens
- [ ] After loading, fields are populated with data
- [ ] All fields are required — empty fields fail validation
- [ ] Email is validated by format
- [ ] "Refresh data" button updates the form with new data

## How to verify

1. Open the form — a skeleton/spinner should appear
2. After ~1.5 seconds, fields should be populated with data
3. Clear a field and try to submit — a validation error should appear
4. Click "Refresh data" — the form should update
