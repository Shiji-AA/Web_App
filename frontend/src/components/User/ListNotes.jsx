
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AxiosInstance } from "../../../api/axiosInstance";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function ListNotes() {
  const navigate = useNavigate();


  const [noteDetails, setNoteDetails] = useState([]);
useEffect(()=>{
    AxiosInstance.get("/notes")
    .then((response)=>{
  console.log(response.data.notes,"notes list")
  setNoteDetails(response.data.notes)
    })
    .catch((error)=>{
if(error){
  toast.error(error.response.data.error)
}
})

},[])

// const handleDelete = (id) => {
// AxiosInstance.delete(`/notes/${id}`)
//         .then(() => {
//           setNoteDetails(
//             noteDetails.filter((note) => note._id !== id)
//           );
//           toast.success("note deleted successfully");
//         })
//         .catch((error) => {
//           console.error("Error deleting note", error);
//           toast.error("Error in deleting note");
//         });
    
//   };


  const handleDelete = (id) => {
Swal.fire({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this note!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "", // Optional: remove this to rely only on customClass
  cancelButtonColor: "",
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "Cancel",

  customClass: {
    confirmButton: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400",
    cancelButton: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
  },

  buttonsStyling: false, 
})
.then((result) => {
  if (result.isConfirmed) {
    AxiosInstance
      .delete(`/notes/${id}`)
      .then(() => {
        setNoteDetails(noteDetails.filter((note) => note._id !== id));
        toast.success("note deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting note", error);
        toast.error("Error in deleting note");
      });
  }
})
};


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            My Notes
          </h1>

          <button
            onClick={() => navigate("/addNote")}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg"
          >
            Add Note
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">Sl No</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Content</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">

                {noteDetails.map((item, index) => (
                  <tr key={item._id}>

                    <td className="px-6 py-4">
                      {index +1}
                    </td>

                    <td className="px-6 py-4">
                      {item.title}
                    </td>

                    <td className="px-6 py-4">
                      {item.content}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-3">

                        <Link to={`/editNote/${item._id}`}>
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            Edit
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-4 py-2 bg-orange-500 text-white rounded-md"
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ListNotes;
