import "../scss/home.scss";

class Home {
    
    constructor() {
        this.#render();
        this.#loadEventListeners();

        document.getElementById("overlay").style.height = document.body.style.height;
    }
    #showOverlay() {
        document.getElementById("overlay").style.visibility = "visible";
    }

    #hideOverlay() {
        document.getElementById("overlay").style.visibility = "hidden";
    }

    #resetSignin() {
        document.querySelector("#signin-box form input[type='email']").value = "";
        document.querySelector("#signin-box form input[type='password']").value = "";
    }

    #showSignin = (event) => {
        if(event.target.id === "signin") {
            this.#showOverlay();
            document.getElementById("signin-box").classList.add("show");
        }
    }

    #hideSignin = (event) => {
        if(event.target.id === "overlay" || event.type === "hideSignin") {
            this.#hideOverlay();
            document.getElementById("signin-box").classList.remove("show");
            this.#resetSignin();
        }
    }

    #resetSignup() {
        document.querySelector("#signup-box form input[type='email']").value = "";
        document.querySelector("#signup-box form input[type='text']").value = "";
        document.querySelector("#signup-box form #pass1").value = "";
        document.querySelector("#signup-box form #pass2").value = "";
    }

    #showSignup = (event) => {
        if(event.target.id === "signup") {
            this.#showOverlay();
            document.getElementById("signup-box").classList.add("show");
        }
    }

    #hideSignup = (event) => {
        if(event.target.id === "overlay" || event.type === "hideSignup") {
            this.#hideOverlay();
            document.getElementById("signup-box").classList.remove("show");
            this.#resetSignup();
        }
    }

    #loadEventListeners() {
        window.addEventListener("click", this.#showSignin);
        window.addEventListener("click", this.#hideSignin);
        window.addEventListener("click", this.#showSignup);
        window.addEventListener("click", this.#hideSignup);

        // document.addEventListener("hideSignin", this.#hideSignin);
        // document.addEventListener("hideSignup", this.#hideSignup);
    }

    #render() {
        document.body.innerHTML += `
            <div id='overlay'></div>
            <main id="home">
                <h1>Welcome to <span>Post Share</span></h1>

                <p><span>Share </span>your stories, expreriences and deeds.<span>Make</span> connections and build 
                    a community.
                </p>

                <div id='user-credentials'>
                    <button id='signin' class='btn-light'>sign in</button>
                    <button id='signup' class='btn-light'>sign up</button>
                </div>

                <!-- <div id="background">
                    <svg id="matrix">
                    </svg>
                </div> -->
            </main>
            <div id='home-logo'></div>
        `;
    }
}

export default Home;
