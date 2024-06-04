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
    document.querySelector("#newPass").setAttribute("type" , "text");
    document.querySelector("#hidePass").style.display = "block";
    e.target.style.display = "none"
})

document.querySelector("#hidePass").addEventListener("click" , (e) => {
    document.querySelector("#newPass").setAttribute("type" , "password");
    document.querySelector("#showPass").style.display = "block";
    e.target.style.display = "none"
})


document.querySelector("#back_from_forgot").addEventListener("click", () => {
    document.querySelector("#code_container").classList.toggle("hide");
    document.querySelector("#not-code").classList.toggle("hide");

    document.querySelector("[data-lang='up_2']").style.display = "block"
    document.querySelector("[data-lang='up_3']").style.display = "block"
})

// email,code,newPass,confirmNewPass

document.querySelector("#resetPass-link").addEventListener("click" , (e) => {
    e.preventDefault();
    let url = document.URL;
    url = url.split("forgotPass")[0];
    let email = localStorage.getItem("email_forgot");

    let code = document.querySelector("#code").value;
    let newPass = document.querySelector("#newPass").value;
    let confirmNewPass = document.querySelector("#confirmNewPass").value;

    axios.patch(url + "api/v1/auth/changePass", { email,code,newPass,confirmNewPass }).then(res => {

        let msg = res.data.msg;


        document.querySelector("#resetPass-link").disabled = true;

        let HTML = `<p class="success-message">${localStorage.getItem("lang") === "in" ? "KAMI TELAH MEMPERBARUI PASSWORD ANDA DENGAN SUKSES, KAMI AKAN MENGALIHKAN ANDA KE HALAMAN LOGIN" : msg}</p>`;

        document.querySelector("#success").innerHTML += HTML;

        localStorage.removeItem("email_forgot");

        setTimeout(() => {
            document.querySelector("#success").innerHTML = "";
            document.querySelector("#resetPass-link").disabled = false;

            window.location.href = "/loginpage";
 

        }, 4000)



    }).catch(err => {

        let errors = err.response.data.msg.split(",");

        errors.forEach(err => {

            if (err.includes("THIS EMAIL IS NOT EXIST")) {
                let HTML = `<p class="error-message">${localStorage.getItem("lang") === "in" ? `EMAIL INI TIDAK ADA, MASUKKAN EMAIL YANG ADA
                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            }else if(err.includes("INVALID CODE!!")){
                let HTML = `<p class="error-message">${localStorage.getItem("lang") === "in" ? `KODE SALAH!!
                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            }else if(err.includes("PASSWORD LENGTH SHOULD BE AT LEAST 8")){
                let HTML = `<p class="error-message">${localStorage.getItem("lang") === "in" ? `PANJANG SANDI HARUS MINIMAL 8 KARAKTER
                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            }
            else if(err.includes("PASSWORD & CONFIRM PASSWORD")){
                let HTML = `<p class="error-message">${localStorage.getItem("lang") === "in" ? `PASSWORD & KONFIRMASI PASSWORD HARUS SESUAI
                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            }
            


        });

        setTimeout(() => {
            document.querySelector("#errors").innerHTML = "";
        }, 3000)


    });
})

document.querySelector("#forgotPass-link").addEventListener("click", (e) => {
    e.preventDefault();
    let url = document.URL;
    url = url.split("forgotPass")[0];
    let email = document.querySelector("#email").value;

    axios.patch(url + "api/v1/auth/forgotPass", { email }).then(res => {

        let msg = res.data.msg;


        document.querySelector("#forgotPass-link").disabled = true;

        let HTML = `<p class="success-message">${localStorage.getItem("lang") === "in" ? "KAMI TELAH MENGIRIMKAN KODE KE EMAIL ANDA" : msg}</p>`;

        document.querySelector("#success").innerHTML += HTML;

        localStorage.setItem("email_forgot" , email);

        setTimeout(() => {
            document.querySelector("#success").innerHTML = "";
            document.querySelector("#forgotPass-link").disabled = false;

            // window.location.href = "/";

            document.querySelector("[data-lang='up_2']").style.display = "none"
            document.querySelector("[data-lang='up_3']").style.display = "none"

            // document.getElementById("#head_1").innerText = localStorage.getItem("lang") ? "KAMI TELAH MENGIRIMKAN KODE KE EMAIL ANDA!" : "WE HAVE SEND THE CODE TO YOUE EMAIL!"
            // document.getElementById("#head_2").innerText = localStorage.getItem("lang") ? "PERIKSA EMAIL ANDA, COPY KODE DAN PASET BAWAH DI BIDANG KODE!" : "CHECK YOUR EMAIL,COPY THE CODE AND PASET DOWN BLOW IN THE CODE FIELD!"

            document.querySelector("#code_container").classList.toggle("hide");
            document.querySelector("#not-code").classList.toggle("hide");

        }, 3000)



    }).catch(err => {

        let errors = err.response.data.msg.split(",");

        errors.forEach(err => {

            if (err.includes("THIS EMAIL IS NOT EXIST")) {
                let HTML = `<p class="error-message">${localStorage.getItem("lang") === "in" ? `EMAIL INI TIDAK ADA, MASUKKAN EMAIL YANG ADA
                ` : err}</p>`;

                document.querySelector("#errors").innerHTML += HTML;
            }





        });

        setTimeout(() => {
            document.querySelector("#errors").innerHTML = "";
        }, 3000)


    });
})








// language setup
const translations = {
    en: {
        search: "Search Food By Name",
        discover: "DISCOVER ALL",
        categories: "CATEGORIES",
        egyptian: "EGYPTIAN",
        indonesian: "INDONESIAN",
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
        up_2: "JUST TYPE YOUR EMAIL!",
        up_3: "WE WILL SEND YOU CODE TO YOUR EMAIL , CHECK YOUR EMAIL AFTER CLICKING CONFIRM",
        up_4: "email",
        up_7: "CONFIRM",
        up_8: "your code",
        up_9: "your new password",
        up_10: "confirm password",
        up_11: "RESET PASSWORD"
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
        up_2: "HANYA KETIK EMAIL ANDA!",
        up_3: `KAMI AKAN KIRIMKAN KODE KE EMAIL ANDA, PERIKSA EMAIL ANDA SETELAH KLIK KONFIRMASI
        `,
        up_4: "surel",
        up_7: "MENGONFIRMASI",
        up_8: "kode Anda",
        up_9: "kata sandi baru Anda",
        up_10: "konfirmasi sandi",
        up_11: "RESET KATA SANDI"
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