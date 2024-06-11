# TaskFlow Backend

This is the backend service for the TaskFlow task management application, powered by Node.js and MongoDB. It provides RESTful APIs to create, edit, and delete tasks.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Hariharaan-S/task-management-backend.git
    cd task-management-backend
    ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory of the project and add the following variables:
    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    PORT=your_desired_port
    ```

4. **Build the server:**
    ```bash
    npm run build
    ```

5. **Start the server:**
    ```bash
    npm start
    ```

The server should now be running on the port specified in your `.env` file.
