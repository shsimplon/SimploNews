// function login(pemail, ppass) {
//     var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 

//     xmlhttp.open('POST', `https://simplonews.brianboudrioux.fr/users/login`);
//     xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xmlhttp.onload = () => {

//         const response = JSON.parse(xmlhttp.responseText);
//         if (!response.error) {
//             token = response.token;
//             console.log(token);

//         } else
//             console.log(response);



//     };

//     xmlhttp.send(JSON.stringify({ "email": "test@test.fr", "password": "test1234" }));
//     // var data = JSON.parse(this.response)


//     return token;

// }



// function getArticle(pid) {

//     var request = new XMLHttpRequest()

//     // Open a new connection, using the GET request on the URL endpoint
//     request.open('GET', `https://simplonews.brianboudrioux.fr/articles/${pid}`, true)
//     request.setRequestHeader("Accept", "application/json");
//     request.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjpudWxsLCJsYXN0TmFtZSI6bnVsbCwiZW1haWwiOiJ0ZXN0QHRlc3QuZnIiLCJwYXNzd29yZCI6IiQyYiQxMCRyWGt5d05oZm9CVlM0ZVp1RThsQ2JlZlpNRi53YzgzZ3g5Ry9oWldpYkpCTy9Xc3kzY2NnZSIsImNyZWF0ZWRBdCI6IjIwMjEtMDItMDdUMDE6MTE6MTQuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDItMDdUMDE6MTE6MTQuMDAwWiIsImlhdCI6MTYxMjg4NTE3MX0.FrxzAPdJa-9PD8D92dmOrDAM5rNVEne4xJKLSXMMPiM");

//     request.onload = function() {
//         const response = JSON.parse(request.responseText);
//         if (!response.error)
//             console.log(response.article);
//         else
//             console.log(response);


//     }

//     // Send request

//     request.send();


// }
//token = login(1, 1);

//getArticle(1);


// function getArticle(pid) {
//     let xtoken;
//     let fetch_config = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ "email": "test@test.fr", "password": "test1234" })
//     };
//     fetch("https://simplonews.brianboudrioux.fr/users/login", fetch_config)
//         .then(function(response) {
//             return response.json()
//                 .then(function(data) {


//                     if (response.error == 400)
//                         console.log(data);
//                     else {
//                         console.log(data);
//                         xtoken = data.token;
//                         // return data.token;


//                         let config = {
//                             method: "GET",
//                             headers: {
//                                 "Authorization": "Bearer " + xtoken
//                             }

//                         };
//                         fetch("https://simplonews.brianboudrioux.fr/articles/" + pid, config).then(function(response) {
//                             response.json().then(function(articles) {
//                                 if (response.error == 400)
//                                     console.log(articles);
//                                 else {
//                                     console.log(articles);
//                                 }

//                             }).catch(function(error) {
//                                 console.log(error);
//                             })

//                         }).catch(function(error) {
//                             console.log(error);

//                         })





//                     }
//                 })
//                 .catch(function(error) {
//                     console.log(error);
//                 })

//         }).catch(function(error) {
//             console.log(error);
//         })








// }







// function getArticle(pId) {
//     // console.log(user_login());


//     let config = {
//         method: "GET",
//         headers: {
//             "Authorization": "Bearer " + vtoken
//         }

//     };
//     fetch("https://simplonews.brianboudrioux.fr/articles", config).then(function(response) {
//         response.json().then(function(articles) {
//             if (response.error == 400)
//                 console.log(articles);
//             else {
//                 console.log(articles);
//             }

//         }).catch(function(error) {
//             console.log(error);
//         })

//     }).catch(function(error) {
//         console.log(error);

//     })






// }

//getArticle(1);


function user_login() {

    let config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ "email": "test@test.fr", "password": "test1234" })
    };

    fetch("https://simplonews.brianboudrioux.fr/users/login", config)
        .then(function(reponse) {
            if (reponse.status == 400) {
                //error user ou pass
                console.log(reponse);
            } else {
                // reussi
                reponse.json().then(function(data) {
                        if (data.error) {
                            //un error
                            console.log(data.error);
                        } else {
                            //reussi
                            console.log(data.token);


                        }



                    })
                    .catch(function(error) {
                        console.log(error);
                    })



            }


        })
        .catch(function(error) {
            console.log(error);
        })



}

user_login();