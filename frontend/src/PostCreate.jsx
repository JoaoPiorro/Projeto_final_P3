import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "./api";

export default function PostCreate() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/posts", { title, body });
    navigate("/");
  };

  return (
    <>
      <Link
        to="/"
        className="inline-block mb-4 px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded"
      >
        Back
      </Link>
      <h1 className="font-bold text-2xl mb-4">Create Post</h1>
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
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
}
