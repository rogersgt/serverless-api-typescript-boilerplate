import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import logger from '../logger';

const {
  AWS_DYNAMODB_ENDPOINT,
  AWS_DYNAMODB_TABLE,
  STAGE,
} = process.env;

if (AWS_DYNAMODB_ENDPOINT) {
  dynamoose.aws.ddb.local(AWS_DYNAMODB_ENDPOINT);
}

const HASH_KEY = 'User';
export const getHashKey = (): string => HASH_KEY;

export interface UserInterface {
  email: string,
  password?: string,
}

export const UserDynamooseModel = dynamoose.model(AWS_DYNAMODB_TABLE, {
  PK: {
    type: String,
    hashKey: true,
  },
  SK: {
    type: String,
    rangeKey: true,
  },
}, {
  create: STAGE.toLowerCase() === 'dev',
});

export class User implements UserInterface {
  email: string
  model = UserDynamooseModel

  query = (userProps?: UserInterface): Promise<Document|Document[]> => {
    const queryOptions = !!userProps;

    const query = {
      PK: getHashKey(),
      ...queryOptions && { SK: userProps.email },
    };
    if (queryOptions) {
      return UserDynamooseModel.query(query).exec();
    }

    return UserDynamooseModel.scan().exec();
  }

  save = (): Promise<Document> => {
    const newUserOptions = {
      PK: getHashKey(),
      SK: this.email,
    };
    logger.debug({ newUserOptions });
    const newUser = new UserDynamooseModel(newUserOptions);
    return newUser.save();
  }

  delete = (userProps: UserInterface): Promise<void> => {
    const deleteQuery = {
      PK: getHashKey(),
      SK: userProps.email,
    };
    return UserDynamooseModel.delete(deleteQuery);
  }

  constructor(options:UserInterface) {
    this.email = options.email;
  }
}
