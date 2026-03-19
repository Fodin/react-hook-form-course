# Exercise 1.4: formState — Errors and Validity

## Goal

Learn to display form state.

## Requirements

1. Create a form with `email` and `password` fields
2. Display:
   - Form validity indicator (green/red)
   - Error counter: "Errors: 0"
   - Submit status: "Submitting..." during submit
   - Dirty status: "Form is dirty" if fields were changed
3. Use `formState` to get the state

## Checklist

- [ ] `email` and `password` fields are registered with validation
- [ ] Validity indicator changes color (green/red)
- [ ] Error counter shows the current number of errors
- [ ] "Submitting..." status appears during submission
- [ ] Dirty status correctly tracks field changes

## How to verify

1. Open the form — the indicator should be red (form is invalid)
2. Type in the fields — dirty status should show "Form is dirty"
3. Fill fields with incorrect data — the error counter should update
4. Fill all fields correctly — the indicator should turn green
5. Submit the form — "Submitting..." status should briefly appear
