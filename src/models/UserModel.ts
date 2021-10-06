import dynamoose from 'dynamoose';

const {
  AWS_DYNAMODB_ENDPOINT,
  AWS_DYNAMODB_TABLE,
  STAGE,
} = process.env;

if (AWS_DYNAMODB_ENDPOINT) {
  dynamoose.aws.ddb.local(AWS_DYNAMODB_ENDPOINT);
}

const HASH_KEY = 'User';

interface UserInterface {
  email: string,
  password?: string,
}

const UserDynamooseModel = dynamoose.model(AWS_DYNAMODB_TABLE, {
  PK: {
    type: String,
    hashKey: true,
  },
  SK: {
    type: String,
    rangeKey: true,
  },
  password: String,
}, {
  create: STAGE.toLowerCase() === 'local',
});

export default class User implements UserInterface {
  email: string
  password?: string

  model = UserDynamooseModel
  getHashKey = () => HASH_KEY

  query = (userProps?: UserInterface) => {
    const queryOptions = !!userProps;

    const query = {
      PK: this.getHashKey(),
      ...queryOptions && { SK: userProps.email },
    };
    if (queryOptions) {
      return this.model.query(query).exec;
    }

    return this.model.scan().exec();
  }

  save = (userProps: UserInterface) => {
    const newUser = new this.model({
      PK: this.getHashKey(),
      SK: userProps.email,
      ...userProps.password && { password: userProps.password },
    });
    return newUser.save();
  }

  delete = (userProps: UserInterface) => {
    const deleteQuery = {
      PK: this.getHashKey(),
      SK: userProps.email,
    };
    return this.model.delete(deleteQuery);
  }

  constructor(options:UserInterface) {
    this.email = options.email;
    if (options.password) this.password = options.password;
  }
}
