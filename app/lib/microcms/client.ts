import {createClient} from "microcms-js-sdk";
import {BookType} from "@/app/types/types";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICRO_CMS_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY!,
});

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: "book-commerce",
    // queries: {
    //   offset: 0,
    //   limit: 10,
    // },
  });

  return allBooks;
};

// export const getDetailBook = async (contentId: string) => {
//   const detailBook = await client.getListDetail<BookType>({
//     endpoint: "",
//     contentId,
//   });

//   return detailBook;
// };
