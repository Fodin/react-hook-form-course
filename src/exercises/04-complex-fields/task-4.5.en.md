# Exercise 4.5: Date and Time

## Goal

Learn to work with date and time fields in react-hook-form.

## Requirements

1. `birthDate`: date field (date of birth)
2. `appointment`: datetime-local field (appointment scheduling)
3. Date of birth: user must be older than 18 years
4. Appointment: cannot be in the past

```typescript
interface DateForm {
  birthDate: string
  appointment: string
}
```

## Checklist

- [ ] Date of birth field is displayed
- [ ] Appointment date-time field is displayed
- [ ] Birth date less than 18 years ago triggers an error
- [ ] Appointment date in the past triggers an error
- [ ] Valid values pass validation

## How to verify

1. Enter a birth date 5 years ago -- "under 18" error appears
2. Enter a birth date 20 years ago -- error disappears
3. Enter an appointment date in the past -- error appears
4. Enter an appointment date in the future -- error disappears
5. Submit the form -- data is logged to the console
