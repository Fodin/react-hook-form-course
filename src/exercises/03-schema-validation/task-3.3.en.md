# Exercise 3.3: Complex Schemas

## Goal

Learn to create complex schemas with objects, arrays, and enums.

## Requirements

Create a user profile form:

1. **Personal Information** (object):
   - firstName: string, required
   - lastName: string, required
   - age: number, 18+

2. **Contacts** (array of objects):
   - type: 'email' | 'phone' | 'telegram'
   - value: string, required

3. **Skills** (array of strings, minimum 1):
   - At least one skill

4. **Role** (enum):
   - 'developer' | 'designer' | 'manager'

5. **About** (optional):
   - bio: string, maximum 500 characters

## Checklist

- [ ] Schema contains nested objects and arrays
- [ ] All required fields are validated
- [ ] Contacts array supports adding/removing items
- [ ] Skills require at least one entry
- [ ] Role accepts only allowed values
- [ ] Bio is limited to 500 characters

## How to verify

1. Submit an empty form — errors on required fields
2. Add a contact without a value — error
3. Try to submit without skills — error
4. Enter bio longer than 500 characters — error
5. Fill everything correctly — form submits
