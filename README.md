# Photo_Gallery_API

This is a server-side API for managing a photo gallery.

## Features

- Create, read, update, and delete albums and photos.
- Associate photos with albums.
- Retrieve information about albums and photos.

## Requirements

- Node.js 
- npm

## Getting Started

To get the API up and running on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/BishoySedra/Photo_Gallery_API.git
cd Photo_Gallery_API
```

### 2. Environment Variables

- Rename the provided `.example.env` file to `.env`.
- Open the `.env` file.
- Add your credentials and sensitive information in the corresponding fields.

  ```plaintext
  PORT=your_port
  DATABASE_NAME=your_database_name
  DATABASE_USERNAME=your_database_username
  DATABASE_PASSWORD=your_database_password
  DATABASE_HOST=your_host
  ```

  Make sure to replace the placeholder values (`your_database_name`, `your_database_username`, etc.) with your actual credentials.

  This `.env` file will be used by your application to access the required environment variables. Remember to keep this file private and not share it publicly, as it contains sensitive information.

### 3. Install Dependencies

```bash
npm install
```

### 4. Launch the Server

```bash
npm start
```

The server will start, and you'll be able to access the API at `http://localhost:3000` even if you don't put your put in the credentials as I mentioned above.

## API Documentation

For detailed information on available endpoints, request/response formats, and usage examples, refer to the [API Documentation](https://documenter.getpostman.com/view/28416524/2s9YXfcPWw).
