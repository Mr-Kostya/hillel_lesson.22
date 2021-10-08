class TodoAPI {
    static TOKEN =
        "d32e74ac29fe26a554911fc03812a1e46df4c667a4c891fe98ad93ff068104c6";
    static URL = "https://gorest.co.in/public/v1/todos";
    static DELETE = "https://gorest.co.in/public/v1/todos/1";
    static HEADERS = {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${this.TOKEN}`
    };

    static getList() {
        return fetch(this.URL)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Data not available");
            })
            .then((data) => data.data);
    }

    static delete(id) {
        return fetch(`${this.URL}/${id}`, {
            method: "DELETE",
            headers: this.HEADERS
        }).then((res) => {
            if (!res.ok || res.status !== 204) {
                throw new Error("Can not complete the task");
            }
        });
    }
}
