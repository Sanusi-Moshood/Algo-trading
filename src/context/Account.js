import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';
import {  useState, createContext,} from 'react';

const AccountContext = createContext();

const Account = (props) => {

  const getSession = async () => {
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session)
          }
        });
      } else {
        reject();
      }
      
      const x = user.getUsername()
      setUserData(x)
    });
  };

  const [userData, setUserData] = useState()

  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log('login success', result);
          resolve(result);
        },
        onFailure: (err) => {
          console.log('login failure', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('new password required', data);
          resolve(data);
        },
      });
    });
  };


  const logout = () => {
    const user = UserPool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
  };


  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout,  userData}}>
      {props.children}
    </AccountContext.Provider>
  );
};



export { Account, AccountContext }
