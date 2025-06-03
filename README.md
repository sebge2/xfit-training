# Xfit Training

A web application for CrossFit training and workout tracking.

## Features

- Track and manage your workouts
- Progressive Web App (PWA) support
- Responsive design for mobile and desktop

## Development

### Setup

```bash
# Install dependencies
npm install
```

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally
- `npm run create-icon` - Convert the SVG icon to PNG format for PWA

### Icon Generation

The project includes a script to convert the SVG icon to PNG format for use in the PWA manifest and as the Apple touch icon. To generate the icon:

```bash
npm run create-icon
```

See the [icon conversion documentation](scripts/README.md) for more details.
