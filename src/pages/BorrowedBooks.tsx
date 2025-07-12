import { useBorrowSummaryQuery } from "@/features/api/apiSlice";

function BorrowedBooks() {
  const { data, isLoading, isError, error } = useBorrowSummaryQuery();

  if (isLoading) return <div className="p-4">⏳ Loading summary...</div>;
  if (isError) return <div className="p-4 text-red-500">❌ Error: {JSON.stringify(error)}</div>;

  const summary = data?.data || [];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📚 Borrowed Books Summary</h2>
      {summary.length === 0 ? (
        <p>No borrowed books found.</p>
      ) : (
        <table className="min-w-full border rounded text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">ISBN</th>
              <th className="px-4 py-2">Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{item.book.title}</td>
                <td className="px-4 py-2">{item.book.isbn}</td>
                <td className="px-4 py-2">{item.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BorrowedBooks;
