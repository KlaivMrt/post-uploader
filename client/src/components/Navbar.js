<<<<<<< HEAD
import "../scss/navbar.scss"

class Navbar {
    constructor() {
        this.#loadEventListeners();
        this.#render();
    }

    #hideSettings(event) {
        if(!document.getElementById("settings-menu").contains(event.target)) {
            document.getElementById("settings-menu").classList.remove("show");
        }
    }

    #showSettingsHandler(event) {
        if(event.target.id === "settings") {
            if(document.getElementById("settings-menu").classList.contains("show")){
                document.getElementById("settings-menu").classList.remove("show");
            } else {
                document.getElementById("settings-menu").classList.add("show");
            }
        }

    }

    #render() {
        document.body.innerHTML += `
            <header>
                <nav>
                    <div id="symbol">
                        <span id="symbol-logo"></span>
                        <span id="symbol-name"></span>
                    </div>

                    <ul id="options">
                        <li id="settings">Settings</li>
                    </ul>
                </nav>
                <div id='settings-menu'>
                    <ul>
                        <li id="signout">Sign Out</li>
                    </ul>
                </div>
            </header>
        `;
    }

    #loadEventListeners() {
        // hideSettings should alwas be added first
        window.addEventListener("click", this.#hideSettings);
        window.addEventListener("click", this.#showSettingsHandler);
    }
}

export default Navbar;
=======
import "../scss/navbar.scss"
import ErrorMessanger from "./ErrorMessaging";

class Navbar {
    #posts;
    
    constructor() {
        this.#loadEventListeners();
        this.#authenticationCheck();
        this.#render();
    }

    #hideSettings(event) {
        if(!document.getElementById("settings-menu").contains(event.target)) {
            document.getElementById("settings-menu").classList.remove("show");
        }
    }

    #showSettingsHandler(event) {
        if(event.target.id === "toggler") {
            if(document.getElementById("settings-menu").classList.contains("show")){
                document.getElementById("settings-menu").classList.remove("show");
            } else {
                document.getElementById("settings-menu").classList.add("show");
            }
        }

    }

    #authenticationCheck() {
        if(!window.sessionStorage.getItem("token")) {
            ErrorMessanger.authenticationError("You're not Authenticated. Please, sign in.");
            return;
        }
    }

    #signout(event) {
        if(event.target.id === "signout") {
            window.sessionStorage.clear();
            window.location.href = "./";
        }
    }

    #loadEventListeners() {
        // hideSettings should alwas be added first
        window.addEventListener("click", this.#hideSettings);
        window.addEventListener("click", this.#showSettingsHandler);
        window.addEventListener("click", this.#signout);

        document.addEventListener("hideUploader", () => {
            document.getElementById("settings-menu").classList.remove("show");
        });
    }

    #render() {
        document.body.innerHTML += `
            <header>
                <nav>
                    <div id="symbol">
                        <span id="symbol-logo"></span>
                        <span id="symbol-name">${window.sessionStorage.getItem("user")}</span>
                    </div>

                    <ul id="options">
                        <li id="toggler"></li>
                    </ul>
                </nav>
                <div id='settings-menu'>
                    <ul>
                        <li id="signout">Sign Out</li>
                        <li id="add-post">Add Post</li>
                    </ul>
                </div>
            </header>
        `;
    }
}

export default Navbar;
>>>>>>> refs/remotes/origin/master
