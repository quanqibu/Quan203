// Change Page
let thisPage = 1;
let limit = 6;
let list = document.querySelectorAll('.list .item');

function loadItem(){
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    list.forEach((item, key)=>{
        if(key >= beginGet && key <= endGet){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })
    listPage();
}
loadItem();
function listPage(){
    let count = Math.ceil(list.length / limit);
    document.querySelector('.listPage').innerHTML = '';

    if(thisPage != 1){
        let prev = document.createElement('li');
        prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }

    for(i = 1; i <= count; i++){
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if(i == thisPage){
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }

    if(thisPage != count){
        let next = document.createElement('li');
        next.innerText = 'NEXT';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}
function changePage(i){
    thisPage = i;
    loadItem();
}
// Open/Close cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let cartClose = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.toggle('active');
};
cartClose.onclick = () => {
    cart.classList.remove('active');
};

// Add to cart
let notiGreen = document.querySelector('.noti-green');
let add = document.querySelectorAll('.item .content .add');
 list.forEach(item =>{
    item.addEventListener('click', function(event){
        if( event.target.classList.contains('add')){
            var newItem = item.cloneNode(true);
            let checkIsset = false;

            let listCart = document.querySelectorAll('.cart-box .item');
            listCart.forEach(cart =>{
                if(cart.getAttribute('data-key') == newItem.getAttribute('data-key')){
                    checkIsset = true;
                    // Notification
                    notiGreen.classList.add('active');
                setTimeout(function(){
                notiGreen.classList.remove('active');
                },1000);
                }
            })
            if(checkIsset == false){
            document.querySelector('.cart-box').appendChild(newItem);
            // Notification
            notiGreen.classList.add('active');
            setTimeout(function(){
                notiGreen.classList.remove('active');
            },1000);
            countItem();
            cartTotal();
        }}
    })
 })
// Remove to cart
let notiRed = document.querySelector('.noti-red')
function Remove($key){
    let listCart = document.querySelectorAll('.cart-box .item');
    listCart.forEach(item =>{
        if(item.getAttribute('data-key') == $key){
            item.remove();
            return;
        }
    })
    countItem();
    cartTotal();
    // Notification
    notiRed.classList.add('active');
            setTimeout(function(){
                notiRed.classList.remove('active');
            },1000);
}

// Total 
function cartTotal(){
    var listCart = document.querySelectorAll('.cart-box .item');
    var total =0;
    for(var i = 0; i < listCart.length; i++){
        var priceElement = listCart[i].querySelector('.price .num');
        // console.log("element" + priceElement);
        var price = parseFloat(priceElement.innerHTML.replace(".",""));
        // console.log("tien" + price);
        var quantity = listCart[i].querySelector(".count").value;

        // console.log("so luong" + quantity);
        total = total + (price*quantity)*1000;
    }
   document.getElementsByClassName('total-price')[0].innerText = total.toLocaleString('de-DE') + " ₫";
}
// Quantity changes ----------------------------------------------------------------
function countItem(){
var count = document.querySelectorAll('.cart-box input');
for (var i = 0; i < count.length; i++) {
    var input = count[i];
    input.addEventListener('change', quantityChanged);
    // console.log(count[i] + i + "amount" + input.value);
}
}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    // console.log(input.value);
    cartTotal();
}
// cart icon when have product inside the cart
