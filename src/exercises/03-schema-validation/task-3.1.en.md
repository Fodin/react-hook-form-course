# Exercise 3.1: Basic Validation with Zod

## Goal

Learn to use Zod schemas with React Hook Form.

## Requirements

Create a registration form with a Zod schema:

1. `email` — email, required
2. `password` — minimum 8 characters, required
3. `confirmPassword` — must match password
4. `age` — number from 18 to 120

Use `zodResolver` for integration with react-hook-form.

## Checklist

- [ ] Zod schema describes all 4 fields
- [ ] `zodResolver` is passed to `useForm`
- [ ] `confirmPassword` is checked against `password`
- [ ] Validation errors are displayed under the fields
- [ ] Form does not submit with invalid data

## How to verify

1. Submit an empty form — errors on required fields
2. Enter an invalid email — error
3. Enter a password shorter than 8 characters — error
4. Enter different values in `password` and `confirmPassword` — error
5. Enter `age` = 15 — error
6. Fill everything correctly — data appears in the console
