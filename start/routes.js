"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

// Agrupando las rutas
Route.group(() => {
  /* Usuarios */
  Route.post("users/login", "UserController.login"); // login
  Route.post("users/register", "UserController.store"); // Registro
  /* Proyectos */
  Route.get("proyectos", "ProyectoController.index2").middleware("auth"); // Listar
  Route.post("proyectos", "ProyectoController.create").middleware("auth"); // Crear
  Route.delete("proyectos/:id", "ProyectoController.destroy").middleware(
    "auth"
  ); // Delete
  Route.patch("proyectos/:id", "ProyectoController.update").middleware("auth"); // update
  /* tareas */
  Route.get("proyectos/:id/tareas", "TareaController.index").middleware("auth"); // lista
  Route.post("proyectos/:id/tareas", "TareaController.create").middleware(
    "auth"
  ); // Registro
  Route.patch("tareas/:id", "TareaController.update").middleware("auth"); // update
  Route.delete("tareas/:id", "TareaController.destroy").middleware("auth"); // delete
}).prefix("api/v1");
