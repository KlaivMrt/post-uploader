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

