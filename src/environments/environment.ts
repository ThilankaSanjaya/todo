const baseUrl='https://60a21a08745cd70017576014.mockapi.io/api/v1/';

 export const environment = {

    production: false, // or true for environment.prod.ts
    proxyUrl: 'https://60a21a08745cd70017576014.mockapi.io/api/v1/',
   

    RES_TEST:{
        GET_ALL:`${baseUrl}todo`,
        GET_BY_ID:`${baseUrl}todo/`,
        SAVE:`${baseUrl}todo`,
        UPDATE_BY_ID:`${baseUrl}todo/`,
        DELETE_BY_ID:`${baseUrl}todo/`,
    }


};
