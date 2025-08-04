# academyland

academyland is a modern educational platform built with Nuxt3, providing a robust foundation for online courses, authentication, shopping cart, and more. This project leverages a modular architecture, reusable components, and modern frontend technologies for scalability and maintainability.

## Project Overview

This application is designed as a course/learning platform, featuring:
- Course listing and detail pages
- User authentication (login, registration)
- Shopping cart for course purchases
- Dynamic form validation with generator support
- Responsive, modern UI with TailwindCSS and DaisyUI
- Modular and composable code structure

## Features
- **Authentication**: Login, registration, token management, and user identity using Pinia and composables.
- **Course Management**: List, view, and interact with courses, including chapters, requirements, and comments.
- **Cart System**: Add/remove courses to/from cart, sync with storage, and checkout logic.
- **Form Validation**: Uses Vee-Validate and Yup, with Plop-based code generation for custom validators.
- **Reusable Components**: Modular components for UI elements, forms, and layout.
- **API Integration**: Centralized API configuration and fetch logic with error handling and token refresh.
- **UI/UX**: TailwindCSS, DaisyUI, and GSAP for animations and modern design.

## Technologies Used
- [Nuxt3](https://nuxt.com/) (Vue 3)
- [Pinia](https://pinia.vuejs.org/) (State management)
- [Vee-Validate](https://vee-validate.logaretm.com/) & [Yup](https://github.com/jquense/yup) (Form validation)
- [TailwindCSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) (Styling)
- [GSAP](https://greensock.com/gsap/) (Animations)
- [Three.js](https://threejs.org/) (3D features)
- [Plop](https://plopjs.com/) (Code generation)

## Project Structure
```
academyland/
├── components/      # Reusable Vue components (Course, Auth, UI, etc.)
├── composables/     # Custom composable logic (auth, cart, course, api)
├── pages/           # Application pages (index, auth, cart, courses, etc.)
├── plugins/         # Nuxt plugins (auth, cart, translation, validation)
├── public/          # Static assets
├── assets/          # Images, fonts, styles
├── store/           # Pinia stores
├── plop-templates/  # Code generation templates (validator)
├── helpers/         # Helper utilities
├── nuxt.config.ts   # Nuxt configuration
└── ...
```

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development

Start the development server (default: `http://localhost:3000`):

```bash
# npm
npm run dev
# pnpm
pnpm dev
# yarn
yarn dev
# bun
bun run dev
```

## Production

Build for production:

```bash
# npm
npm run build
# pnpm
pnpm build
# yarn
yarn build
# bun
bun run build
```

Preview production build locally:

```bash
# npm
npm run preview
# pnpm
pnpm preview
# yarn
yarn preview
# bun
bun run preview
```

## Code Generation

This project uses Plop for generating custom validators:

```bash
yarn g # or npm run g
```
Follow the prompts to generate new validator modules.

## License

This project is for educational/demo purposes. Please add your own license as needed.
