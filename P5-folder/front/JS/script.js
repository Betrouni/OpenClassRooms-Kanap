let datas;
let article = document.querySelector("article");
const url = "http://localhost:3000/api/products";
let HTMLToAdd = ""


// La func envoie une requête à l'API et return les données

function getDatas() {
  return axios
    .get(url)
    .then(function (response) {
      // console.log(response.data)
      return response.data
      
      
    })
    .catch(function (erreur) {
      alert("Un problème est survenu");
    });
}

// La func créé dans l'HTML chaque article de manière dynamique, prend en paramètre
// les données de l'API + le nombre d'entité à afficher et affiche le HTML nécéssaire à chaque itération

function displayArticle(data, length) {
  let section = document.getElementById('items')
  
  // 

   for (let i = 0; i < length; i++) {
    // console.log("Je suis l'entité " + i + " de la réponse API")

    HTMLToAdd +=`
    <a href="./product.html?id=${i}">
              <article>
                <img src="${data[i].imageUrl}"  alt="${data[i].altTxt}">
                <h3 class="productName">${data[i].name}</h3>
                <p class="productDescription">${data[i].description}
                </article>
    `
  }
 
  section.innerHTML = HTMLToAdd
  
}

// La function principale du script qui va d'abord appeller getDatas() puis injecte dans displayArticle()
// les données renvoyées par l'API


async function main() {
  const article = await getDatas();
  
  
  // console.log(article.length)
  displayArticle(article,article.length);
}

main();



