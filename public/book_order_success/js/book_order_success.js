window.onload = () => {

    let user = JSON.parse(localStorage.getItem("user"));
  
    // if(user_Cart.length > 0){
    //     window.location.href = "/loginpage";
    // }
  
    if (!user) {
      window.location.href = "/loginpage";
    }
  
    if (user && user.user.role === "admin") {
      window.location.href = "/4unique-admin"
    }
  
    document.querySelector("#my_cart_link").setAttribute("href", `/cart/${user.user._id}`);
  
    document.querySelector("#fav_nav").setAttribute("href", `/favourites/${user.user._id}`);
  
    document.querySelector("#login").style.display = user ? "none" : "block";
  
    document.querySelector("#signup").style.display = user ? "none" : "block";
  
    document.querySelector("#logout").style.display = user ? "block" : "none";
  
    document.querySelector(".home").style.display = "none";
  
    setTimeout(() => {
      document.querySelector(".home").style.display = "block";
      document.querySelector(".loader").style.display = "none";
    }, 4000)
  
    let URL = document.URL.split("book_order_success")[0];
    axios.get(URL + `api/v1/auth/cart/${user.user._id}`, {
      headers: {
        Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
      }
    }).then(res => {
      document.querySelector("#cart_length").innerText = `${res.data.cartLength}`
    }).catch(err => {
      console.log(err);
  
    })

    // let URL = document.URL.split("order_success")[0];
    axios.get(URL + `api/v1/auth/get_user_orders/${user.user._id}` ,  {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }).then(res => {
        let userOrders = res.data.userOrders;
        console.log(userOrders);

        if(userOrders.length > 0){
            document.querySelector("#track_orders").setAttribute("href" , `/user_orders/${user.user._id}`);

            document.querySelector("#track_orders").setAttribute("data-lang" , `track`);

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
  
  document.querySelector("#logout").addEventListener("click" , () => logout());

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
    book_1:"Your Order Number :",
    book_2:"Save this order NUMBER , use it when you come to take your order",
    book_3:"OR",
    book_4:"IF YOU FEEL YOU WANT YOUR ORDER THAT YOU BOOKED TO COME DIRECTLY TO YOUR PLACE IN THE TIME THAT YOU CHOOSE PLEASE CONTACT US ",
    book_5:"HERE",
    book_6:"Explore Our Food & Add To Cart"
    // order_1:"ORDER ID:",
    // order_2:"ORDER MADE AT :",
    // order_3:"ORDER NUMBER :",
    // order_4:"WE BOOKED YOUR FOOD IT WILL BE READY ON TIME",
    // order_5:"ORDER DATE:",
    // order_6:"ORDER TIME:",
    // order_7:"WHEN YOUR FOOD IS READY WE WILL INFORM YOU",
    // order_8:"ALWAYS COME HERE & REFRESH THE PAGE TO CHECK YOUR FOOD STATUS",
    // order_9:"YOUR ORDER IS READY PLEASE COME TO TAKE IT",
    // order_10:"YOUR ORDER NUMBER IS :"
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
    book_1:"Nomor pesanan Anda :",
    book_2:"Simpan NOMOR pesanan ini, gunakan saat Anda datang untuk mengambil pesanan Anda",
    book_3:"ATAU",
    book_4:"JIKA ANDA MERASA INGIN PESANAN YANG ANDA PESAN LANGSUNG DATANG KE TEMPAT ANDA PADA WAKTU YANG ANDA PILIH SILAHKAN HUBUNGI KAMI",
    book_5:"DI SINI",
    book_6:"Jelajahi Makanan Kami & Tambahkan Ke Keranjang"
    // order_1:"ID PEMESANAN:",
    // order_2:"PESANAN DIBUAT DI :",
    // order_3:"JUMLAH ORDER :",
    // order_4:`KAMI MEMESAN MAKANAN ANDA AKAN SIAP TEPAT WAKTU`,
    // order_5:"TANGGAL PEMESANAN:",
    // order_6:"WAKTU PESANAN:",
    // order_7:"JIKA MAKANAN ANDA SIAP, KAMI AKAN MENGINFORMASIKAN ANDA",
    // order_8:"SELALU DATANG KE SINI & SEGARKAN HALAMAN UNTUK MEMERIKSA STATUS MAKANAN ANDA",
    // order_9:"PESANAN ANDA SUDAH SILAHKAN DATANG UNTUK MENGAMBILNYA",
    // order_10:`NOMOR PESANAN ANDA ADALAH :
    // `,
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