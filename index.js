let ham=document.querySelector("#Hamburger")
let menu=document.querySelector("#menu")
menu.classList.add('hidden')
ham.addEventListener('click',function(){
    if(menu.classList.contains('hidden')){
    menu.classList.remove('hidden')
    ham.classList.remove('fa-solid', 'fa-bars')
    ham.classList.add('fa-solid', 'fa-xmark')
    }
    else {menu.classList.add('hidden')
        ham.classList.remove('fa-solid', 'fa-xmark')
        ham.classList.add('fa-solid', 'fa-bars')
        
    }
})


