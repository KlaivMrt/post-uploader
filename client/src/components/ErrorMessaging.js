import "../scss/errormessager.scss";

class ErrorMessanger {

    static credentialError(msg) {
        document.body.innerHTML += `
            <div id="credential-error">
                <p>${msg}</p>
            </div>
        `;

        setTimeout(() => {
            document.getElementById("credential-error").remove();
        }, 3000);
    }

    static serverError(msg) {
        document.body.innerHTML += `
            <div id="server-error">
                <section>
                    <p>${msg}</p>
                </section>
            </div>
        `;

        setTimeout(() => {
            document.getElementById("server-error").remove();
        }, 5000);
    }

    static authenticationError(msg) {
            document.body.innerHTML += `
            <div id="authentication-error">
                <section>
                    <p>${msg}</p>
                </section>
            </div>
        `;
        
        setTimeout(() => {
            window.location.href = "./";
        }, 3000);
    }
}

export default ErrorMessanger;
