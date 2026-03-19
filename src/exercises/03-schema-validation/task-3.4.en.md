# Exercise 3.4: Custom Messages and refine

## Goal

Learn to create custom error messages and use `.refine()` for complex checks.

## Requirements

Create a password change form with Zod/Yup:

1. `currentPassword` — current password (required)
2. `newPassword` — new password (minimum 8 characters, uppercase letter, digit)
3. `confirmPassword` — confirmation

Use `.refine()` for:

- Checking that `confirmPassword` matches `newPassword`
- Checking that `newPassword` differs from `currentPassword`

All errors should have clear custom messages.

## Checklist

- [ ] All 3 fields are present
- [ ] `.refine()` is used for cross-field checks
- [ ] Error messages are custom and clear
- [ ] Errors are attached to the correct fields (not the form as a whole)

## How to verify

1. Enter different values in `newPassword` and `confirmPassword` — error with a clear message
2. Enter the same value in `currentPassword` and `newPassword` — error
3. Enter a weak `newPassword` (no digit or uppercase) — error
4. Fill everything correctly — form submits
