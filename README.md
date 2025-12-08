# Movies - Movie Browsing Application

A modern movie browsing application built with React + TypeScript, using The Movie Database (TMDB) API to fetch movie data.

## Demo Video

<video width="100%" controls>
  <source src="./public/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Or access directly: [Demo Video](./public/demo.mp4)

## Technology Stack

* **Frontend Framework**: React 18 + TypeScript
* **Build Tool**: Vite
* **Routing**: React Router v6
* **State Management**: Redux + Redux Thunk
* **Internationalization**: i18next + react-i18next
* **Styling**: SCSS Modules (No UI Framework)
* **HTTP Client**: Axios
* **API Data Source**: The Movie Database (TMDB) API

## Technical Approach

### 1. Architecture Design

* **Component-based Development**: Using functional components + Hooks to achieve highly reusable UI components
* **Modular Styling**: Using SCSS Modules for style isolation to avoid style conflicts
* **Type Safety**: Comprehensive use of TypeScript providing complete type checking and intelligent suggestions

### 2. Performance Optimization

* **Image Lazy Loading**: Using `loading="lazy"` and Intersection Observer for on-demand image loading
* **Infinite Scroll**: Using Intersection Observer API to automatically load more content when scrolling to the bottom
* **Code Splitting**: Leveraging Vite's automatic code splitting and dynamic imports to optimize first-screen loading
* **Image Optimization**: Supporting multiple image sizes, selecting appropriate sizes based on usage scenarios

### 3. User Experience

* **Skeleton Screen Loading**: Implementing animated skeleton screens with CSS gradient animations that provide visual feedback during image loading. The skeleton screens smoothly fade out when images are loaded, creating a seamless transition that improves perceived performance and user experience
* **Smooth Transitions**: All interactions use CSS transition animations for a smooth user experience
* **Error Handling**: Comprehensive error boundaries and network error prompts with retry mechanism
* **Responsive Design**: Using CSS Grid and Flexbox to achieve fully responsive layouts

### 4. Internationalization & Theme

* **Multi-language Support**: Using i18next to implement English and Traditional Chinese switching
* **Theme Toggle**: Using CSS variables and Context API to achieve seamless dark/light theme switching
* **Local Storage**: User language and theme preferences saved in localStorage

### 5. State Management

* **Redux Integration**: Using Redux to manage global state, Redux Persist for data persistence
* **Local State**: Using React Hooks to manage component internal state
* **API State**: Unified management of loading, success, error, and other API request states

## Project Advantages

### 🎨 Excellent User Experience

* **Modern UI Design**: Clean and beautiful interface that follows modern design trends
* **Skeleton Screen Loading**: Using animated skeleton screens during image loading to provide visual feedback and improve perceived performance. The skeleton screens use smooth gradient animations that seamlessly transition to actual content when images are loaded
* **Smooth Animations**: All interactions have smooth transition effects, enhancing the user experience
* **Smart Search**: Real-time search functionality for quick movie discovery
* **Multiple View Modes**: Supporting both list and grid view modes to meet different browsing habits

### ⚡ Outstanding Performance

* **Fast Loading**: Using Vite build tool for extremely fast development and production environments
* **On-demand Loading**: Images and content loaded on-demand, reducing initial load time
* **Infinite Scroll**: Automatically loads more content without manual pagination
* **Optimized Rendering**: Using React.memo and useMemo to optimize component rendering performance

### 🌍 Internationalization Support

* **Multi-language**: Supporting English and Traditional Chinese, easily extensible to more languages
* **Theme Toggle**: Supporting dark and light themes to protect users' eyes
* **Localized Storage**: User preferences automatically saved and applied on next visit

### 🛠️ Developer Experience

* **Type Safety**: TypeScript provides complete type checking, reducing runtime errors
* **Component Reusability**: Highly modular component design, easy to maintain and extend
* **Code Standards**: Using ESLint to ensure code quality
* **Hot Reload**: Vite provides extremely fast Hot Module Replacement (HMR)

### 📱 Responsive Design

* **Multi-device Adaptation**: Perfect adaptation to desktop, tablet, and mobile devices
* **Flexible Layout**: Using CSS Grid to achieve adaptive grid layouts
* **Touch-friendly**: All interactive elements have appropriate touch target sizes

### 🎯 Complete Features

* **Movie Browsing**: Supporting both "Now Playing" and "Top Rated" categories
* **Detail Viewing**: Complete movie detail pages including ratings, synopsis, cast, and more
* **Search Functionality**: Powerful search functionality with real-time search support
* **Error Handling**: Comprehensive error handling and user prompts
