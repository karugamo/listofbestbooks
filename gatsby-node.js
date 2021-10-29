const books = require("./data/books.json");

exports.createPages = async ({ actions: { createPage } }) => {
  books.forEach((book) => {
    const encodedName = encodeBook(book);
    createPage({
      path: `/book/${encodedName}/`,
      component: require.resolve("./src/pages/index.tsx"),
      context: { book },
    });
  });
};

function encodeBook(book) {
  return book.title
    .replace(/[^\w\s]/gi, "")
    .trim()
    .replace(/ /g, "_");
}
