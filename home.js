const validPin = '1234'
let isGetCoupn = 0

// Date Format
const date = new Date()
const d = date.getDate()
const m = date.getMonth() + 1
const y = date.getFullYear()
const h = date.getHours()
const min = date.getMinutes()

const timeFormat = date.toLocaleString('en-US', {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
})

// Transctions Data
const transctionsData = []

const addMoneyFormSection = document.getElementById('addMoneyFormSection')
const outMoneyFormSection = document.getElementById('outMoneyFormSection')
const transferFormSection = document.getElementById('transferFormSection')
const getBonusFormSection = document.getElementById('getBonusFormSection')
const payBillFormSection = document.getElementById('payBillFormSection')

const addmoneyCard = document.getElementById('addMoneyCard');
const outMoneyCard = document.getElementById('outMoneyCard');
const transferCard = document.getElementById('transferCard');
const getBonusCard = document.getElementById('getBonusCard');
const payBillCard = document.getElementById('payBillCard');
const transactionsCard = document.getElementById('transactionsCard');

const addMoneyForm = document.getElementById('addMoneyForm');
const cashOutForm = document.getElementById('cashOutForm');
const transferForm = document.getElementById('transferForm');
const getBonusForm = document.getElementById('getBonusForm');
const payBillForm = document.getElementById('payBillForm');
const transactionsForm = document.getElementById('transactionsForm');

addmoneyCard.classList.remove("border-[rgba(8,8,8,0.1)]")
addmoneyCard.classList.add("border-[#0874f2]", "bg-[#0874f20d]")

function toggleCard(cardId, formId) {
    const cards = document.getElementsByClassName("sectionCard")
    const forms = document.getElementsByClassName("formDiv")

    for (const card of cards) {
        card.classList.remove("border-[#0874f2]", "bg-[#0874f20d]")
        card.classList.add("border-[rgba(8,8,8,0.1)]")
    }

    for (const form of forms) {
        form.classList.add('hidden', true)
    }

    formId.classList.remove('hidden')
    cardId.classList.remove("border-[rgba(8,8,8,0.1)]")
    cardId.classList.add("border-[#0874f2]", "bg-[#0874f20d]")
}

