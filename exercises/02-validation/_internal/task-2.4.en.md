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
