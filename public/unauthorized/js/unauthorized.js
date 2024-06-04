// status-msg
// status-link

window.onload = () => {
    document.querySelector("#status-msg").innerText = localStorage.getItem("lang") === "in" ? "TIDAK SAH" : "UNAUTHORIZED"

    document.querySelector("#status-link").innerText = localStorage.getItem("lang") === "in" ? "KEMBALI" : "GO BACK"
}
