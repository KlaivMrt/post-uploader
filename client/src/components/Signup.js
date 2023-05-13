import "../scss/signup.scss";
import userApi from "../services/userApi";
import ErrorMessanger from "./ErrorMessaging";

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
                        <label id='n-label'>Username</label>
                        <input type="text">
                    </div>

                    <div class="group">
                        <label id='e-label'>Email</label>
                        <input type="email">
                    </div>

                    <div class="group">
                        <label id='p1-label'>Password</label>
                        <input id="pass1" type="password">
                    </div>

                    <div class="group">
                        <label id='p1-labe2'>Confirm Password</label>
                        <input id="pass2" type="password">
                    </div>

                    <button id='signup-btn' class="btn-dark">Submit</button>
                </form>
            </div>
        `;
    }
}

export default Signup;

