import "../scss/uploader.scss";
import PostApi from "../services/postApi";

class Uploader {
    constructor() {
        this.#render();
        this.#loadEventListener();
    }

    #uploadPost = async (event) => {
        if(event.target.id === "upload-btn") {
            event.preventDefault();
            const creator = window.sessionStorage.getItem("_id");
            const caption = document.getElementById("ca-input").value;
            const imageUrl = document.getElementById("im-input").value;

            const formData = new FormData();
            formData.append("creator", creator);
            formData.append("caption", caption);
            formData.append("imageUrl", imageUrl);

            console.log(creator);
            console.log(caption);
            console.log(imageUrl);

            // await PostApi.createPost(formData);
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
                        <input id="im-input" type="file">
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
