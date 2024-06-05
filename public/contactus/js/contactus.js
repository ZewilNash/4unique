window.onload = () => {

  let user = JSON.parse(localStorage.getItem("4unique-user"));



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

  let URL = document.URL.split("contactus")[0];
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

    const langParams = localStorage.getItem("4unique-lang") || "en"
    setLanguage(langParams)

  }).catch(err => {
    console.log(err);

  })
}

document.querySelector("#logout").addEventListener("click", () => logout());

function logout() {
  localStorage.removeItem('4unique-user');
  window.location.href = '/loginpage';
}


document.querySelector("#fillauto").addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.querySelector("#fullname").value;
  let email = document.querySelector("#email").value;
  let phone = document.querySelector("#phone_number").value;



  if (name && email) {
    e.target.disabled = true;
    e.target.innerText = localStorage.getItem("4unique-lang") === "in" ? "ANDA SUDAH MENGAJUKAN INFORMASI ANDA" : "YOU ALREADY FILED YOUR INFO"
  }
  let user = JSON.parse(localStorage.getItem("4unique-user"));


  document.querySelector("#fullname").value = user.user.fullname;
  document.querySelector("#email").value = user.user.email;


})

document.querySelector("#sendReport").addEventListener("click", (e) => {
  let user = JSON.parse(localStorage.getItem("4unique-user"));
  e.preventDefault();
  let orderId = document.querySelector("#orderId").value;
  let name = document.querySelector("#fullname").value;
  let email = document.querySelector("#email").value;
  let phone = document.querySelector("#phone_number").value;


  let customerNote = document.querySelector("#customerNote").value;


  if (!name || !email || !phone || !orderId || !customerNote) {
    const myPopup = new Popup({
      id: "my-popup",
      title: "FOOD4UNIQUE",
      content: `${localStorage.getItem("4unique-lang") === "in" ? `SILAHKAN MASUKKAN SEMUA INFORMASI YANG HILANG (NAMA, EMAIL, TELEPON, PESAN, ID PESANAN)
      ` : "PLEASE ENTER PROVIDE ALL MISSING INFO (NAME , EMAIL , PHONE , MESSAGE , ORDERID)"}`,
      showImmediately: true,
      textColor: "red"
    });



    // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
    myPopup.show();

  }

  const phoneRegex = /^(?:\+62|62|0)[2-9]\d{7,11}$/;
  let value = phone
  if (!phoneRegex.test(value)) {
    // Phone number is valid
    const myPopup = new Popup({
      id: "my-popup",
      title: "FOOD4UNIQUE",
      content: `${localStorage.getItem("4unique-lang") === "in" ? `HARAP MASUKKAN NOMOR YANG VALID (CONTOH:+62212341234)
      ` : "PLEASE ENTER A VALID NUMBER (EX:+62212341234)"}`,
      showImmediately: true,
      textColor: "red"
    });



    // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
    myPopup.show();

  }



  // logic for send report /report_us
  let URL = document.URL.split("contactus")[0];


  axios.post(URL + `api/v1/auth/report_us`, { orderId: orderId, report: customerNote, name: name, email: email, phone: phone }, {
    headers: {
      Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
    }
  }).then(res => {
    document.querySelector("#sendReport").disabled = true;
    const msg_data = res.data.msg;

    document.querySelector(".success").innerText = `${localStorage.getItem("4unique-lang") === "in" ? "LAPORAN ANDA TELAH TERKIRIM DENGAN SUKSES" : msg_data}`;


    setTimeout(() => {
      document.querySelector(".success").innerText = ``;

    }, 2000);

    setTimeout(() => {
      window.location.reload()
    }, 2000)

  }).catch(err => {
    const msg = err.response.data.msg;

    // do something
    document.querySelector(".errors").innerText = `${localStorage.getItem("4unique-lang") === "in" ? "ANDA HARUS MENGISI SEMUA BIDANG & MEMBERIKAN ID PESANAN YANG TEPAT!" : msg}`;

    setTimeout(() => {
      document.querySelector(".errors").innerText = ``;
    }, 2000);

  })

})

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
    contact_1: "ORDER ID",
    contact_2: "HOW WE CAN HELP YOU?",
    contact_3: "Please provide all the information about your issue (note: please give us correct name , email , phone number).",
    contact_4: "Whatsapp us",
    contact_5: "Before You Whatsapp us please keep your order id,we will ask you about before you apply your report",
    contact_6: "SUBMIT",
    contact_7: "YOUR FULL NAME",
    contact_8: "YOUR EMAIL",
    contact_9: "YOUR PHONE NUMBER",
    contact_10: "FILL MOST OF INFO AUTOMATICALLY",
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
    contact_1: "ID PEMESANAN",
    contact_2: "BAGAIMANA KAMI DAPAT MEMBANTU ANDA?",
    contact_3: "Harap berikan semua informasi tentang masalah Anda (catatan: tolong beri kami nama, email, nomor telepon yang benar).",
    contact_4: "Whatsapp kami",
    contact_5: "Sebelum Anda Whatsapp kami, harap simpan id pesanan Anda, kami akan menanyakannya kepada Anda sebelum Anda menerapkan laporan Anda",
    contact_6: "KIRIM",
    contact_7: "NAMA LENGKAP ANDA",
    contact_8: "EMAIL MU",
    contact_9: "NOMOR TELEPON ANDA",
    contact_10: "ISI KEBANYAKAN INFO SECARA OTOMATIS",
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