const AccesoProhididoException = use("App/Exceptions/AccesoProhididoException");
const RecursoNoEncontradoException = use(
  "App/Exceptions/RecursoNoEncontradoException"
);

class AutorizacionService {
  verificarPermiso(recurso, user) {
    if (!recurso) {
      throw new RecursoNoEncontradoException();
    }
    if (recurso.user_id !== user.id) {
      throw new AccesoProhididoException();
    }
  }
}

module.exports = new AutorizacionService();
