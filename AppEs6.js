const card = document.querySelector(".card");
const submit = document.querySelector("#submit");
const tbody = document.querySelector("#t-body");
const form = document.querySelector('#form');

class BookList{
    constructor(a, b, c){
        this.title = a;
        this.author = b;
        this.isbn = c;

    }
    
    insertValues(){
        console.log('prototype call')
        console.log('i = ', i)
        i = storeArr.length

        const tr = document.createElement('tr');
        tr.id =i;
        tr.innerHTML = `
        <th class="i" scope="row">${i}</th>
        <td>${this.title}</td>
        <td>${this.author}</td>
        <td>${this.isbn}</td>
        <td><a href="#"><i id="remove" class="fas fa-times"></i></a></td>
        `
        tbody.appendChild(tr)
    }
    
    removeItem(item){
        
                item.remove();

                const rearrangeId = document.querySelectorAll('.i')
                rearrangeId.forEach(function(val,ind){
                    val.innerText = ind + 1
                    val.parentElement.id = ind + 1
                })
    }
    
    validate(msg, b){
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
    
}

let storeArr = []

class store{
    static localData(i, a, b, c){
        
        const books = { "#":i , 'Title':a,'Author': b,'ISBN': c}
        i = storeArr.length + 1
        console.log('i = ', i)
        
        if(localStorage.getItem('storeArr')=== null){
            i=1
            storeArr = []
        }else{
            storeArr = JSON.parse(localStorage.getItem('storeArr'))
        }
        storeArr.push(books);
        localStorage.setItem('storeArr', JSON.stringify(storeArr))
        
    }

    static addBook(){
        i = storeArr.length + 1
        if(localStorage.getItem('storeArr')=== null){
            i=1
            storeArr = []
        }else{
            storeArr = JSON.parse(localStorage.getItem('storeArr'))
        }
        
        storeArr.forEach(function(val,ind){
            const tr = document.createElement('tr');
            tr.id =i;
            tr.innerHTML = `
            <th class='i' scope="row">${i}</th>
            <td>${val.Title}</td>
            <td>${val.Author}</td>
            <td>${val.ISBN}</td>
            <td><a href="#"><i id="remove" class="fas fa-times"></i></a></td>
            `
            tbody.appendChild(tr)
            i++
        })
    
}
        static deleteBook(id){
            console.log(id)
            const itemId = parseInt(id);
    
            storeArr.forEach(function(val,ind){
                console.log(ind," , ", itemId)
                if(ind+1 === itemId){
                    console.log(ind," , ", itemId)
                    storeArr.splice(ind, 1)
                    console.log(val)
                }
                localStorage.setItem('storeArr',JSON.stringify(storeArr))
            })
            
            
        }
        
    }
    
    let i, obj;
    document.addEventListener('DOMContentLoaded', store.addBook)
    
    form.addEventListener('submit', function(e){
        e.preventDefault()
        const title = document.querySelector('#book-title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#ISBN').value;
        
        obj = new BookList(title,author, isbn);
        
        const storeObj = new store(title,author, isbn)
        
        
        if(title == "" || author == "" || isbn == ""){
            obj.validate(msg='Fill all the fields', b='fail')
            
        }else{
            store.localData(i, title, author, isbn);
            
            obj.insertValues()   // insert values in table
            
            
            obj.validate(msg='Book Added successfully!', b='pass')
        }
        
    })
    
    
    
    
    document.addEventListener('click',function(e){
        console.log('copy remove item')
        
        const obj = new BookList()
        
        if(e.target.id === 'remove'){
            
            obj.removeItem(e.target.parentElement.parentElement.parentElement)    // remove any value if needed
        
            store.deleteBook(e.target.parentElement.parentElement.parentElement.id)
            
            obj.validate(msg='Book deleted successfully!', b='pass')
            
            
        }
    })