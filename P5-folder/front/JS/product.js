

let baseUrl = window.location.href; // You can also use document.URL
let koopId = baseUrl.substring(baseUrl.lastIndexOf("=") + 1); // KoopId représente l'id qui est présent dans l'URL
const url = "http://localhost:3000/api/products";
let button = document.querySelector('#addToCart')




// La func envoie une requête à l'API et return les données

function getDatas() {
  return axios
    .get(url)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (erreur) {
      alert("Un problème est survenu");
    });
}


// Vérifie si un panier éxiste en localstorage, si c'est le cas return le panier
// sinon créé un Panier vide, le set et le return
function getPanier(){
  if (localStorage.getItem("Panier")){
    return JSON.parse(localStorage.getItem("Panier"))
  }
  else {
    var Panier = []
    setPanier(Panier)
    return Panier
  }
}



// Envoie le panier passé en argument en localStorage au nom de 'Panier'

function setPanier(Panier){
  localStorage.setItem('Panier', JSON.stringify(Panier));
}







// La function modifie dynamiquement les éléments descriptifs du produit dans le BOM en fonction d'un paramètre data
// Elle boucle sur la longueur de la liste de couleur de chaque produit puis ajoute à chaque itération une couleur
// dans la liste des choix 

function displayProduct(data) {
  document.querySelector(
    ".item__img"
  ).innerHTML += `<img src="${data[koopId].imageUrl}" alt="${data[koopId].altTxt}">`;
  document.querySelector("#title").textContent = data[koopId].name;
  document.querySelector("#price").textContent = data[koopId].price;
  document.querySelector("#description").textContent = data[koopId].description;


  let colorList = document.querySelector("#colors");
  for (let i = 0; i < data[koopId].colors.length; i++) {
    colorList.innerHTML += `<option value="${data[koopId].colors[i]}">${data[koopId].colors[i]}</option>`;
  }
}


// check si le même produit+couleur éxiste déjà dans le panier, 
// si oui => additionner les quantité  

function checkQuantity(){}




// La func() prend 3 paramètres en input qu'elle injecte dans une liste[]
// get le Panier du localstorage et injecte la liste[] créée 
// set le Panier en localstorage avec les nouvelles données

function createProduitPanier(produit,couleur,quantité){
    let produitPanier = [produit,couleur,parseInt(quantité)]
    Panier = getPanier()
    let index = Panier.findIndex((produitPanier) => produitPanier[0].name == produit.name && produitPanier[1] == couleur)
    if (~index){
      Panier[index][2] += parseInt(quantité)
      setPanier(Panier)
      alert('La quantité du produit '+ produitPanier[0].name + 'a été ajusté à ' + Panier[index][2])
    }else {
      Panier.push(produitPanier)
      setPanier(Panier)
      alert('Le produitPanier contenant ' + quantité+ ' ' + produitPanier[0].name + ' ' + couleur +' a été stocké en localStorage')
    }

    
}






// En cliquant le bouton, la couleur et la quantité sont stockés et injectés dans createProduitPanier() 

button.addEventListener('click',async ()=>{
    var datas = await getDatas();
    var produit = datas[koopId]
    var color = document.querySelector('#colors')
    var selectedColor = color.options[color.selectedIndex].textContent
    var input = document.querySelector('input').value
    // console.log(selectedColor)
    if (selectedColor == "--SVP, choisissez une couleur --"){
      alert('Merci de choisir une couleur')
    }
    else{
      createProduitPanier(produit,selectedColor,input)
    }
    
})






// stock getDatas(), appelle createPanier() et injecte dans displayProduct() les datas

async function main() {
  const article = await getDatas();
  displayProduct(article);
}

main();


