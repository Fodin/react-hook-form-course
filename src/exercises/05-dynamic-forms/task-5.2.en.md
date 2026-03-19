# Exercise 5.2: Conditional Fields

## Goal

Learn to conditionally display and validate fields in react-hook-form.

## Requirements

Create a feedback form:

1. Select contact method: email / phone / telegram
2. Depending on selection, display the corresponding input field
3. Validation applies only to the visible field

## Checklist

- [ ] Contact method selection is displayed (radio or select)
- [ ] Selecting "email" shows an email field
- [ ] Selecting "phone" shows a phone field
- [ ] Selecting "telegram" shows a username field
- [ ] Validation works only for the currently visible field
- [ ] Hidden fields do not block form submission

## How to verify

1. Select "email" -- email field appears
2. Leave it empty and submit -- validation error
3. Switch to "phone" -- email field disappears, phone field appears
4. Fill in the phone and submit -- form submits without errors
