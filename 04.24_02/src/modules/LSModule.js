const LS_KEY = "MY_TASKS";

const readFromLS = () => {
    const data = localStorage.getItem(LS_KEY);
    if ( data ){
        return JSON.parse(data);
    } else {
        return [];
    }
}

const saveToLS = (data) => {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export {readFromLS, saveToLS};