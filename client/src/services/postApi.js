import ErrorMessanger from "../components/ErrorMessaging";

class PostApi {
    #url;
    
    constructor() {
        this.#url = "/api/post";
    }

    createPost = async (body) => {
        try {
            const postUrl = this.#url + "/create";
            const response = await fetch(postUrl, {
                method: "POST",
                body: body
            });

            // const data = await response.json();

            // console.log(data);
            
            // return data;
        } catch (error) {
            console.error(error);
            //TODO: render an error element/page
            // ErrorMessanger.serverError();
        }
    }
}

export default new PostApi();
