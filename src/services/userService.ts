import { User, UserDynamooseModel, getHashKey, UserInterface } from '../models/UserModel';

export function getUsers(query?: UserInterface) {
  if (query && Object.keys(query).length) {
    return UserDynamooseModel.query({
      PK: getHashKey(),
      SK: query.email,
    }).exec();
  }
  return UserDynamooseModel.scan().exec();
}

export function createUser(user: UserInterface) {
  const newUser = new User(user);
  return newUser.save();
}
