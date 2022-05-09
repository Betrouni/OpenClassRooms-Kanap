const POSTURL = "http://localhost:3000/api/products/order";
let section = document.querySelector("#cart__items");
let form = document.querySelector(".cart__order__form");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let adress = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.getElementById("email");
let regex = /\d/;


class Contact {
  constructor(firstName, lastName, adress, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = adress;
    this.city = city;
    this.email = email;
  }
}

// Vérifie si un panier éxiste en localstorage, si c'est le cas return le panier
// sinon créé un Panier vide, le set et le return

function getPanier() {
  if (localStorage.getItem("Panier")) {
    return JSON.parse(localStorage.getItem("Panier"));
  } else {
    var Panier = [];
    setPanier(Panier);
    return Panier;
  }
}

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

// Envoie le panier passé en argument en localStorage au nom de 'Panier'

function setPanier(Panier) {
  localStorage.setItem("Panier", JSON.stringify(Panier));
}

// Divise l'objet reçu en chaque éléments à afficher et créé en HTML un produit avec les données reçues

function displayProduct(produitPanier, i) {
  let objet = produitPanier[0];
  let color = produitPanier[1];
  let quantité = produitPanier[2];

  section.innerHTML += `
    <article class="cart__item" data-id="${i}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${objet.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${objet.name}</h2>
        <p>${color}</p>
        <p>${objet.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" id='${i}' class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantité}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" id='${i}'>Supprimer</p>
        </div>
      </div>
    </div>
  </article> 
    `;
}

// Get le panier, appelle la méthode splice() sur l'élément séléctionné et reset le panier

function deleteProduct(product) {
  var Panier = getPanier();
  Panier.splice(product, 1);

  setPanier(Panier);
  document.location.reload();
}

// Return true si la quantité injectée est un entier supérieur ou égal à 1

function isCorrectQté(qté) {
  if (qté % 1 == 0 && qté >= 1) {
    return true;
  }
}

// additionne tout les 3èmes éléments de chaque produits dans le panier puis attribut le total à l'élément HTML
// en bas de page

function displayTotal() {
  Panier = getPanier();
  var elementPrix = document.querySelector("#totalPrice");
  var elementQuantité = document.querySelector("#totalQuantity");

  var prixTotal = 0;
  var articles = 0;

  for (let i = 0; i < Panier.length; i++) {
    prixTotal += Panier[i][0].price * Panier[i][2];
    articles += 1 * Panier[i][2];
  }
  elementPrix.textContent = prixTotal;
  elementQuantité.textContent = articles;
}

// Get le panier, modifie la quantité du produit des arg injectés

function setQté(qté, id) {
  Panier = getPanier();
  Panier[id][2] = qté;
  setPanier(Panier);
  displayTotal(Panier);
  console.log(
    "Le produit " + (parseInt(id) + 1) + " a vu sa quantité ajustée à " + qté
  );
}

// Ajoute un eventListener sur chaque élément de la classe deleteItem dans section
// Pour chaque bouton : au clic: get le panier, supprime l'élément cliqué et reset le panier

section.addEventListener("click", (e) => {
  const isButton = e.target.className === "deleteItem";

  if (isButton) {
    var id = e.srcElement.id;
    deleteProduct(id);
  }
});

// Ajoute un eventListener sur chaque élément de la classe itemQuantity dans section
// à l'écrit, get la quantité saisie, l'id du produit et le panier, si isCorrectQté() : appelle setQté()
//
// Si quantité incorrecte saisie :

section.addEventListener("input", (e) => {
  const isInput = e.target.className === "itemQuantity";

  if (isInput) {
    var qté = Number(e.target.value);
    var id = e.target.id;

    if (isCorrectQté(qté)) {
      setQté(qté, id);
    } else {
      alert("Veuillez saisir une quantitée correcte");
    }
  }
});

// return true si l'email injécté n'est pas vide et correspond au normes regex

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email !== "" && re.test(String(email).toLowerCase())) {
    return true;
  }
};

// return true si le champ n'est pas vide et le contient pas de chiffres

function checkName(name) {
  if (name !== "" && !regex.test(name)) {
    return true;
  } else {
    alert(
      "Les champs Nom / Prénom ne doivent pas être vide ou contenir de chiffres"
    );
  }
}

// Enlève les espaces des champs et vérifie les func checkName() et isValidEmail()
// si tout passe les test alors return true
let firstNameValue = firstName.value.trim();
let lastNameValue = lastName.value.trim();
let addressValue = adress.value.trim();
let cityValue = city.value.trim();
let mailValue = email.value.trim();

function validateInputs() {
  firstNameValue = firstName.value.trim();
  lastNameValue = lastName.value.trim();
  addressValue = adress.value.trim();
  cityValue = city.value.trim();
  emailValue = email.value.trim();
  if (
    checkName(firstNameValue) &&
    checkName(lastNameValue) &&
    isValidEmail(emailValue)
  ) {
    console.log("firstname LastName et Email sont vérifiés");
    return true;
  }
}


// post vers l'API une requête contenant un objet contact et un objet products
// stock l'orderId retourné, l'injecte dans rootToConfirmation

function postRequest(contact, products) {
    axios
    .post(POSTURL, { contact, products })
    .then(function (donnees) {
      orderNumber = donnees.data.orderId
      rootToConfirmation(orderNumber)
    })
    .catch(function (erreur) {
      console.log(erreur);
    });
}


// get l'ID d'un produit 

function getPanierProductID(panierProduit) {
  return panierProduit[0]._id;
}


// return une liste contenant tout les ID des produits dans le panier (ce que demande l'API)

function panierToArray(Panier) {
  array = [];
  Panier.forEach((element) => {
    array.push(getPanierProductID(element));
  });
  return array;
}

// redirige vers la paga confirmation en injectant un paramètre d'URL donné en input

function rootToConfirmation(id) {
  param = "?" + id
  window.location.href = `http://127.0.0.1:5500/P5-folder/front/html/confirmation.html${param}`;
}


// appelle PostRequest de manière asynchrone, stock et return le numéro de commande retourné

async function getOrderNumber(contact, products){
  orderNumber = await postRequest(contact, products)
  .then 
  return orderNumber
}

// a l'envoie du formulaire appelle preventDefault() sur l'évenement puis vérifie si validateInputs()
//  génère un object contacte, get le panier et appelle panierToArray, injecte les datas dans postRequest()

form.addEventListener("submit", (e) =>  {
  e.preventDefault();
 
  if (validateInputs()) { 
    // window.href
    let contact = new Contact(
      firstNameValue,
      lastNameValue,
      addressValue,
      cityValue,
      emailValue
    );
    console.log("tout est ban");
    Panier = getPanier();
    products = panierToArray(Panier);
    postRequest(contact, products);  

    // orderNumber = getOrderNumber(contact, products);
    

    // orderNumber = postRequest(contact, products);
    
    
  }
});

function main() {
  let Panier = getPanier();
  for (let i = 0; i < Panier.length; i++) {
    displayProduct(Panier[i], i);
  }
  displayTotal();
}

main();

