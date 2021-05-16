/* helpers.js: various helper function definitions. */
export function validateEmail(str) {
    return /.+@.+\..+/.test(str);
}

export function formatPhoneNumber(str) {
    if (str.length < 10) return "Error!";
    return `${str.slice(0,3)}-${str.slice(3,6)}-${str.slice(6,10)}`;
}
