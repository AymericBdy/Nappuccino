import React, {useContext, useEffect, useMemo, useReducer} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthContext = React.createContext('auth');

const AUTHENTICATED = 'AUTHENTICATED';
const LOGGED_OUT = 'LOGGED_OUT';
const ACCESS_TOKEN_KEY = 'access_token';

// Create a wrapper function for communicating with the API
const registerUser = () =>
  fetch('https://run.mocky.io/v3/dd598227-c275-48e8-9840-c588293ead84', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: 'jonaskuiler',
    }),
  }).then(response => response.json());

const currentUser = token =>
  fetch('https://run.mocky.io/v3/5910a865-8ebf-4fab-b27f-70f96551c5d4', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(result => result.json());

// The app container, should handle the state of a user being authenticated or not
export const AuthContainer = (props, navigation) => {
  const [authState, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        // Handle the AUTHENTICATED action and set the state to be authenticated
        case AUTHENTICATED:
          return {
            ...state,
            authenticated: true,
            initialized: true,
          };
        case LOGGED_OUT:
            return {
              ...state,
              authenticated: false,
              initialized: true,
            };
        default:
          throw new Error(`${action.type} is not a valid action type`);
      }
    },
    {
      authenticated: false,
      initialized: false,
    },
  );

  // Memoize this facade since it shouldn't be recreated every render
  const facade = useMemo(
    () => ({
      register: async (navigation) => {
        try {
          const result = await registerUser();

          console.log(`result`, result);

          await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, result.access_token);

          dispatch({type: AUTHENTICATED});
          
            /*navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            })*/
        } catch (error) {
          console.error(error);
        }
      },

      logout: async (navigation) => {
        console.log("Logging out from here");
        EncryptedStorage.setItem(ACCESS_TOKEN_KEY, null);
        dispatch({type: LOGGED_OUT});
      },

      // First we're trying to fetch a token from encrypted storage here
      // Then we try to get the user associated with that token and resume the session
      resume: async () => {
        try {
            console.log("Searching the token...");
          const token = await EncryptedStorage.getItem(ACCESS_TOKEN_KEY);

          console.log(`token`, token);

          // When no token is found, don't try to fetch the user
          if (!token) {
            dispatch({type: LOGGED_OUT});
            return;
          }

          await currentUser(token);

          dispatch({type: AUTHENTICATED});
        } catch (error) {
          console.error(error);
        }
      },
    }),
    [],
  );

  // This will trigger when the app is mounted for the first time
  useEffect(() => {
    facade.resume();
  }, []);

  // This uses a render prop to pass the authState to the containers children
  return (
    <AuthContext.Provider value={facade}>
        {console.log("Setting app state ",authState)}
      {props.children(authState)}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);