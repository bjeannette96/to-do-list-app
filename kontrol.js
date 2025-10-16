const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const doneList = document.getElementById("done-list");


function addTask() {
    // .trim() les espaces vides + vérifie le input
    const text = inputBox.value.trim();
    if (text === '') {
        showWarning("Please write something!");
        return;
    }

    // Récupère le texte et le libellé de la catégorie sélectionnée
    const categorySelect = document.getElementById("category");
    const categoryText = categorySelect.options[categorySelect.selectedIndex].text;

    // crée le li 
    const li = document.createElement("li");

    // texte de la tâche 
    const textNode = document.createTextNode(text + "   "); // ajoute un petit espace avant la catégorie
    li.appendChild(textNode);

    // <small> pour la catégorie entre parenthèses
    const cat = document.createElement("small");
    cat.className = "task-category";
    cat.textContent = `(${categoryText})`;
    li.appendChild(cat);

    // bouton supprimer (la croix ×) 
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.addEventListener("click", function (ev) {
        ev.stopPropagation();
        li.remove();
        saveData();
    });

    span.dataset.deleteListener = "1";
    li.appendChild(span);

    // ajoute le <li> à la liste
    listContainer.appendChild(li);

    // focus / reset input
    inputBox.focus();
    inputBox.value = "";

    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        // Si la tâche n'est pas encore cochée, la déplacer dans "Done"
        if (!e.target.classList.contains("checked")) {
            e.target.classList.add("checked");
            doneList.appendChild(e.target);  // Déplace dans Done           
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
    try {
        localStorage.setItem("data", listContainer.innerHTML);
        localStorage.setItem("doneTasks", doneList.innerHTML);
    } catch (err) {
        console.error("Erreur de sauvegarde localStorage :", err);
        showWarning("Sauvegarde impossible (stockage plein ou désactivé)");
    }
}

//reconnecter les croix “×” pour qu’elles refonctionnent après rechargement.
function reattachDeleteListeners() {
    const spans = document.querySelectorAll('#list-container span, #done-list span');
    spans.forEach(span => {
        // si on a déjà attaché un listener, on skip
        if (span.dataset.deleteListener === "1") return;
        const li = span.closest('li');
        if (!li) return;
        span.addEventListener('click', function (ev) {
            ev.stopPropagation();
            li.remove();
            saveData();
        });
        span.dataset.deleteListener = "1";
    });
}

//Recharge les listes depuis le localStorage pour que les tâches réapparaissent à l’ouverture de la page
function showTask() {
    const savedTasks = localStorage.getItem("data");
    const savedDone = localStorage.getItem("doneTasks");

    if (savedTasks) listContainer.innerHTML = savedTasks;
    if (savedDone) doneList.innerHTML = savedDone;

    // réattacher les listeners delete aux spans restaurés
    reattachDeleteListeners();
}

showTask();


let __warningTimeout = null;
let __warningFadeTimeout = null;

function showWarning(msg) {
    // Cherche si le warning existe déjà
    let warning = document.getElementById("app-warning");

    // Si pas existant, le créer et l'attacher à .todo-app
    if (!warning) {
        warning = document.createElement("p");
        warning.id = "app-warning";
        // rôle/accessibilité
        warning.setAttribute("role", "alert");
        warning.setAttribute("aria-live", "assertive");
        // on attache au container .todo-app (position:absolute géré en CSS)
        const app = document.querySelector(".todo-app");
        app.appendChild(warning);
    }

    // Mettre à jour le texte
    warning.textContent = msg;

    // S'assurer que le message est visible (classe .visible gère l'opacité)
    warning.classList.add("visible");

    // Reset des timeouts si l'utilisateur spamme le bouton
    if (__warningTimeout) {
        clearTimeout(__warningTimeout);
        __warningTimeout = null;
    }
    if (__warningFadeTimeout) {
        clearTimeout(__warningFadeTimeout);
        __warningFadeTimeout = null;
    }

    // Après 2s: démarrer la transition de disparition (opacity -> 0)
    __warningTimeout = setTimeout(() => {
        warning.classList.remove("visible"); // start fade-out (CSS transition)
        // Après 0.5s (durée de la transition), on supprime l'élément pour nettoyer le DOM
        __warningFadeTimeout = setTimeout(() => {
            // Ne supprime que si la classe visible n'a pas été remise entre temps
            if (!warning.classList.contains("visible")) {
                warning.remove();
            }
            __warningFadeTimeout = null;
            __warningTimeout = null;
        }, 500);
    }, 2000);
}
