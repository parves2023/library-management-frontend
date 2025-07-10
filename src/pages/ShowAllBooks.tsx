// {{base_url}}/api/books get method locahost 500

// response {
//     "success": true,
//     "message": "Books retrieved successfully",
//     "data": [
//         {
//             "_id": "68697f2f83b32f7a4b7b7e7a",
//             "title": "thsi is  new book is here",
//             "author": "string",
//             "genre": "FICTION",
//             "isbn": "string",
//             "description": "this is updated book",
//             "copies": 6,
//             "available": true,
//             "createdAt": "2025-07-05T19:38:23.703Z",
//             "updatedAt": "2025-07-05T21:06:06.806Z"
//         },
//         {
//             "_id": "68698ae6aa4f18acf679481a",
//             "title": "The Theory of Everything",
//             "author": "Stephen Hawking",
//             "genre": "SCIENCE",
//             "isbn": "9780553380163",
//             "description": "An overview of cosmology and black holes.",
//             "copies": 5,
//             "available": true,
//             "createdAt": "2025-07-05T20:28:22.882Z",
//             "updatedAt": "2025-07-05T20:28:22.882Z"
//         },
//         {
//             "_id": "68698b94fe4ce091115cbd23",
//             "title": "The Theory of Everything",
//             "author": "parves Hawking",
//             "genre": "SCIENCE",
//             "isbn": "9780553380163",
//             "copies": 10,
//             "available": true,
//             "createdAt": "2025-07-05T20:31:16.575Z",
//             "updatedAt": "2025-07-05T20:31:16.575Z"
//         },
//         {
//             "_id": "68698f99d902a47843037a86",
//             "title": "Tasdf asdf rything",
//             "author": "Stephen Hawking",
//             "genre": "SCIENCE",
//             "isbn": "9780553380163",
//             "description": "An overview of cosmology and black holes.",
//             "copies": 5,
//             "available": true,
//             "createdAt": "2025-07-05T20:48:25.170Z",
//             "updatedAt": "2025-07-05T20:48:25.170Z"
//         },
//     ]
// }

import { useGetBooksQuery } from '@/features/api/apiSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ShowAllBooks = () => {
  const { data, isLoading, isError, error } = useGetBooksQuery(undefined);

  if (isLoading) return <div className="p-6">⏳ Loading books...</div>;
  if (isError) return <div className="p-6 text-red-500">❌ Error: {JSON.stringify(error)}</div>;

  const books = data?.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">📚 All Books</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books?.map((book) => (
          <Card key={book._id} className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-lg">{book.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Copies:</strong> {book.copies}</p>
              <p><strong>Available:</strong> {book.available ? '✅ Yes' : '❌ No'}</p>
              {book.description && (
                <p className="text-xs text-gray-500 line-clamp-3">
                  {book.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShowAllBooks;
