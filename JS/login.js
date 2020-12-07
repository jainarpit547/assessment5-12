const setContent = () => localStorage.getItem('login') && window.location.replace('/order.html')



$(document).ready(function () {
    setContent()

    $('#loginForm').submit((e) => {
        e.preventDefault()
        let userName = $('#userName').val()
        let password = $('#password').val()
        if (userName === password) {
            $.ajax({
                type: "POST",
                url: 'https://5ee248e08b27f300160948a4.mockapi.io/video/login',
                data: {
                    userName: userName,
                    password: password
                },
                success: (success) => {
                    localStorage.setItem('login', JSON.stringify(true))
                    alert('login success')
                    window.location.href = '/order.html'
                }
            });
        } else {
            alert('please enter valid credential')
        }
    })

});