module.exports = {
  apps: [
    {
      name: "ubc",
      script: "./bin/server.js",
      watch: true,
      max_restarts: 10, // Allow up to 10 restarts
      // restart_delay: 1000, // Wait 1 second before restarting
      autorestart: true,
      env: {
        PORT: 5501,
        MONGO_URL:
          "mongodb+srv://admin:Q9wBhBS5XthKQNt@cluster0.md4rexm.mongodb.net/",
      },
    },
  ],
};
