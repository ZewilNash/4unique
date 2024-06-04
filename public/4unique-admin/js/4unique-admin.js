
window.onload = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "/loginpage";
    }

    if (user && user.user.role === "user") {
        document.querySelector("#secure").style.display = "none";

        window.location.href = "/notfound";
    }

    if (user && user.user.role === "admin") {
        document.querySelector("#secure").style.display = "block";
    }
}

document.querySelector("#secure").style.display = "none";


document.querySelector("#create-btn").addEventListener("click", (event) => {
    event.preventDefault();
    // create product logic
    createProduct();
})

document.querySelector("#logout").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "/loginpage";
})

let url_images = [];


const cloud_name = "futuretodosod";
const upload_preset = "uwpmv7sg";


const myWidget = cloudinary.createUploadWidget(
    {
        cloudName: cloud_name,
        uploadPreset: upload_preset,

    },
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);

            url_images.push(result.info.secure_url);
        }
    }
);


document.querySelector(".upload_widget").addEventListener(
    "click",
    function () {
        myWidget.open();
    },
    false
);

document.querySelector(".upload_widget_review").addEventListener(
    "click",
    function () {
        myWidget.open();
    },
    false
);

if(document.querySelectorAll(".upload_widget_edit")){
    document.querySelectorAll(".upload_widget_edit").forEach(btn => {
        btn.addEventListener(
            "click",
            function () {
                myWidget.open();
            },
            false
        );
    })
}

document.querySelector(".upload_widget_category").addEventListener(
    "click",
    function () {
        myWidget.open();
    },
    false
);






document.querySelector("#all_categories_link").addEventListener("click", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.toggle("hide")
})
document.querySelector("#all_categories_link").addEventListener("dbclick", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.toggle("hide")
})


