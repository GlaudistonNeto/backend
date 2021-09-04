const bcrypt = require('../util/bcrypt');

module.exports = app => {
  const {
    existsOrError,
    notExistsOrError,
    equalsOrError,
    strongPasswordOrError,
    ageVerification
  } = app.api.validation;
  const save = async (req, res) => {
    const user = { ...req.body }
    if (req.params.id) user.id = req.params.id;

    try {
      existsOrError(user.name, 'Usuário não informado.')
      ageVerification(user.age,
        'Idade não aprovada, você precisa ter ao menos 18 anos.')
      existsOrError(user.city, 'Cidade não informada.')
      existsOrError(user.email, 'E-mail não informado.')
      strongPasswordOrError(user.password, 'E-mail não informado.')
      equalsOrError(user.confirmPassword, 'As senhas não conicidem.')
      equalsOrError(user.password, user.confirmPassword,
        'As senhas não conicidem.')

        const userFromDB = await app.db('users')
          .where({ email: user.email }).first()
          if (!user.id) {}
          notExistsOrError(userFromDB, 'E-mail já cadastrado.')
    } catch(msg) {
      res.status(400).send(msg);
    }

    user.password = bcrypt.generateHash(req.body.password);
    delete user.confirmPassword

    if (user.id) {
      app.db('users')
        .update(user)
        .ehere({ id: user.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {
      app.db('users')
        .insert(user)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }

  const get = (req, res) => {
    app.db('users')
      .select('id', 'nsme', 'age', 'city', 'email')
      .then(users => res.json(users))
      .catch(err => res.status(500).send(err))
  }

  return { save, get };
}
