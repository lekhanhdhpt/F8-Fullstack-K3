const SERVER_API = "https://api-exercise-sopi.vercel.app/api/v1";

export const client = {
    apiKey: null,

    setApiKey: function(apiKey) {
        this.apiKey = apiKey;
    },

    send: async function(url, method = "GET", body = null) {
        const checkUrl = /\/api\-key\?/;
        const request = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            }
        }

        if (!checkUrl.test(url)) request.headers[`X-Api-Key`] = this.apiKey;
        if (body) request.body = JSON.stringify(body);

        const response = await fetch(`${SERVER_API}${url}`, request);
        const data = await response.json();

        return {response, data};
    },

    get: function(url) {
        return this.send(url);
    },

    post: function (url, body) {
        return this.send(url, "POST", body);
    },

    put: function (url, body) {
        return this.send(url, "PUT", body);
    },

    patch: function (url, body) {
        return this.send(url, "PATCH", body);
    },

    delete: function (url) {
        return this.send(url, "DELETE");
    }
}