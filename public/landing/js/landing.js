window.onload = () => {

    let user = JSON.parse(localStorage.getItem("4unique-user"));

    if(user){
        window.location.href = "/home";
    }

    if(user && user.user.role === "admin"){
        window.location.href = "/4unique-admin"
    }

    setTimeout(() => {
        document.querySelector(".loading").classList.toggle("hide");
        document.querySelector(".main").classList.toggle("hide")
    }, 3000);
}



// language setup
const translations = {
    en: {
      land_1:"JOIN US NOW",
      land_2:"DISCOVER & ORDER OUR FASHION PRODUCTS",
      land_3:"WE'LL NOT MAKE YOU HUNGRY",
      land_4:`CREATE AN ACCOUNT`,
      land_5:"ONCE YOU CREATE YOUR ACCOUNT YOU CAN ORDER , EXPLORE AND MORE ..",
    },
  
    in: {
      land_1:"BERGABUNGLAH DENGAN KAMI SEKARANG",
      land_2:"TEMUKAN & ORDER PRODUK FASHION KAMI",
      land_3:"KAMI TIDAK AKAN MEMBUAT ANDA LAPAR",
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