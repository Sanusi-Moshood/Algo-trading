import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';
import { useEffect, useState, createContext,} from 'react';

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
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

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

    const [status, setStatus] = useState(false);
    useEffect(() => {
      getSession()
        .then((session) => {
          console.log('Session: ', session);
          setStatus(true);
        })
        .catch((err) => {
          console.log('Session: ', err);
          setStatus(false);
        });
    }, [status])

  const logout = () => {
    const user = UserPool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
  };


  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout, status, setStatus}}>
      {props.children}
    </AccountContext.Provider>
  );
};



export { Account, AccountContext }
