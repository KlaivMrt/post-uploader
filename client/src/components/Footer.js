import "../scss/footer.scss";

class Footer {
    static render() {
        document.body.innerHTML += `
            <footer>
                <p>All rights reserved &copy;. KM 2023</p>
            </footer>
        `;
    }
}

export default Footer;