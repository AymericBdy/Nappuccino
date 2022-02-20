import React, {useContext, useEffect, useMemo, useReducer} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import BackendAdress from '../helpers/Backend';

export const AuthContext = React.createContext('auth');

const AUTHENTICATED = 'AUTHENTICATED';
const LOGGED_OUT = 'LOGGED_OUT';
const ACCESS_TOKEN_KEY = 'access_token';

// Create a wrapper function for communicating with the API
const loginUser = (id, password) =>
  fetch(BackendAdress()+'signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      password: password,
    }),
  }).then(response => response.json());

const refreshToken = token =>
  fetch(BackendAdress()+"authtest", {
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
      login: async (id, password) => {
        try {
          console.log("Log on "+BackendAdress()+'signin');
          const result = await loginUser(id, password);

          console.log(`result`, result);

          await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, result.token);

          dispatch({type: AUTHENTICATED});
      
        } catch (error) {
          console.error(error);
        }
      },

      logout: async () => {
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

          await refreshToken(token);

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