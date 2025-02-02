import BookItem from '@/components/book-item';
import style from './page.module.css';
import books from '@/mock/books.json';

export default async function Home() {
  const response = await fetch(`http://localhost:12345/book`);
  const allBooks = await response.json();
  console.log(allBooks);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}
