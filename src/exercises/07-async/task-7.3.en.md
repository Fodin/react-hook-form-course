# Exercise 7.3: Submit with Loading/Error

## Goal

Learn to handle form submission state: loading, errors, and success.

## Requirements

Create a feedback form:

1. Fields: name, email, message
2. Loading state during submit
3. Server error handling
4. Success message
5. Form reset after successful submit

## Hint

Submission simulation with possible error:

```typescript
const submitFeedback = async (data: FeedbackForm) => {
  await new Promise(r => setTimeout(r, 1500))
  if (Math.random() > 0.7) throw new Error('Server error')
  return { success: true }
}
```

## Checklist

- [ ] Form contains name, email, message fields
- [ ] Button shows loading state during submission
- [ ] Fields are disabled during submission
- [ ] Server error message is displayed on failure
- [ ] On success, a message is shown and the form resets

## How to verify

1. Fill in all fields and submit the form
2. During submission, the button should show loading, fields should be disabled
3. Submit the form several times — on error, an error message should appear
4. On successful submission, the form should reset and show a success message
