# Exercise 6.1: Dirty / Touched States

## Goal

Learn to track form field states: whether a field was modified (dirty) and whether it received focus (touched).

## Requirements

Create a form with `name` and `email` fields:

1. Display Dirty status for each field (✅/❌)
2. Display Touched status for each field (✅/❌)
3. Display overall form isDirty status

## Checklist

- [ ] Form with two fields: `name` and `email`
- [ ] Dirty status displayed next to each field
- [ ] Touched status displayed next to each field
- [ ] Overall isDirty status displayed separately
- [ ] Dirty status changes to ✅ after modifying a field value
- [ ] Touched status changes to ✅ after focusing and leaving a field

## How to verify

1. Open the form — all statuses should be ❌
2. Click into `name` and blur — Touched for `name` should become ✅
3. Type into `email` — Dirty for `email` and overall isDirty should become ✅
4. Clear `email` back to its initial value — Dirty for `email` should return to ❌
