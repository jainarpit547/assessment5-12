let allContent = []
let currentContent = []

const checkLogin = () => {
    if (!localStorage.getItem('login')) {
        window.location.href = "/index.html"
    }
}

const logout = () => {
    localStorage.clear()
    window.location.href = '/index.html'
}

const settingContent = () => {
    const newId = $("#new").prop('checked')
    const packedId = $("#packed").prop('checked')
    const intransitId = $("#intransit").prop('checked')
    const deliveredId = $("#delivered").prop('checked')
    if (allContent.length > 0) {
        currentContent = allContent.filter((value, key) => {
            if (newId && value.orderStatus === 'New') return true
            if (packedId && value.orderStatus === 'Packed') return true
            if (deliveredId && value.orderStatus === 'Delivered') return true
            if (intransitId && value.orderStatus === 'InTransit') return true
            return false
        })
    }
}

const renderUI = () => {
    $('tbody').html('')
    $('#count').html(currentContent.length)
    if (currentContent.length > 0) {
        for (let i = 0; i < currentContent.length; i++) {
            $('tbody').append(`
                <tr>
                    <td class="light"> ${currentContent[i].id} </td>
                    <td> ${currentContent[i].customerName} </td>
                    <td>${currentContent[i].orderDate}<p class="light lightP">${currentContent[i].orderTime}</p>
                    </td>
                    <td class="light">$${currentContent[i].amount}</td>
                    <td>${currentContent[i].orderStatus}</td>
                </tr>
            `)
        }
    }
}

const showContent = () => {
    settingContent()
    renderUI()
}

const getContent = () => {
    $.ajax({
        url: 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders',
        success: (result) => {
            allContent = result
            showContent()
        }
    })
}

$(document).ready(function () {
    checkLogin()
    getContent()
    $('.checkBox').change(showContent)
});