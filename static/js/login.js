// loginn pour récuperer le token
function postLogin() {
    let email = document.getElementById('email').value;
    let mps = document.getElementById('psw').value;


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
            return response.json()
                .then(function(data) {
                    if (response.status == 400)
                        console.log(data);
                    else {
                        console.log(data);
                        window.localStorage.setItem('email', email);
                        window.localStorage.setItem('mps', mps);
                        window.localStorage.setItem('token', data.token);
                        
                    }
                })

        })
        .catch(function(server_error) {
            console.log(server_error);

        })

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

    let email = document.getElementById('connecter').value;
    let nom = document.getElementById('nommer').value;
    let prenom = document.getElementById('second').value;
    let motdePasse = document.getElementById('mps').value
    console.log(email + ' ' + nom + ' ' + prenom + ' ' + motdePasse)
    let div = document.getElementById('message');
    div.style.color = "#C32336";
    div.style.size = '1rem';

    if (email == true & motdePasse == true) {


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
                    div.innerHTML = 'Erreur données requetes';
                } else if (response.status == 403) {
                    console.log('erreur authentification');
                    div.innerHTML = 'Erreur authentification';

                } else {
                    console.log('ton compte est bien creé');
                    div.innerHTML = 'Bienvenue ' + prenom + ', ton compte est bien creé';

                }
            })
            .catch(function(server_error) {
                console.log(server_errors)
            });


    } else {
        div.innerHTML = 'Ecrire mot de passe ou mail'
    }


}




// postUsers()