# Strangers Hub

Welcome to Strangers Hub, an anonymous platform for expressing yourself freely without the fear of being judged. With our user-friendly interface, you can share your thoughts, opinions, and stories with the world while maintaining your privacy. Join us today and let your voice be heard!

## Getting Started

To get started with Strangers Hub, follow the steps below:

1. Clone the repository to your local machine.
2. Install the required dependencies by running the following command:

   ```
   npm install
   ```

3. Create an `.env` file in the root directory of the project with the following environment variables:

   ```
   DB_CONNECTION_STRING=<mongodb_url>
   NEXT_PUBLIC_GA_ID=<google_analytics_code>
   NEXT_PUBLIC_BASE_URL=<backend_url>
   ```

   Replace `<mongodb_url>` with the MongoDB connection string for your database. For example:

   ```
   DB_CONNECTION_STRING=mongodb://localhost:27017/StrangersHub?retryWrites=true&w=majority
   ```

   Replace `<google_analytics_code>` with your Google Analytics tracking ID.

   Replace `<backend_url>` with the URL of the backend server.

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access Strangers Hub.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the production-ready application.
- `npm start`: Starts the production server.
- `npm run lint`: Runs linting checks using ESLint.

## License

Strangers Hub is licensed under the [MIT License](LICENSE). Feel free to modify and use the code for your own purposes.

---

Thank you for using Strangers Hub. We hope you enjoy the platform and have a great experience sharing your thoughts anonymously. If you have any questions or encounter any issues, please don't hesitate to reach out to our support team. Happy expressing!
