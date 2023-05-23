import "../scss/feed.scss";
import PostApi from "../services/postApi";
import Updater from "./Updater";

class Feed {
    #posts;
    #updater;
    
    constructor() {
        this.#updater = new Updater();

        this.#render();
        this.#loadEventListeners();
        
        this.#posts = [];
        this.#getPosts();
    }

    #getPost = async (event) => {
        if(event.target.className === "post-img") {

            const response = await PostApi.getPost(event.target.parentElement.id);

            this.#updater.displayPost(response.data);
        }
    }

    #getPosts = async() => {
        const id = window.sessionStorage.getItem("_id");

        const response = await PostApi.getPosts(id);

        this.#posts = response.data;
        const feed = document.getElementById("feed");
        feed.innerHTML = "";

        this.#posts.forEach((post) => {
            feed.innerHTML += `
                <div class="post" id="${post._id}">
                    <img class="post-img" src="${post.imageUrl}">
                </div>
            `;
        });
    }

    #resetUploader() {
        document.getElementById("ca-input").value = "";
        document.getElementById("im-input").value = "";
    }

    #showUploader(event) {
        if(event.target.id === "add-post") {
            document.getElementById("uploader-box").classList.add("show");
            document.getElementById("overlay").style.visibility = "visible";
        }
    }

    #hideUploader = (event) => {
        if(event.target.id === "overlay" || event.type === "hideUploader") {
            document.getElementById("uploader-box").classList.remove("show");
            document.getElementById("overlay").style.visibility = "hidden";

            this.#resetUploader();
        }
    }
    
    #loadEventListeners = () => {
        window.addEventListener("click", this.#showUploader);
        window.addEventListener("click", this.#hideUploader);
        window.addEventListener("click", this.#getPost);

        document.addEventListener("hideUploader", this.#hideUploader);
        document.addEventListener("displayPosts", this.#getPosts);
    }

    #render() {
        document.body.innerHTML += `
            <div id='overlay'></div>
            <main id='feed'>
            </main>
        `;
    }
}

export default Feed;