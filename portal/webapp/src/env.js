//api
const dev = 'http://34.197.64.57/srs/portal-api';
const local = 'http://localhost:3000/srs-api';
const tmaxio = 'https://prdesietest.dde.pr/schoolmax_tmax2-api';
const pmax1o = 'https://prdesieprod.dde.pr/registro-api';

//google sitekey
//todo: fran generate one for production please
const pamx1o_sitekey = "";
const tmax1o_sitekey = "6Lffy0sUAAAAAEr5HqHBCLsf013N8K3XSpOLmeQ5";
const dev_sitekey = "6LfwnkkUAAAAABRldWNGMVuTb3ifCU_e9ZG6oI_J";

//base context
const pmax1o_base = "registro";
const tmax1o_base = "schoolmax_tmax2";
const local_base = "srs";

//todo: fran do logic here to determine these props dynamically
const BASE_CONTEXT = tmax1o_base;
const REST_URL = tmaxio;
const SITE_KEY = tmax1o_sitekey;

let config = {
    baseContext: BASE_CONTEXT,
    restServer: REST_URL,
    loadingMinimumTime: 1000,
    reCAPTCHASiteKey: SITE_KEY,
    userActionPath: ["/login", "/registration", "/activate", "/forgot", "/reset", "/cancel"],
};

config.publicPaths = ["/", ...config.userActionPath];


export function isPublicUrl(currentPath) {
    let isPublic = false;
    for (let path of config.publicPaths) {
        if (path !== "/" && currentPath.startsWith(path))
            return true;
        else
            isPublic |= path === currentPath;
    }
    return isPublic;
}

export function isUserActionUrl(currentPath) {
    let isPublic = false;
    for (let path of config.publicPaths) {
        if (path !== "/" && currentPath.startsWith(path))
            return true;
        else
            isPublic |= path === currentPath;
    }
    return isPublic;
}

export default config;
