let elAddBtn = document.querySelector(".add-btn")
let elTbody = document.querySelector(".tbody")
let tHead = document.querySelector(".thead")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

let elNavList = document.querySelector(".nav-list")
let elItem1 = document.querySelector(".item1")
let elItem2 = document.querySelector(".item2")
let elItem3 = document.querySelector(".item3")


let elSearchInput = document.querySelector(".search-input")
let elSearchList = document.querySelector(".search-list")

let orderProduct = JSON.parse(window.localStorage.getItem("orderList")) || []

// Check Text Size start
function checkSize(value){
    return (value.split(" ").splice(0, 3).join(" ") + "...");
}
// Check Text Size end

elNavList.addEventListener("click", function(evt){
    if(evt.target.id){
        if(evt.target.id == 0){
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
            elItem3.classList.remove("text-teal-500")
        renderFunction(products, elTbody, evt.target.id)
        }
        else if(evt.target.id == 1){
            elItem2.classList.add("text-teal-500")
            elItem1.classList.remove("text-teal-500")
            elItem3.classList.remove("text-teal-500")
        renderFunction(products, elTbody, evt.target.id)
        }
        else{
            elItem2.classList.remove("text-teal-500")
            elItem1.classList.remove("text-teal-500")
            elItem3.classList.add("text-teal-500")
        renderFunction(orderProduct, elTbody, evt.target.id)
        }
    }
})

let products = JSON.parse(window.localStorage.getItem("products")) || []


