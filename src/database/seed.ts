import { Status } from "../types";
import { db } from "./connection";
import { author, book, bookInstance, genre } from "./schema";

const authors = [
  {
    firstName: "J.K.",
    familyName: "Rowling",
    dateOfBirth: "1965-07-31",
    dateOfDeath: null,
  },
  {
    firstName: "George",
    familyName: "Orwell",
    dateOfBirth: "1903-06-25",
    dateOfDeath: "1950-01-21",
  },
  {
    firstName: "Jane",
    familyName: "Austen",
    dateOfBirth: "1775-12-16",
    dateOfDeath: "1817-07-18",
  },
  {
    firstName: "Mark",
    familyName: "Twain",
    dateOfBirth: "1835-11-30",
    dateOfDeath: "1910-04-21",
  },
  {
    firstName: "Harper",
    familyName: "Lee",
    dateOfBirth: "1926-04-28",
    dateOfDeath: "2016-02-19",
  },
  {
    firstName: "Ernest",
    familyName: "Hemingway",
    dateOfBirth: "1899-07-21",
    dateOfDeath: "1961-07-02",
  },
  {
    firstName: "F. Scott",
    familyName: "Fitzgerald",
    dateOfBirth: "1896-09-24",
    dateOfDeath: "1940-12-21",
  },
  {
    firstName: "Virginia",
    familyName: "Woolf",
    dateOfBirth: "1882-01-25",
    dateOfDeath: "1941-03-28",
  },
  {
    firstName: "Agatha",
    familyName: "Christie",
    dateOfBirth: "1890-09-15",
    dateOfDeath: "1976-01-12",
  },
  {
    firstName: "Gabriel",
    familyName: "García Márquez",
    dateOfBirth: "1927-03-06",
    dateOfDeath: "2014-04-17",
  },
];

const genres = [
  { name: "Fiction" },
  { name: "Non-Fiction" },
  { name: "Mystery" },
  { name: "Fantasy" },
  { name: "Science Fiction" },
  { name: "Romance" },
  { name: "Thriller" },
  { name: "Horror" },
  { name: "Biography" },
  { name: "Historical" },
  { name: "Self-Help" },
  { name: "Philosophy" },
  { name: "Children's" },
  { name: "Young Adult" },
  { name: "Adventure" },
  { name: "Dystopian" },
  { name: "Poetry" },
  { name: "Graphic Novel" },
  { name: "Memoir" },
  { name: "Classic" },
];

const books = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    isbn: "978-0-439-70818-0",
    summary:
      "A young boy discovers he is a wizard and attends a magical school, where he makes friends and enemies and faces a dark wizard.",
    authorId: 1,
    genreId: 4,
  },
  {
    title: "1984",
    isbn: "978-0-451-52493-5",
    summary:
      "A dystopian novel set in a totalitarian society under constant surveillance.",
    authorId: 2,
    genreId: 16,
  },
  {
    title: "Pride and Prejudice",
    isbn: "978-1-5032-9056-3",
    summary:
      "A romantic novel that deals with issues of class, marriage, and morality in 19th century England.",
    authorId: 3,
    genreId: 6,
  },
  {
    title: "The Adventures of Huckleberry Finn",
    isbn: "978-0-486-28061-5",
    summary:
      "The story of a young boy and a runaway slave traveling down the Mississippi River.",
    authorId: 4,
    genreId: 15,
  },
  {
    title: "To Kill a Mockingbird",
    isbn: "978-0-06-112008-4",
    summary:
      "A novel about racial injustice in the American South, seen through the eyes of a young girl.",
    authorId: 5,
    genreId: 1,
  },
  {
    title: "The Old Man and the Sea",
    isbn: "978-0-684-80122-3",
    summary:
      "The story of an old Cuban fisherman and his epic battle with a giant marlin.",
    authorId: 6,
    genreId: 1,
  },
  {
    title: "The Great Gatsby",
    isbn: "978-0-7432-7356-5",
    summary:
      "A story about the American dream and the disillusionment that comes with it, set in the 1920s.",
    authorId: 7,
    genreId: 20,
  },
  {
    title: "Mrs. Dalloway",
    isbn: "978-0-15-662870-9",
    summary:
      "A novel that explores the thoughts and events in the life of Clarissa Dalloway as she prepares for a party.",
    authorId: 8,
    genreId: 1,
  },
  {
    title: "Murder on the Orient Express",
    isbn: "978-0-06-269366-2",
    summary:
      "Detective Hercule Poirot investigates a murder on a luxurious European train.",
    authorId: 9,
    genreId: 3,
  },
  {
    title: "One Hundred Years of Solitude",
    isbn: "978-0-06-088328-7",
    summary:
      "The multi-generational story of the Buendía family in the fictional town of Macondo.",
    authorId: 10,
    genreId: 1,
  },
];

const bookInstances = [
  {
    bookId: 1,
    imprint: "First Edition",
    status: "available" as Status,
    dueBack: "2024-07-15",
  },
  {
    bookId: 2,
    imprint: "Second Edition",
    status: "maintenance" as Status,
    dueBack: "2024-08-20",
  },
  {
    bookId: 3,
    imprint: "Third Edition",
    status: "loaned" as Status,
    dueBack: "2024-06-30",
  },
  {
    bookId: 4,
    imprint: "Fourth Edition",
    status: "reserved" as Status,
    dueBack: "2024-07-25",
  },
  {
    bookId: 5,
    imprint: "First Edition",
    status: "available" as Status,
    dueBack: "2024-09-10",
  },
  {
    bookId: 6,
    imprint: "Second Edition",
    status: "maintenance" as Status,
    dueBack: "2024-07-05",
  },
  {
    bookId: 7,
    imprint: "Third Edition",
    status: "loaned" as Status,
    dueBack: "2024-08-15",
  },
  {
    bookId: 8,
    imprint: "Fourth Edition",
    status: "reserved" as Status,
    dueBack: "2024-07-20",
  },
  {
    bookId: 9,
    imprint: "First Edition",
    status: "available" as Status,
    dueBack: "2024-10-01",
  },
  {
    bookId: 10,
    imprint: "Second Edition",
    status: "maintenance" as Status,
    dueBack: "2024-07-12",
  },
];

/**
 * RESET DATABASE
 */

await db.delete(author);
await db.delete(genre);
await db.delete(book);
await db.delete(bookInstance);

console.log("✔ Database reset");

/**
 *  CREATE
 */

await db.insert(author).values(authors);
console.log("✔ Created authors");
await db.insert(genre).values(genres);
console.log("✔ Created genres");
await db.insert(book).values(books);
console.log("✔ Created books");
await db.insert(bookInstance).values(bookInstances);
console.log("✔ Created Book Instances");

console.log("Database seeded successfully!");
