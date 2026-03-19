# Exercise 6.3: Focus Management

## Goal

Learn to manage field focus when validation errors occur.

## Requirements

Create a form with validation:

1. Fields: `email`, `password`, `confirm`
2. On submit with errors, focus moves to the first field with an error
3. Display error messages below each field

## Checklist

- [ ] Form with three fields: `email`, `password`, `confirm`
- [ ] All fields are required
- [ ] On submit with errors, focus automatically moves to the first invalid field
- [ ] Error messages are displayed below their respective fields

## How to verify

1. Without filling any fields, click submit — focus should land on `email`
2. Fill `email`, click submit — focus should move to `password`
3. Fill all fields correctly and submit — the form should submit successfully
