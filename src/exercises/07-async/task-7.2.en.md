# Exercise 7.2: Data Loading (Edit Mode)

## Goal

Learn to load data from a server and populate a form for editing.

## Requirements

Create a profile edit form:

1. On load, data is fetched from server (simulation)
2. Form is filled with loaded data
3. "Save" button is active only when there are changes
4. Display loading state

## Hint

Profile data loading simulation:

```typescript
const fetchProfile = async () => {
  await new Promise(r => setTimeout(r, 1000))
  return { name: 'John Doe', email: 'john@example.com', bio: 'Developer' }
}
```

## Checklist

- [ ] Loading state is shown when the form opens
- [ ] After loading, fields are populated with server data
- [ ] "Save" button is disabled until changes are made
- [ ] After changing any field, "Save" button becomes active
- [ ] Form submits correctly with changed data

## How to verify

1. Open the form — a loading state (spinner/skeleton) should appear
2. Wait for loading — fields should be populated
3. "Save" button should be disabled
4. Change any field value — the button should become active
5. Click "Save" — the form should submit
