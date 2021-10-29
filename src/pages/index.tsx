import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import styled from "styled-components";
import allBooks from "../../data/books.json";
import { Book } from "../../types";
import BookThumbnail from "../BookThumbnail";
import { About } from "@karugamo/components";
import FilterTags, { Filter } from "../FilterTags";
import BookModal from "../BookModal";
import Modal from "../Modal";
import "../styles/main.css";
import { Helmet } from "react-helmet";

export default function App({ pageContext: { book } }) {
  const [books, setBooks] = useState<Book[]>(allBooks);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(book);
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);

  useFilterBooks();

  useUrlUpdate();

  return (
    <Main>
      <Helmet>
        <title>list of best books</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>"
        />
        <script type="text/javascript">
          window.sc_project = 12661235; window.sc_invisible = 1;
          window.sc_security = "931ac4c4";
        </script>
        <script
          type="text/javascript"
          src="https://www.statcounter.com/counter/counter.js"
          async
        ></script>
      </Helmet>
      <Headline>📚 list of best books 📚</Headline>
      <OptionsBar>
        <DesktopOnly>
          <FilterTags onToggle={onToggleFilter} activeFilters={activeFilters} />
        </DesktopOnly>
        <Button onClick={shuffleBooks}>Shuffle</Button>
        <MobileFilterButton onClick={() => setFilterModalOpen(true)}>
          Filter
          {activeFilters.length > 0 && (
            <ActiveFiltersText>
              {`(${activeFilters.length} active)`}
            </ActiveFiltersText>
          )}
        </MobileFilterButton>
      </OptionsBar>
      <BooksContainer>
        {books.map((book) => (
          <BookThumbnail key={book.url} onClick={setCurrentBook} book={book} />
        ))}
      </BooksContainer>
      <About />
      {currentBook && (
        <BookModal book={currentBook} onClose={() => setCurrentBook(null)} />
      )}
      {filterModalOpen && (
        <Modal
          onClose={() => setFilterModalOpen(false)}
          isOpen={filterModalOpen}
          dark
        >
          <FilterTags onToggle={onToggleFilter} activeFilters={activeFilters} />
        </Modal>
      )}
    </Main>
  );

  function useUrlUpdate() {
    useEffect(() => {
      if (!currentBook) {
        window.history.pushState({}, "list of best books", "/");
        return;
      }

      const encodedName = encodeBook(currentBook);
      window.history.pushState({}, currentBook.title, `/book/${encodedName}`);
    }, [currentBook]);
  }

  function useFilterBooks() {
    useEffect(() => {
      const filteredBooks = activeFilters.reduce(
        (acc, filter) => acc.filter(filter.function),
        allBooks
      );

      setBooks(filteredBooks);
    }, [activeFilters]);
  }

  function shuffleBooks() {
    setBooks((books) => shuffle(books));
  }

  function onToggleFilter(filter: Filter) {
    const isActive = activeFilters
      .map(({ name }) => name)
      .includes(filter.name);

    setActiveFilters(
      isActive
        ? activeFilters.filter(({ name }) => name !== filter.name)
        : [...activeFilters, filter]
    );
  }
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: #f6f4f4;
  font-size: 30px;
`;

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1380px;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 12px 40px;
  border: 2px solid #f6f4f4;
  background-color: transparent;
  color: #f6f4f4;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 7px;
  box-shadow: 0px 2px white;

  transition: background-color 0.2s, color 0.2s;

  :active {
    transform: translate(0, 2px);
    box-shadow: 0px 0px white;
  }
`;

const OptionsBar = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1380px;
  margin-left: 16px;
  margin-right: 16px;

  @media (max-width: 1200px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

const Headline = styled.h2`
  text-align: center;
`;

const MobileFilterButton = styled(Button)`
  display: none;
  @media (max-width: 1200px) {
    display: flex;
  }
`;

const DesktopOnly = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
`;

const ActiveFiltersText = styled.span`
  font-weight: 300;
  color: #aaa;
  margin-left: 8px;
`;

function encodeBook(book) {
  return book.title
    .replace(/[^\w\s]/gi, "")
    .trim()
    .replace(/ /g, "_");
}
