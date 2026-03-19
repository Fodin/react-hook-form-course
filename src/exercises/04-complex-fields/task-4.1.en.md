# Exercise 4.1: Controller for Custom Components

## Goal

Learn to integrate custom components with react-hook-form via Controller.

## Requirements

1. Create a custom Select component
2. Use `Controller` for integration with react-hook-form
3. The `country` field must be required
4. Display validation error

## Data Interface

```typescript
interface CountryForm {
  country: string
}
```

## Hint

```typescript
<Controller
  name="country"
  control={control}
  render={({ field }) => <Select {...field} />}
/>
```
