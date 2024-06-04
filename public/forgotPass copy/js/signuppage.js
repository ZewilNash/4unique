window.onload = () => {

    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        window.location.href = "/home";
    }

    if (user && user.user.role === "admin") {
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

    url = url.split("signuppage")[0];


    axios.post(url + "api/v1/auth/signup", { fullname, email, password }).then(res => {

        let msg = res.data.msg;
        let token = res.data.token;
        let user = res.data.user;

        let userObj = {
            user: user,
            token: token
        }

        localStorage.setItem("user", JSON.stringify(userObj));

        document.querySelector("#signup-btn").disabled = true;

        let HTML = `<p class="success-message">${localStorage.getItem("lang") === "in" ? "AKUN ANDA TELAH DIBUAT DENGAN SUKSES" : msg}</p>`;

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
                let HTML = `<p class="error-message">${localStorage.getItem("lang") === "in" ? `Anda Harus Memberikan Nama Lengkap
                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            } else if (err.includes("PROVIDE AT LEAST 8 CHARACTERS FOR PASSWORD")) {
                let HTML = `<p class="error-message">${localStorage.getItem("lang") === "in" ? `HARAP MEMBERIKAN MINIMAL 8 KARAKTER UNTUK PASSWORD

                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            }

            else if (err.includes("Email")) {
                let HTML = `<p class="error-message">${localStorage.getItem("lang") === "in" ? `Anda Harus Memberikan Email
                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            } else if (err.includes("Password")) {
                let HTML = `<p class="error-message">${localStorage.getItem("lang") === "in" ? `Anda Harus Memberikan Kata Sandi

                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            }
            else if (err.includes("Duplicate")) {
                let HTML = `<p class="error-message">${localStorage.getItem("lang") === "in" ? `KAMI MENEMUKAN EMAIL ANDA. SILAHKAN COBA LOGIN

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
        search: "Search Food By Name",
        discover: "DISCOVER ALL",
        categories: "CATEGORIES",
        egyptian: "EGYPTIAN",
        indonesian: "INSONESIAN",
        egyindo: "EGYINDO",
        vip: "VIP",
        desserts: "DESSERTS",
        about: "ABOUT",
        contact: "CONTACT",
        track: "TRACK YOUR ORDERS STATUS",
        favourites: "MY FAVOURITES",
        quantity: "quantity",
        alsoLike: "YOU MAY ALSO LIKE",
        reviewTile: "SOME OF OUR CUSTOMERS REVIEWS",
        up_1: "YOU ARE ALMOST THERE",
        up_2: "JOIN US AND ENJOY THE FOOD",
        up_3: "WE'RE WAITING FOR YOUR ORDER",
        up_4: "fullname",
        up_5: "email",
        up_6: "password",
        up_7: "Signup",
        up_8: "Have an account ?",
        up_9: "Login"
    },

    in: {
        search: "Cari Makanan Berdasarkan Nama",
        discover: "TEMUKAN SEMUA",
        categories: "KATEGORI",
        egyptian: "MESIR",
        indonesian: "INDONESIA",
        egyindo: "MESIR&INDONESIA",
        vip: "VIP",
        desserts: "HIDANGAN PENUTUP",
        about: "TENTANG KAMI",
        // HUBUNGI KAMI
        contact: "HUBUNGI KAMI",
        // MELACAK STATUS PESANAN ANDA
        track: "MELACAK STATUS PESANAN ANDA",
        // FAVORIT SAYA
        favourites: "FAVORIT SAYA",
        quantity: "kuantitas",
        alsoLike: "ANDA MUNGKIN JUGA SUKA",
        reviewTile: "BEBERAPA ULASAN PELANGGAN",
        up_1: "ANDA HAMPIR SAMPAI",
        up_2: "BERGABUNGLAH DENGAN KAMI DAN NIKMATI MAKANANNYA",
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

const langParams = localStorage.getItem("lang") || "en"
setLanguage(langParams)