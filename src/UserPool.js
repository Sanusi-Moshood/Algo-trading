  import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-south-1_KKSQBSgef',
  ClientId: '7uool25nh8c48mumefb95sc8vg',
};

export default new CognitoUserPool(poolData);