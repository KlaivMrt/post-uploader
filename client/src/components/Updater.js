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
    
    displayPost = (post) => {
        this.#post = post;

        document.getElementById("up-img").style.content = `url("${post.imageUrl}")`;
        document.getElementById("up-caption").value = post.caption;
        
        this.#show();
    }

    #deletePost = (event) => {
        if(event.target.id === "delete-btn") {
            event.preventDefault();
            PostApi.deletePost(this.#post._id);

            document.dispatchEvent(new Event("displayPosts"));
            document.dispatchEvent(new Event("hideUpdater"));
        }
    }
    
    #loadEventListeners = () => {
        window.addEventListener("click", this.#hide);
        window.addEventListener("click", this.#deletePost);

        document.addEventListener("hideUpdater", this.#hide);
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