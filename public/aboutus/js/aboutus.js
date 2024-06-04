window.onload = () => {

    let user = JSON.parse(localStorage.getItem("user"));



    if (!user) {
        window.location.href = "/loginpage";
    }

    if (user && user.user.role === "admin") {
        window.location.href = "/4unique-admin"
    }

    document.querySelector("#my_cart_link").setAttribute("href", `/cart/${user.user._id}`);

    // nav sett

    document.querySelector("#fav_nav").setAttribute("href", `/favourites/${user.user._id}`);

    document.querySelector("#login").style.display = user ? "none" : "block";

    document.querySelector("#signup").style.display = user ? "none" : "block";

    document.querySelector("#logout").style.display = user ? "block" : "none";

    document.querySelector(".home").style.display = "none";

    setTimeout(() => {
        document.querySelector(".home").style.display = "block";
        document.querySelector(".loader").style.display = "none";
    }, 4000)

    let URL = document.URL.split("aboutus")[0];
    axios.get(URL + `api/v1/auth/cart/${user.user._id}`, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }).then(res => {
        document.querySelector("#cart_length").innerText = `${res.data.cartLength}`
    }).catch(err => {
        console.log(err);

    })


    axios.get(URL + `api/v1/auth/get_user_orders/${user.user._id}`, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }).then(res => {
        let userOrders = res.data.userOrders;
        console.log(userOrders);

        if (userOrders.length > 0) {
            document.querySelector("#track_orders").setAttribute("href", `/user_orders/${user.user._id}`);

            document.querySelector("#track_orders").setAttribute("data-lang", `track`);

            document.querySelector("#track_orders").innerText = "Track Your Orders Status"
            document.querySelector(".track").classList.toggle("hide")
        }

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

    }).catch(err => {
        console.log(err);

    })
}

document.querySelector("#logout").addEventListener("click", () => logout());

function logout() {
    localStorage.removeItem('user');
    window.location.href = '/loginpage';
}



// language setup
const translations = {
    en: {
        search: "Search Food By Name",
        discover: "DISCOVER ALL",
        categories: "CATEGORIES",
        tshirt: "T-SHIRT",
        purse: "PURSE",
        jacket: "JACKET",
        hoodie: "HOODIE",
        scrunchie: "SCRUNCHIE",
        about: "ABOUT",
        contact: "CONTACT",
        track: "TRACK YOUR ORDERS STATUS",
        favourites: "MY FAVOURITES",
        quantity: "quantity",
        alsoLike: "YOU MAY ALSO LIKE",
        reviewTile: "SOME OF OUR CUSTOMERS REVIEWS",
        brand: "4UNIQUE",
        about_1: "WE ARE NOT JUST A BRAND WE ARE A TRUE LOVE STORY",
        about_2: ",, YOU CAN HAVE ANYTHING YOU WANT IN LIFE , IF YOU DRESS FOR IT. ,,",
        brand_quote: "~4UNIQUE",
        about_3: "WHO WE ARE?",
        about_4: `WE'RE A COUPLE FROM DIFFRENT CULTURES (AN INDONISIAN WIFE & AN EGYPTIAN HUSBAND) , 
      WE SHARE THE SAME LOVE OF FASHION , SO WE DECIDED TO SHARE THAT WITH YOU`,
        about_5: "OUR MAIN IDEA?",
        about_6: `TO PRESENT OUR PRODUCTS INTO AN ORIGINAL HANDMADE LOOKING ELEGANT FASHION THAT WILL MAKES YOU BLOOM AT ANY PLACE YOU GO.`
    },

    in: {
        search: "Cari Makanan Berdasarkan Nama",
        discover: "TEMUKAN SEMUA",
        categories: "KATEGORI",
        tshirt: "KAOS",
        purse: "TAS KECIL",
        jacket: "JAKET",
        hoodie: "TUDUNG",
        scrunchie: "SCRUNCHIE",
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
        brand: "4UNIQUE",
        about_1: "KAMI BUKAN HANYA SEBUAH MEREK KAMI ADALAH KISAH CINTA SEJATI",
        about_2: ",, ANDA DAPAT MEMILIKI APA PUN YANG ANDA INGINKAN DALAM HIDUP, JIKA ANDA BERPAKAIAN UNTUKNYA. ,,",
        brand_quote: "~4UNIQUE",
        about_3: "SIAPA KITA?",
        about_4: `
        KAMI PASANGAN DARI BUDAYA YANG BERBEDA (ISTRI INDONISIAN & SUAMI MESIR), 
              KAMI BERBAGI KECINTAAN FASHION YANG SAMA, JADI KAMI MEMUTUSKAN UNTUK BERBAGI DENGAN ANDA`,
        about_5: "IDE UTAMA KAMI?",
        about_6: `MENGHADIRKAN PRODUK KAMI MENJADI FASHION ASLI BUATAN TANGAN TERLIHAT ELEGAN YANG AKAN MEMBUAT ANDA MERK DI MANAPUN ANDA PERGI.

      `
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