# Vite + React Project

This is a Vite + React project that includes various features such as user authentication, note management, and settings management. The project uses Appwrite for backend services and Tailwind CSS for styling.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Features](#features)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/dabby12/note-website
    cd vite-project
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your Appwrite project details:
    ```env
    VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
    VITE_APPWRITE_PROJECT_ID=your_project_id
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to check for linting errors.
- `npm run preview`: Previews the production build.
## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **Appwrite**: An open-source backend server for web, mobile, and flutter developers.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Features

- **User Authentication**: Secure user authentication using Appwrite.
- **Note Management**: Create, read, update, and delete notes.
- **Settings Management**: Manage user settings and preferences.
- **Responsive Design**: Fully responsive design using Tailwind CSS.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

