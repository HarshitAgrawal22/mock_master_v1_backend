exports.url = "http://127.0.0.1:4000/"
exports.secretKey = "Agrawal"
exports.getCookie = (name) => {
    const value = `${document.cookie}`;
    const parts = value.split(`${name}=`)[1];
    return parts;
}

exports.deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

exports.fileDatabase = "http://popcornwar.pythonanywhere.com/"

exports.MediaBankUrl = "http://popcornwar.pythonanywhere.com/"