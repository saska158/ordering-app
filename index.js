import { menuArray } from './data.js' 


let addedItems = []
const paymentForm = document.getElementById('payment-form')


document.addEventListener('click', function(e) {
    if(e.target.dataset.additem) {
        handleAddItemClick(e.target.dataset.additem)
    }
    else if(e.target.dataset.id) {
        handleRemoveItemClick(e.target.dataset.id)
    }
    else if(e.target.id === 'complete-order-btn') {
        document.getElementById('payment-modal').classList.remove('hidden')
    }
    
})

function handleAddItemClick(addedItem) {
    document.getElementById('order').classList.remove('hidden')
    
    const targetItem = menuArray.filter(item => item.name === addedItem)[0]
    const newItem = {...targetItem, id: addedItems.length - 1}
     addedItems = [...addedItems, newItem]
     
    renderOrder()
    window.scrollTo({top: 1000, behavior: 'smooth'})
    document.getElementById('order-confirmation').classList.add('hidden')
}

function handleRemoveItemClick(removedItem) {
    addedItems = addedItems.filter((item, index) => index != removedItem)
   
   renderOrder()
   
}


function getOrderHtml() {
    let totalPrice = 0
   let addedItemsHtml = ``
   addedItems.forEach((addedItem, index) => {
       totalPrice += addedItem.price
       addedItemsHtml += `
       <div class="ordered-item">
        <div>
         <span>${addedItem.name}</span>
         <span class="remove" data-id="${index}">remove</span>
        </div> 
         <span class="price">$${addedItem.price}</span>
       </div>
       `
   })
   document.getElementById('total-price').innerHTML = 
   `Total price: <span class="price">$${totalPrice}</span>`
   
   return addedItemsHtml
  
}
function renderOrder() {
     document.getElementById('order-inner').innerHTML = getOrderHtml()
}


paymentForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('name')
    document.getElementById('payment-modal').classList.add('hidden')
     document.getElementById('order').classList.add('hidden')
    document.getElementById('order-confirmation').classList.remove('hidden')
    document.getElementById('order-confirmation').innerText = `Thanks, ${name}! Your order is on its way!`
    addedItems = []
    document.getElementById('name-input').value = ""
    document.getElementById('ccn-input').value = ""
    document.getElementById('cvv-input').value = ""
})



function getMenuHtml() {
    let menuHtml = ``
    menuArray.forEach(item => {
        menuHtml += `
        <div class="item">
          <img src="${item.emoji}" alt="">
          <div class="item-info">
            <h2 class="item-name">${item.name}</h2>
            <p class="item-ingredients">${item.ingredients}</p>
            <p class="item-price">$${item.price}</p>
          </div>
          <div class="add-item">
            <div class="add-item-btn" id="add-item-btn" data-additem="${item.name}">+</div>
          </div>  
        </div>`
    })
    return menuHtml
}

function renderMenu() {
    document.getElementById('menu').innerHTML = getMenuHtml();
}

renderMenu();

