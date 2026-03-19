# Exercise 2.1: Built-in Validation

## Goal

Learn to use built-in validation rules.

## Requirements

Create a registration form with validation:

1. `username` — 3-20 characters, required
2. `email` — email format, required
3. `age` — from 18 to 120, required
4. `password` — minimum 6 characters, required

Display errors under each field.

## Checklist

- [ ] All 4 fields are present and required
- [ ] `username` rejects fewer than 3 or more than 20 characters
- [ ] `email` is validated as email
- [ ] `age` accepts only values 18-120
- [ ] `password` requires minimum 6 characters
- [ ] Errors are displayed under the corresponding fields

## How to verify

1. Click Submit with an empty form — all fields should show errors
2. Enter a `username` with 2 characters — error
3. Enter an invalid email (no @) — error
4. Enter `age` = 17 — error, `age` = 25 — ok
5. Enter a password with 5 characters — error
6. Fill all fields correctly and submit — data appears in the console
