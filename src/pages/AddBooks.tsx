// {{base_url}}/api/books  {
//    "title": "string added",
//   "author": "string",
//    "genre": "FICTION",
//    "isbn": "string",
//    "description": "this is it",
//    "available": true,
//    "copies": 10
//  } --- this is body raw base url local host i have to add this with redux

// response is like this {
//     "sucess": true,
//     "message": "Book created successfully",
//     "data": {
//         "title": "string added",
//         "author": "string",
//         "genre": "FICTION",
//         "isbn": "string",
//         "description": "this is it",
//         "copies": 10,
//         "available": true,
//         "_id": "68702ebf0312b83df1b7b965",
//         "createdAt": "2025-07-10T21:21:03.668Z",
//         "updatedAt": "2025-07-10T21:21:03.668Z"
//     }
// }

import { useState } from "react";
import { useAddBookMutation } from "@/features/api/apiSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AddBooks = () => {
  const [addBook, { isLoading, isSuccess, isError }] = useAddBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    available: true,
    copies: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(formData).unwrap();
      alert("✅ Book added successfully!");
      setFormData({
        title: "",
        author: "",
        genre: "FICTION",
        isbn: "",
        description: "",
        available: true,
        copies: 1,
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add book.");
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="genre">Genre</Label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="FICTION">FICTION</option>
            <option value="NON_FICTION">NON_FICTION</option>
            <option value="SCIENCE">SCIENCE</option>
            <option value="MYSTERY">MYSTERY</option>
          </select>
        </div>

        <div>
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="copies">Copies</Label>
          <Input
            type="number"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Add Book"}
        </Button>
        {isSuccess && <p className="text-green-500 mt-2">Book added successfully!</p>}
        {isError && <p className="text-red-500 mt-2">Failed to add book.</p>}
      </form>
    </div>
  );
};

export default AddBooks;
