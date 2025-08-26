import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "./api";

export default function PostEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        const post = res.data.data;                  
        setTitle(post.title || "");
        setBody(post.body || "");
      } catch (err) {
        console.error("Erro ao carregar post:", err);
        alert("Não foi possível carregar o post.");
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]); 

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, { title, body }); 
      navigate("/");
    } catch (err) {
      console.error("Erro ao salvar post:", err);
      alert("Não foi possível salvar as alterações.");
    }
  };

  if (loading) {
    return (
      <div className="p-3">
        <Link to="/" className="inline-block mb-4 px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded">Back</Link>
        <p>A carregar…</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      <Link to="/" className="inline-block mb-4 px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded">
        Back
      </Link>
      <h1 className="font-bold text-2xl mb-4">Edit Post</h1>
      <form onSubmit={submit} className="space-y-4 max-w-lg">
        <div>
          <label className="block mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
