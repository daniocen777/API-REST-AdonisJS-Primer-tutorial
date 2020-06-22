"use strict";

const Proyecto = use("App/Models/Proyecto");
const Tarea = use("App/Models/Tarea");
const AutorizacionService = use("App/Services/AutorizacionService");

class TareaController {
  async index({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params; // del proyecto
    const proyecto = await Proyecto.find(id);
    // ¿El usuario es dueño?
    AutorizacionService.verificarPermiso(proyecto, user);
    return await proyecto.tareas().fetch();
  }

  async create({ auth, request, params }) {
    const user = await auth.getUser();
    const data = request.only(["description"]);
    const { id } = params;
    const proyecto = await Proyecto.find(id);
    // ¿El usuario es dueño?
    AutorizacionService.verificarPermiso(proyecto, user);
    const tarea = new Tarea();
    tarea.fill({
      description: data.description,
    });
    await proyecto.tareas().save(tarea);
    return tarea;
  }

  async destroy({ auth, response, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const tarea = await Tarea.find(id);
    // Proyecto que pertenece a la tarea
    const proyecto = await tarea.proyecto().fetch();
    AutorizacionService.verificarPermiso(proyecto, user);
    await tarea.delete();
    return tarea;
  }

  async update({ auth, params, request }) {
    const user = await auth.getUser();
    const { id } = params;
    const tarea = await Tarea.find(id);
    // Proyecto que pertenece a la tarea
    const proyecto = await tarea.proyecto().fetch();
    AutorizacionService.verificarPermiso(proyecto, user);
    await tarea.merge(request.only(["description", "completed"]));
    await tarea.save();
    return tarea;
  }
}

module.exports = TareaController;
