import jwtDecode from "jwt-decode";
export function decodeToken(token){
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken;
    } catch (error) {
        console.error("Error on decode token:",error);
        return null;
    }
}


