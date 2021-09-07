module.exports = app => {
  app.route('/users')
    .post(app.api.user.save)
    .get(app.api.user.get)

  app.route('/users/:id')
    .put(app.api.user.save)
    .get(app.api.user.getById)
    
  app.route('/posts')
    .post(app.api.post.save)
    .get(app.api.post.get)

  app.route('/posts/:id')
    .put(app.api.post.save)
    .get(app.api.post.getById)
    
  app.route('/evaluations')
    .post(app.api.evaluation.save)
    .get(app.api.evaluation.get)

  app.route('/evaluations/:userId/:postId')
    .put(app.api.evaluation.save)
}
