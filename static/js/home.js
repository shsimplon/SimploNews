function Cards(articles) {


    this.articles = articles;
}

var slideIndex = 1;

Cards.prototype.generateProductsCards = function() {




    let newsSimplon = document.getElementById("slidex");
    console.log(newsSimplon);
    let text = " ";
    this.articles.forEach(article => {

        console.log(newsSimplon)
        text +=

            ` 
        <div class="mySlides fade">
        <a href="./article.html?pid=${article.id}">
        <img src="${article.img}" style="width:100%">
       
        <div class="text">${article.title}</div></a>
    </div> 
     `





    });
    text += ` <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a> `
    newsSimplon.innerHTML = text;


}

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
                    let objet = new Cards(article.articles.slice(0, 3))
                    objet.generateProductsCards();
                    showSlides(slideIndex);


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

                    newsSimplon.innerHTML = text;



                })


            }


        })

    .catch(function(errors) {
        console.log("indisponible veuillez réessayer ulterieurement")



    });


}



window.addEventListener("load", function() {
    console.log(window.localStorage.getItem("token"));
    if (!window.localStorage.getItem("token")) {


        window.open("../views/login.html", '_self');



    } else {
        articlevisible();




    }

})






function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    //  dots[slideIndex - 1].className += " active";

    // dots[slideIndex - 1].className += " active";

}