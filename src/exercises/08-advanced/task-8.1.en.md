# Exercise 8.1: UI Library Integration

## Goal

Learn to integrate React Hook Form with custom UI components.

## Requirements

Create a form with custom components:

1. TextField — wrapper over input with label and error
2. Button — button with loading state
3. Use Controller for integration
4. Form contains fields: name, email, password

## Checklist

- [ ] TextField component accepts label, error, and passes props to input
- [ ] Button component displays loading state
- [ ] All fields are connected via Controller
- [ ] Validation errors are shown inside TextField
- [ ] Form submits correctly

## How to verify

1. Leave fields empty and submit — errors should appear under each field
2. Fill all fields correctly and submit — button should show loading
3. Verify that TextField and Button components are reusable
