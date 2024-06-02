import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

async function getBooks() {
  const result = await db.query("select * from book");
  let books = [];
  result.rows.forEach((book) => {
    books.push(book);
  });
  return books;
}

app.get("/", async (req, res) => {
  const books = await getBooks();
  // console.log(books);
  res.render("index.ejs", {
    bookList : books,
  });
});

// getiing a book using it's id
app.get("/book/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query("select title, description from book where id = $1", [id]);
  // console.log(result.rows[0]);
  const books = result.rows[0];
  res.render("book.ejs", {
    bookReq : books,
  });
});

app.get("/search", async (req, res) => {
  const query = req.query.query;
  if (!query) {
    res.redirect("/");
  }
  try {
    const result = await db.query("SELECT * FROM book WHERE title ILIKE $1 OR isbn = $2", [`%${query}%`, query]);
    let books = [];
    result.rows.forEach((book) => {
      books.push(book);
    });
    res.render("index.ejs", {
      bookList : books,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred while searching for books');
  }
});

// posting notes for a new book
app.post("/new", (req, res) => {
  res.render("new.ejs");
});

// adding the data of new book into the database and showing it to the user
app.post("/add", async (req, res) => {
  // console.log(req.body);
  const title = req.body.title;
  const isbn = req.body.isbn;
  const rating = req.body.rating;
  const summary = req.body.summary;
  const description = req.body.notes;
  try {
    await db.query(
      "INSERT INTO book (title, isbn, rating, summary, description) VALUES ($1, $2, $3, $4, $5)",[title, isbn, rating, summary, description]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

// editing an already posted book entry
app.post("/edit", async (req, res) => {
  // console.log(req.body);
  const id = req.body.editId;

  const result = await db.query("select * from book where id = $1", [id]);
  const editBook = result.rows[0];
  res.render("edit.ejs", {
    book : editBook,
  });
});

app.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(req.body);
  const title = req.body.title;
  const isbn = req.body.isbn;
  const rating = req.body.rating;
  const summary = req.body.summary;
  const description = req.body.notes;
  try {
    await db.query(
      "UPDATE book SET title = $1, isbn = $2, rating = $3, summary = $4, description = $5 WHERE id = $6",[title, isbn, rating, summary, description, id]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  // console.log(req.body);
  const id = req.body.deleteId;
  try {
    await db.query("DELETE FROM book WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});