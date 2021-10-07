import { User } from '../models/UserModel';

export function getUsers(query) {
  return User.prototype.query(query);
}

export function createUser(user) {
  return User.prototype.save(user);
}
