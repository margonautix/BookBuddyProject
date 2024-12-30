/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllBooks } from "../API";

export default function Books({ searchParams, setSearchParams }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getAllBooks() {
      const response = await fetchAllBooks();
      setBooks(response.books);
    }
    getAllBooks();
  }, []);

  const booksToDisplay = searchParams
    ? books.filter((book) => book.title.toLowerCase().includes(searchParams))
    : books;

  return (
    <>
      <div className="search">
        <label>
          {" "}
          <input
            type="text"
            placeholder="Search by title"
            onChange={(e) =>
              setSearchParams(e.target.value.toLocaleLowerCase())
            }
          ></input>
        </label>
      </div>
      <div className="main-div">
        {booksToDisplay &&
          booksToDisplay.map((book) => {
            return (
              <main
                className="all-books"
                key={book.id}
                onClick={() => {
                  navigate(`/books/${book.id}`);
                }}
              >
                <h2>{book.title}</h2>
                <img className="cover" src={book.coverimage} />
                <h5>by {book.author}</h5>
                <p>
                  Available:{" "}
                  {book.available ? (
                    <p style={{ color: "darkgreen" }}>Yes</p>
                  ) : (
                    <p style={{ color: "brown" }}>No</p>
                  )}
                </p>
              </main>
            );
          })}
      </div>
    </>
  );
}
