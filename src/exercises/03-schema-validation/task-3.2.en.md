# Exercise 3.2: Validation with Yup

## Goal

Learn to use Yup schemas with React Hook Form.

## Requirements

Rewrite the form from exercise 3.1 using Yup instead of Zod:

1. `email` — email, required
2. `password` — minimum 8 characters, required
3. `confirmPassword` — must match password
4. `age` — number from 18 to 120

Use `yupResolver` for integration with react-hook-form.

Compare the experience of using both libraries.

## Checklist

- [ ] Yup schema describes all 4 fields
- [ ] `yupResolver` is passed to `useForm`
- [ ] `confirmPassword` is checked against `password`
- [ ] Validation errors are displayed under the fields
- [ ] Form behavior is identical to exercise 3.1

## How to verify

1. Repeat all checks from exercise 3.1
2. Make sure errors and behavior match
3. Note the difference in Yup vs Zod syntax
