import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api";

export default function PostShow() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/posts/${id}`).then(res => {
        setPost(res.data.data);
      }).catch(err => {
        console.error("Erro ao carregar post:", err);
      });
    }
  }, [id]);

  if (!post) {
    return (
      <div className="p-3">
        <Link to="/" className="inline-block mb-4 px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded">Back</Link>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      <Link to="/" className="inline-block mb-4 px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded">Back</Link>
      <h1 className="font-bold text-2xl mb-4">Show Post</h1>
      <div>
        <p><strong>Title:</strong> {post.title}</p>
        <p><strong>Body:</strong> {post.body}</p>
      </div>
    </div>
  );
}
