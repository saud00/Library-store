const card = document.querySelector(".card");
const submit = document.querySelector("#submit");
const tbody = document.querySelector("#t-body");
const form = document.querySelector('#form');

function BookList(a, b, c){
    console.log('parent call')
    this.title = a;
    this.author = b;
    this.isbn = c;
}

BookList.prototype.insetValues = function(){
    
    console.log('prototype call')
    i +=1;
    const tr = document.createElement('tr');
    tr.id =i;
   tr.innerHTML = `
   <th scope="row">${i}</th>
   <td>${this.title}</td>
   <td>${this.author}</td>
   <td>${this.isbn}</td>
   <td><a href="#"><i id="remove" class="fas fa-times"></i></a></td>
   `
   tbody.appendChild(tr)
   
}

BookList.prototype.removeItem = function(){  
    document.addEventListener('mousedown',function(e){
        if(e.target.id == 'remove'){
           const item = e.target.parentElement.parentElement.parentElement;
           item.remove();
           obj.validate(msg='Book deleted successfully!', b='pass')

        }
    })
}

BookList.prototype.validate = function(msg, b){
    console.log('validate triggered')

    const input =  document.createElement('input')
    const div1 =  document.createElement('div')
    input.value = msg
    input.style.color = "white"
    input.setAttribute('disabled', '')
    {b === "pass" ? 
        input.style.backgroundColor = 'green' :
    input.style.backgroundColor = 'red'}
    div1.appendChild(input)
    card.insertBefore(div1,form);

    setTimeout(() => {
        div1.remove()
    }, 2000);
}

let i=0, obj;
form.addEventListener('submit', function(){
    const title = document.querySelector('#book-title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#ISBN').value;
    
    obj = new BookList(title,author, isbn);
    
    
    
    if(title == "" || author == "" || isbn == ""){
        obj.validate(msg='Fill all the fields', b='fail')
        console.log(BookList)
    }else{
        obj.insertValues()   // insert values in table
        obj.removeItem()    // remove any value if needed
        obj.validate(msg='Book Added successfully!', b='pass')
     }

})


