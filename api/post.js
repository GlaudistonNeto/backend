module.exports = app => {
  const { existsOrError } = app.api.validation;

  const save = (req, res) => {
    const post = { ...req.body };
    if (req.params.id) post.id = req.params.id

    try {
      existsOrError(post.description, 'Descreva a sua postagem.');
      existsOrError(post.image_url, "Envie a foto ou vídeo.")
      existsOrError(post.latitude, "Envie a latitude da foto/vídeo.")
      existsOrError(post.longitude, "Envie a longitude da foto/vídeo.")
      existsOrError(post.longitude,
        "Qual o usuário que está postando esta imagem?")
    } catch (msg) {
      return res.status(400).send(msg)
    }

    if (post.id) {
      app.db('posts')
        .update(post)
        .where({ id: post.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {
      app.db('posts')
        .insert(post)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  };

  const get = (req, res) => {
    app.db('posts')
      .select('description', 'image_url', 'latitude', 'longitude', 'postId')
      .then(posts => res.json(posts))
      .catch(err => res.status(500).send(err))
  };

  const getById = (req, res) => {
    app.db('posts')
      .select('description', 'image_url', 'latitude', 'longitude', 'postId')
      .where({ id: req.params.id })
      .first()
      .then(post => res.json(post))
      .catch(err => res.status(500).send(err))
  };

  const remove = async (req, res) => {
    try {
      existsOrError(eq.params.id, 'Código da postagem não encontrado.');
      
      const rowDeleted = await app.db('evaluations')
        where({id: req.params.id}).del()
      existsOrError(rowDeleted, 'Postagem não encontrada');

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  return { save, get, getById, remove };
}