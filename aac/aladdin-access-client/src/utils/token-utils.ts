export const getAccessTokenInfo = (accessToken: string | undefined) : any => {
    if (!accessToken) {
        return {};
    }
    const parts = getTokenParts(accessToken);
    const decodedToken = decode(parts[1]);
    const parsedToken = JSON.parse(decodedToken);    
    return parsedToken;
}

export const getTokenParts = (token: string | undefined): string[] => {

    if (token) {
        return token.split(".");
    }

    return [] as string[];
}

export const decode = (part: string): string => {
    return atob(part);     
}