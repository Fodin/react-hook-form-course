# Exercise 8.3: FormContext

## Goal

Learn to split a form into subcomponents using FormContext.

## Requirements

Create a multi-step form with FormContext:

1. PersonalStep — fields firstName, lastName
2. ContactStep — fields email, phone
3. Common FormProvider for all steps
4. Navigation between steps

## Checklist

- [ ] FormProvider wraps all form steps
- [ ] PersonalStep accesses the form via context
- [ ] ContactStep accesses the form via context
- [ ] "Back" / "Next" navigation switches steps
- [ ] Data is preserved when switching between steps
- [ ] On the last step, the form submits with all data

## How to verify

1. Fill in fields on the first step and navigate to the second
2. Go back — first step data should be preserved
3. Fill in the second step and submit — all data should be in the result
