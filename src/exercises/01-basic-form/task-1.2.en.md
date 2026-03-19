# Exercise 1.2: Tracking Values with watch

## Goal

Learn to use `watch` for reactive UI updates.

## Requirements

1. Create a form with `username` and `password` fields
2. Display in real time:
   - Username length
   - Password "strength" (weak/medium/strong based on length)
3. Use `watch` to track changes

## Checklist

- [ ] `username` and `password` fields are registered
- [ ] Username length updates on input
- [ ] Password strength changes based on length
- [ ] UI updates in real time without form submission

## How to verify

1. Type a username — the length should display below the field
2. Enter a short password (1-5 characters) — should show "Weak"
3. Enter a medium password (6-9 characters) — should show "Medium"
4. Enter a long password (10+ characters) — should show "Strong"
