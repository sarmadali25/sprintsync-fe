# SprintSync Frontend

A modern task management web application built with React, TypeScript, and Redux. SprintSync helps teams organize their sprints and manage tasks efficiently with a clean, responsive interface.

## 🚀 Features

- **User Authentication**: Secure login and signup functionality
- **Task Management**: Create, view, edit, and delete tasks
- **Protected Routes**: Secure pages that require authentication
- **Responsive Design**: Mobile-friendly interface with Material-UI components
- **State Management**: Redux Toolkit for efficient state handling
- **Real-time Updates**: Dynamic task updates and management

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **UI Framework**: Material-UI (MUI)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React & MUI Icons
- **HTTP Client**: Axios
- **Package Manager**: Yarn

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── button/         # Button components
│   ├── form/           # Form-related components
│   ├── login-form/     # Login form component
│   ├── signup-form/    # Signup form component
│   ├── task/           # Task-related components
│   ├── navbar/         # Navigation components
│   └── text/           # Text components
├── hooks/              # Custom React hooks
├── layout/             # Layout components
├── pages/              # Page components
│   ├── login/          # Login page
│   ├── signup/         # Signup page
│   └── task/           # Task management page
├── routing/            # Route configuration
├── store/              # Redux store and slices
│   └── slices/         # Redux slices for state management
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and API configuration
```

This comprehensive README file includes all the essential information about your SprintSync frontend project, including features, tech stack, project structure, setup instructions, and more. The file is well-organized with clear sections and proper formatting that will help both new developers and team members understand and work with the project effectively.

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SprintSync-FE
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the project for production
- `yarn lint` - Run ESLint for code quality checks
- `yarn preview` - Preview the production build locally

## 🔐 Authentication

The application features a complete authentication system:

- **Login**: Existing users can sign in with their credentials
- **Signup**: New users can create an account
- **Protected Routes**: Authenticated users are automatically redirected to the task dashboard
- **Token Management**: JWT tokens are stored in localStorage for session persistence

## 📋 Task Management

Key task management features include:

- **Task List**: View all tasks in an organized list
- **Task Creation**: Add new tasks with detailed information
- **Task Details**: View comprehensive task information in modals
- **Task Editing**: Modify existing task details
- **Task Deletion**: Remove tasks with confirmation

## 🎨 Styling and Design

- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Material-UI**: Professional React components with Material Design
- **Custom Fonts**: Poppins font family for consistent typography
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Dark/Light Theme**: Support for theme switching (via MUI)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
VITE_API_BASE_URL=your_api_base_url
```

### Build Configuration

The project uses Vite for fast development and optimized production builds. Configuration can be found in `vite.config.ts`.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Quality

The project includes:

- **ESLint**: For code linting and consistency
- **TypeScript**: For type safety and better developer experience
- **Prettier**: For code formatting (configure as needed)

## 🐛 Known Issues

- 404 page is placeholder (TODO: Add proper 404 page)
- Add error boundary for better error handling
