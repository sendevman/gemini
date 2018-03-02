const dev = 'http://34.197.64.57/srs/portal-api';
const local = 'http://localhost:3000/portal-api';

let config = {
    baseContext: "srs",
    restServer: dev,
    loadingMinimumTime: 1000,
    reCAPTCHASiteKey: "6LfwnkkUAAAAABRldWNGMVuTb3ifCU_e9ZG6oI_J",
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
