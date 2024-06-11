TaskFlow Backend
This is the backend service for the TaskFlow task management application, powered by Node.js and MongoDB. It provides RESTful APIs to create, edit, and delete tasks.

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Hariharaan-S/task-management-backend.git
cd taskflow-backend
Install the dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory of the project and add the following variables:

plaintext
Copy code
MONGO_URI=your_mongodb_connection_string
PORT=your_desired_port
Build the server:

bash
Copy code
npm run build
Start the server:

bash
Copy code
npm start
The server should now be running on the port specified in your .env file.
