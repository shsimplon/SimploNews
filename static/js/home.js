 function articlevisible() {
     let token = window.localStorage.getItem('token');
     console.log(token);
     let articleConfig = {
         method: "GET",

         headers: {
             "Content-Type": "application/json",
             "Authorization": "Bearer " + token


         },

     };
     fetch("https://simplonews.brianboudrioux.fr/articles", articleConfig)
         .then(function(response) {
             if (response.status == 403) {
                 console.log("erreur dautentification");


             }
             if (response.status == 400) {
                 console.log("erreurs donnés requetes");

             } else {

                 console.log("tu as accès à larticle");
                 response.json().then(function(article) {
                     let newsSimplon = document.getElementById("home")
                     let text = " ";


                     for (let i = 0; i < article.articles.length; i = i + 2) {


                         text +=

                             `  <article class="firstSection">
                <figure class="bulleArticle1"> 
                <div class="divImage">
                             <img src="${article.articles[i].img}" alt="imagearticle"> 
                             <p class="category">${article.articles[i].Category.name}</p>
                       </div>

                         
                <figcaption>

               <h3> ${article.articles[i].title}</h3>
                ${article.articles[i].resume}
               
                </figcaption>
                <div class="lirePlus">
                    <p>
                     <a href="./article.html?pid=${article.articles[i].id}">En savoir plus...</a>
                   </p>
                  </div>
            </figure>`



                         if (article.articles[i + 1]) {

                             text +=

                                 `
<figure class="bulleArticle1"> 
<div class="divImage">
            <img src="${article.articles[i+1].img}" alt="imagearticle"> 
      
            <p class="category">${article.articles[i+1].Category.name}</p>
            </div>
        
<figcaption>

<h3>${article.articles[i+1].title}</h3>
${article.articles[i+1].resume}

</figcaption>
<div class="lirePlus">
   <p>
    <a href="./article.html?pid=${article.articles[i+1].id}">En savoir plus...</a>
  </p>
 </div>
</figure>`
                         }


                         text += `</article>`










                     }

                     newsSimplon.innerHTML = text


                 })

             }


         })

     .catch(function(errors) {
         console.log("indisponible veuillez réessayer ulterieurement")



     });


 }



 window.addEventListener("load", function() {
     console.log(window.localStorage.getItem("token"));
     if (window.localStorage.getItem("token") === null) {
         console.log("111111111111");

         window.open("../views/login.html", '_self');



     } else {
         articlevisible();


     }

 })