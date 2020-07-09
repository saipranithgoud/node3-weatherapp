console.log('client side javascript ')

 

const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#message1')
const messageTwo=document.querySelector('#message2')
const messageThree=document.querySelector('#message3')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageTwo.textContent= 'Error message : '+data.error
        }
        else{
            messageTwo.textContent= 'Your Location: '+data.address
            messageOne.textContent= ' '+data.forecast
            
        }
       
    })
}) 

})