document.querySelector("#create_product_link").addEventListener("click", (e) => {
    document.querySelector("#create_product_container").classList.toggle("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})

document.querySelector("#create_category_link").addEventListener("dbclick", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.toggle("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})
document.querySelector("#create_category_link").addEventListener("click", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.toggle("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})

document.querySelector("#create_product_link").addEventListener("dbclick", (e) => {
    document.querySelector("#create_product_container").classList.toggle("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")

    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})


document.querySelector("#all_products_link").addEventListener("click", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.toggle("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})

document.querySelector("#create_review_link").addEventListener("click", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")

    document.querySelector("#all_users_reports_container").classList.add("hide")

    // document.querySelector("#all_users_reports_container").classList.add("hide")

    document.querySelector("#create_review").classList.toggle("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})
document.querySelector("#create_review_link").addEventListener("dbclick", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")

    document.querySelector("#all_users_reports_container").classList.add("hide")

    // document.querySelector("#all_users_reports_container").classList.add("hide")

    document.querySelector("#create_review").classList.toggle("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})

document.querySelector("#all_products_link").addEventListener("dbclick", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.toggle("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")

    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})


document.querySelector("#all_booked_orders_link").addEventListener("click", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.toggle("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})

document.querySelector("#all_booked_orders_link").addEventListener("dbclick", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.toggle("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})


document.querySelector("#all_completed_orders_link").addEventListener("click", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.toggle("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})
document.querySelector("#all_completed_orders_link").addEventListener("dbclick", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.toggle("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})

document.querySelector("#all_users_link").addEventListener("click", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.toggle("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})
document.querySelector("#all_users_link").addEventListener("dbclick", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.toggle("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})

document.querySelector("#all_users_reports_link").addEventListener("click", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.toggle("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})
document.querySelector("#all_users_reports_link").addEventListener("dbclick", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.toggle("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.add("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})
document.querySelector("#all_reviews_link").addEventListener("click", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.toggle("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})
document.querySelector("#all_reviews_link").addEventListener("dbclick", (e) => {
    document.querySelector("#create_product_container").classList.add("hide")
    document.querySelector("#all_products_container").classList.add("hide")
    document.querySelector("#booked_orders_container").classList.add("hide")
    document.querySelector("#all_completed_orders_container").classList.add("hide")
    document.querySelector("#all_users_container").classList.add("hide")
    document.querySelector("#all_users_reports_container").classList.add("hide")
    document.querySelector("#create_review").classList.add("hide")
    document.querySelector("#show_all_reviews").classList.toggle("hide")
    document.querySelector("#create_category_container").classList.add("hide")
    document.querySelector("#all_categories_container").classList.add("hide")
})

document.querySelectorAll("#update-category-btn").forEach(cat => {
    cat.addEventListener("click" , (e) => {
        e.preventDefault();
        const category = document.querySelector("#up_cat_name").value;
        const {categoryName} = e.target.dataset;
        let user = JSON.parse(localStorage.getItem("user"));
        let url = document.URL.split("4unique-admin")[0];
        let cat_img = url_images[0];

        axios.patch(String(url) + `api/v1/auth/update_category/${categoryName}`,{
            categoryItem:category,
            image:cat_img
        }, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }
    
        ).then(res => {
            // success
            let msg = res.data.msg;
            document.querySelector("#create-btn").disabled = true;
    
            let HTML = `<p class="success-message">${msg}</p>`;
    
            document.querySelector("#success").innerHTML += HTML;
    
            setTimeout(() => {
                document.querySelector("#success").innerHTML = "";
                document.querySelector("#create-btn").disabled = false;
    
                window.location.href = "/home";
    
            }, 3000)
    
        }).catch(err => {
            let errors = err.response.data.msg.split(",");
    
            errors.forEach(err => {
                let HTML = `<p class="error-message">${err}</p>`;
    
                document.querySelector("#errors").innerHTML += HTML;
    
    
            });
    
            setTimeout(() => {
                document.querySelector("#errors").innerHTML = "";
            }, 3000)
    
        })

    })
})

document.querySelectorAll("#delete_category").forEach(cat => {
    cat.addEventListener("click" , (e) => {
        // category-name
        const {categoryName} = e.target.dataset;
        let user = JSON.parse(localStorage.getItem("user"));
        let url = document.URL.split("4unique-admin")[0];


        axios.delete(String(url) + `api/v1/auth/delete_category/${categoryName}`, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }
    
        ).then(res => {
            // success
            let msg = res.data.msg;
            document.querySelector("#create-btn").disabled = true;
    
            let HTML = `<p class="success-message">${msg}</p>`;
    
            document.querySelector("#success").innerHTML += HTML;
    
            setTimeout(() => {
                document.querySelector("#success").innerHTML = "";
                document.querySelector("#create-btn").disabled = false;
    
                window.location.href = "/home";
    
            }, 3000)
    
        }).catch(err => {
            let errors = err.response.data.msg.split(",");
    
            errors.forEach(err => {
                let HTML = `<p class="error-message">${err}</p>`;
    
                document.querySelector("#errors").innerHTML += HTML;
    
    
            });
    
            setTimeout(() => {
                document.querySelector("#errors").innerHTML = "";
            }, 3000)
    
        })

    })
})


function createReview() {
    let user = JSON.parse(localStorage.getItem("user"));

    let food_id = document.querySelector("#food_id").value;

    let review_link = document.querySelector("#review_link").value;

    // let images = document.querySelector("#images").files;
    let review_img = url_images[0];


    // logic to upload to mongodb

    let url = document.URL.split("4unique-admin")[0];

    axios.post(String(url) + `api/v1/auth/make_review/${food_id}`, {
        review_img,
        review_link
    }, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }

    ).then(res => {
        // success
        let msg = res.data.msg;
        document.querySelector("#create-btn").disabled = true;

        let HTML = `<p class="success-message">${msg}</p>`;

        document.querySelector("#success").innerHTML += HTML;

        setTimeout(() => {
            document.querySelector("#success").innerHTML = "";
            document.querySelector("#create-btn").disabled = false;

            window.location.href = "/home";

        }, 3000)

    }).catch(err => {
        let errors = err.response.data.msg.split(",");

        errors.forEach(err => {
            let HTML = `<p class="error-message">${err}</p>`;

            document.querySelector("#errors").innerHTML += HTML;


        });

        setTimeout(() => {
            document.querySelector("#errors").innerHTML = "";
        }, 3000)

    })

}


// create category

function createCategory() {
    // category image
    let user = JSON.parse(localStorage.getItem("user"));
    let category = document.querySelector("#cat_name").value;

    let image = url_images[0];

    let url = document.URL.split("4unique-admin")[0];

    axios.post(String(url) + `api/v1/auth/create_category`, {
        category, image
    }, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }

    ).then(res => {
        // success
        let msg = res.data.msg;
        document.querySelector("#create-category-btn").disabled = true;

        let HTML = `<p class="success-message">${msg}</p>`;

        document.querySelector("#success").innerHTML += HTML;

        setTimeout(() => {
            document.querySelector("#success").innerHTML = "";
            document.querySelector("#create-btn").disabled = false;

            window.location.href = "/home";

        }, 3000)

    }).catch(err => {
        let errors = err.response.data.msg.split(",");

        errors.forEach(err => {
            let HTML = `<p class="error-message">${err}</p>`;

            document.querySelector("#errors").innerHTML += HTML;


        });

        setTimeout(() => {
            document.querySelector("#errors").innerHTML = "";
        }, 3000)

    })

}

function createProduct() {
    let user = JSON.parse(localStorage.getItem("user"));
    let name = document.querySelector("#name").value;
    let price = document.querySelector("#price").value;
    let category = document.querySelector("#category").value;
    let available_size = document.querySelector("#available_size").value;
    let description = document.querySelector("#description").value;

    // let images = document.querySelector("#images").files;
    let images = url_images;

    console.log(images);


    // logic to upload to mongodb

    let url = document.URL.split("4unique-admin")[0];

    axios.post(String(url) + `api/v1/products`, {
        name,
        price,
        category,
        size: available_size.split(","),
        images,
        description
    }, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }

    ).then(res => {
        // success
        let msg = res.data.msg;
        document.querySelector("#create-btn").disabled = true;

        let HTML = `<p class="success-message">${msg}</p>`;

        document.querySelector("#success").innerHTML += HTML;

        setTimeout(() => {
            document.querySelector("#success").innerHTML = "";
            document.querySelector("#create-btn").disabled = false;

            window.location.href = "/home";

        }, 3000)

    }).catch(err => {
        let errors = err.response.data.msg.split(",");

        errors.forEach(err => {
            let HTML = `<p class="error-message">${err}</p>`;

            document.querySelector("#errors").innerHTML += HTML;


        });

        setTimeout(() => {
            document.querySelector("#errors").innerHTML = "";
        }, 3000)

    })

}


function updateCategory(categoryName,edit_cat){
    let url = document.URL.split("4unique-admin")[0];
    let user = JSON.parse(localStorage.getItem("user"));
    let image = url_images[0];

    axios.patch(String(url) + `api/v1/auth/update_category/${categoryName}`, {
        categoryItem:edit_cat,
        image:image
    }, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }

    ).then(res => {
        console.log(res);

        // success
        let msg = res.data.msg;
        // document.querySelector("#create-btn-edit").disabled = true;

        let HTML = `<p class="success-message">${msg}</p>`;

        document.querySelector("#success").innerHTML += HTML;

        setTimeout(() => {
            document.querySelector("#success").innerHTML = "";
            // document.querySelector("#create-btn").disabled = false;

            // window.location.href = "/home";
            window.location.reload();

        }, 3000)

    }).catch(err => {
        console.log(err);

        let errors = err.response.data.msg.split(",");

        errors.forEach(err => {
            let HTML = `<p class="error-message">${err}</p>`;

            document.querySelector("#errors").innerHTML += HTML;


        });

        setTimeout(() => {
            document.querySelector("#errors").innerHTML = "";
        }, 3000)

    })
}

// foodId , name , price , category , size , description
function updateProduct(foodId , name , price , category , size , description) {
    let user = JSON.parse(localStorage.getItem("user"));
   
    
    let id_edit = foodId;

    // let images = document.querySelector("#images").files;
    let images = url_images;

    console.log(images, name, price, description, category, available_size , foodId);


    // logic to upload to mongodb

    let url = document.URL.split("4unique-admin")[0];

    axios.put(String(url) + `api/v1/products/${id_edit}`, {
        name,
        price,
        category,
        size,
        images,
        description
    }, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }

    ).then(res => {
        console.log(res);

        // success
        let msg = res.data.msg;
        // document.querySelector("#create-btn-edit").disabled = true;

        let HTML = `<p class="success-message">${msg}</p>`;

        document.querySelector("#success").innerHTML += HTML;

        setTimeout(() => {
            document.querySelector("#success").innerHTML = "";
            // document.querySelector("#create-btn").disabled = false;

            // window.location.href = "/home";
            window.location.reload();

        }, 3000)

    }).catch(err => {
        console.log(err);

        let errors = err.response.data.msg.split(",");

        errors.forEach(err => {
            let HTML = `<p class="error-message">${err}</p>`;

            document.querySelector("#errors").innerHTML += HTML;


        });

        setTimeout(() => {
            document.querySelector("#errors").innerHTML = "";
        }, 3000)

    })

}


document.querySelectorAll("#edit_category").forEach(cat => {
    cat.addEventListener("click" , (e) => {
        e.preventDefault();
        const {categoryName} = e.target.dataset;
        
        const myPopup = new Popup({
            id: "my-popup",
            title: "FOOD4UNIQUE",
            content: `<form style="display: flex;justify-content: center;align-items: center;margin-top: 20px;flex-direction: column;">
            <h1 class="mb-5">EDIT CATEGORY</h1>
            
            <input id="edit_cat_name" type="text" placeholder="CATEGORY NAME">

            <input id="upload_widget_category_edit_btn" name="image" type="file" multiple class="input-field" accept="image/*" />
            
            <button data-category-name="${categoryName}" id="edit_cat_btn" type="submit">Submit</button>
          </form>`,
            showImmediately: true,
            textColor: "black",
            heightMultiplier: 0.8,
            disableScroll: false,
            hideTitle: true
        });



        myPopup.show();

        if(document.querySelectorAll("#upload_widget_category_edit_btn")){
            document.querySelectorAll("#upload_widget_category_edit_btn").forEach(btn => {
                btn.addEventListener(
                    "click",
                    function () {
                        myWidget.open();
                    },
                    false
                );
            })
        }

        document.querySelectorAll("#edit_cat_btn").forEach(btn => {
            btn.addEventListener("click" , (e) => {
                e.preventDefault();
                const {categoryName} = e.target.dataset;
                const edit_cat = document.querySelector("#edit_cat_name").value
                console.log(edit_cat);
                
                updateCategory(categoryName,edit_cat);
                
            })
        })
        
    })
})

document.querySelector("#create-category-btn").addEventListener("click", (e) => {
    e.preventDefault();
    createCategory();
})

document.querySelectorAll("#create-btn-edit").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const {foodId,foodName} = e.target.dataset;

       
    
        let name = document.querySelector(`[name='name_${foodName}']`).value;

        let price = document.querySelector(`[name='price_${foodName}']`).value;

        let category = document.querySelector(`[name='category_${foodName}']`).value;

        let size = document.querySelector(`[name='size_${foodName}']`).value;


        let description = document.querySelector(`[name='description_${foodName}']`).value;



        

        console.log(name , price , category , size , description);
        
        
        updateProduct(foodId , name , price , category , size , description);
        
        
    })
})





document.querySelectorAll("#delete_food").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const { foodId } = e.target.dataset;


        // console.log(foodId);
        // logic add to vafourite
        let URL = document.URL.split("4unique-admin")[0];

        const user = JSON.parse(localStorage.getItem("user"));

        console.log(user.token);


        axios.delete(URL + `api/v1/products/delete/${foodId}`, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }).then(res => {
            console.log(res);
            const msg_data = res.data.msg;

            document.querySelector("#success").innerText = `${msg_data}`;

            setTimeout(() => {
                document.querySelector("#success").innerText = ``;
            }, 2000);

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        }).catch(err => {
            const msg = err.response.data.msg;

            // do something
            document.querySelector("#errors").innerText = `${msg}`;

            setTimeout(() => {
                document.querySelector("#errors").innerText = ``;
            }, 2000);


        });

    })
})


document.querySelectorAll("#booked_order_show_more").forEach(btn => {
    btn.addEventListener("click", (e) => {
        // document.querySelector(".not-edit").classList.toggle("hide");

        let URL = document.URL.split("4unique-admin")[0];



        const user = JSON.parse(localStorage.getItem("user"));

        let order_id = e.target.dataset.orderId;

        axios.get(URL + `api/v1/auth/get_booked_order/${order_id}`, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }).then(res => {

            // document.querySelector("#booked_order_item").classList.remove("hide");
            // document.querySelector("#booked_order_page").classList.add("hide");

            let order = res.data.order;
            let total = [];
            order.cart.forEach(c => {




                total.push(Number(c.food.price) * Number(c.qty))

                console.log(total);


                let total_order = total.reduce((a, b) => a + b);

                // document.querySelector("#total_booked_order_price").innerText = total_order;

                let HTML = `
                <h1 style="text-align: center;">More Details About The Order Items</h1>
                <h1 id="total" style="text-align: center;">TOTAL ORDER PRICE : <span id="total_booked_order_price" style="font-size: 30px;font-weight: bold;">${total_order}</span></h1>
                <div style="display-flex;flex-direction:column;gap-3;justify-content-center-align-items-center" class="col-md-12 mt-5">
                    <img style="width:100%;height:350px;object-fit:contain" src="${c.food.images[0]}" />
                    <p>Quantity: ${c.qty}</p>
                    <p>Food Name: ${c.food.name}</p>
                    <p>Food price: ${c.food.price}</p>
                    <p>Food Total Price: ${Number(c.food.price) * Number(c.qty)}</p>
                </div>
               `

                const order_details = document.createElement("div");
                order_details.style.display = "flex";
                order_details.style.flexDirection = "column";
                order_details.style.gap = "20px";
                order_details.style.overflowY = "scroll";
                order_details.style.overflowX = "hidden";
                order_details.style.height = "auto";

                order_details.innerHTML += HTML;

                //    console.log(order_details);


                //    -------------------------------------- add alert

                const myPopup = new Popup({
                    id: "my-popup",
                    title: "FOOD4UNIQUE",
                    content: `${order_details.innerHTML}`,
                    showImmediately: true,
                    textColor: "black"
                });



                // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
                myPopup.show();

                // document.querySelector("#booked_order_item").querySelector(".row").innerHTML += HTML



            })

            //    document.querySelector("#go_back_orders").addEventListener("click" , (e) => {


            //     document.querySelector("#order_item").classList.add("hide");
            //     document.querySelector("#order_page").classList.toggle("hide");


            // })



        }).catch(err => {
            console.log(err);

        })


    })
})



// document.querySelector("#show_text").addEventListener("click", (e) => {
//     // contact-us foods
//     document.querySelector(".contact-us").classList.toggle("hide");
//     document.querySelector(".foods").classList.toggle("hide");

//     document.querySelector("#show_text").innerText = document.querySelector("#show_text").innerText === "Show All Food" ? "Show Create Product" : "Show All Food"
// })





function getSingleFood(id) {
    let URL = document.URL.split("4unique-admin")[0];



    const user = JSON.parse(localStorage.getItem("user"));

    axios.patch(URL + `api/v1/products/${id}`, {}, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }).then(res => {
        console.log(res);
        let data = res.data.food;

        document.querySelector("#id_edit").value = data._id;
        document.querySelector("#name_edit").value = data.name;
        document.querySelector("#price_edit").value = data.price;
        document.querySelector("#category_edit").value = data.category;
        document.querySelector("#available_size_edit").value = data.size.join(",");
        document.querySelector("#description_edit").value = data.description;


        // add the edit fields value


    }).catch(err => {
        const msg = err.response.data.msg;

        // do something
        document.querySelector(".error").innerText = `${msg}`;

        setTimeout(() => {
            document.querySelector(".error").innerText = ``;
        }, 2000);


    });



}

document.querySelectorAll("#edit_booked_order_btn").forEach(btn => {
    btn.addEventListener("click", (e) => {


        let HTML = `
        
        <div style="display: flex;justify-content: center;align-items: center;width: 100%;height: 50%;flex-direction: column;"  id="edit_booked_order">
        <form style="display: flex;flex-direction: column;justify-content:center;align-items: center;width: 100%;height: 100%;padding: 20px;gap:10px">
          <h1 style="text-align: center;">Edit Order With Id: <span id="span_booked_order_id" style="font-size: 20px;">${e.target.dataset.orderId}</span></h1>
          <label for="">Change Order Status</label>
            <select id="order_status">
              <option selected value="booked">booked</option>
              <option value="completed">completed</option>
              
              
            </select>
    
            <label for="">Change Order is Payed Status</label>
            <select id="order_paid">
              <option selected value="true">true</option>
              <option value="false">false</option>
             
            </select>
    
            
    
            <button id="edit_booked_order_submit" type="submit">Submit</button>
    
           
            <div id="success_container"></div>
        </form>
    </div>
        `

        const myPopup = new Popup({
            id: "my-popup",
            title: "FOOD4UNIQUE",
            content: HTML,
            showImmediately: true,
            textColor: "black"
        });


        myPopup.show();



        document.querySelector("#edit_booked_order_submit").addEventListener("click", (e) => {
            e.preventDefault();


            let status = document.querySelector("#order_status").value;

            let isPaid = document.querySelector("#order_paid").value === "true" ? true : false;


            let URL = document.URL.split("4unique-admin")[0];



            const user = JSON.parse(localStorage.getItem("user"));

            let order_id_span = document.querySelector("#span_booked_order_id").innerText;

            axios.patch(URL + `api/v1/auth/edit_booked_order/${order_id_span}`, { status, isPaid }, {
                headers: {
                    Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
                }
            }).then(res => {
                let msg = res.data.msg;

                let HTML = `<p class="success-message">${msg}</p>`;

                document.querySelector("#success_container").innerHTML += HTML;

                setTimeout(() => {
                    document.querySelector("#success_container").innerHTML = "";

                    // window.location.href = "/home";

                }, 3000)
                window.location.reload();
            }).catch(err => {
                console.log(err);

            })



        })

    })
})

if(document.querySelector("#delete_booked_order")){
    document.querySelector("#delete_booked_order").addEventListener("click", (e) => {
        let URL = document.URL.split("4unique-admin")[0];
    
    
    
        const user = JSON.parse(localStorage.getItem("user"));
    
        let { orderId } = e.target.dataset;
    
        axios.delete(URL + `api/v1/auth/delete_booked_order/${orderId}`, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }).then(res => {
            let msg = res.data.msg;
    
            let HTML = `<p class="success-message">${msg}</p>`;
    
            document.querySelector("#success_delete").innerHTML += HTML;
    
            setTimeout(() => {
                document.querySelector("#success_delete").innerHTML = "";
    
                // window.location.href = "/home";
    
            }, 3000)
            window.location.reload();
        }).catch(err => {
            console.log(err);
    
        })
    })
}




document.querySelector("#booked_order_id_text").addEventListener("input", (e) => {
    let text = e.target.value;
    let URL = document.URL.split("4unique-admin")[0];


    const user = JSON.parse(localStorage.getItem("user"));

    if (!text) {
        alert("enter id")
    }

    axios.post(URL + 'api/v1/auth/get_booked_order', { text }, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }).then(res => {
        console.log(res);
        document.querySelector("#booked_order_container").style.display = "none";
        document.querySelector("#booked_order_container_search").style.display = "block"
        const order = res.data.order;

        document.querySelector("#booked_order_container_search").innerHTML = `
        <p style="text-align: center;">ORDER ID: ${  order._id}</p>
        <p style="text-align: center;">ORDER NUMBER: ${  order.order_num}</p>
        <p style="text-align: center;">ORDER DATE: ${  order.date}</p>
        <p style="text-align: center;">ORDER TIME: ${  order.time}</p>

        <p style="text-align: center;">Made By : ${  order.name}</p>
        <p style="text-align: center;">Order Owner Email : ${  order.email}</p>
        <p style="text-align: center;">Order Owner phone : ${  order.phone}</p>
       
       

      
         
        <p style="text-align: center;">order isPaid: ${  order.isPaid}</p>
        <p style="text-align: center;">order STATUS: ${  order.status}</p>
          
      

        <p style="text-align: center;">Order Date : ${  order.createdAt}</p>

        <div style="font-size: 20px;display:flex;justify-content:space-between;width:100vw;padding:20px" class="d-flex gap-3 mt-3">
          <a data-order-id="${ order._id}" id="booked_order_show_more" href="#" style="color:green">Show More</a>
          <a data-order-id="${ order._id}"  href="#" id="delete_booked_order" style="color:red;">Delete Order</a>
          
          
        </div>

        `

        document.querySelector("#delete_booked_order").addEventListener("click", (e) => {
            let URL = document.URL.split("4unique-admin")[0];



            const user = JSON.parse(localStorage.getItem("user"));

            let { orderId } = e.target.dataset;

            axios.delete(URL + `api/v1/auth/delete_booked_order/${orderId}`, {
                headers: {
                    Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
                }
            }).then(res => {
                let msg = res.data.msg;

                let HTML = `<p class="success-message">${msg}</p>`;

                document.querySelector("#success_delete").innerHTML += HTML;

                setTimeout(() => {
                    document.querySelector("#success_delete").innerHTML = "";

                    // window.location.href = "/home";

                }, 3000)
                window.location.reload();
            }).catch(err => {
                console.log(err);

            })
        })

        document.querySelectorAll("#booked_order_show_more").forEach(btn => {
            btn.addEventListener("click", (e) => {
                // document.querySelector(".not-edit").classList.toggle("hide");

                let URL = document.URL.split("4unique-admin")[0];



                const user = JSON.parse(localStorage.getItem("user"));

                let order_id = e.target.dataset.orderId;

                axios.get(URL + `api/v1/auth/get_booked_order/${order_id}`, {
                    headers: {
                        Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
                    }
                }).then(res => {

                    // document.querySelector("#booked_order_item").classList.remove("hide");
                    // document.querySelector("#booked_order_page").classList.add("hide");

                    let order = res.data.order;
                    let total = [];
                    order.cart.forEach(c => {




                        total.push(Number(c.food.price) * Number(c.qty))

                        console.log(total);


                        let total_order = total.reduce((a, b) => a + b);

                        // document.querySelector("#total_booked_order_price").innerText = total_order;

                        let HTML = `
                        <h1 style="text-align: center;">More Details About The Order Items</h1>
                        <h1 id="total" style="text-align: center;">TOTAL ORDER PRICE : <span id="total_booked_order_price" style="font-size: 30px;font-weight: bold;"></span></h1>
                        <div style="display-flex;flex-direction:column;gap-3;justify-content-center-align-items-center" class="col-md-12 mt-5">
                            <img style="width:100%;height:350px;object-fit:contain" src="${c.food.images[0]}" />
                            <p>Quantity: ${c.qty}</p>
                            <p>Food Name: ${c.food.name}</p>
                            <p>Food price: ${c.food.price}</p>
                            <p>Food Total Price: ${Number(c.food.price) * Number(c.qty)}</p>
                        </div>
                       `

                        const order_details = document.createElement("div");
                        order_details.style.display = "flex";
                        order_details.style.flexDirection = "column";
                        order_details.style.gap = "20px";
                        order_details.style.overflowY = "scroll";
                        order_details.style.overflowX = "hidden";
                        order_details.style.height = "auto";

                        order_details.innerHTML += HTML;

                        //    console.log(order_details);


                        //    -------------------------------------- add alert

                        const myPopup = new Popup({
                            id: "my-popup",
                            title: "FOOD4UNIQUE",
                            content: `${order_details.innerHTML}`,
                            showImmediately: true,
                            textColor: "black",
                            heightMultiplier: 0.8,
                            disableScroll: false,
                            hideTitle: true
                        });



                        // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
                        myPopup.show();

                        // const myPopup2 = new Popup({
                        //     id: "my-popup",
                        //     title: "FOOD4UNIQUE",
                        //     content: `TOTAL ORDER PRICE : ${total_order}`,
                        //     showImmediately: true,
                        //     textColor: "black",
                        //     heightMultiplier: 0.8,
                        //     disableScroll: false,
                        //     hideTitle: true
                        // });



                        // // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
                        // myPopup2.show();

                        // // document.querySelector("#booked_order_item").querySelector(".row").innerHTML += HTML



                    })

                    //    document.querySelector("#go_back_orders").addEventListener("click" , (e) => {


                    //     document.querySelector("#order_item").classList.add("hide");
                    //     document.querySelector("#order_page").classList.toggle("hide");


                    // })



                }).catch(err => {
                    console.log(err);

                })


            })
        })




    }).catch(err => {
        document.querySelector("#booked_order_container").style.display = "block";
        document.querySelector("#booked_order_container_search").style.display = "none"
        console.log(err);
    })

})

document.querySelectorAll("#completedOrder_show_more").forEach(btn => {
    btn.addEventListener("click", (e) => {
        // document.querySelector(".not-edit").classList.toggle("hide");

        let URL = document.URL.split("4unique-admin")[0];



        const user = JSON.parse(localStorage.getItem("user"));

        let order_id = e.target.dataset.orderId;

        axios.get(URL + `api/v1/auth/get_booked_order/${order_id}`, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }).then(res => {



            let order = res.data.order;
            let total = [];
            order.cart.forEach(c => {




                total.push(Number(c.food.price) * Number(c.qty))

                console.log(total);


                let total_order = total.reduce((a, b) => a + b);




                let HTML = `
                <div style="display-flex;flex-direction:column;gap-3;justify-content-center-align-items-center;height:auto;overflow-y:scroll" class="col-md-12 mt-5">
                <p style="text-align: center;">More Details About The Order Items</p>
                        <p id="total" style="text-align: center;">TOTAL ORDER PRICE : <span id="total_booked_order_price" style="font-size: 30px;font-weight: bold;"></span></p>
                    <p>BOOKED ORDER ID : ${order._id}</p>
                    <img style="width:100%;height:350px;object-fit:contain" src="${c.food.images[0]}" />
                    <p>Quantity: ${c.qty}</p>
                    <p>Food Name: ${c.food.name}</p>
                    <p>Food price: ${c.food.price}</p>
                    <p>Food Total Price: ${Number(c.food.price) * Number(c.qty)}</p>
                </div>
               `

                const order_details = document.createElement("div");
                order_details.style.display = "flex";
                order_details.style.flexDirection = "column";
                order_details.style.gap = "20px";
                order_details.style.overflowY = "scroll";
                order_details.style.overflowX = "hidden";
                order_details.style.height = "700px";

                order_details.innerHTML += HTML;

                //    console.log(order_details);


                //    -------------------------------------- add alert

                const myPopup = new Popup({
                    id: "my-popup",
                    title: "FOOD4UNIQUE",
                    content: `${order_details.innerHTML}`,
                    showImmediately: true,
                    textColor: "black",
                    heightMultiplier: 0.8,
                    disableScroll: false,
                    hideTitle: true
                });



                myPopup.show();



            })





        }).catch(err => {
            console.log(err);

        })

    })
})


// create review
document.querySelector("#create-review").addEventListener("click", (e) => {
    e.preventDefault()
    createReview();
})

document.querySelectorAll("#completedOrder_delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
        let URL = document.URL.split("4unique-admin")[0];


        const user = JSON.parse(localStorage.getItem("user"));

        let { orderId } = e.target.dataset;

        axios.delete(URL + `api/v1/auth/delete_booked_order/${orderId}`, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }).then(res => {
            let msg = res.data.msg;

            let HTML = `<p class="success-message">${msg}</p>`;

            document.querySelector("#success").innerHTML += HTML;

            setTimeout(() => {
                document.querySelector("#success").innerHTML = "";

                // window.location.href = "/home";

            }, 3000)
            window.location.reload();
        }).catch(err => {
            console.log(err);

        })
    })
})


document.querySelector("#delete_all_completed").addEventListener("click", (e) => {
    // delivered_all_delete
    let URL = document.URL.split("4unique-admin")[0];



    const user = JSON.parse(localStorage.getItem("user"));



    axios.delete(URL + `api/v1/auth/completed_all_delete`, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }).then(res => {
        console.log(res);

        let msg = res.data.msg;

        let HTML = `<p class="success-message">${msg}</p>`;

        document.querySelector("#success").innerHTML += HTML;

        setTimeout(() => {
            document.querySelector("#success").innerHTML = "";

            // window.location.href = "/home";

        }, 3000)
        window.location.reload();


    }).catch(err => {
        console.log(err);

    })
})

document.querySelectorAll("#edit_user").forEach(btn => {
    btn.addEventListener("click", (e) => {
        // delete user function
        const { userId } = e.target.dataset;
        let URL = document.URL.split("4unique-admin")[0];



        const user = JSON.parse(localStorage.getItem("user"));


        axios.get(URL + `api/v1/auth/get_user/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }).then(res => {
            console.log(res);

            let user_ob = res.data.user;



            const myPopup = new Popup({
                id: "my-popup",
                title: "FOOD4UNIQUE",
                content: `<form style="display: flex;justify-content: center;align-items: center;margin-top: 20px;flex-direction: column;">
                <h1 class="mb-5">Edit User</h1>
                <input value="${user_ob.fullname}" id="edit_fullname" type="text" placeholder="Fullname">
                <input value="${user_ob.email}" id="edit_email" type="email" placeholder="Email">
                <input value="${user_ob.role}" id="edit_role" type="text" placeholder="Role">
                <button data-user-id="${user_ob._id}" id="edit_user_btn" type="submit">Submit</button>
              </form>`,
                showImmediately: true,
                textColor: "black",
                heightMultiplier: 0.8,
                disableScroll: false,
                hideTitle: true
            });



            myPopup.show();



            document.querySelector("#edit_user_btn").addEventListener("click", (e) => {
                const { userId } = e.target.dataset;

                let user_fullname = document.querySelector("#edit_fullname").value;
                let user_email = document.querySelector("#edit_email").value;
                let user_role = document.querySelector("#edit_role").value;

                updateUser(userId, user_fullname, user_email, user_role)
            })


        }).catch(err => {
            console.log(err);

        })

    })
})

function updateUser(id, fullname, email, role) {
    let URL = document.URL.split("4unique-admin")[0];



    const user = JSON.parse(localStorage.getItem("user"));


    axios.patch(URL + `api/v1/auth/update_user/${id}`, { fullname, email, role }, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }).then(res => {
        let msg = res.data.msg;

        let HTML = `<p class="success-message">${msg}</p>`;

        document.querySelector("#success").innerHTML += HTML;

        setTimeout(() => {
            document.querySelector("#success").innerHTML = "";

            // window.location.href = "/home";

        }, 3000)
        window.location.reload();
    }).catch(err => {
        console.log(err);

    })
}

document.querySelectorAll("#delete_user").forEach(btn => {
    btn.addEventListener("click", (e) => {
        // delete user function
        const { userId } = e.target.dataset;
        let URL = document.URL.split("4unique-admin")[0];



        const user = JSON.parse(localStorage.getItem("user"));


        axios.delete(URL + `api/v1/auth/delete_user/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }).then(res => {
            let msg = res.data.msg;

            let HTML = `<p class="success-message">${msg}</p>`;

            document.querySelector("#success").innerHTML += HTML;

            setTimeout(() => {
                document.querySelector("#success").innerHTML = "";

                // window.location.href = "/home";

            }, 3000)
            window.location.reload();
        }).catch(err => {
            console.log(err);

        })

    })
})

document.querySelectorAll("#delete_report").forEach(btn => {
    btn.addEventListener("click", (e) => {
        let URL = document.URL.split("4unique-admin")[0];



        const user = JSON.parse(localStorage.getItem("user"));

        let { orderId } = e.target.dataset;

        axios.delete(URL + `api/v1/auth/delete_report/${orderId}`, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }).then(res => {
            let msg = res.data.msg;

            let HTML = `<p class="success-message">${msg}</p>`;

            document.querySelector("#success").innerHTML += HTML;

            setTimeout(() => {
                document.querySelector("#success").innerHTML = "";

                // window.location.href = "/home";

            }, 3000)
            window.location.reload();
        }).catch(err => {
            console.log(err);

        })
    })
})

