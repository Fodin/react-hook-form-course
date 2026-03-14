# Exercise 4.5: Date and Time

## Goal
Learn to work with date and time fields.

## Requirements
1. `birthDate`: date (date of birth)
2. `appointment`: datetime-local (appointment scheduling)
3. Date of birth: user must be older than 18 years
4. Appointment: cannot be in the past

## Data Interface

```typescript
interface DateForm {
  birthDate: string
  appointment: string
}
```
