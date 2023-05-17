import "../scss/signin.scss";

class Signin {
    constructor() {
        this.#render();
        this.#loadEventListeners();
    }

    
    #signin(event) {
        if(event.target.id === "signin-btn") {
            event.preventDefault();

            window.location.href = "./feed.html";
        }
    }

    #loadEventListeners() {
        window.addEventListener("click", this.#signin);
    }

    #render() {
        document.body.innerHTML += `
            <div id="signin-box">
                <form>
                    <div class="group">
                        <label>Email</label>
                        <input type="email">
                    </div>

                    <div class="group">
                        <label>Password</label>
                        <input type="password">
                    </div>

                    <button id='signin-btn' class="btn-dark">Submit</button>
                </form>
            </div>
        `;
    }
}

export default Signin;
