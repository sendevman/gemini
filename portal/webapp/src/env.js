const dev = 'http://34.197.64.57/srs/portal-api';
const local = 'http://localhost:3000/portal-api';
const tmaxio = 'https://prdesietest.dde.pr/schoolmax_tmax2-api';

const tmax1o_sitekey = "6Lffy0sUAAAAAEr5HqHBCLsf013N8K3XSpOLmeQ5";
const dev_sitekey = "6LfwnkkUAAAAABRldWNGMVuTb3ifCU_e9ZG6oI_J";

let config = {
    baseContext: "schoolmax_tmax2",
    restServer: tmaxio,
    loadingMinimumTime: 1000,
    reCAPTCHASiteKey: tmax1o_sitekey,
    publicPaths: ["/", "/registration", "/activate"]
};

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

export default config;
