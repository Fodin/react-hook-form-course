# Exercise 4.4: File Upload

## Goal

Learn to upload files with validation.

## Requirements

1. File type: images only (jpeg, png, gif)
2. Size: maximum 2MB
3. Image preview after selection
4. Display error for invalid format/size

## Data Interface

```typescript
interface AvatarForm {
  avatar: FileList
}
```

## Hint

```typescript
validate: {
  type: v => v[0]?.type.startsWith('image/'),
  size: v => v[0]?.size < 2 * 1024 * 1024
}
```