document.querySelector("#report_text_Search").addEventListener("input", (e) => {
    document.querySelector("#con_report").style.display = "none"
    document.querySelector("#report_container_search").style.display = "block"

    let URL = document.URL.split("4unique-admin")[0];



    const user = JSON.parse(localStorage.getItem("user"));

    let report_id = e.target.value;

    axios.get(URL + `api/v1/auth/find_report/${report_id}`, {
        headers: {
            Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
        }
    }).then(res => {
        console.log(res);

        let report = res.data.report;

        let HTML = `
        <p style="text-align: center;">ORDER ID: ${  report.order}</p>
    
        <p style="text-align: center;">Report Content : ${  report.report}</p>


        <p style="text-align: center;">Report Date : ${  report.createdAt}</p>
        

        <div style="font-size: 20px;" class="d-flex gap-3 mt-3">
          
          <a data-order-id="${ report._id}"  href="#" id="delete_report" style="color:red;">Delete Report</a>
          
          
        </div>  
        `

        document.querySelector("#report_container_search").innerHTML = HTML;

        document.querySelectorAll("#delete_report").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let URL = document.URL.split("4unique-admin")[0];



                const user = JSON.parse(localStorage.getItem("user"));

                let { orderId } = e.target.dataset;

                axios.delete(URL + `api/v1/auth/delete_report/${orderId}`, {
                    headers: {
                        Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
                    }
                }).then(res => {
                    let msg = res.data.msg;

                    let HTML = `<p class="success-message">${msg}</p>`;

                    document.querySelector("#success").innerHTML += HTML;

                    setTimeout(() => {
                        document.querySelector("#success").innerHTML = "";

                        // window.location.href = "/home";

                    }, 3000)
                    window.location.reload();
                }).catch(err => {
                    console.log(err);

                })
            })
        })

    }).catch(err => {
        console.log(err);
        document.querySelector("#con_report").style.display = "block"
        document.querySelector("#report_container_search").style.display = "none"
    })

})


document.querySelectorAll("#delete_review").forEach(rev => {
    rev.addEventListener("click", (e) => {
        const { reviewId } = e.target.dataset;

        let URL = document.URL.split("4unique-admin")[0];



        const user = JSON.parse(localStorage.getItem("user"));



        axios.delete(URL + `api/v1/auth/delete_review/${reviewId}`, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }).then(res => {
            let msg = res.data.msg;

            let HTML = `<p class="success-message">${msg}</p>`;

            document.querySelector("#success").innerHTML += HTML;

            setTimeout(() => {
                document.querySelector("#success").innerHTML = "";

                // window.location.href = "/home";

            }, 3000)
            window.location.reload();
        }).catch(err => {
            console.log(err);

        })
    })
})