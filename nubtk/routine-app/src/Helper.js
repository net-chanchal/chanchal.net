class Helper {
    constructor() {
        this.STORE_NAME = 'nubtk';
    }

    getLocalStorageData(key = null) {
        const data = localStorage.getItem(this.STORE_NAME);
        if (data) {
            const json = JSON.parse(data);

            if (json.hasOwnProperty(key)) {
                return json[key];
            }

            return json;
        } else {
            return null;
        }
    }

    setLocalStorageData(json) {
        let data;

        if (this.getLocalStorageData()) {
            data = JSON.stringify(Object.assign(this.getLocalStorageData(), json));
        } else {
            data = JSON.stringify(json);
        }

        if (data) {
            localStorage.setItem(this.STORE_NAME, data);
        }
    }

    removeLocalStorage(key) {

        try {
            if (key) {
                const data = this.getLocalStorageData();
                if (data.hasOwnProperty(key)) {
                    delete data[key];
                    localStorage.setItem(this.STORE_NAME, JSON.stringify(data));
                }
            } else {
                localStorage.clear();
            }

            return true;
        } catch (error) {
            alert(error);
        }
    }

    isSignup() {
        return this.getLocalStorageData() !== null;
    }
}

export default new Helper();