const number = '017888'
const pinNumber = '1234'

document.getElementById('loginBtn').addEventListener('click',function(event){
    event.preventDefault()
    
    const num = document.getElementById('mobileBox')
    const pinNum = document.getElementById('pinBox')

    const numberInput = num.value
    const pin = pinNum.value

    if(numberInput === '' || pin === ''){
        alert('All field required')
    }else if(numberInput === number && pin === pinNumber){
        window.location.href = 'home.html'
        num.value = ''
        pinNum.value = ''
    }
})