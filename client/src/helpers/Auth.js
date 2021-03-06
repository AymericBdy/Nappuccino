import React, {useContext, useEffect, useMemo, useReducer} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { fetchBackend } from '../helpers/Backend';
import {
  ToastAndroid,
} from "react-native";

export const AuthContext = React.createContext('auth');

const AUTHENTICATED = 'AUTHENTICATED';
const LOGGED_OUT = 'LOGGED_OUT';
const ACCESS_TOKEN_KEY = 'access_token';

/**
 * Se connecte au backend et vérifie si ces identifiants sont valides
 * 
 * @param {string} id Identifiant ECN
 * @param {string} password Mot de passe ECN
 * @returns Le résultat de la requète de connexion
 */
const loginUser = (id, password) =>
  fetchBackend('signin', {
    method: 'post',
    body: {
      id: id,
      password: password,
    },
  }).then(res => res.json());

/**
 * Se connecte au backend et vérifie si le token est valide
 * @param {*} token Token jwt de connexion
 * @returns Le résultat de la requète de validation du token
 */
const refreshToken = token =>
  fetchBackend("authtest", {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(result => result.json());

const timeout = (ms, promise) => {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("timeout"))
        }, ms);
        promise.then(resolve, reject)
    })
};
  
/**
 * Component qui gère l'état authentifié ou non de l'utilisateur
 */
export const AuthContainer = (props) => {
  //Permet de changer le state du composant en fonction de si on est connecté ou non
  const [authState, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        // Handle the AUTHENTICATED action and set the state to be authenticated
        case AUTHENTICATED:
          return {
            ...state,
            authenticated: true,
            initialized: true,
            accessToken: action.token,
          };
        case LOGGED_OUT:
            return {
              ...state,
              authenticated: false,
              initialized: true,
              accessToken: null,
            };
        default:
          throw new Error(`${action.type} is not a valid action type`);
      }
    },
    { //Etat initial
      authenticated: false,
      initialized: false,
      accessToken: null,
    },
  );

  // Memoize this facade since it shouldn't be recreated every render
  // Contient les fonctions pour se connecter/se déconnecter
  const facade = useMemo(
    () => ({
      login: async (id, password) => {
        try {
          console.log("Do signin");
          //Connexion au ldap et vérification des identifiants
          const result = await loginUser(id, password);

          console.log('result', result);
          
          //Si ça a marché
          if(result.authenticated) {
            //On sauvegarde le token
            await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, result.token);
  
            //Et on affiche l'application en tant qu'utilisateur connecté
            dispatch({type: AUTHENTICATED, token: result.token});

            return ""; //Indique à l'écran de connexion que l'authentification a fonctionné
          } else {
            return result.message; //Affiche le message d'erreur sur l'écran de connexion
          }
      
        } catch (error) {
          console.error(error);
          return "Erreur : "+error; //Affiche le message d'erreur sur l'écran de connexion
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

          result = await timeout(1000, refreshToken(token));
          console.log("Token result ",result);
          if(result.auth_error) {
            throw new Error("Erreur d'authentification : "+result.auth_error);
          }

          dispatch({type: AUTHENTICATED, token: token});
        } catch (error) {
          ToastAndroid.showWithGravity(
            "Erreur lors de la connexion, reconnectez-vous...",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );

          console.error(error);
          console.log("Logging out from here");
          EncryptedStorage.setItem(ACCESS_TOKEN_KEY, null);
          dispatch({type: LOGGED_OUT});
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
    <AuthContext.Provider value={{facade, authState}}>
        {console.log("Setting app state ",authState)}
      {props.children(authState)}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);