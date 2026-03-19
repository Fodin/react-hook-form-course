# Exercise 2.4: Cross-field Validation

## Goal

Learn to validate multiple fields together.

## Requirements

Create a password change form:

1. `currentPassword` — current password (required)
2. `newPassword` — new password (minimum 8 characters)
3. `confirmPassword` — confirmation (must match newPassword)
4. `email` — for notification (required)

Add validation:

- `confirmPassword` must match `newPassword`
- `newPassword` must not match `currentPassword`

## Checklist

- [ ] All 4 fields are present
- [ ] `confirmPassword` shows an error when it doesn't match `newPassword`
- [ ] `newPassword` shows an error when it matches `currentPassword`
- [ ] Form does not submit with invalid data

## How to verify

1. Enter different values in `newPassword` and `confirmPassword` — error
2. Enter the same value in `currentPassword` and `newPassword` — error
3. Fill everything correctly (different passwords, matching confirmation) — form submits
