# Exercise 8.5: Final Project

## Goal

Apply all learned techniques in a comprehensive form.

## Requirements

Create a 3-step registration form:

**Step 1: Account**

- Email (validation + async check)
- Password (minimum 8 characters)
- Confirm password

**Step 2: Profile**

- First name, Last name
- Avatar (file upload with preview)

**Step 3: Settings**

- Newsletter (checkbox)
- Notifications (checkbox)

Additional functionality:

- Navigation between steps
- Validation before transitioning to the next step
- Data persistence between steps
- Final preview of all data before submission

## Checklist

- [ ] Form is split into 3 steps with navigation
- [ ] Email passes async validation
- [ ] Passwords match
- [ ] Avatar upload with preview works
- [ ] Validation triggers on next step transition
- [ ] Data is preserved when switching between steps
- [ ] Final screen displays all entered data

## How to verify

1. Try navigating to step 2 without filling step 1 — errors should appear
2. Fill step 1, navigate to step 2, go back — step 1 data is preserved
3. Upload an avatar — preview should be displayed
4. Fill all steps and check the final data preview
5. Submit the form — all data should be correct
