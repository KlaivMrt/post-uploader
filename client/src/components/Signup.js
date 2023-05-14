import "../scss/signup.scss";
import userApi from "../services/userApi";
import ErrorMessanger from "./ErrorMessaging";

class Signup {
    constructor() {
        this.#render();
        this.#loadEventListeners();
    }

    #alertElement(element) {
        document.querySelector(`#signup-box .group #${element}-label`).classList.add("alert");
        document.querySelector(`#signup-box .group #${element}-input`).classList.add("alert");
    }

    #removeAlert(element) {
        document.querySelector(`#signup-box .group #${element}-label`).classList.remove("alert");
        document.querySelector(`#signup-box .group #${element}-input`).classList.remove("alert");
    }

    
    #signup = (event) => {
        if(event.target.id === "signup-btn") {
            event.preventDefault();
            
            const username = document.getElementById("u-input").value;
            const email = document.getElementById("e-input").value;
            const pass1 = document.getElementById("p1-input").value;
            const pass2 = document.getElementById("p2-input").value;

            if(!username || !email || !pass1 || !pass2) {
                if(!username) {
                    this.#alertElement("u");
                    setTimeout(() => {
                        this.#removeAlert("u");
                    }, 3000);
                }
    
                if(!email) {
                    this.#alertElement("e");
                    setTimeout(() => {
                        this.#removeAlert("e");
                    }, 3000);
                }
    
                if(!pass1) {
                    this.#alertElement("p1");
                    setTimeout(() => {
                        this.#removeAlert("p1");
                    }, 3000);
                }
    
                if(!pass2) {
                    this.#alertElement("p2");
                    setTimeout(() => {
                        this.#removeAlert("p2");
                    }, 3000);
                }
                
                return;
            }
            
            
            // window.location.href = "./feed.html";
        }
    }

    #loadEventListeners() {
        window.addEventListener("click", this.#signup);
    }

    #render() {
        document.body.innerHTML += `
            <div id="signup-box">
                <form>
                    <div class="group">
                        <label id='u-label'>Username</label>
                        <input id='u-input' type="text">
                    </div>

                    <div class="group">
                        <label id='e-label'>Email</label>
                        <input id='e-input' type="email">
                    </div>

                    <div class="group">
                        <label id='p1-label'>Password</label>
                        <input id="p1-input" type="password">
                    </div>

                    <div class="group">
                        <label id='p2-label'>Confirm Password</label>
                        <input id="p2-input" type="password">
                    </div>

                    <button id='signup-btn' class="btn-dark">Submit</button>
                </form>
            </div>
        `;
    }
}

export default Signup;

