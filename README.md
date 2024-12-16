# Boilerplate Project

This is a boilerplate project for a Node.js application with a React client-side component using Firebase for authentication, Firestore for data storage, and Express for routing.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

```sh
git clone https://github.com/IWRoss/ServerBoilerplate.git
cd boilerplate
```

2. Install dependencies:

```sh
npm install
```

3. Install client dependencies:

```sh
cd client
npm install
```

### Environment Variables

This project requires environment variables for Firebase credentials. You need to add `.env` files in both the root and the client directories.

#### Root `.env` File

Create a `.env` file in the root directory with the following content:

```plaintext
FIREBASE_ADMINSDK_BASE64_ENCODED=your_base64_encoded_firebase_adminsdk_credentials
```

#### Client `.env` File

Create a `.env` file in the `client` directory with the following content:

```plaintext
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

### Running the Application

To launch both the server and client simultaneously, run the following command:

```sh
npm run dev
```

This command will start the server and the client using `concurrently`.

### License

This project is licensed under the MIT License.
