# Exercise 5.4: Wizard (Multi-step Form)

## Goal

Learn to create multi-step forms with step-by-step validation.

## Requirements

Create an order form in 3 steps:

1. **Step 1**: Name and Email
2. **Step 2**: Shipping Address
3. **Step 3**: Order Comment

Functionality:

- "Back" / "Next" / "Submit" buttons
- Validation before moving to next step
- Current step indicator

## Checklist

- [ ] First step is displayed with "Name" and "Email" fields
- [ ] "Next" button validates current step before proceeding
- [ ] "Back" button returns to previous step with data preserved
- [ ] Indicator shows current step (e.g., "Step 1 of 3")
- [ ] On the last step, "Submit" button submits all data
- [ ] Data from all steps is preserved during navigation

## How to verify

1. Open the form -- you see step 1 with "Name" and "Email" fields
2. Click "Next" without filling -- validation errors
3. Fill in and click "Next" -- transition to step 2
4. Click "Back" -- step 1 data is preserved
5. Complete all steps and click "Submit" -- all data is logged to the console
