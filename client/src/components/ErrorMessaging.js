import "../scss/errormessager.scss";

class ErrorMessanger {

    static credentialError(msg) {
        document.body.innerHTML += `
            <div id="error-messanger">
                <p>${msg}</p>
            </div>
        `;

        setTimeout(() => {
            document.getElementById("error-messanger").remove();
        }, 3000);
    }
}

export default ErrorMessanger;
