# Exercise 5.3: Dependent Fields

## Goal

Learn to create dependent fields where one field's value affects another.

## Requirements

Create an address selection form:

1. Country selection (Russia, USA, Germany)
2. City selection (city list depends on country)
3. When country changes, city is reset
4. Both fields are required

```typescript
const citiesByCountry = {
  ru: ['Moscow', 'Saint Petersburg', 'Kazan'],
  us: ['New York', 'Los Angeles', 'Chicago'],
  de: ['Berlin', 'Munich', 'Hamburg'],
}
```

## Checklist

- [ ] Country select is displayed
- [ ] City select is displayed
- [ ] City list changes when country changes
- [ ] Selected city resets when country changes
- [ ] Both fields pass required validation

## How to verify

1. Select "Russia" -- cities show Moscow, Saint Petersburg, Kazan
2. Select "Moscow", then switch country to "USA" -- city resets, list shows New York, Los Angeles, Chicago
3. Submit without selecting a city -- validation error
4. Select a city and submit -- data is logged to the console
