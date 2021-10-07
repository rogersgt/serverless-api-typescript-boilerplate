import * as userService from '../services/userService';

const routes = [
  {
    url: '/user',
    method: 'GET',
    handler: userService.getUsers,
  },
  {
    url: '/user',
    method: 'POST',
    handler: userService.createUser,
  },
];

export default routes;
