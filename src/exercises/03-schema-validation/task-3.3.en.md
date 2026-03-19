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
