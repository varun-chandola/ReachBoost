import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [thumbnails, setThumbnails] = useState([])
  const [title, setTitle] = useState('')
  const [selectedThumbnail, setSelectedThumbnail] = useState(null)
  const navigate = useNavigate()

  // Create a FormData object
  const formData = new FormData();

  // Append files to FormData
  formData.append('thumbnail-1', document.querySelector('[name="thumbnail-1"]')?.files[0]);
  formData.append('thumbnail-2', document.querySelector('[name="thumbnail-2"]')?.files[0]);
  formData.append('thumbnail-3', document.querySelector('[name="thumbnail-3"]')?.files[0]);
  formData.append('thumbnail-4', document.querySelector('[name="thumbnail-4"]')?.files[0]);

  // Append other fields like title
  formData.append('title', title);

  const uploadThumbnail = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/v1/thumbnails', formData)
      console.log("thumbnail response\n", response)
      if (response?.data) {
        setThumbnails([...thumbnails, response?.data.url1, response?.data.url2, response?.data.url3, response?.data.url4])
        setTitle(title)
      }

    } catch (error) {
      console.log("thumbnail error ", error.message)
    }
  }

  const logout = async () => {
    const user = await axios.post('http://localhost:5000/api/v1/logout')
    console.log(user.data)
    if (user?.data) navigate('/')
  }



  return (
    <>
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <form className="bg-gray-800 rounded-xl p-6 max-w-lg mx-auto mb-8 shadow-lg" encType="multipart/form-data">
          <h2 className="text-2xl font-bold mb-4">Upload Thumbnails</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="file"
              name="thumbnail-1"
              className="block w-full text-gray-800 bg-gray-200 rounded-md p-2"
            />
            <input
              type="file"
              name="thumbnail-2"
              className="block w-full text-gray-800 bg-gray-200 rounded-md p-2"
            />
            <input
              type="file"
              name="thumbnail-3"
              className="block w-full text-gray-800 bg-gray-200 rounded-md p-2"
            />
            <input
              type="file"
              name="thumbnail-4"
              className="block w-full text-gray-800 bg-gray-200 rounded-md p-2"
            />

            <input
              type="text"
              placeholder="Enter Title"
              className="input input-bordered w-full py-2 px-3 text-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full"
              onClick={uploadThumbnail}
            >
              Add Thumbnails
            </button>
          </div>
        </form>

        <div className="max-w-6xl mx-auto">
          {thumbnails.length > 0 ? (
            <>
              <h1 className="text-xl text-gray-300 mb-4">{title}</h1>
              <div className="grid grid-cols-2 gap-6">
                {thumbnails.map((url, index) => (
                  <div key={index} className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md object-contain">
                    <input
                      type="checkbox"
                      checked={selectedThumbnail === url}
                      onChange={() => setSelectedThumbnail(selectedThumbnail === url ? null : url)}
                      className="absolute top-2 right-2 h-5 w-5 text-blue-600 rounded-xl p-5"
                    />
                    <img
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className={`object-cover w-full h-full active:p-4 hover:scale-75 hover:duration-700 hover:ease-in-out`}
                      onClick={()=>setSelectedThumbnail(url)}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h1 className="text-center text-gray-400">Loading thumbnails...</h1>
          )}
        </div>
      </div>
    </>
  );

};
export default App;