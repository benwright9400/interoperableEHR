class ServerURL {

    static url = "http://127.0.0.1:3055";

    static getURL() {
        console.log(this.url);
        return this.url;
    }

}

export default ServerURL;