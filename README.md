
# Student Management System

## Overview
This project is a **Command-Line Interface (CLI)** application designed to manage users, students, staff, and classes in a school or educational institution. It is built using **TypeScript** and follows an **Object-Oriented Programming (OOP)** architecture. The application uses **SQLite** as its database and **Sequelize** as the ORM (Object-Relational Mapping) tool for database interactions.

The project is modularized into components such as **models**, **repositories**, **services**, and **commands**, ensuring separation of concerns and maintainability. Below is a detailed explanation of the folder structure and the purpose of each file.

---

## Folder Structure

### Root Directory
- **`bun.lock`**: Dependency lock file for the Bun package manager.
- **`config/`**: Contains configuration files for the application.
  - **`config.json`**: Configuration settings for the database (e.g., dialect, storage path).
- **`database.sqlite`**: SQLite database file where all application data is stored.
- **`migrations/`**: Contains Sequelize migration files for managing database schema changes.
  - **`20250319141416-create-user.js`**: Migration file for creating the `users` table.
  - **`20250319142155-create-class.js`**: Migration file for creating the `classes` table.
  - **`20250319142341-create-students-staff.js`**: Migration file for creating the `students` and `staff` tables.
- **`models/`**: Contains Sequelize model definitions.
  - **`index.js`**: Exports all models for easy access.
- **`nodemon.json`**: Configuration file for Nodemon, a tool for automatically restarting the application during development.
- **`package.json`**: Contains project metadata and dependencies.
- **`seeders/`**: Contains seed files for populating the database with initial data (currently empty).
- **`src/`**: Source code for the application.
  - **`commands/`**: Contains CLI command handlers for managing users, students, staff, and classes.
    - **`class.commands.ts`**: Handles CLI commands related to classes (e.g., create, list, delete).
    - **`staff.commands.ts`**: Handles CLI commands related to staff (e.g., create, list, delete).
    - **`student.commands.ts`**: Handles CLI commands related to students (e.g., create, list, delete).
    - **`user.commands.ts`**: Handles CLI commands related to users (e.g., create, list, delete).
  - **`database/`**: Contains database configuration and connection setup.
    - **`index.ts`**: Initializes and exports the Sequelize instance for database interactions.
  - **`index.ts`**: Entry point of the application. Initializes the CLI program and sets up database synchronization.
  - **`models/`**: Contains Sequelize model definitions and associations.
    - **`associations.ts`**: Defines relationships between models (e.g., `User` has one `Student`).
    - **`base.model.ts`**: Base model class for extending other models (if used).
    - **`class.model.ts`**: Model definition for the `classes` table.
    - **`staff.model.ts`**: Model definition for the `staff` table.
    - **`student.model.ts`**: Model definition for the `students` table.
    - **`user.model.ts`**: Model definition for the `users` table.
  - **`repository/`**: Contains repository classes for database operations.
    - **`class.repository.ts`**: Repository for class-related database operations.
    - **`staff.repository.ts`**: Repository for staff-related database operations.
    - **`student.repository.ts`**: Repository for student-related database operations.
    - **`user.repository.ts`**: Repository for user-related database operations.
  - **`services/`**: Contains service classes for business logic.
    - **`classes/`**: Service classes for managing classes.
      - **`class.service.ts`**: Service for class-related business logic.
      - **`dto/`**: Data Transfer Objects (DTOs) for class-related operations.
        - **`create-class.dto.ts`**: DTO for creating a class.
        - **`update-class.dto.ts`**: DTO for updating a class.
    - **`staff/`**: Service classes for managing staff.
      - **`staff.service.ts`**: Service for staff-related business logic.
      - **`dto/`**: DTOs for staff-related operations.
        - **`create-staff.dto.ts`**: DTO for creating a staff member.
        - **`update-staff.dto.ts`**: DTO for updating a staff member.
    - **`students/`**: Service classes for managing students.
      - **`student.service.ts`**: Service for student-related business logic.
      - **`dto/`**: DTOs for student-related operations.
        - **`create-student.dto.ts`**: DTO for creating a student.
        - **`update-student.dto.ts`**: DTO for updating a student.
    - **`users/`**: Service classes for managing users.
      - **`user.service.ts`**: Service for user-related business logic.
      - **`dto/`**: DTOs for user-related operations.
        - **`create-user.dto.ts`**: DTO for creating a user.
        - **`update-user.dto.ts`**: DTO for updating a user.
  - **`utils/`**: Contains utility functions.
    - **`errorHandler.ts`**: Utility for handling and logging errors.
- **`tsconfig.json`**: TypeScript configuration file.

---

## Key Features

### 1. **Modularized Components**
The project is divided into modular components, ensuring separation of concerns:
- **Models**: Define the structure of database tables.
- **Repositories**: Handle database operations (e.g., CRUD).
- **Services**: Implement business logic and interact with repositories.
- **Commands**: Handle CLI commands and interact with services.

### 2. **Object-Oriented Programming (OOP)**
The application follows OOP principles:
- **Classes**: Each entity (e.g., `User`, `Student`, `Staff`, `Class`) is represented as a class.
- **Inheritance**: Common functionality is abstracted into base classes (e.g., `BaseModel`).
- **Encapsulation**: Data and behavior are encapsulated within classes.

### 3. **Database Management**
- **SQLite**: A lightweight, file-based database used for storage.
- **Sequelize**: An ORM for managing database interactions and schema migrations.

### 4. **CLI Interface**
The application provides a CLI for managing entities:
- **Create**: Add new users, students, staff, or classes.
- **List**: View all entities of a specific type.
- **Update**: Modify existing entities.
- **Delete**: Remove entities.

---

## How It Works

1. **Database Initialization**:
   - The `sequelize.sync()` method ensures the database schema matches the model definitions.
   - Associations between models (e.g., `User` and `Student`) are defined in `associations.ts`.

2. **CLI Commands**:
   - The `commander` library is used to define and handle CLI commands.
   - Each command (e.g., `create-user`, `list-students`) is handled by a corresponding command class.

3. **Business Logic**:
   - Services (e.g., `UserService`, `StudentService`) contain the core logic for managing entities.
   - Repositories (e.g., `UserRepository`, `StudentRepository`) handle database operations.

4. **Error Handling**:
   - Errors are caught and logged using the `errorHandler.ts` utility.

---

## Usage

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Run the Application**:
   ```bash
   bun src/index.ts <command>
   ```

3. **Example Commands**:
   - Create a user:
     ```bash
     bun src/index.ts create-user
     ```
   - List all students:
     ```bash
     bun src/index.ts list-students
     ```

4. **See all commands**:
   ```bash
   bun src/index.ts --help
   ``` 
---

## Conclusion
This project demonstrates the implementation of a modular, object-oriented CLI application for managing educational entities. It highlights the use of TypeScript, Sequelize, and SQLite, along with best practices for OOP architecture and separation of concerns. The project is well-suited for academic purposes and can be extended further for additional functionality.
