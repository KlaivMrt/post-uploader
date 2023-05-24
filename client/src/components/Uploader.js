import "../scss/uploader.scss";
import PostApi from "../services/postApi";

class Uploader {
    constructor() {
        this.#render();
        this.#loadEventListener();
    }

    #removeAlert() {
        document.getElementById("im-input").classList.remove("alert");
    }

    #alert() {
        document.getElementById("im-input").classList.add("alert");
    }

    #uploadPost = async (event) => {
        if(event.target.id === "upload-btn") {
            event.preventDefault();
            const form = document.querySelector("#uploader-box form");
            const creator = window.sessionStorage.getItem("_id");
            const caption = document.getElementById("ca-input").value;
            const imagePath = document.getElementById("im-input");

            if(!imagePath.value) {
                this.#alert();
                setTimeout(this.#removeAlert, 3000);
                return;
            }
            
            const formData = new FormData(form);

            formData.append("creator", creator);
            formData.append("caption", caption);

            await PostApi.createPost(formData);

            window.dispatchEvent(new Event("displayPosts"));
            window.dispatchEvent(new Event("hideUploader"));
        }
    }

    #loadEventListener = () => {
        window.addEventListener("click", this.#uploadPost);
    }

    #render() {
        document.body.innerHTML += `
            <div id="uploader-box">
                <form>
                    <h2>New Post</h2>
                    <hr>
                    
                    <div class="group">
                        <input id="im-input" name='image' type="file">
                    </div>
        
                    <div class="group">
                        <textarea id="ca-input" cols="30" rows="10"></textarea>
                    </div>
        
                    <button id="upload-btn" class="btn-light">Upload</button>
                </form>
            </div>
        `;
    }
}

export default Uploader;
