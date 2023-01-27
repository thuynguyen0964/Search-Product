let list = document.querySelector("#list");
let filter = document.querySelector(".filter");
let count = document.querySelector("#count");
let listProduct = [
    {
        id : 1,
        name : "Ao thun",
        price : 549,
        img : "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        quantity : 0,
        other : {
            color : ["white", "black"],
            type : "T-shirt"
        }
    },
    {
        id : 2,
        name : "Ao gio",
        price : 300,
        img : "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        quantity : 50,
        other : {
            color : ["black" , "blue"],
            type : "Polo",
        }
    },
    {
        id : 3,
        name : "Ao coc",
        price : 659,
        img : "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        quantity : 100,
        other : {
            color : ["white","green"],
            type : "Polo"
        }
    },
    {
        id : 4,
        name : "Ao mua",
        price : 549,
        img : "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        quantity : 10,
        other : {
            color : ["white"],
            type : "Shirt"
        }
    },
    {
        id : 5,
        name : "Ao Am",
        price : 999,
        img : "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        quantity : 20,
        other : {
            color : ["white", "black", "blue"],
            type : "T-shirt"
        }
    },
    {
        id : 6,
        name : "Ao lot",
        price : 299,
        img : "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        quantity : 10,
        other : {
            color : ["white", "black"],
            type : "Polo"
        }
    },
];

//Tạo mảng lưu kết quả , mặc định bằng số sản phẩm hiện có
let proDuctFilter = listProduct;

//hàm proDuctfilter để tạo và render ra sản phẩm sau khi lọc
function showProduct(proDuctFilter){
    count.innerText = proDuctFilter.length;
    list.innerHTML = "";
    proDuctFilter.forEach((item)=>{
        let newItem = document.createElement("div");
        newItem.classList.add("item");
        
        //tao image
        let image = new Image();
        image.src = item.img;
        newItem.appendChild(image);

        //tao name product
        let title = document.createElement("div");
        title.classList.add("title");
        title.innerText = item.name;
        newItem.appendChild(title);

        //tao price
        let price = document.createElement("div");
        price.classList.add("price");
        price.innerText = item.price.toLocaleString() +  " vnd";
        newItem.appendChild(price);
        
        list.appendChild(newItem);
    })
}

filter.addEventListener("submit", (event)=>{
    event.preventDefault();
    //lấy ra các phần tử dùng để lọc
    let valueFilter = event.target.elements;
    //dùng filter để lọc điều kiện
    proDuctFilter = listProduct.filter((item)=>{
        if(valueFilter.category.value !== ""){
            if(item.other.type !== valueFilter.category.value){
                return false;
            }
            //Nếu loại trong DB mà khác với dữ liệu nhập vào thì return fasle;
        }
        if(valueFilter.color.value !== ""){
            if(!item.other.color.includes(valueFilter.color.value)){
                return false;
            }
        }
        //Nếu trong mảng /chuỗi item.other... mà không có mảng / chuỗi valueFilter.color thì return false
        if(valueFilter.name.value !== ""){
            if(!item.name.includes(valueFilter.name.value)){
                return false;
            }
        }
        //Nếu trong mảng /chuỗi item.other... mà không có mảng / chuỗi valueFilter.color thì return false
        if(valueFilter.minPrice.value !== ""){
            if(item.price < valueFilter.minPrice.value){
                return false;
            }
        }
        //Nếu giá trị nhập vào nhỏ hơn giá trị trong DB thì return false

        if(valueFilter.maxPrice.value !== ""){
            if(item.price > valueFilter.maxPrice.value){
                return false;
            }
        }
        //Nếu giá trị nhập vào lớn hơn giá trị trong DB thì return false

        return true;
    });
    //gọi hàm showProduct để render kết quả ra màn hình
    showProduct(proDuctFilter);
});
