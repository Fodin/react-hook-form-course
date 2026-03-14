# Exercise 3.4: Custom Messages and refine

## Goal
Learn to create custom error messages.

## Requirements
Create a password change form with Zod/Yup:

1. `currentPassword` — current password
2. `newPassword` — new password (minimum 8 characters, uppercase, digit)
3. `confirmPassword` — confirmation

Use `.refine()` for:
- Checking that passwords match
- Checking that new password differs from current
