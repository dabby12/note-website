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

2. Install dependencies (using pnpm):
    ```sh
    pnpm install
    ```

3. Create a `.env` file in the root directory and add your Appwrite project details:
    ```env
    VITE_APPWRITE_ENDPOINT=
    VITE_APPWRITE_PROJECT_ID=
    VITE_APPWRITE_DATABASE_ID=
    VITE_APPWRITE_COLLECTION_ID=
    VITE_APPWRITE_PREF_COLLECTION_ID=
    VITE_APPWRITE_PROFILE_PICTURE_BUCKET_ID=


    ```

4. Start the development server:
    ```sh
    pnpm run dev
    ```
```
5. Create a schema in Appwrite for the following
    5a. Database: 
        Create 2 collections named preferences and notes
    5b. preferences collection schema:
        TimeActivatedTrial: datetime
        plan: string
        theme: string
        notifications: boolean
        userid: string
        usedFreeTrial: boolean
    5c. notes collection schema
        Name: string
        Descripton: string
        Content: string
        Date: datetime
        userid:
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

