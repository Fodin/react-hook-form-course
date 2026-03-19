# Exercise 4.1: Controller for Custom Components

## Goal

Learn to integrate custom components with react-hook-form via Controller.

## Requirements

1. Create a custom `Select` component
2. Use `Controller` for integration with react-hook-form
3. The `country` field must be required
4. Display validation error

```typescript
interface CountryForm {
  country: string
}
```

## Checklist

- [ ] `Select` component works as a controlled component
- [ ] `country` field is connected via `Controller`
- [ ] Submitting without selecting a country shows an error
- [ ] After selecting a country and submitting, data correctly reaches the form

## How to verify

1. Open the form -- country select field is displayed
2. Click "Submit" without selecting -- validation error appears
3. Select a country and submit -- data is logged to the console
