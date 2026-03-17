# Exercise 7.1: Async Validation

## Goal
Learn to perform async validation.

## Requirements
Create a registration form:
1. Username field with server check (simulation)
2. Email field with format validation
3. On username blur — check availability
4. Display status: "Checking..." / "✅ Available" / "❌ Taken"

## API Simulation

```typescript
const checkUsername = async (username: string): Promise<boolean> => {
  await new Promise(r => setTimeout(r, 500))
  return !['admin', 'user', 'test'].includes(username.toLowerCase())
}
```
