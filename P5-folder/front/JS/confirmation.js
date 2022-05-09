const param = window.location.search.split('?').join('');
orderIdHTML = document.querySelector('#orderId')


orderIdHTML.innerText = param
