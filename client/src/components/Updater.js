import "../scss/updater.scss";
import PostApi from "../services/postApi";

class Updater {
    #post;
    
    constructor() {
        this.#render();
        this.#loadEventListeners();

        this.#post = {};
    }

    #show() {
        document.getElementById("updater-box").classList.add("show");
        document.getElementById("overlay").style.visibility = "visible";
    }

    #hide = (event) => {
        if(event.target.id === "overlay" || event.type === "hideUpdater") {
            document.getElementById("updater-box").classList.remove("show");
            document.getElementById("overlay").style.visibility = "hidden";

        }
    }
    
    #getPost = async (event) => {
        if(event.target.className === "post-img") {

            const response = await PostApi.getPost(event.target.parentElement.id);

            this.#post = response.data;

            document.getElementById("up-img").style.content = `url("${this.#post.imageUrl}")`;
            document.getElementById("up-caption").value = this.#post.caption;
            
            this.#show();
        }
    }

    #deletePost = async (event) => {
        if(event.target.id === "delete-btn") {
            event.preventDefault();
            await PostApi.deletePost(this.#post._id);

            window.dispatchEvent(new Event("displayPosts"));
            window.dispatchEvent(new Event("hideUpdater"));
        }
    }

    #updatePost = async (event) => {
        if(event.target.id === "update-btn") {
            event.preventDefault();
            const caption = document.getElementById("up-caption").value;

            this.#post.caption = caption;

            await PostApi.updatePost(this.#post);

            window.dispatchEvent(new Event("displayPosts"));
            window.dispatchEvent(new Event("hideUpdater"));
        }
    }
    
    #loadEventListeners = () => {
        window.addEventListener("click", this.#hide);
        window.addEventListener("click", this.#deletePost);
        window.addEventListener("click", this.#updatePost);
        window.addEventListener("click", this.#getPost);

        window.addEventListener("hideUpdater", this.#hide);
    }

    #render() {
        document.body.innerHTML += `
        <div id="updater-box">
            <form>
                <img id="up-img" src="">
                <textarea id="up-caption"></textarea>
                <div class="group">
                    <button id="update-btn" class="btn-light">Update</button>
                    <button id="delete-btn" class="btn-light">Delete</button>
                </div>
            </form>
        </div>
        `;
    }
}

export default Updater;