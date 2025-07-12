import Swal from 'sweetalert2';
import {
  useGetBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useBorrowBookMutation,
} from "@/features/api/apiSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash, Pencil, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from 'react-router';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

const ShowAllBooks = () => {
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [borrowBook] = useBorrowBookMutation();
  const navigate = useNavigate();

    const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const limit = 5;

 const { data, isLoading, isError, error, refetch, isFetching } =
    useGetBooksQuery({ page, limit, filter });

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (isLoading) return <div className="p-6">⏳ Loading books...</div>;
  if (isError)
    return (
      <div className="p-6 text-red-500">❌ Error: {JSON.stringify(error)}</div>
    );

  const books: Book[] = data?.data || [];
   const meta = data?.meta;


    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
    setPage(1); // Reset to page 1 on filter change
  };


  const handleDelete = async (bookId: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(bookId).unwrap();
      alert(`Book with ID ${bookId} deleted!`);
      refetch();
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete the book.");
    }
  };

  const openUpdateDialog = (book: Book) => {
    setSelectedBook(book);
    setIsDialogOpen(true);
  };

  const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBook) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const updatedBook = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      genre: formData.get("genre") as string,
      isbn: formData.get("isbn") as string,
      description: formData.get("description") as string,
      copies: Number(formData.get("copies")),
      available: Number(formData.get("copies")) > 0,
    };

    try {
      await updateBook({ id: selectedBook._id, updatedBook }).unwrap();
      setIsDialogOpen(false);
      refetch();
    } catch (err) {
      console.error("Update failed", err);
    }
  };


const handleBorrowBooks = async (book: Book) => {
  if (!book.available) {
    Swal.fire({
      icon: 'error',
      title: 'Unavailable',
      text: 'This book is not available for borrowing.',
    });
    return;
  }

  const { value: formValues } = await Swal.fire({
    title: `Borrow "${book.title}"`,
    html:
      `<input type="number" id="quantity" class="swal2-input" placeholder="Quantity (max ${book.copies})" min="1" max="${book.copies}" />` +
      `<input type="date" id="dueDate" class="swal2-input" />`,
    focusConfirm: false,
    preConfirm: () => {
      const quantity = Number((document.getElementById('quantity') as HTMLInputElement)?.value);
      const dueDate = (document.getElementById('dueDate') as HTMLInputElement)?.value;

      if (!quantity || quantity < 1 || quantity > book.copies) {
        Swal.showValidationMessage(`Enter a valid quantity between 1 and ${book.copies}`);
        return false;
      }
      if (!dueDate) {
        Swal.showValidationMessage('Please select a due date');
        return false;
      }

      return { quantity, dueDate };
    }
  });

  if (!formValues) return;

  try {
    const borrowBookBody = {
      book: book._id,
      quantity: formValues.quantity,
      dueDate: formValues.dueDate,
    };

    await borrowBook(borrowBookBody).unwrap();
    refetch();

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: `You borrowed "${book.title}" successfully.`,
    });

  } catch (err) {
    console.error("Error borrowing book:", err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to borrow the book.',
    });
  }
};


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">📚 All Books</h2>







      <div className="flex justify-between items-center mb-4">
  {/* Genre Filter */}
  <div>
    <label className="mr-2 font-medium">Filter by Genre:</label>
    <select
      value={filter}
      onChange={handleFilterChange}
      className="border px-3 py-1 rounded"
    >
      <option value="">All</option>
      <option value="FICTION">Fiction</option>
      <option value="NON_FICTION">Non-Fiction</option>
      <option value="SCIENCE">SCIENCE</option>
      <option value="HISTORY">HISTORY</option>
      <option value="BIOGRAPHY">BIOGRAPHY</option>
      <option value="FANTASY">FANTASY</option>
      {/* Add more as needed */}
    </select>
  </div>

  {/* Pagination Controls */}
  <div className="flex items-center gap-2">
    <button
      disabled={page === 1}
      onClick={() => setPage((p) => p - 1)}
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
      <ChevronLeft size={16} />
    </button>
    <span className="font-semibold">
      Page {page} of {meta?.totalPages || 1}
    </span>
    <button
      disabled={!meta?.hasNextPage}
      onClick={() => setPage((p) => p + 1)}
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
      <ChevronRight size={16} />
    </button>
  </div>
</div>

{isFetching && <div className="mt-4 text-sm text-gray-500">Refreshing data...</div>}







      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Genre</th>
              <th className="px-4 py-2">ISBN</th>
              <th className="px-4 py-2">Copies</th>
              <th className="px-4 py-2">Available</th>
              <th className="px-4 py-2">Actions</th>
              <th className="px-4 py-2">Borrow Book</th>
              <th className="px-4 py-2">Show Details</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.description}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.genre}</td>
                <td className="px-4 py-2">{book.isbn}</td>
                <td className="px-4 py-2">{book.copies}</td>
                <td className="px-4 py-2">{book.available ? "✅" : "❌"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => openUpdateDialog(book)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={18} />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleBorrowBooks(book)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Borrow
                  </button>
                </td>
                <td 
                onClick={()=>{
                  navigate(`/details/${book._id}`)
                }}
                className="px-4 py-2 cursor-pointer" 
                ><Info></Info></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          {selectedBook && (
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                name="title"
                defaultValue={selectedBook.title}
                className="w-full border px-3 py-2 rounded"
                placeholder="Title"
                required
              />
              <input
                name="author"
                defaultValue={selectedBook.author}
                className="w-full border px-3 py-2 rounded"
                placeholder="Author"
                required
              />
              <input
                name="genre"
                defaultValue={selectedBook.genre}
                className="w-full border px-3 py-2 rounded"
                placeholder="Genre"
                required
              />
              <input
                name="isbn"
                defaultValue={selectedBook.isbn}
                className="w-full border px-3 py-2 rounded"
                placeholder="ISBN"
                required
              />
              <input
                type="number"
                name="copies"
                defaultValue={selectedBook.copies}
                className="w-full border px-3 py-2 rounded"
                placeholder="Copies"
                required
              />
              <textarea
                name="description"
                defaultValue={selectedBook.description}
                className="w-full border px-3 py-2 rounded"
                placeholder="Description"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShowAllBooks;
