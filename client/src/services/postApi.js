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
                method: "GET",
                headers: {
                    "Authorization": window.sessionStorage.getItem("token")
                }
            });

            const data = await response.json();

            return data;
        } catch (error) {
            console.error(error);
            //TODO: render an error element/page
            // ErrorMessanger.serverError();
        }
    }
    
    getPosts = async() => {
        try {
            const getUrl = this.#url + `/get-posts`;
            
            const response = await fetch(getUrl, {
                method: "GET",
                headers: {
                    "Authorization": window.sessionStorage.getItem("token")
                }
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
                headers: {
                    "Authorization": window.sessionStorage.getItem("token")
                },
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
            await fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    "Authorization": window.sessionStorage.getItem("token")
                }
            });
        } catch (error) {
            console.error(error);
            //TODO: render an error element/page
            // ErrorMessanger.serverError();
        }
    }

    updatePost = async (post) => {
        try {
            const putUrl = this.#url + "/update";
            await fetch(putUrl, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": window.sessionStorage.getItem("token")                },
                body: JSON.stringify(post)
            });

        } catch (error) {
            console.error(error);
            //TODO: render an error element/page
            // ErrorMessanger.serverError();
        }
    }
}

export default new PostApi();
