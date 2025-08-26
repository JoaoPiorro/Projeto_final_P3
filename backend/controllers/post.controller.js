const db = require("../models");
const Post = db.Post;

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = await Post.create({ title, body });
    return res.status(201).json({ message: "Post criado", data: post });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao criar o post", error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    return res.status(200).json({ data: posts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao obter os posts", error: err.message }); 
  }
};

exports.getPostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post não encontrado" });
    return res.status(200).json({ data: post });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao obter o post", error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, body } = req.body;
    const [updatedRows] = await Post.update({ title, body }, { where: { id } });
    if (updatedRows === 0) return res.status(404).json({ message: "Post não encontrado" });
    const updatedPost = await Post.findByPk(id);
    return res.status(200).json({ message: "Post atualizado", data: updatedPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao atualizar post", error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedRows = await Post.destroy({ where: { id } });
    if (deletedRows === 0) return res.status(404).json({ message: "Post não encontrado" });
    return res.status(200).json({ message: "Post apagado" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao apagar post", error: err.message });
  }
};
