# QUBeyond coding challenge by Lautaro Jorge Garcia

### Live Deployment
[qubeyond-challenge.vercel.app](qubeyond-challenge.vercel.app)

## Table of contents

### Overview
The objective of this project was to create a web application that connects to an API to display jokes.

This project demonstrates skills in:

- Using Vue/Nuxt.js for web development
- Integrating MongoDB Atlas for persistent storage

### Features
- Read jokes by category
- Interactive Controls: Allows users to rate, add, or delete jokes.
- API integration: Retrieval of the data is done server-side.
- Data Persistence: Jokes are saved in a database.

### Technologies Used
Frontend: Nuxt.js, Vue.js, HTML, CSS
Backend: Nuxt.js, Node.js, Mongoose
Database: MongoDB Atlas (for data storage)

### Setup and Installation
1) Clone the repository

    `git clone https://github.com/yourusername/yourrepo.git`

    `cd yourrepo`
2) Install dependencies
    `npm install`
3) Configure Environment Variables
    `MONGODB_URI=your-mongo-atlas-uri`
4) Build the application
    - For development mode: `npm run dev`
    - For prod mode: build the application: `npm run build` and then start the server: `npm run start`
5) Access the application: Visit `http://localhost:3000` in your browser

### Project Structure

```plaintext
.
├── constants      # Typescript constants
├── interfaces     # Typescript interfaces
├── pages          # Nuxt.js pages
├── public         # Static assets
├── server         # Server-side code
|    ├── api       # API endpoints
|    └── models    # Data base Models for ODM
├── assets         # Static assets like images, stylesheets
└── README.md      # Project documentation
```

Made with enthusiasm by [Lautaro Jorge Garcia](https://github.com/lautarojgarcia177)
