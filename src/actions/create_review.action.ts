'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!content || !author || !bookId) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      },
    );

    console.log(response.status);

    // // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);
    // // 주의할 점
    // // server method 이다.
    // // 해당 path 의 Data Cache, Full Route Cache 를 무효화 한다.
    //
    // // 2. 특정 주소의 해당하는 모든 동적 페이지 재검증
    // revalidatePath('/book/[id]', 'page');
    //
    // // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath('/(white-searchbar', 'layout');
    //
    // // 4. 모든 데이터 재검증
    // revalidatePath('/', 'layout');

    // 5. tag 를 기준으로 데이터 재검증
    revalidateTag(`review-${bookId}`);
  } catch (err) {
    console.error(err);
    return;
  }
}
