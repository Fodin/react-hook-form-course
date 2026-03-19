# Exercise 4.2: Radio and Select

## Goal

Learn to work with radio and select fields in react-hook-form.

## Requirements

1. `gender`: radio buttons (male, female, other)
2. `country`: select (USA, Russia, Germany, France)
3. Both fields are required
4. Display selected values after submission

```typescript
interface ProfileForm {
  gender: 'male' | 'female' | 'other'
  country: 'USA' | 'Russia' | 'Germany' | 'France'
}
```

## Checklist

- [ ] Three radio buttons for gender are displayed
- [ ] Select with four countries is displayed
- [ ] Submitting without filling shows errors for both fields
- [ ] After filling and submitting, values are correctly output

## How to verify

1. Open the form -- you see radio buttons and a select
2. Click "Submit" without selecting -- both fields show errors
3. Select gender and country, submit -- data is logged to the console
