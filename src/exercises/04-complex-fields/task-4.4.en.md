# Exercise 4.4: File Upload

## Goal

Learn to upload files with validation in react-hook-form.

## Requirements

1. File type: images only (jpeg, png, gif)
2. Size: maximum 2MB
3. Image preview after selection
4. Display error for invalid format or size

```typescript
interface AvatarForm {
  avatar: FileList
}
```

## Checklist

- [ ] File upload field is displayed
- [ ] Selecting an image shows a preview
- [ ] Invalid format file (e.g., .txt) triggers an error
- [ ] File larger than 2MB triggers an error
- [ ] Valid image passes validation

## How to verify

1. Select a PNG/JPEG file under 2MB -- preview appears
2. Select a .txt file -- format error is displayed
3. Select an image over 2MB -- size error is displayed
4. Submit the form with a valid file -- data is logged to the console
