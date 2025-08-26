import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

export default function PostIndex() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then(res => {
      setPosts(res.data.data || []);
    });
  }, []);

  const deletePost = async (id) => {
  try {
    await api.delete(`/posts/${id}`);  
    setPosts(prev => prev.filter(p => p.id !== id));
  } catch (err) {
    console.error("Erro ao apagar post:", err.response?.data || err.message);
  }
};

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-4">CRUD App</h1>
      <Link to="/create" className="mb-4 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg">
        Create
      </Link>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left text-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Body</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="border-t">
                <td className="px-4 py-2">{post.id}</td>
                <td className="px-4 py-2">{post.title}</td>
                <td className="px-4 py-2">{post.body}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link to={`/show/${post.id}`} className="px-3 py-2 text-xs font-medium text-white bg-slate-600 rounded">Show</Link>
                  <Link to={`/edit/${post.id}`} className="px-3 py-2 text-xs font-medium text-white bg-amber-500 rounded">Edit</Link>
                  <button
                  onClick={() => {
                  if (window.confirm("Tem a certeza que quer apagar este post?")) {
                  deletePost(post.id);
                   }
                  }}
                    className="px-3 py-2 text-xs font-medium text-white bg-red-500 rounded">
                     Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
