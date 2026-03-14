# Exercise 4.3: Checkbox

## Goal
Learn to work with single and multiple checkboxes.

## Requirements
1. `agree`: single checkbox "I agree to the terms" (required)
2. `skills`: multiple selection (React, Vue, Angular, Svelte)
3. At least one skill must be selected

## Data Interface

```typescript
interface SkillsForm {
  agree: boolean
  skills: string[]
}
```
