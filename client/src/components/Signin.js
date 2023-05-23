import "../scss/signin.scss";
import UserApi from "../services/userApi";
import ErrorMessanger from "./ErrorMessaging";

class Signin {
    constructor() {
        this.#render();
        this.#loadEventListeners();
    }

    #alertElement(element) {
        document.querySelector(`#signin-box .group #${element}-label`).classList.add("alert");
        document.querySelector(`#signin-box .group #${element}-input`).classList.add("alert");
    }

    #removeAlert(element) {
        document.querySelector(`#signin-box .group #${element}-label`).classList.remove("alert");
        document.querySelector(`#signin-box .group #${element}-input`).classList.remove("alert");
    }
    
    #signin = async (event) => {
        if(event.target.id === "signin-btn") {
            event.preventDefault();

            const email = document.querySelector("#signin-box .group input[type='email']").value;
            const password = document.querySelector("#signin-box .group input[type='password']").value;

            if(!email || !password) {

                if(!email) {
                    this.#alertElement("ei");
                    setTimeout(() => {
                        this.#removeAlert("ei");
                    }, 3000);
    
                }

                if(!password) {
                    this.#alertElement("p");
                    setTimeout(() => {
                        this.#removeAlert("p");
                    }, 3000);
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

            await UserApi.signin({email, password});

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
                        <label id='ei-label' for="email">Email</label>
                        <input id='ei-input' type="email">
                    </div>

                    <div class="group">
                        <label id='p-label' for="password">Password</label>
                        <input id='p-input' type="password">
                    </div>

                    <button id='signin-btn' class="btn-dark">Submit</button>
                </form>
            </div>
        `;
    }
}

export default Signin;
