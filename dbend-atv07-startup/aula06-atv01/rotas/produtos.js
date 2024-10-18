const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { Produto, Tag } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { nome, descricao, preco, tags } = req.body;
    const produto = await Produto.create({ nome, descricao, preco });

    if (tags && tags.length > 0) {
      const tagsEncontradas = await Tag.findAll({ where: { nome: tags } });
      await produto.addTags(tagsEncontradas);
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
});

router.post('/:id/upload', upload.single('image'), async (req, res) => {
  const id = req.params.id;
  const produto = await Produto.findByPk(id);

  if (!produto) {
    return res.status(404).json({ msg: "Produto não encontrado!" });
  }

  if (req.file) {
    produto.imagem = /static/uploads/${req.file.filename}; 
    await produto.save();
    return res.json({ msg: "Imagem carregada com sucesso!", imagem: produto.imagem });
  } else {
    return res.status(400).json({ msg: "Erro ao fazer upload da imagem." });
  }
});

router.use('/static', express.static('public/uploads'));

module.exports = router;