elAddBtn.addEventListener("click", function(){
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <form class="add-form-submit">
    <label>
    <div class="choose-img-wrapper  w-[80%] mx-auto bg-white">
    <img class="rounded-[50px] h-[250px] render-img" src="./images/choose-img.png" alt="" width="100%" height="100%"/>
    </div>
    <input class="visually-hidden get-img" type="file"/>
    </label>
    
    <div class="p-3 bg-white mt-5 flex justify-between">
    <div class="w-[49%] flex flex-col gap-5">
    <label class="flex flex-col">
    <span>Enter Product Name</span>
    <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter Product name"/>
    </label>
    
    <label class="flex flex-col">
    <span>Enter Product old Price</span>
    <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter Product old Price"/>
    </label>
    
    <label class="flex flex-col">
    <span>Enter Product new Price</span>
    <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter Product new Price"/>
    </label>
    </div>
    
    <div class="w-[49%] flex flex-col gap-5">
    <label class="flex flex-col">
    <span>Enter Product quantity</span>
    <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter Product quantity"/>
    </label>
    
    <label class="flex flex-col">
    <span>Choose type</span>
    <select class="p-2 border-[1px] border-black rounded-md">
    <option value="0">Каркасные</option>
    <option value="1">Надувные</option>
    </select>
    </label>
    
    <label class="flex flex-col">
    <span>Choose status</span>
    <select class="p-2 border-[1px] border-black rounded-md">
    <option value="0">Not</option>
    <option value="1">Рекомендуем</option>
    <option value="2">Cкидка</option>
    <option value="3">Нет в наличии</option>
    </select>
    </label>
    </div>
    
    </div>
    <button class="bg-teal-500 p-2 font-bold text-white w-[200px] block mx-auto my-5 rounded-[15px]">Добавить</button>
    
    </form>
    `
    let elAddForm = document.querySelector(".add-form-submit")
    let elInputChange = document.querySelector(".get-img")
    let elRenderImg = document.querySelector(".render-img")

    elInputChange.addEventListener("change", function(evt){
        elRenderImg.src = URL.createObjectURL(evt.target.files[0]);
    })
    elAddForm.addEventListener("submit", function(evt){
        evt.preventDefault()
        let data = {
            id:products.length ? products[products.length -1].id + 1 : 1,
            img:URL.createObjectURL(evt.target[0].files[0]),
            name:evt.target[1].value,
            oldPrice: evt.target[2].value,
            newPrice:evt.target[3].value,
            quantity: evt.target[4].value,
            type: evt.target[5].value,
            status: evt.target[6].value
        }
        products.push(data)
        renderFunction(products, elTbody, evt.target[5].value)
        elModalWrapper.classList.remove("open-modal")     
        window.localStorage.setItem("products", JSON.stringify(products))
        if(evt.target[5].value == 0){
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
        }
        else{
            elItem2.classList.add("text-teal-500")
            elItem1.classList.remove("text-teal-500")
        }
    })
})

elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-modal")
    }
})

function renderFunction(arr, list, id) {
    list.innerHTML = ""
    arr.filter(item => {
        if(item.type == id){
            let elTr = document.createElement("tr")
            elTr.innerHTML = `
            <td class="text-center p-1 bg-slate-100 rounded-l-[20px]">
            <img class="mx-auto" src=${item.img} alt="Render img" width="40" height="40"/>
            </td>
            <td class="text-center p-1 bg-slate-100">${item.name}</td>
            <td class="text-center p-1 bg-slate-100 flex flex-col">
            <span class="text-[13px] line-through ">${item.oldPrice}</span>
            <strong class="text-[18px]">${item.newPrice}</strong>
            </td>
            <td class="text-center p-1 bg-slate-100">${item.quantity}</td>
            <td class="text-center p-1 bg-slate-100 ${item.status == "1" ? "text-green-500" : ""}
            ${item.status == "2" ? "text-yellow-500" : ""} ${item.status == "3" ? "text-red-500" : ""}">
            ${item.status == "0" ? "Prostoy" : ""}
            ${item.status == "1" ? "Рекомендуем" : ""}
            ${item.status == "2" ? "Cкидка" : ""}
            ${item.status == "3" ? "Нет в наличии" : ""}
            </td>
            <td class="text-center p-1 bg-slate-100 rounded-r-[20px]">
            <button type="button" onclick="updateClick(${item.id})" class="update-form1 p-1 bg-green-500 text-white rounded-md">Update</button>
            <button onclick="deleteBtnCLick(${item.id})" class="delete-form p-1 bg-red-500 text-white rounded-md">Delete</button>
            </td>
            `
            list.appendChild(elTr);
        }
    });
    if(id == "2"){
        tHead.innerHTML = `
            <tr>
                <th class="p-3 bg-slate-200 w-[250px] rounded-l-[25px]">Имя клиента</th>
                <th class="p-3 bg-slate-200 w-[250px] ">Телефон</th>
                <th class="p-3 bg-slate-200 w-[250px] ">Изображение</th>
                <th class="p-3 bg-slate-200 w-[250px] ">Цена(сум)</th>
                <th class="p-3 bg-slate-200 w-[250px] ">Адрес</th>
                <th class="p-3 bg-slate-200 w-[250px] ">Время</th>
                <th class="p-3 bg-slate-200 w-[250px] rounded-r-[25px]">Действия</th>
            </tr>
    
        `
        arr.map(item => {
             let elTr = document.createElement("tr")
             elTr.innerHTML = `
             <td class="text-center p-1 bg-slate-300 rounded-l-[20px]">${item.name}</td>
             <td class="text-center p-1 bg-slate-300">${item.phoneNumber}</td>
             <td class="text-center p-1 bg-slate-300">
                <img class="mx-auto" src=${item.img} alt="Render Img" width="60" height="60"/>
            </td>
            <td class="text-center p-1 bg-slate-300 text-[18px]">${item.price}</td>
            <td class="text-center p-1 bg-slate-300 text-[18px]">${checkSize(item.address)}</td>
            <td class="text-center p-1 bg-slate-300 text-[18px]">${item.time}</td>
            <td class="text-center p-6 bg-slate-300 flex items-center justify-center gap-3 ">
            <button onclick="updateOrderCLick(${item.id})" class="order-checkbox"></button>
            <button onclick="deleteOrderCLick(${item.id})" class="text-[20px] order-delete">
               <img src="./images/delete.svg" alt="Delete Svg" width="20" height="20"/>
            </button>
            </td>
             `

             elTbody.appendChild(elTr)
        })
    }
}
renderFunction(products, elTbody, 0)

// --------------Order delete start----------

function deleteOrderCLick(id){
    const finObj = orderProduct.find(item => item.id == id)
    let findIndex = orderProduct.findIndex(item => item.id == id)
    let confirmDelete = confirm()
    if(confirmDelete){
        
        orderProduct.splice(findIndex, 1)
        renderFunction(orderProduct, elTbody, finObj.type)
        window.localStorage.setItem("orderList", JSON.stringify(orderProduct))
    }
    else{
        renderFunction(orderProduct, elTbody, finObj.type)
    }
}

// --------------Order delete end----------

// -------Update Start---

function updateClick(id){
    let data = products.find(item => item.id == id)

    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <form class="update-form">
    <label>
        <div class="w-[80%] bg-white mx-auto">
            <img class="update-render-img rounded-[50px] h-[250px]" src=${data.img} alt="" width="100%" height="100%"/>
        </div>
        <input class="visually-hidden update-get-img" type="file"/>
    </label>
    <div class="p-3 bg-white mt-5 flex justify-between">
        <div class="w-[49%] flex flex-col gap-5">
            <label class="flex flex-col">
                <span class="">Enter products name</span>
                <input value=${data.name}  class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter products name"/>
            </label>
            <label class="flex flex-col">
                <span class="">Enter old price</span>
                <input value=${data.oldPrice} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter products old price"/>
            </label>
            <label class="flex flex-col">
                <span class="">Enter new price</span>
                <input value=${data.newPrice} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter products new price"/>
            </label>
        </div>
        <div class="w-[49%] flex flex-col gap-5">
        <label class="flex flex-col">
        <span>Enter Product quantity</span>
        <input value=${data.quantity} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter Product quantity"/>
    </label>

    <label class="flex flex-col">
    <span>Choose type</span>
    <select class="p-2 border-[1px] border-black rounded-md update-type-select">
        <option value="0">Каркасные</option>
        <option value="1">Надувные</option>
    </select>
    </label>

    <label class="flex flex-col">
    <span>Choose status</span>
      <select class="p-2 border-[1px] border-black rounded-md update-status-select">
        <option value="0">Not</option>
        <option value="1">Рекомендуем</option>
        <option value="2">Cкидка</option>
        <option value="3">Нет в наличии</option>
    </select>
    </label>
            </div>
            </div>
        <button class="bg-teal-500 p-2 font-bold rounded-[15px] text-white w-[200px] block mx-auto my-5">Добавить</button>
    </form>
    `

    let elUpdateForm = document.querySelector(".update-form")
    let elTypeSelect = document.querySelector(".update-type-select")
    let elStatusSelect = document.querySelector(".update-status-select")
    let elUpdateImgInput = document.querySelector(".update-get-img")
    let elUpdateImg = document.querySelector(".update-render-img")


    elTypeSelect.value = data.type
    elStatusSelect.value = data.status

    elUpdateImgInput.addEventListener("change", function(evt){
        elUpdateImg.src = URL.createObjectURL(evt.target.files[0])
    })
    elUpdateForm.addEventListener("submit", function(evt){
        evt.preventDefault()
        data.img = elUpdateImg.src
        data.name = evt.target[1].value
        data.oldPrice = evt.target[2].value
        data.newPrice = evt.target[3].value
        data.quantity = evt.target[4].value
        data.type = evt.target[5].value
        data.status = evt.target[6].value

        renderFunction(products, elTbody, evt.target[5].value)

        elModalWrapper.classList.remove("open-modal")
        window.localStorage.setItem("products", JSON.stringify(products))
        if(evt.target[5].value == 0){
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
        }
        else{
            elItem2.classList.add("text-teal-500")
            elItem1.classList.remove("text-teal-500")
        }
    })
}

// -------Update End--------


function deleteBtnCLick(id){
    const finObj = products.find(item => item.id == id)
    let findIndex = products.findIndex(item => item.id == id)
    let confirmDelete = confirm()
    if(confirmDelete){
        
        products.splice(findIndex, 1)
        renderFunction(products, elTbody, finObj.type)
        window.localStorage.setItem("products", JSON.stringify(products))
    }
    else{
        renderFunction(products, elTbody, finObj.type)
    }
}

// -----------SEARCH-START-------

elSearchInput.addEventListener("keyup", function(evt){
    let data = products.filter(item => item.name.toLowerCase().includes(evt.target.value.toLowerCase()))
    elSearchList.innerHTML = ""
    data.map(item =>{
        let elListItem = document.createElement("li")
        elListItem.className = `p-[5px] hover:bg-white rounded-[20px] cursor-pointer`
        elListItem.dataset.id = item.id
        elListItem.textContent = `${item.name} - ${item.newPrice}`
        elSearchList.appendChild(elListItem)
        
        elListItem.addEventListener("click", function(evt){
            let ClickedId = evt.target.dataset.id
            let dataClick = products.find(item => item.id == ClickedId)
            elSearchInput.value = `${dataClick.name} - ${dataClick.newPrice}`
            
            let searchFilter = products.filter(item => item.id == ClickedId)
            renderFunction(searchFilter, elTbody, dataClick.type)
        window.localStorage.setItem("products", JSON.stringify(products))
            if(dataClick.type == 0){
                elItem1.classList.add("text-teal-500")
                elItem2.classList.remove("text-teal-500")
            }
            else{
                elItem2.classList.add("text-teal-500")
                elItem1.classList.remove("text-teal-500")
            }
            })
        
           })
           if(evt.target.value){
            elSearchList.classList.add("open-list")
           }
           else{
            elSearchList.classList.remove("open-list")
            renderFunction(products, elTbody, "0")
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
           }
        })

elSearchInput.addEventListener("blur", function(evt){
    elSearchList.classList.remove("open-list")
})

// -----------SEARCH-END-------