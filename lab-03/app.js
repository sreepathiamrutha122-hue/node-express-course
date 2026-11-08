
const express = require("express");
const { dbPromise } = require("./database");

const app = express();

app.use(express.json());

// ==================================
// GET /books - Get all books
// ==================================
app.get("/books", async (req, res) => {
    const db = await dbPromise;

    const books = await db.all("SELECT * FROM books");

    res.status(200).json(books);
});

// ==================================
// POST /books - Add a new book
// ==================================
app.post("/books", async (req, res) => {
    const { title, author, price } = req.body;

    const db = await dbPromise;

    const result = await db.run(
        "INSERT INTO books (title, author, price) VALUES (?, ?, ?)",
        [title, author, price]
    );

    res.status(201).json({
        message: "Book added successfully",
        bookId: result.lastID
    });
});

// ==================================
// PUT /books/:id - Update a book
// ==================================
app.put("/books/:id", async (req, res) => {
    const { id } = req.params;
    const { title, author, price } = req.body;

    const db = await dbPromise;

    const result = await db.run(
        "UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?",
        [title, author, price, id]
    );

    if (result.changes === 0) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(200).json({
        message: "Book updated successfully"
    });
});

// ==================================
// DELETE /books/:id - Delete a book
// ==================================
app.delete("/books/:id", async (req, res) => {
    const { id } = req.params;

    const db = await dbPromise;

    const result = await db.run(
        "DELETE FROM books WHERE id = ?",
        [id]
    );

    if (result.changes === 0) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(200).json({
        message: "Book deleted successfully"
    });
});

module.exports = app;
