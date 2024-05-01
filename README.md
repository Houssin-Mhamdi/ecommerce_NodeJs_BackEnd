
# E-Commerce Website with Node.js, Express, and Mongoose

This is an e-commerce website built using Node.js, Express, and Mongoose. It provides functionality for managing Ecommerce website 

## Features

- **Product Management**: CRUD operations for managing products.
- **User Authentication**: User registration, login, and authentication using JWT tokens.
- **Order Management**: Creating, updating, and viewing orders.
- **Environment Variables**: Configuration using environment variables stored in a `.env` file.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Houssin-Mhamdi/ecommerce_NodeJs_BackEnd.git
    ```

2. Navigate to the project directory:

    ```bash
    cd projectOneSendEmails
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:

    ```
    PORT=4000
    MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
    NODE_ENV=development
    JWT_SECRET=your-secret
    MAIL_ID=your-eamil
    PASS_ID="your email pass"
    ```

5. Start the server:

    ```bash
    npm start
    ```

6. Open your browser and navigate to `http://localhost:4000` to access the website.

## Usage

- **API Routes**: 
  - `/api/users`: User registration, login, and authentication.
  - `/api/products`: CRUD operations for managing products.
  - `/api/blog`: CRUD operations for managing blogs.
  - `/api/blogcategory`: CRUD operations for managing blog category.
  - `/api/brand`: CRUD operations for managing brand.
  - `/api/category`: CRUD operations for managing category.
  - `/api/coupon`: Creating, updating, and viewing coupon.
  - `/api/color`: Creating, updating, and viewing color.
  - `/api/enquiry`: Creating, updating, and viewing enquiry.
  - `/api/upload`: Creating, updating, and viewing upload.

- **Authentication**:
  - Register a new user: `POST /api/users/register`
  - Login: `POST /api/users/login`
  - Protected routes require a valid JWT token.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for any suggestions or improvements.

## License
feel free to use it if you want some updates and more customization please contact me at houssinmhamdi123@gmail.com
