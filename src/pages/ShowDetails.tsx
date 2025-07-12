import { useParams } from "react-router";
import { useGetABookQuery } from "@/features/api/apiSlice";

const ShowDetails = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useGetABookQuery(id!, { skip: !id });

  console.log(book);

  if (isLoading) return <div className="p-4">⏳ Loading book details...</div>;
  if (isError) return <div className="p-4 text-red-600">❌ {JSON.stringify(error)}</div>;
  if (!book) return <div className="p-4">Book not found.</div>;

  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow">
        <p>{book.data.title}</p>
      <h2 className="text-2xl font-bold mb-2">{book.data.title}</h2>
      <p className="text-gray-700 mb-1">Author: {book.data.author}</p>
      <p className="text-gray-700 mb-1">Genre: {book.data.genre}</p>
      <p className="text-gray-700 mb-1">ISBN: {book.data.isbn}</p>
      <p className="text-gray-700 mb-1">Copies: {book.data.copies}</p>
      <p className="text-gray-700 mb-1">Available: {book.data.available ? "✅" : "❌"}</p>
      <p className="text-gray-700 mt-4">{book.data.description}</p>
    </div>
  );
};

export default ShowDetails;
