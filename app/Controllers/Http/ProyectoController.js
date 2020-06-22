"use strict";
const Proyecto = use("App/Models/Proyecto");
const AutorizacionService = use("App/Services/AutorizacionService");

class ProyectoController {
  /* Muestra todos los registros de la BD de proyectos
  Sólo lo podrán ver los usuarios logueados*/
  async index({ auth }) {
    const user = await auth.getUser();
    /* console.log(user); */
    return {
      message: "Index de proyectos",
      obj: user,
    };
  }

  /* Muestra los proyectos del usuario logueado */
  async index2({ auth }) {
    const user = await auth.getUser();
    return await user.proyectos().fetch();
  }

  async create({ auth, request }) {
    const user = await auth.getUser();
    const data = request.only(["name"]);
    const proyecto = new Proyecto();
    proyecto.fill({ name: data.name });
    /* console.log(proyecto); */
    await user.proyectos().save(proyecto);

    return proyecto;
  }

  async destroy({ auth, response, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const proyecto = await Proyecto.find(id);
    AutorizacionService.verificarPermiso(proyecto, user);
    await proyecto.delete();
    return proyecto;
  }

  async update({ auth, params, request }) {
    const user = await auth.getUser();
    const { id } = params;
    const proyecto = await Proyecto.find(id);
    AutorizacionService.verificarPermiso(proyecto, user);
    proyecto.merge(request.only(["name"]));
    await proyecto.save();
    return proyecto;
  }
}

module.exports = ProyectoController;
