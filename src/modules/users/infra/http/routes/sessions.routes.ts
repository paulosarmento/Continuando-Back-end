import { Router } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';


// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {

    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      delete user.password;

      return response.json({ user, token });

});

export default sessionsRouter;
