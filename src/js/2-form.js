const form = document.querySelector(".feedback-form");
const localStorageKey = "feedback-form-state";
form.addEventListener("input", ()=> {
    const userEmail = form.elements.email.value;
    const userMessage = form.elements.message.value;
    const userData = {
        email: userEmail,
        message: userMessage,
    }
    
    saveToLs(localStorageKey, userData);
});
function saveToLs(key, value) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data)
}
function loadFromLs(key) {
    const data = localStorage.getItem(key)
    try {
        const result = JSON.parse(data);
        return result;
    } catch (error) {
        return data;
    }
}
function restoreData() {
    const {email, message} = loadFromLs(localStorageKey) || {};
    form.elements.email.value = email || '';
    form.elements.message.value = message || '';
}
restoreData();

form.addEventListener("submit", e=> {
    e.preventDefault();
    const {email, message} = loadFromLs(localStorageKey) || {};
    if (email === "" || message === "") {
        return;
      }
    console.log({email, message});
    localStorage.removeItem(localStorageKey);
    form.reset();
})

