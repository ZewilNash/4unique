window.onload = () => {
    let user = JSON.parse(localStorage.getItem("4unique-user"));

    if(user){
        window.location.href = "/home";
    }

    if(user && user.user.role === "admin"){
        window.location.href = "/4unique-admin"
    }
   
    document.querySelector(".form").style.display = "none";

    setTimeout(() => {
        document.querySelector(".form").style.display = "block";
        document.querySelector(".loader").style.display = "none";
    }, 4000)

    document.querySelector("#hidePass").style.display = "none";
}


document.querySelector("#showPass").addEventListener("click" , (e) => {
    document.querySelector("#password").setAttribute("type" , "text");
    document.querySelector("#hidePass").style.display = "block";
    e.target.style.display = "none"
})

document.querySelector("#hidePass").addEventListener("click" , (e) => {
    document.querySelector("#password").setAttribute("type" , "password");
    document.querySelector("#showPass").style.display = "block";
    e.target.style.display = "none"
})

document.querySelector("#signup-btn").addEventListener("click", (event) => {
    event.preventDefault();

    let fullname = document.querySelector("#fullname").value;

    let email = document.querySelector("#email").value;

    let password = document.querySelector("#password").value;


    createUser(fullname, email, password);

})


// /api/v1/auth
function createUser(fullname, email, password) {

    let url = document.URL;

    url = url.split("register")[0];


    axios.post(url + "api/v1/auth/signup", { fullname, email, password }).then(res => {

        let msg = res.data.msg;
        let token = res.data.token;
        let user = res.data.user;

        let userObj = {
            user: user,
            token: token
        }

        localStorage.setItem("4unique-user", JSON.stringify(userObj));

        document.querySelector("#signup-btn").disabled = true;

        let HTML = `<p class="success-message">${localStorage.getItem("4unique-lang") === "in" ? "AKUN ANDA TELAH DIBUAT DENGAN SUKSES" : msg}</p>`;

        document.querySelector("#success").innerHTML += HTML;

        setTimeout(() => {
            document.querySelector("#success").innerHTML = "";
            document.querySelector("#signup-btn").disabled = false;

            window.location.href = "/home";

        }, 3000)



    }).catch(err => {

        let errors = err.response.data.msg.split(",");

        errors.forEach(err => {

            if (err.includes("FullName")) {
                let HTML = `<p class="error-message">${localStorage.getItem("4unique-lang") === "in" ? `Anda Harus Memberikan Nama Lengkap
                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            } else if (err.includes("PROVIDE AT LEAST 8 CHARACTERS FOR PASSWORD")) {
                let HTML = `<p class="error-message">${localStorage.getItem("4unique-lang") === "in" ? `HARAP MEMBERIKAN MINIMAL 8 KARAKTER UNTUK PASSWORD

                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            }

            else if (err.includes("Email")) {
                let HTML = `<p class="error-message">${localStorage.getItem("4unique-lang") === "in" ? `Anda Harus Memberikan Email
                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            } else if (err.includes("Password")) {
                let HTML = `<p class="error-message">${localStorage.getItem("4unique-lang") === "in" ? `Anda Harus Memberikan Kata Sandi

                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            }
            else if (err.includes("Duplicate")) {
                let HTML = `<p class="error-message">${localStorage.getItem("4unique-lang") === "in" ? `KAMI MENEMUKAN EMAIL ANDA. SILAHKAN COBA LOGIN

                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            }


            // let HTML = `<p class="error-message">${err}</p>`;

            // document.querySelector("#errors").innerHTML += HTML;


        });

        setTimeout(() => {
            document.querySelector("#errors").innerHTML = "";
        }, 3000)


    });





}

// language setup
const translations = {
    en: {
        
        up_1: "YOU ARE ALMOST THERE",
        up_2: "JOIN US & DISCOVER OUR PRODUCTS",
        up_3: "WE'RE WAITING FOR YOUR ORDER",
        up_4: "fullname",
        up_5: "email",
        up_6: "password",
        up_7: "Signup",
        up_8: "Have an account ?",
        up_9: "Login"
    },

    in: {
        up_1: "ANDA HAMPIR SAMPAI",
        up_2: "BERGABUNGLAH DENGAN KAMI & TEMUKAN PRODUK KAMI",
        up_3: "KAMI TUNGGU PESANAN ANDA",
        up_4: "nama lengkap",
        up_5: "surel",
        up_6: "kata sandi",
        up_7: "Mendaftar",
        up_8: "Punya akun?",
        up_9: "Gabung"
    }
}

// load the select images


const setLanguage = (language) => {
    document.querySelectorAll("[data-lang]").forEach(element => {
        const translationKey = element.getAttribute("data-lang")

        if (element.getAttribute('id') === "food_qty") {
            element.placeholder = translations[language][translationKey]
        } else {
            element.innerText = translations[language][translationKey]
        }
    })
}

const langParams = localStorage.getItem("4unique-lang") || "en"
setLanguage(langParams)