# Exercise 5.3: Dependent Fields

## Goal

Learn to create dependent fields.

## Requirements

Create an address selection form:

1. Country selection (Russia, USA, Germany)
2. City selection (city list depends on country)
3. When country changes, city is reset
4. Validate both fields

## Data

```typescript
const citiesByCountry = {
  ru: ['Moscow', 'Saint Petersburg', 'Kazan'],
  us: ['New York', 'Los Angeles', 'Chicago'],
  de: ['Berlin', 'Munich', 'Hamburg'],
}
```
