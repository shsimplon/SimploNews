//alert box

function createCustomAlert(txt) {
    d = document;

    if (d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = "10%";
    mObj.style.width = "100%";
    mObj.style.backgroundColor = "yellow";
    mObj.style.position = "absolute";
    mObj.style.top = "100%";
    mObj.style.alignItems = "center";
    mObj.style.opacity = "0.7";



    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    alertObj.style.alignItems = "center";
    // if (d.all && !window.opera) alertObj.style.top = "10px";
    // alertObj.style.left = "10px";

    alertObj.style.visiblity = "visible";
    alertObj.style.marginTop = "3%";

    //h1 = alertObj.appendChild(d.createElement("h3"));
    //h1.appendChild(d.createTextNode(""));

    msg = alertObj.appendChild(d.createElement("h3"));
    msg.style.alignText = "center";
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode("X"));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() { removeCustomAlert(); return false; }

    alertObj.style.display = "flex";
    alertObj.style.justifyContent = "space-evenly";

}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}



//form validation
function formValidate(email, password) {
    //Alphabets, numbers and space(' ') no special characters min 3 and max 20 characters.
    //var ck_name = /^[A-Za-z0-9 ]{3,20}$/;
    //Standard email address
    var ck_email = /^(([\-\w]+)\.?)+@(([\-\w]+)\.?)+\.[a-zA-Z]{2,4}$/;

    //Password supports special characters and here min length 6 max 20 charters.
    var ck_password = /^[A-Za-z0-9!@#$%^&*()_]{8,20}$/;


    // var email = form.email.value;
    // var password = form.password.value;

    var errors = [];


    if (!ck_email.test(email)) {
        return createCustomAlert("Vous devez entrer une adresse email valide.");
    }

    if (!ck_password.test(password)) {
        return createCustomAlert("Vous devez entrer un mot de passe valide. ");
    }

    return true;
}











// loginn pour récuperer le token
function postLogin() {
    //let form = document.getElementById("myform1");

    let email = document.getElementById('email').value;
    let mps = document.getElementById('psw').value;
    let div = document.getElementById('message1');
    if (formValidate(email, mps)) {
        div.style.color = "#C32336";
        div.style.size = '1rem';


        let fetch_congig = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                "email": email,
                "password": mps,

            })

        };

        fetch("https://simplonews.brianboudrioux.fr/users/login", fetch_congig)

        .then(function(response) {
                response.json()
                    .then(function(data) {
                        if (response.status == 400) {


                            console.log(data);
                            //  div.innerHTML = data.error;
                            createCustomAlert(data.error);
                        } else {
                            console.log(data);
                            window.localStorage.setItem('email', email);
                            window.localStorage.setItem('mps', mps);
                            window.localStorage.setItem('token', data.token);
                            window.open("../views/home.html", '_self');

                        }
                    })

            })
            .catch(function(server_error) {
                console.log(server_error);

            })
    }



}
// postLogin();

// récuperer des données avec get users


function getUsers() {
    let fetch_congig = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            "email": "test@test.fr",
            "password": "test1234",

        })

    };

    fetch("https://simplonews.brianboudrioux.fr/users/login", fetch_congig)

    .then(function(response) {
            return response.json()
                .then(function(data) {
                    if (response.status == 400)
                        console.log(data);
                    else {


                        let users = {
                            method: "get",
                            headers: {

                                "Authorization": "Bearer " + data.token

                            },

                        };

                        fetch("https://simplonews.brianboudrioux.fr/users", users)
                            .then(function(response) {
                                return response.json()
                                    .then(function(data) {
                                        if (response.status == 400)
                                            console.log('erreur données requetes');
                                        else if (response.status == 403) {
                                            console.log('erreur authentification');

                                        } else {
                                            console.log(data);
                                        }
                                    })
                                    .catch(function(server_error) {
                                        console.log(server_errors)
                                    })



                            })
                    }


                })

        })
        .catch(function(server_error) {
            console.log(server_error);

        })

}

// getUsers();

// cree un utilisateurs

function postUsers() {
    // let form = document.getElementById("myform2");

    let email = document.getElementById('connecter').value;
    let nom = document.getElementById('nommer').value;
    let prenom = document.getElementById('second').value;
    let motdePasse = document.getElementById('mps').value
    console.log(email + ' ' + nom + ' ' + prenom + ' ' + motdePasse)
    if (formValidate(email, motdePasse)) {

        let div = document.getElementById('message');
        div.style.color = "#C32336";
        div.style.size = '1rem';

        //if (email == true && motdePasse == true) {


        let creerUser = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstName": prenom,
                "lastName": nom,
                "email": email,
                "password": motdePasse,
            }),


        };

        fetch("https://simplonews.brianboudrioux.fr/users", creerUser)
            .then(function(response) {

                if (response.status == 400) {
                    console.log('erreur données requetes');
                    createCustomAlert('Erreur données requetes');
                } else if (response.status == 403) {
                    console.log('erreur authentification');
                    createCustomAlert('Erreur authentification');

                } else {
                    console.log('ton compte est bien creé');
                    createCustomAlert('Bienvenue ' + prenom + ', ton compte est bien creé');

                }
            })
            .catch(function(server_error) {
                console.log(server_errors)
            });


        // } else {
        //     div.innerHTML = 'Ecrire mot de passe ou mail'
        // }

    }
}



function deconnecter() {
    if (window.localStorage.getItem("token")) {
        window.localStorage.removeItem("token");
    }
    window.open("../views/login.html", '_self');
    console.log("Vous etes deconnecté");

}



function verifierLogin() {
    //si il n'y a pas token ouvre page login 
    if (!window.localStorage.getItem("token") || window.localStorage.getItem("token") == null) {

        window.open("../views/login.html", '_self');

    }


}











// postUsers()