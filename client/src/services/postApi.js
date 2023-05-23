import ErrorMessanger from "../components/ErrorMessaging";

class PostApi {
    #url;
    
    constructor() {
        this.#url = "/api/post";
    }

    getPost = async (id) => {
        try {
            const getUrl = this.#url + `/get-post/${id}`;
            
            const response = await fetch(getUrl, {
                method: "GET"
            });

            const data = await response.json();

            return data;
        } catch (error) {
            console.error(error);
            //TODO: render an error element/page
            // ErrorMessanger.serverError();
        }
    }
    
    getPosts = async(id) => {
        try {
            const getUrl = this.#url + `/get-posts/${id}`;
            
            const response = await fetch(getUrl, {
                method: "GET",
            });

            if (response.data === "undefined") {
                console.log("No posts");
                return;
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error(error);
            //TODO: render an error element/page
            // ErrorMessanger.serverError();
        }
    }

    createPost = async (body) => {
        try {
            const postUrl = this.#url + "/create";
            const response = await fetch(postUrl, {
                method: "POST",
                body: body
            });

            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error(error);
            //TODO: render an error element/page
            // ErrorMessanger.serverError();
        }
    }

    deletePost = async (id) => {
        try {
            const deleteUrl = this.#url + `/delete/${id}`;
            const response = await fetch(deleteUrl, {
                method: "DELETE"
            });
            console.log(response);
        } catch (error) {
            console.error(error);
            //TODO: render an error element/page
            // ErrorMessanger.serverError();
        }
    }
}

export default new PostApi();
