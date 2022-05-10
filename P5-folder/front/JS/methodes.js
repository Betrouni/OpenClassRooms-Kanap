// Vérifie si un panier éxiste en localstorage, si c'est le cas return le panier
// sinon créé un Panier vide, le set et le return

export function getPanier() {
    if (localStorage.getItem("Panier")) {
      return JSON.parse(localStorage.getItem("Panier"));
    } else {
      var Panier = [];
      setPanier(Panier);
      return Panier;
    }
  }


// Envoie le panier passé en argument en localStorage au nom de 'Panier'

export function setPanier(Panier) {
    localStorage.setItem("Panier", JSON.stringify(Panier));
  }


// La func envoie une requête à l'API et return les données

export function getDatas() {
  return axios
    .get("http://localhost:3000/api/products")
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (erreur) {
        console.log(erreur);
    //   alert("Un problème est survenu");
    });
}
