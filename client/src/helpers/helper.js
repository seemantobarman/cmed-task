//access user from the local stroage
export const getUser = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("user")) {
            return sessionStorage.getItem("user");
        } else {
            return false;
        }
    }
};

//remove user from session stroge
export const logout = (callback) => {
    if (window !== "undefined") {
        sessionStorage.removeItem("user");
    }
    callback();
};
