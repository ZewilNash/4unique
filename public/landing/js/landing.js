window.onload = () => {

    let user = JSON.parse(localStorage.getItem("4unique-user"));

    if(user){
        window.location.href = "/home";
    }

    if(user && user.user.role === "admin"){
        window.location.href = "/4unique-admin"
    }


    document.querySelector(".main").style.display = "none";

    setTimeout(() => {
        document.querySelector(".main").style.display = "block";
        document.querySelector(".loader").style.display = "none";
    } , 4000)
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
      land_1:"JOIN US NOW",
      land_2:"DISCOVER & ORDER OUR FASHION PRODUCTS",
      land_3:"WE ARE WAITING FOR YOUR FIRST ORDER",
      land_4:`CREATE AN ACCOUNT`,
      land_5:"ONCE YOU CREATE YOUR ACCOUNT YOU CAN ORDER , EXPLORE AND MORE ..",
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
      land_1:"BERGABUNGLAH DENGAN KAMI SEKARANG",
      land_2:"TEMUKAN & ORDER PRODUK FASHION KAMI",
      land_3:"KAMI MENUNGGU ORDERAN PERTAMA ANDA",
      land_4:`BUAT SEBUAH AKUN`,
      land_5:"SETELAH ANDA MEMBUAT AKUN, ANDA DAPAT MEMESAN, MENJELAJAHI, DAN LEBIH BANYAK..",
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