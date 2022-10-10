import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';
import {  useState, createContext, useEffect} from 'react';

const AccountContext = createContext();

const Account = (props) => {
  
  const [websocket, setWebsocket] =useState()
  const connect = () => {
    const ws = new WebSocket(`wss://7k22ipxsrk.execute-api.ap-south-1.amazonaws.com/dev?accesstoken=${userData.accessToken}&userid=${userData.userId}`);
     ws.onopen = (event) => {
       console.log('connected')
     };

       ws.onmessage = evt => {
       // listen to data sent from the websocket server
       const message = JSON.parse(evt.data)
       setWebsocket({dataFromServer: message})
       console.log(message)
       }

       ws.onclose = () => {
       console.log('disconnected')
       setTimeout(function () {
        //websocket function
        //  connect();
       }, 1000);

       }

       ws.onerror = (err) => {
         console.error(err.message);
         ws.close();
       };
   }

  const getSession = async () => {
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session)
            setUserData(() => ({
              accessToken: session.accessToken.jwtToken,
              userId: session.idToken.payload['custom:userid'],
              userName: session.idToken.payload['cognito:username'],
              Email: session.idToken.payload.email
            }))
          }
        });
      } else {
        reject();
      }

    });
  };
//-----------------------USER DATA  INFORMATION
  const [userData, setUserData] = useState({
    accessToken:'',
    userid:'',
    userName:'',
    Email:''
  }) 
  const [status, setStatus] = useState()
  useEffect(() => {
    getSession()
      .then(session => {
        setStatus(true);
        // connect();
      })
      .catch((err) => {
        console.log('Session: ', err);
        setStatus(false);
      });
  }, [status])



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
    <AccountContext.Provider value={{ authenticate, getSession, logout,  userData, status}}>
      {props.children}
    </AccountContext.Provider>
  );
};



export { Account, AccountContext }
