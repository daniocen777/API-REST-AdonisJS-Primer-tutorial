"use strict";
const User = use("App/Models/User");

class UserController {
  async login({ request, auth }) {
    // Solicitar email y password
    const { email, password } = request.all();
    // Generando token si es correcto
    const token = await auth.attempt(email, password);
    return token;
  }

  async store({ request }) {
    const { email, password } = request.all();
    const user = await User.create({ email, password, username: email });
    /* console.log(user); */
    return user;
  }
}

module.exports = UserController;
