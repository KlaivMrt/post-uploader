import ErrorMessanger from "../components/ErrorMessaging";

class UserApi {
    #url;

    constructor() {
        this.#url = "/api/user";
    }
    
    signin = async (body) => {
        try {
            const urlSignin = this.#url + "/signin";

            const response = await fetch(urlSignin, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();

            window.sessionStorage.setItem("token", data.token);
            window.sessionStorage.setItem("user", data.data.username);
            window.sessionStorage.setItem("_id", data.data._id);
            
            return data;
        } catch (error) {
            console.error(error);
            //TODO: render an error element/page
            // ErrorMessanger.serverError();
        }
    }

    signup = async (body) => {
        try {
            const urlSignup = this.#url + "/signup";

            const response = await fetch(urlSignup, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            window.sessionStorage.setItem("token", data.token);
            window.sessionStorage.setItem("user", data.data.username);
            
            return data;
        } catch (error) {
            console.error(error);
            //TODO: render an error element/page
            // ErrorMessanger.serverError();
        }
    }
}

export default new UserApi();
