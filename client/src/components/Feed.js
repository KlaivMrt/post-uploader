import "../scss/feed.scss";

class Feed {
    #posts;
    
    constructor() {
        this.#render();
        this.#loadEventListeners();
        
        this.#posts = [];
    }

    #showUploader(event) {
        if(event.target.id === "add-post") {
            document.getElementById("uploader-box").classList.add("show");
            document.getElementById("overlay").style.visibility = "visible";

            document.dispatchEvent(new Event("hideUploader"));
        }
    }

    #hideUploader(event) {
        if(event.target.id === "overlay" || event.type === "hideUploader") {
            document.getElementById("uploader-box").classList.remove("show");
            document.getElementById("overlay").style.visibility = "hidden";
        }
    }
    
    #loadEventListeners() {
        window.addEventListener("click", this.#showUploader);
        window.addEventListener("click", this.#hideUploader);
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