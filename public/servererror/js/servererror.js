
    window.onload = () => {
        document.querySelector("#status-msg").innerText = localStorage.getItem("lang") === "in" ? "ADA YANG SALAH!" : "SOMETHING WENT WRONG!"
    
        document.querySelector("#status-link").innerText = localStorage.getItem("lang") === "in" ? "KEMBALI" : "GO BACK"
    }
