$(function () {
    displayItems();
});

let items = [
    {
        id: uuidv4(),
        name: "Red N Hot (Thin Crust) Pizza",
        quantity: 5,
        price: 25,
    },

];

let subtotal = 0;
let grandTotal = 0;
let deliveryCharge = 0;
let couponDiscount = 0;

//items
const mainItemDiv = $('#main_item_list');
function itemContent(name, quantity, price, id) {
    return `
<div class="each_order">
<div class="each_top">
    <div class="each_first">
        <div class="order_tag">
            <img src="images/pizza.png" alt="order">
            <h4>${name}</h4>
            <div class="tags">
                <p>L</p>
                <p>M</p>
            </div>
        </div>
        <div class="order_cat">
            <p>Red Sauce</p>
            <p>Ricotta</p>
            <p>Smoked Ham</p>
            <p>Garlic</p>
            <p>BBQ Sauce Drizzle</p>
        </div>
        <div class="order_price desktop">
            <p class="price">\$${price}</p>
            <p class="edit">Edit</p>
        </div>
    </div>
    <div class="each_sec down_space">
        <div class="order_total">
            <span class="decrease_quantity">-</span>
            <span>${quantity}</span>
            <span class="decrease_quantity">+</span>
        </div>
        <p class="quan">Quantity</p>
    </div>
    <div class="each_third down_space">
        <p class="price_total">\$${(price * quantity).toFixed(2)}</p>
        <p class="quan">Subtotal</p>
    </div>
    <div class="cross" onclick="deleteItem('${id}')">
        <span><i class="fa fa-times" aria-hidden="true"></i></span>
    </div>
</div>
<div class="order_price mobile">
    <p class="price">\$${price}</p>
    <p class="edit">Edit</p>
</div>
</div>
`
};


//uuid
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function displayItems() {
    mainItemDiv.html('');
    subtotal = 0;
    grandTotal = 0;
    deliveryCharge = 15;
    couponDiscount = 10;
    items.forEach(data => {
        const { name, quantity, price,id } = data;
        subtotal += quantity * price;
        mainItemDiv.append(itemContent(name, quantity, price,id));
    });
    grandTotal = subtotal + deliveryCharge - couponDiscount;
    displayItemCount();
    showPrice();
    showDeliveryChargeandCoupan();
}

//display item count
function displayItemCount() {
    const itemCountDiv = document.querySelector('.item_count');
    itemCountDiv.innerHTML = "";
    itemCountDiv.append(items.length + ' ' + 'items')
}

//add new item
const addBtn = document.querySelector('.add_new_item');
function addNewItem() {
    let newItemName = document.getElementById('item_name').value;
    let newItemQuantity = document.getElementById('item_quantity').value;
    let newItemPrice = document.getElementById('item_price').value;
    const newItemObj = {
        id:uuidv4(),
        name: newItemName,
        quantity: +newItemQuantity,
        price: +newItemPrice
    }
    items.push(newItemObj);
    document.getElementById('item_name').value = '';
    document.getElementById('item_quantity').value = '';
    document.getElementById('item_price').value = '';
    displayItems();

}
addBtn.addEventListener('click', addNewItem);

//delete item
function deleteItem(id){
    let newArr = [];
    items.forEach(item => {
        if(item.id !== id){
            newArr.push(item);
        }
    });
    items = newArr;
    displayItems();
}

function showPrice() {
    //subtotal
    document.querySelector('.subtotal_price').innerHTML = "";
    document.querySelector('.subtotal_price').append(`\$${subtotal}`);
    //grandtotal
    const grandTotalDiv = document.querySelector('.grand_price');
    grandTotalDiv.innerHTML = "";
    grandTotalDiv.append(`\$${grandTotal}`);
}

//add coupon anddelivetry charge
function showDeliveryChargeandCoupan() {
    //delivery charge
    const deliveryChargeDiv = document.querySelector('.delivery_price');
    deliveryChargeDiv.innerHTML = "";
    deliveryChargeDiv.append(`\$${deliveryCharge}`);

    //coupan charge
    const couponchargeDiv = document.querySelector('.coupon_price');
    couponchargeDiv.innerHTML = "";
    couponchargeDiv.append(`-\$${couponDiscount}`);
}