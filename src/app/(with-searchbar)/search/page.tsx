import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/util/delay';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  await delay(1000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${(await searchParams).q}`,
    { cache: 'force-cache' },
  );

  if (!response.ok) {
    return <div>Failed to fetch data</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
