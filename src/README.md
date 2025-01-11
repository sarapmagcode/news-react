# NewsReact

A modern news aggregation web application built with React, Vite, and NewsDataHub API. This application allows users to browse and search through news articles from various sources with a clean and responsive interface.

## Features

- **Real-time News Feed**: Display latest news articles from multiple sources
- **Search Functionality**: Search for specific news articles with instant results
- **Responsive Design**: Clean and modern UI that works across different screen sizes
- **Article Preview**: Each article shows title, source, publication date, and description
- **Pagination**: Load more articles with cursor-based pagination
- **Loading States**: Skeleton loading screens for better user experience

## Tech Stack

- React.js
- Vite
- React Router DOM
- CSS Modules
- NewsDataHub API

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- NPM or Yarn package manager
- NewsDataHub API key (Get one at https://newsdatahub.com)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/news-react.git
cd news-react
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your NewsDataHub API key:
```env
VITE_NEWS_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   └── News/
│       ├── News.jsx
│       └── News.module.css
├── utils/
│   └── helpers.js
└── App.jsx
```

## Component Overview

### App.jsx
The main application component that handles routing and layout structure.

### Header
A simple navigation header component displaying the application name with routing capabilities.

### News
The main component that handles:
- Fetching news articles from the API
- Search functionality
- Displaying news items
- Pagination
- Loading states

## Styling

The application uses CSS Modules for component-specific styling, providing:
- Scoped styling
- Maintainable CSS structure
- No style conflicts
- Responsive design

## API Integration

The application uses the NewsDataHub API with the following features:
- Language filtering (English)
- Search functionality
- Cursor-based pagination
- Error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- NewsDataHub for providing the API
- React team for the amazing framework
- Vite team for the build tool