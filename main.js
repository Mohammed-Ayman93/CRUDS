// get total

let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let title = document.getElementById('title');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let searchSec = document.getElementById('searchSec');
let table = document.getElementById('table');
let notfound = document.getElementById('notfound');
let id;
let num0 = myTable.childElementCount;
let deleted = [];
function getTotal(){
    if(price.value != ""){
        total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
        total.style.background = ('green');
    }else{
        total.innerHTML = "";
        total.style.background = ('rgb(126, 20, 20)');
    }
}
// localStorage.clear()    
// create producut
let product = [];

if(localStorage.products != null){
    product = JSON.parse(localStorage.products);
}else{
    product = [];
}
showProdcut();
function createProdcut (){
    if(btn.innerHTML === "Create"){
        for( i = 0 ; i < Number(count.value) ; i++){
            let newProdcut = {
                title : title.value,
                price : price.value,
                taxes : taxes.value,
                ads : ads.value,
                discount : discount.value,
                total : total.innerHTML,
                category : category.value,
            }
            product.push(newProdcut);
        }
    }else if(btn.innerHTML === "Update"){
        product[id].title = title.value;
        product[id].price = price.value;
        product[id].taxes = taxes.value;
        product[id].ads = ads.value;
        product[id].total = total.innerHTML;
        product[id].category = category.value;
        product[id].discount = discount.value;
        count.style.display = "block";
        btn.innerHTML = "Create";
    }
    localStorage.products = JSON.stringify(product);
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    category.value = "";
    total.innerHTML = "";
    count.value = "";
    total.style.background = ('rgb(126, 20, 20)');
    showProdcut()
}
// save localstorge
// clear inputs
// read


function showProdcut(){
    myTable.innerHTML = "";
    for(i = 0 ; i < product.length ; i++){
        let myTable = document.getElementById('myTable');
        myTable.innerHTML += `
        <tr>
            <td>${i+1}</td>
            <td>${product[i].title}</td>
            <td>${product[i].price}</td>
            <td>${product[i].taxes}</td>
            <td>${product[i].ads}</td>
            <td>${product[i].discount}</td>
            <td>${product[i].total}</td>
            <td>${product[i].category}</td>
            <td><button onclick="updateProdcut(${i})">update</button></td>
            <td><button onclick="deleteProdcut(${i})">delete</button></td>
        </tr>
        `
        num0 = myTable.childElementCount;
    }
    if(myTable.childElementCount > 0 ){
        searchSec.innerHTML = `
        <button onclick="deleteAll()">Delete All(${num0})</button>
        `
    }else{
        searchSec.innerHTML = ""
    }
}
// count 

// delete
function deleteProdcut (num){
    product.splice(num,1);
    localStorage.products = JSON.stringify(product);
    showProdcut()
}
function deleteAll(){
    if(myTable.childElementCount  === product.length){
        product.splice(0,product.length);
        localStorage.products = JSON.stringify(product);
        showProdcut()
    }else{
        for(i = 0 ; i < product.length ; i++){
            let smallTitle = product[i].title.toLowerCase();
            let smallCategory = product[i].category.toLowerCase();
            if(smallTitle.includes(search.value.toLowerCase()) || smallCategory.includes(search.value.toLowerCase()) || product[i].price.includes(search.value) || product[i].taxes.includes(search.value) || product[i].ads.includes(search.value) || product[i].discount.includes(search.value) || product[i].total.includes(search.value)  ){
            }else{
                        deleted.push(product[i]);

            }
        }
        product = deleted 
        setTimeout(function(){deleted = [];},1000);
        searchSec.innerHTML = `<button onclick="deleteAll()">Delete All(0)</button>`
        notfound.classList.remove('hide');
        table.classList.add('hide');
        
    }
    localStorage.products = JSON.stringify(product);
}

// update
function updateProdcut(num){
    title.value = product[num].title;
    price.value = product[num].price;
    taxes.value = product[num].taxes;
    ads.value = product[num].ads;
    discount.value = product[num].discount;
    category.value = product[num].category;
    count.style.display = "none";
    scroll({
        top:0,
        behavior:'smooth'
    })
    let btn = document.getElementById('btn');
    btn.innerHTML = "Update";
    id = num ;
    getTotal()
}
// search
search.onkeyup = (function(){
    if(search.value.length > 0){
        myTable.innerHTML = "";
        for(i = 0 ; i < product.length ; i++){
            let smallTitle = product[i].title.toLowerCase();
            let smallCategory = product[i].category.toLowerCase();
            if(smallTitle.includes(search.value.toLowerCase()) || smallCategory.includes(search.value.toLowerCase()) || product[i].price.includes(search.value) || product[i].taxes.includes(search.value) || product[i].ads.includes(search.value) || product[i].discount.includes(search.value) || product[i].total.includes(search.value)  ){
                myTable.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${product[i].title}</td>
                <td>${product[i].price}</td>
                <td>${product[i].taxes}</td>
                <td>${product[i].ads}</td>
                <td>${product[i].discount}</td>
                <td>${product[i].total}</td>
                <td>${product[i].category}</td>
                <td><button onclick="updateProdcut(${i})">update</button></td>
                <td><button onclick="deleteProdcut(${i})">delete</button></td>
            </tr>
            `

            num0 = myTable.childElementCount;
            searchSec.innerHTML = `
        <button onclick="deleteAll()">Delete All(${num0})</button>
        `
            }else{
                num0 = myTable.childElementCount;
                searchSec.innerHTML = `
                <button onclick="deleteAll()">Delete All(${num0})</button>
                `
            }
        }
    }else{
        showProdcut()
    }
    if(num0 === 0){
        notfound.classList.remove('hide');
        table.classList.add('hide');
    }else if (num0 > 0 ){
        notfound.classList.add('hide');
        table.classList.remove('hide');
    }
})
// clean data
