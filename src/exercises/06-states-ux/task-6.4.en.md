# Exercise 6.4: Accessibility (ARIA)

## Goal

Learn to create accessible forms with proper ARIA attributes.

## Requirements

Create a form with ARIA attributes:

1. `aria-invalid` for fields with errors
2. `aria-describedby` to link fields with error messages
3. `role="alert"` for error messages
4. `noValidate` on the `<form>` element

## Checklist

- [ ] Fields receive `aria-invalid="true"` when there is an error
- [ ] Each field is linked to its error via `aria-describedby`
- [ ] Error messages have `role="alert"`
- [ ] The form has the `noValidate` attribute
- [ ] When there is no error, `aria-invalid` is not set or is `false`

## How to verify

1. Open DevTools and inspect field attributes before and after submit
2. Submit an empty form — fields with errors should have `aria-invalid="true"`
3. Verify that the error message `id` matches the field's `aria-describedby` value
4. Check that a screen reader announces errors (elements with `role="alert"`)