addmoneyCard.onclick = () => toggleCard(addmoneyCard, addMoneyForm)
outMoneyCard.onclick = () => toggleCard(outMoneyCard, cashOutForm)
transferCard.onclick = () => toggleCard(transferCard, transferForm)
getBonusCard.onclick = () => toggleCard(getBonusCard, getBonusForm)
payBillCard.onclick = () => toggleCard(payBillCard, payBillForm)
transactionsCard.addEventListener('click', function () {
    toggleCard(transactionsCard, transactionsForm)

    document.getElementById('transaction-parant').innerText = ""

    if (transctionsData.length === 0) {
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="w-full pt-15 flex items-center justify-center">
            <p class="text-2xl font-bold text-gray-300">No Transction</p>
        </div> 
        `
        document.getElementById('transaction-parant').appendChild(div)
    } else {
        for (const data of transctionsData) {
            const div = document.createElement('div')
            div.innerHTML = `
                    <div id="transaction" class="flex items-center justify-between bg-white p-3 mt-3 rounded-xl">
                        <div class="flex gap-4 items-center justify-center">
                            <img src="assets/money1.png" alt="">
                            <div>
                                <h1 class="font-bold">${data.name}</h1>
                                <p class="text-[12px] text-gray-500">${data.date}</p>
                            </div>
                        </div>

                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                `
            document.getElementById('transaction-parant').appendChild(div)

        }
    }




})


/*
addmoneyCard.addEventListener('click',function(){
    toggleCard(addmoneyCard,addMoneyForm)
})
outMoneyCard.addEventListener('click',function(){
    toggleCard(outMoneyCard,cashOutForm)
})

outMoneyCard.
    addEventListener('click', function () {
        const cards = document.getElementsByClassName('sectionCard')
        const forms = document.getElementsByClassName('formDiv')

        for (const card of cards) {
            card.classList.remove("border-[#0874f2]", "bg-[#0874f20d]")
            card.classList.add("border-[rgba(8,8,8,0.1)]")
        }

        for (const form of forms) {
            form.classList.add('hidden', true)
        }

        cashOutForm.classList.remove('hidden')
        outMoneyCard.classList.remove("border-[rgba(8,8,8,0.1)]")
        outMoneyCard.classList.add("border-[#0874f2]", "bg-[#0874f20d]")

    })
        */

// Add Money Form Functions
document.getElementById('addMoneyBtn').
    addEventListener('click', function (e) {
        e.preventDefault()

        const currentBalance = document.getElementById('balanceText')

        const bankBox = document.getElementById('bankSelect')
        const accNumBox = document.getElementById('accountNumberBox')
        const amountBox = document.getElementById('amountToAddBox')
        const pinBox = document.getElementById('pinNumberBox')

        const current = parseInt(currentBalance.innerText)
        const bank = bankBox.value
        const account = accNumBox.value
        const ammount = parseInt(amountBox.value)
        const pin = pinBox.value

        if (bank === 'Select a bank' || account === '' || ammount === '' || pin === '') {
            alert("All field required")
        } else if (account.length < 11) {
            alert('Invalid account number')
        } else if (ammount < 0) {
            alert("Enter a correct amount")
        } else if (pin !== validPin) {
            alert('Incorrect pin number')
        } else {
            alert('Successfully added $' + ammount)
            currentBalance.innerText = current + ammount

            const data = {
                name: "Add Money",
                date: `${d}/${m}/${y} ${timeFormat}`
            }
            transctionsData.push(data)
            addMoneyFormSection.reset();
        }


    })


// Cash Out Form Funtions
document.getElementById('outMoneyBtn').
    addEventListener('click', function (e) {
        e.preventDefault()

        const currentBalance = document.getElementById('balanceText')

        const accNumBox = document.getElementById('outAccNumberBox')
        const amountBox = document.getElementById('outAmountToAddBox')
        const pinBox = document.getElementById('outPinNumberBox')

        const current = parseInt(currentBalance.innerText)
        const account = accNumBox.value
        const ammount = parseInt(amountBox.value)
        const pin = pinBox.value


        if (account === '' || ammount === '' || pin === '') {
            alert("All field required")
        } else if (account.length < 11) {
            alert('Invalid account number')
        } else if (ammount < 0 || current < ammount) {
            alert("Enter a correct amount")
        } else if (pin !== validPin) {
            alert('Incorrect pin number')
        } else {
            alert('Successfully Cashout $' + ammount)
            currentBalance.innerText = current - ammount

            const data = {
                name: "Cash Out",
                date: `${d}/${m}/${y} ${timeFormat}`
            }
            transctionsData.push(data)
            outMoneyFormSection.reset();
        }


    })


// Transfer Form Funtions
document.getElementById('transferBtn').
    addEventListener('click', function (e) {
        e.preventDefault()

        const currentBalance = document.getElementById('balanceText')

        const accNumBox = document.getElementById('transferAccNumberBox')
        const amountBox = document.getElementById('transferAmountToAddBox')
        const pinBox = document.getElementById('transferPinNumberBox')

        const current = parseInt(currentBalance.innerText)
        const account = accNumBox.value
        const ammount = parseInt(amountBox.value)
        const pin = pinBox.value


        if (account === '' || ammount === '' || pin === '') {
            alert("All field required")
        } else if (account.length < 11) {
            alert('Invalid account number')
        } else if (ammount < 0 || current < ammount) {
            alert("Enter a correct amount")
        } else if (pin !== validPin) {
            alert('Incorrect pin number')
        } else {
            alert('Successfully Transfer $' + ammount)
            currentBalance.innerText = current - ammount

            const data = {
                name: "Transfer",
                date: `${d}/${m}/${y} ${timeFormat}`
            }
            transctionsData.push(data)
            transferFormSection.reset();
        }

    })

// Get Bonus Functionality
document.getElementById('getBonusBtn').addEventListener('click', function (e) {
    e.preventDefault()

    const coupnCode = document.getElementById('getBonusCoupon')
    const currentBalance = document.getElementById('balanceText')

    const value = coupnCode.value
    const current = parseInt(currentBalance.innerText)

    if (value != 'E8855') {
        alert('Wrong coupn code')
    } else if (isGetCoupn == 1) {
        alert('You already get your reward')
    } else {
        currentBalance.innerText = current + 500
        isGetCoupn = isGetCoupn + 1

        alert('You get $500 bonus')

        getBonusFormSection.reset()
    }

})

// Pay Bill Functionality
document.getElementById('payBillBtn').
    addEventListener('click', function (e) {
        e.preventDefault()

        const currentBalance = document.getElementById('balanceText')

        const optionSelectBox = document.getElementById('payBillSelect')
        const bilAccNumBox = document.getElementById('billAccountNumberBox')
        const billAmountBox = document.getElementById('billAmountToAddBox')
        const billPinBox = document.getElementById('billPinNumberBox')

        const current = parseInt(currentBalance.innerText)
        const select = optionSelectBox.value
        const account = bilAccNumBox.value
        const ammount = parseInt(billAmountBox.value)
        const pin = billPinBox.value

        if (select === 'Select back' || account === '' || ammount === '' || pin === '') {
            alert("All field required")
        } else if (account.length < 11) {
            alert('Invalid account number')
        } else if (ammount < 0 || current < ammount) {
            alert("Enter a correct amount")
        } else if (pin !== validPin) {
            alert('Incorrect pin number')
        } else {
            alert(select + " Bill Payment Success...")
            currentBalance.innerText = current - ammount

            const data = {
                name: "Bill Payment",
                date: `${d}/${m}/${y} ${timeFormat}`
            }
            transctionsData.push(data)

            payBillFormSection.reset();
        }



    })