# Task Manager Application

## Overview

This project is a feature-rich Task Manager application designed to help users organize, manage, and track their tasks effectively. The application includes a range of functionalities, such as task categorization, batch actions, and file attachments, while providing a responsive and user-friendly interface.

## Features

### 1. User Authentication

- Authentication is implemented using **Firebase Authentication** with Google Sign-In.

### 2. Task Management

- Users can create, edit, and delete tasks.
- Tasks can be categorized into different types (e.g., Work, Personal) and tagged for better organization.
- Set due dates for tasks to stay on schedule.
- Drag-and-drop functionality to rearrange tasks within the list.
- Sort tasks based on due dates in ascending or descending order.

### 3. Batch Actions

- Perform batch actions on tasks, such as:
  - Deleting multiple tasks.
  - Marking multiple tasks as complete.

### 5. File Attachments

- Attach files or documents to tasks for additional context.
- File upload feature in the task creation/editing form.
- Display attached files in the task detail view.

### 6. Filter Options

- Filter tasks by tags, category, and date.
- Search tasks by their title for quick access.

### 7. Board/List View

- Switch between:
  - **Board View**: Kanban-style interface.
  - **List View**: Traditional task list layout.

### 8. Responsive Design

- Fully responsive design with a mobile-first approach.
- Adapts seamlessly to various screen sizes (mobile, tablet, desktop).

## Technical Stack

- **Frontend Framework**: React with TypeScript.
- **Authentication**: Firebase Authentication with Google Sign-In.
- **Database**: Firebase Realtime Database for data storage.
- **State Management**: React Redux for data fetching and state management.
- **Design**: Fully responsive using TailwindCSS and modern web design practices.

## Installation

### Prerequisites

- Node.js (v20 or higher)
- Firebase account

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ManikandanJN/task_management.git
   ```
2. Navigate to the project directory:
   ```bash
   cd task-manager
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=<your-firebase-api-key>
   REACT_APP_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
   REACT_APP_FIREBASE_DATABASE_URL=<your-firebase-database-url>
   REACT_APP_FIREBASE_PROJECT_ID=<your-firebase-project-id>
   REACT_APP_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
   REACT_APP_FIREBASE_APP_ID=<your-firebase-app-id>
   REACT_APP_FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>
   ```
5. Start the development server:
   ```bash
   npm start
   ```
6. Open the application in your browser at `http://localhost:3000`.

## Usage

- Sign in using Google to access your tasks.
- Use the intuitive interface to manage your tasks, categorize them, and attach files.
- Switch between list and board views for a flexible task management experience.
- Apply filters and perform batch actions to manage tasks efficiently.

## Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.
