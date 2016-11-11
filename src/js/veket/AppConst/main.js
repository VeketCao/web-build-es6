/**
 * Created by Veket on 2016/11/11.
 */
const SERVER={
    DEV_API_URL:'http://host/developer',
    SIT_API_URL:'http://host/sit',
    UAT_API_URL:'http://host/uat',
    PRO_API_URL:'https:http://host/production',
    IS_D_ENV:true,
    IS_S_ENV:false,
    IS_U_ENV:false,
    IS_P_ENV:false
};

let TEMP_URL=SERVER.DEV_API_URL;

() => {
    if(SERVER.IS_S_ENV){
        TEMP_URL = SERVER.SIT_API_URL;
    }
    if(SERVER.IS_U_ENV){
        TEMP_URL = SERVER.IS_U_ENV;
    }
    if(SERVER.IS_P_ENV){
        TEMP_URL = SERVER.IS_P_ENV;
    }
};

/**export**/
export const LOGIN_USER="midea_usr_data";
export const API={
    test:TEMP_URL+'/test',
};
