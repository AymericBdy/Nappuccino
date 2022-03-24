//Exécute une requète sur le serveur de back-end en utilisant le token d'authentification si on est connecté et que auth est défini
export function fetchBackend(url, request, auth) {
    if(auth) {
        console.log("Is auth");
        request = {
            ...request,
            headers: authHeader(auth),
        }
        console.log("Headers ",request.headers);
    }
    if(request) {
        if (request.body) {
            request.headers = {
                ...request.headers,
                'Content-Type': 'application/json',
            }
            request.body = JSON.stringify(request.body);
        }
    }
    console.log("Fetch with ",request);
    console.log("url "+backendUrl() + url);
    if(!request) {
        console.log("There is no header :/");
    } else {
        console.log("FiHeaders ",request.headers);
    }
    return fetch(backendUrl() + url, request);
}

// helper functions

function authHeader(auth) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = auth.authState.accessToken;
    const isLoggedIn = !!token;
    console.log("Auth status is ",token," ",isLoggedIn," ", auth.authState);
    if (isLoggedIn) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function backendUrl() {
    return "https://api.nappuccino.molina.pro/";
}
