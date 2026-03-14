# Exercise 4.2: Radio and Select

## Goal
Learn to work with radio and select fields.

## Requirements
1. `gender`: radio buttons (male, female, other)
2. `country`: select (USA, Russia, Germany, France)
3. Both fields are required
4. Display the selected value

## Data Interface

```typescript
interface ProfileForm {
  gender: 'male' | 'female' | 'other'
  country: 'USA' | 'Russia' | 'Germany' | 'France'
}
```
