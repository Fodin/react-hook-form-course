# Exercise 6.2: Reset and Default Values

## Goal

Learn to manage form values: set initial values, programmatically fill, and reset the form.

## Requirements

Create a profile form:

1. Fields: `username`, `email`, `role` (select)
2. "Fill" button — fills with test data
3. "Reset" button — returns to initial values
4. After submit, display the last submitted data

## Checklist

- [ ] Form with three fields: `username`, `email`, `role` (select)
- [ ] "Fill" button populates all fields with test data
- [ ] "Reset" button returns all fields to initial values
- [ ] Submitted data is displayed after submit
- [ ] isDirty updates correctly after filling and resetting

## How to verify

1. Click "Fill" — all fields should be populated with test data
2. Click "Reset" — all fields should return to empty/initial values
3. Fill the form and submit — submitted data should appear below the form
4. After reset, isDirty should be `false`
