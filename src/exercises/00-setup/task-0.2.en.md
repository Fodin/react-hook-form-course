# Task 0.2: Display Data on Page

## Goal

Add display of form data after submission.

## Requirements

1. Create state to store form data after submission
2. Display data below the form after successful submission
3. Add a "Clear" button to reset displayed data

## Hint

Use `useState` to store submitted data:

```typescript
const [submittedData, setSubmittedData] = useState<LoginForm | null>(null)
```

## Checklist

- [ ] State for submitted data is created
- [ ] Data is displayed after submission
- [ ] Clear button resets displayed data

## How to verify

1. Fill out the form and click "Login"
2. Verify the data appears below the form
3. Click "Clear" — the data should disappear
