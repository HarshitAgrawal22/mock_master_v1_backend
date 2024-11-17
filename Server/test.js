
async function name(params) {

    let response = await fetch("http://ideaflux.pythonanywhere.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: "http://popcornwar.pythonanywhere.com/media/resume/offer_letter.pdf" })
    }

    );


    const objext = await response.json()
    console.log(objext.text);
}
name()