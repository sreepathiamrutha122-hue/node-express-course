
const app = require("./app");
const { initializeDatabase } = require("./database");

const PORT = 3000;

initializeDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database initialization failed:", error);
    });
