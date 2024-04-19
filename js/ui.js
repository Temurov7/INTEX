let elKarkasniyList = document.querySelector(".karkasniy-list")
let elNaduvniyList = document.querySelector(".naduvniy-list")

let products = JSON.parse(window.localStorage.getItem("products"))

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

let datas = new Date()

let orderProductList = JSON.parse(window.localStorage.getItem("orderList")) || []

function renderProduct(arr, list, id){
    list.innerHTML = ""
    arr.map(item => {
        if(item.type == id){

            let elItem = document.createElement("li")
            elItem.classList.add("list-item")
            elItem.innerHTML = `
            <span class="
            ${item.status == 1 ? "bg-green-500 text-white rounded-t-none rounded-br-xl px-2" : ""}
            ${item.status == 2 ? "bg-yellow-500 text-white rounded-t-none rounded-br-xl px-2" : ""}
            ${item.status == 3 ? "bg-red-500 text-white rounded-t-none rounded-br-xl px-2" : ""}
            ">
                ${item.status == 0 ? "" : ""}
                ${item.status == 1 ? "Рекомендуем" : ""}
                ${item.status == 2 ? "Cкидка" : ""}
                ${item.status == 3 ? "Нет в наличии" : ""}
            </span>
                <img class="mx-auto" src=${item.img} width="200" height="100" alt="render img"/>
                <div class="flex gap-5 items-center mt-5">
                    <h2>${item.name}</h2>
                    <div class="flex flex-col">
                    <p class="line-through opacity-50">${item.oldPrice}</p>
                    <strong>${item.newPrice}</strong>
                    </div>
                    <button onclick="orderProduct(${item.id})">Заказать</button>
                    </div>
            `
            list.appendChild(elItem)
        }
    })
}

renderProduct(products, elKarkasniyList, "0")
renderProduct(products, elNaduvniyList, "1")

// --------Order product start---------

function orderProduct(id){
    const data = products.find(item => item.id == id)
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <div class="flex items-center gap-14 justify-around">
    
    <div class="order-img-name">
        <img src=${data.img} width="250" height="100"/>
        <p class="font-bold text-lg">${data.newPrice}</p>
    </div>
    <form class="order-form flex flex-col gap-3">
        <input class="order-forminput" required placeholder="Your name"/>
        <input class="order-forminput" required placeholder="Phone number"/>
        <input class="order-forminput" required placeholder="Adress"/>
        <button>Заказать</button>
    </form>
    </div>
    `

    let elOrderForm = document.querySelector(".order-form")
    elOrderForm.addEventListener("submit", function(evt){
        let newTime = (`${datas.getDate().toString().padStart(2, "0")}.${(datas.getMonth() + 1).toString().padStart(2, "0")}.${datas.getFullYear()} ${datas.getHours().toString().padStart(2, "0")}:${datas.getMinutes().toString().padStart(2, "0")}`);
        evt.preventDefault()
        const orderData = {
            name: evt.target[0].value,
            phoneNumber: evt.target[1].value,
            address: evt.target[2].value,
            time:newTime,
            id: orderProductList.length ? orderProductList[orderProductList.length - 1].id + 1 : 1,
            img: data.img,
            price:data.newPrice,

        }
        orderProductList.push(orderData)
        elModal.innerHTML = `
            <h2>Rahmat !</h2>
        `
        setTimeout(() =>{
            elModalWrapper.classList.remove("open-modal")
        },2000)
        window.localStorage.setItem("orderList", JSON.stringify(orderProductList))
    })
}

elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-modal")
    }
})

window.localStorage.setItem("orderList", JSON.stringify(orderProductList))