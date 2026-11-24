import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../../api/AxiosInstance";




function AddNote() {
  const navigate= useNavigate()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await AxiosInstance.post("/notes", {
      title,
      content,
    });
// -----------------------------------------------------------------
    if (response.data) {
      console.log(response.data, "notes data");
      toast.success(response.data.message);
      navigate("/listNotes")
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Add New Note</h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-3">
            <span className="text-gray-700">Title</span>
            <input
              type="text"
              className="mt-1 block w-full border px-3 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Content</span>
            <textarea
              className="mt-1 block w-full border px-3 py-2 rounded"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </label>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 mt-4 rounded hover:bg-teal-500"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;