import "../scss/feed.scss";
import PostApi from "../services/postApi";

class Feed {
    #posts;
    
    constructor() {
        this.#render();
        this.#loadEventListeners();
        
        this.#posts = [];
        window.dispatchEvent(new Event("displayPosts"));
    }

    #getPosts = async () => {
        const token = window.sessionStorage.getItem("token");

        const response = await PostApi.getPosts();

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

        window.addEventListener("hideUploader", this.#hideUploader);
        window.addEventListener("displayPosts", this.#getPosts);
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