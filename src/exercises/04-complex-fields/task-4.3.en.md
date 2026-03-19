# Exercise 4.3: Checkbox

## Goal

Learn to work with single and multiple checkboxes in react-hook-form.

## Requirements

1. `agree`: single checkbox "I agree to the terms" (required)
2. `skills`: multiple selection (React, Vue, Angular, Svelte)
3. At least one skill must be selected

```typescript
interface SkillsForm {
  agree: boolean
  skills: string[]
}
```

## Checklist

- [ ] Single "I agree to the terms" checkbox is displayed
- [ ] Four skill checkboxes are displayed
- [ ] Form does not submit without agreeing to terms
- [ ] Form does not submit without selecting at least one skill
- [ ] After filling all fields, data is correctly submitted

## How to verify

1. Click "Submit" without selecting anything -- errors on both fields
2. Check "I agree to the terms" -- error on that field disappears
3. Select one or more skills -- error disappears
4. Submit the form -- data is logged to the console
