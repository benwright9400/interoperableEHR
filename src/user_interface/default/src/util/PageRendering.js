class PageRendering {

    constructor() { }

    static async shouldRenderDefault(page, contentInfo) {
        console.log("rendering info");
        console.log(page);
        console.log(contentInfo);

        let results = await fetch("http://127.0.0.1:3055/render/rules", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ subject: page, ...contentInfo })
        });
        console.log(results);

        let resultsJson = await results.json();

        console.log(resultsJson);

        return resultsJson;
    }

}

export default PageRendering;