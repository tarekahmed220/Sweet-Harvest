var title=document.getElementById("tit")
var price=document.getElementById("pri")
var stok=document.getElementById("stk")
var category=document.getElementById("categ")  ///cteg
var btn_creat=document.getElementById("btn_creat")

var btn_read=document.getElementById("btn_read")

var tbody =document.getElementById('tbody')

var dele_btn =document.getElementById('btn_del')

var mood='create';
var update_i;


////////// create product  ////////////

var dataPro;
if(localStorage.product != null){
 dataPro=JSON.parse(localStorage.product);
}else{
 dataPro=[];
}
btn_creat.addEventListener('click',function(){
      var new_product=
      {
      title_p:title.value,
      price_p:price.value,
      stok_of_p:stok.value,
      category_of_p:category.value,
      }
          if(mood==='create'){
         dataPro.push(new_product); 
        } 
        else{
            dataPro[update_i]=new_product;
            mood ='create';
            btn_creat.innerHTML='create'
        }         
    //localStorage.setItem('product',new_product)
    localStorage.setItem('product',JSON.stringify(dataPro))
     console.log(new_product);


     clearData()
     readProducts();
})



//////// clear inputs of data /////////

function clearData(){

    title.value="";
    price.value="";
    stok.value="";
    category.value="";

}





////////////// read data on the table /////////////

function readProducts(){
    //var x;
    var table;
    for(var i=1;i<dataPro.length;i++){
   //x=dataPro[i];
               
        table += `<tr class="tr_9"> 
        <td class="th_data" >${i}</td>
    
        <td class="th_data" >${dataPro[i].title_p}</td>
    
        <td class="th_data" >${dataPro[i].price_p}</td>
    
        <td class="th_data" >${dataPro[i].stok_of_p}</td>
    
        <td class="th_data"> ${dataPro[i].category_of_p}</td>

         <td class="th_data">
            <button id="btn_up" onclick="updat_item(${i})">Update</button>
            
        </td>
    
        <td class="th_data">
            <button id="btn_del" onclick="delet_item(${i})">Delete</button>
            
        </td>
        </tr> `
    }
tbody.innerHTML=table;
}

// readProducts(); هعمله زرار شو داتا




/////updat product/////////

function updat_item(i){
    console.log(i)
    title.value=dataPro[i].title_p;
    price.value=dataPro[i].price_p;
    stok.value=dataPro[i].stok_of_p;
    category.value=dataPro[i].category_of_p;

    btn_creat.innerHTML= 'Update' 
    mood='update';
    update_i=i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}



////////////// delet product /////////////////


function delet_item(i){
    console.log(`num of product:${dataPro.length}`)
    console.log(`element removed:${i}`)
    dataPro.splice(i,1)  ////  iبيمسح عنصر واحد مكانه ال 
    localStorage.product= JSON.stringify(dataPro)
    readProducts()
    console.log(`num of product:${dataPro.length}`)
       // localStorage.removeItem(dataPro[i])
}
       //dele_btn.addEventListener('click',function delet_item(i){})  ????????????


/////////////// delet all product  //////////////











///////////////// search in data //////////////////
 function search(value){
    console.log(value);
    var table;
    for(var i=1;i<dataPro.length;i++){
        //if(dataPro[i].title==value)
        if(dataPro[i].title_p.includes(value)){

            table += `<tr class="tr_9"> 
        <td class="th_data" >${i}</td>
    
        <td class="th_data" >${dataPro[i].title_p}</td>
    
        <td class="th_data" >${dataPro[i].price_p}</td>
    
        <td class="th_data" >${dataPro[i].stok_of_p}</td>
    
        <td class="th_data"> ${dataPro[i].category_of_p}</td>

         <td class="th_data">
            <button id="btn_up" onclick="updat_item(${i})">Update</button>
            
        </td>
    
        <td class="th_data">
            <button id="btn_del" onclick="delet_item(${i})">Delete</button>
            
        </td>
        </tr> `
            
        }

    }
    tbody.innerHTML=table;
 }


