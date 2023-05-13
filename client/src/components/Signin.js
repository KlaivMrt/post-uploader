import "../scss/signin.scss";
import UserApi from "../services/userApi";
import ErrorMessanger from "./ErrorMessaging";

class Signin {
    constructor() {
        this.#render();
        this.#loadEventListeners();
    }

    #alertEmail() {
        document.querySelector("#signin-box .group label[for='email']").classList.add("alert");
        document.querySelector("#signin-box .group input[type='email']").classList.add("alert");
    }

    #alertPass() {
        document.querySelector("#signin-box .group label[for='password']").classList.add("alert");
        document.querySelector("#signin-box .group input[type='password']").classList.add("alert");
    }

    #removeAlertE() {
        document.querySelector("#signin-box .group label[for='email']").classList.remove("alert");
        document.querySelector("#signin-box .group input[type='email']").classList.remove("alert");
    }

    #removeAlertP() {
        document.querySelector("#signin-box .group label[for='password']").classList.remove("alert");
        document.querySelector("#signin-box .group input[type='password']").classList.remove("alert");
    }
    
    #signin = async (event) => {
        if(event.target.id === "signin-btn") {
            event.preventDefault();

            const email = document.querySelector("#signin-box .group input[type='email']").value;
            const password = document.querySelector("#signin-box .group input[type='password']").value;

            if(!email || !password) {

                if(!email) {
                    this.#alertEmail();
                    setTimeout(this.#removeAlertE, 3000);
    
                }

                if(!password) {
                    this.#alertPass();
                    setTimeout(this.#removeAlertP, 3000);
                }

                return;
            }

            if(!/^\w+([\.-]?\w+)*@((gmail)|(hotmail)|(outlook)).([a-z]{2,3})$/.test(email)) {
                ErrorMessanger.credentialError("Invalid email");
                return;
            }

            if(password.length < 8 || password.length > 18) {
                ErrorMessanger.credentialError("Password should be between 8 and 18 characters long");
                return;
            }

            const response = await UserApi.signin({email, password});

            // window.location.href = "./feed.html";
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
                        <label for="email">Email</label>
                        <input type="email">
                    </div>

                    <div class="group">
                        <label for="password">Password</label>
                        <input type="password">
                    </div>

                    <button id='signin-btn' class="btn-dark">Submit</button>
                </form>
            </div>
        `;
    }
}

export default Signin;
