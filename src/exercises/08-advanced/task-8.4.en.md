# Exercise 8.4: localStorage Persistence

## Goal

Learn to save and restore form data in localStorage.

## Requirements

Create an email draft form:

1. Fields: subject, body
2. Auto-save on change
3. Restore on load
4. Clear after submit

## Checklist

- [ ] Form contains subject and body fields
- [ ] On field change, data is automatically saved to localStorage
- [ ] On page load, data is restored from localStorage
- [ ] After successful submission, localStorage is cleared
- [ ] Form fields reset after submission

## How to verify

1. Enter text in the subject and body fields
2. Reload the page — data should be restored
3. Submit the form — localStorage data should be cleared
4. Reload again — fields should be empty
