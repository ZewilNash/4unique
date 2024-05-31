window.onload = () => {
    let user = JSON.parse(localStorage.getItem("4unique-user"));

    if(!user){
        window.location.href = "/login";
    }

    if(user && user.user.role === "admin"){
        window.location.href = "/4unique-admin"
    }

    document.querySelector(".main").style.display = "none";

    setTimeout(() => {
        document.querySelector(".main").style.display = "block";
        document.querySelector(".loader").style.display = "none";
    }, 4000)

}
