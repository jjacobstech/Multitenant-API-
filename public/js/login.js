let email = document.forms[0].elements[0]
let password = document.forms[0].elements[1]
let form  = document.forms[0]
let button = document.forms[0].elements[2]
let info = document.getElementById('info')

// console.log(button)
button.addEventListener('click',()=>{
      if (!email || !password.){
   info.textContent = "Email or password Field cannot be empty"
      }

      setInterval(()=>{
            info.textContent = ""
      },3000)
})


