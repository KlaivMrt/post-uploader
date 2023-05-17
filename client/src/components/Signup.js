<<<<<<< HEAD
import "../scss/signup.scss";
class Signup {
    constructor() {
        this.#render();
        this.#loadEventListeners();
    }
    
    #signup(event) {
        if(event.target.id === "signup-btn") {
            event.preventDefault();
        }
    }

    #loadEventListeners() {

    }

    #render() {
        document.body.innerHTML += `
            <div id="signup-box">
                <form>
                    <div class="group">
                        <label>Username</label>
                        <input type="text">
                    </div>

                    <div class="group">
                        <label>Email</label>
                        <input type="email">
                    </div>

                    <div class="group">
                        <label>Password</label>
                        <input id="pass1" type="password">
                    </div>

                    <div class="group">
                        <label>Confirm Password</label>
                        <input id="pass2" type="password">
                    </div>

                    <button id='signup-btn' class="btn-dark">Submit</button>
                </form>
            </div>
        `;
    }
}

export default Signup;

=======
import "../scss/signup.scss";
import UserApi from "../services/userApi";
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
            const email = document.getElementById("eu-input").value;
            const pass1 = document.getElementById("p1-input").value;
            const pass2 = document.getElementById("p2-input").value;

            if(!username || !email || !pass1 || !pass2) {
                if(!username) {
                    this.#alertElement("u");
                    setTimeout(() => {
                        this.#removeAlert("u");
                    }, 1500);
                }
    
                if(!email) {
                    this.#alertElement("eu");
                    setTimeout(() => {
                        this.#removeAlert("eu");
                    }, 1500);
                }
    
                if(!pass1) {
                    this.#alertElement("p1");
                    setTimeout(() => {
                        this.#removeAlert("p1");
                    }, 1500);
                }
    
                if(!pass2) {
                    this.#alertElement("p2");
                    setTimeout(() => {
                        this.#removeAlert("p2");
                    }, 1500);
                }
                
                return;
            }

            if(!/^\w+([\.-]?\w+)$/.test(username) || username.length > 15 || username.length < 2) {
                ErrorMessanger.credentialError("Username must be between 15 and 2 characters, only [.-_] permited");
                return;
            }
            
            if(!/^\w+([\.-]?\w+)*@((gmail)|(hotmail)|(outlook)).([a-z]{2,3})$/.test(email)) {
                ErrorMessanger.credentialError("Invalid email");
                return;
            };

            if(pass1.length > 18 || pass1.length< 8) {
                ErrorMessanger.credentialError("Password must be 8 to 18 characters");
                return;
            }

            if(pass1 !== pass2) {
                ErrorMessanger.credentialError("Passwords don't much");
                this.#alertElement("p1");
                this.#alertElement("p2");
                setTimeout(() => {
                    this.#removeAlert("p1");
                    this.#removeAlert("p2");
                }, 1000);
                return;
            }
    
            UserApi.signup({
                username,
                email,
                password: pass1,
                password2: pass2
            });

            window.location.href = "./feed.html";
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
                        <label id='eu-label'>Email</label>
                        <input id='eu-input' type="email">
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

>>>>>>> refs/remotes/origin/master
