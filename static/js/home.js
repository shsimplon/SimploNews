 function articlevisible(){
     let token = window.localStorage.getItem('token');
     console.log(token);
     let articleConfig = {
    method:"GET",
    
    headers: {
        "Content-Type" : "application/json",
        "Authorization": "Bearer "+token
        
        
        },
        
 };
    fetch("https://simplonews.brianboudrioux.fr/articles", articleConfig)
    .then(function(response) {
        if(response.status == 403 ){
            console.log("erreur dautentification");
           
                        
        }
        if(response.status == 400 ){
            console.log("erreurs donnés requetes");

        }
        else {

            console.log("tu as accès à larticle");
            response.json().then(function (article) {
            let newsSimplon = document.getElementById("home")
            let text = " ";
            
            for (let i = 0; i < article.articles.length; i++) {
                
                text+=
               
                `
                <figure class="bulleArticle1">
                
                <img src="${article.articles[i].img}" alt="imagearticle"> 
                
                <figcaption>

                ${article.articles[i].title}
                ${article.articles[i].resume}
                ${article.articles[i].author}
                </figcaption>
                <div class="lirePlus">
                    <p>
                     <a href="#">En savoir plus...</a>
                   </p>
                  </div>
            </figure>`
                console.log(text);
            }

            newsSimplon.innerHTML=text
            

            })
            
        }
        

})

        .catch(function (errors){
        console.log("indisponible veuillez réessayer ulterieurement")
                                  
                                
            
        });    
        
    
}         
articlevisible();





