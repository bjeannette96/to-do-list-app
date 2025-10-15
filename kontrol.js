const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const doneList = document.getElementById("done-list");


function addTask() {
    //Vérifie si l'utilisateur a écrit quelque chose ['.trim()' supprime les espaces blancs (espaces, tabulations, sauts de ligne) du début et de la fin d'une chaîne de caractères 
    if (inputBox.value.trim() === '') {
        showWarning("⚠️ Please write something!");
        return; // Stoppe ici pour éviter de créer une tâche vide
    }

    /*Crée dynamiquement un nouvel élément <li> (liste) en mémoire; il n’est pas encore dans la page
     'document.createElement(" ")' crée un nouvel élément HTML avec le nom de balise spécifié en argument ("li") */
    let li = document.createElement("li");
    /*.innerHTML récupère le contenu de inputBox et le stock dans le code html entre <li> </li> */
    li.innerHTML = inputBox.value;

    /*un élément <span> est créé entre <li> </li>; visuellement on a <li> Ma tâche <span> </span> </li>; '×' sera à droite de la tâche*/
    let span = document.createElement("span");
    /* .innerHTML insère '×' dans le <span> 
    \u00d7 est le code du symbole '×' de la multiplication */
    span.innerHTML = "\u00d7";
    /*Ajoute '×' à l’intérieur du <li>. Visuellement : <li> Ma tâche <span> × </span> </li> */
    li.appendChild(span);

    /* la variable li sera affichée dans le bloc <ul id="list-container"> (ajoute cet élément dans la liste des taches) */
    listContainer.appendChild(li);

    span.addEventListener("click", function () {
        li.remove();
        saveData();
    });

    /* '.focus()' remets le focus sur l’input . Comme ça, plus besoin de cliquer dans le champ avant d'écrire*/
    inputBox.focus();
    inputBox.value = ""; /*le input se vide une fois qu'on appui sur le bouton "Add" */
    saveData();
}

function showWarning(msg) {
    const warning = document.createElement("p"); //on crée un <p> pour afficher le msg d'erreur
    warning.textContent = msg; //on met dans le <p> le message

    //ajoute du style au message d'erreur (CSS directement dans le JS)
    warning.style.color = 'white';  // font color
    warning.style.background = '#eb6657';  // background color
    warning.style.padding = '10px 20px';   //marges interne du <p>
    warning.style.borderRadius = '10px';
    warning.style.textAlign = 'center';  // alignement horizontal du texte 
    warning.style.fontSize = '14px';
    warning.style.marginTop = '10px';
    warning.style.transition = 'opacity 0.5s ease';


    /*querySelector() : méthode du DOM qui accepte un sélecteur CSS 
    (comme .classe, #id, div > p, etc.) et retourne le premier élément 
    qui correspond à ce sélecteur.
    Si aucun élément trouvé → retourne null */
    document.querySelector(".todo-app").appendChild(warning);

    // la fct attend 2s, puis réduit l’opacité du message d'erreur (déclencher le fondu)
    setTimeout(() => {
        // <p> devient invisible progressivement
        warning.style.opacity = '0';  // la transparence du <p> --> opacity: 1 (entièrement opaque) opacity: 0 (totalement transparent (invisible))
        setTimeout(() => warning.remove(), 500); // on attend 0.5s la fin de l’animation de fondu
    }, 2000);
}



listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        // Si la tâche n'est pas encore cochée, la déplacer dans "Done"
        if (!e.target.classList.contains("checked")) {
            e.target.classList.add("checked");
            doneList.appendChild(e.target);  // Déplace dans Done

            // Ajoute un gestionnaire pour la suppression dans Done
            let span = e.target.querySelector("span");
            span.addEventListener("click", function () {
                e.target.remove();  // Supprime l'élément li
                saveData();   // Sauvegarde l'état après suppression
            });

        } else {
            e.target.classList.remove("checked");
            listContainer.appendChild(e.target);  // Rapatrie dans la liste principale

            // Ajoute un gestionnaire pour la suppression dans TaskToAdd
            let span = e.target.querySelector("span");
            span.addEventListener("click", function () {
                e.target.remove();  // Supprime l'élément li
                saveData();   // Sauvegarde l'état après suppression
            });
        }
        saveData();  // Sauvegarde l'état après le déplacement de la tâche
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();  // Supprime le parent (li) quand on clique sur la croix
        saveData();  // Sauvegarde l'état après suppression
    }
}, false);




//la fonction ajoute une tache à la liste lorsqu'on appuis Enter
inputBox.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addTask();
});


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("doneTasks", doneList.innerHTML);
}

function showTask() {
    const savedTasks = localStorage.getItem("data");
    const savedDone = localStorage.getItem("doneTasks");

    if (savedTasks) listContainer.innerHTML = savedTasks;
    if (savedDone) doneList.innerHTML = savedDone;

}
showTask();





















/*
j'ai pas compris comment L’alert() interrompt le flux et est intrusive

quel est l'avantage de créer dynamiquement un nouvel élément <li> (liste) en mémoire? pourquoi ne pas créer dès le départ des <li>?

explique moi la notion de XSS / injection

explique encore plus en details en quoi 'textContent' est mieux que 'innerHTML' dans mon code. comment savoir le quel utiliser (explique la bonne habitude dont tu parles)? c'est quoi 'sanitise'? comment corriger mon code?

je n'ai toujours pas compris ce qui se passe avec 'listContainer.appendChild(li);'... pourquoi on ne voit <li> qu'ici? pourquoi la liste s'actualise?c'est l'evenement par defaut?

je n'ai pas compris l'interraction au niveau de 'li.appendChild(span);' et c'est quoi 'event delegation'?
décortique moi aussi 'e.target.tagName': c'est quoi 'target', c'est quoi 'tagName'...?

décortique moi la ligne 'e.target.classList.toggle("checked");': c'est quoi 'target', 'classList', 'toggle'... qu'est ce qui se passe ici?  

explique plus en détails ce que fait la fonction 'saveData()'. ça veut dire quoi 'persistent entre rechargements de page'? j' ai pas compris le problème avec cette fonction.pour quoi ce serait 'difficile à manipuler (ex : filtrer tâches, marquer comme faites côté données)'. explique plus en détails ta proposition d'amélioration (+ donne la liste des notions que je dois comprendre pour ça)

je n'ai pas du tout compris la partie 'listContainer.addEventListener("click", function (e) ...': qu'est ce qui se passe ici? c'est quoi '.addEventListener()' et comment/quand l'utiliser? c'est quoi cette histoire de parent??

est ce qu'en manipulant le stockage de données avec JSON je rentre un peu dans du backend ou bien en frontend on le fait aussi souvent? et en stockant dans JSON je pourrai manipuler les taches, par exemple restaurer une tache supprimée, stocker la liste de taches exécutée à une date donnée (si j'ajoute un truc d'enrégistrement comme dans les vraies applis to-do list), pas vrai?  

comment insérer 'inputBox.addEventListener('keydown'...' dans le code? j'ai pas pu

explique en détail ton idée pour éviter les doublons et limiter la longueur. et si je veux permettre à l'utilisateur d'écrire de longues taches sur deux lignes je fais comment? 

explique moi en details la Mise à jour done côté données dont tu parle, j'ai rien compris.



*/