
    window.onload = () => {
        document.querySelector("#status-msg").innerText = localStorage.getItem("lang") === "in" ? "HALAMAN TIDAK DITEMUKAN!" : "PAGE NOT FOUND!"
    
        document.querySelector("#status-link").innerText = localStorage.getItem("lang") === "in" ? "KEMBALI" : "GO BACK"
    }