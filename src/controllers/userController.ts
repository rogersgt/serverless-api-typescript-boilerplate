import * as userService from '../services/userService';
import { UserInterface } from '../models/UserModel';
import { Document } from 'dynamoose/dist/Document';
import logger from '../logger';

export async function addUser(user: UserInterface): Promise<Document|Document[]> {
  logger.debug({ user });
  return userService.createUser(user);
}

export async function getUsers(query?: UserInterface): Promise<Document|Document[]> {
  return userService.getUsers(query);
}
