import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://practice-project-67991-default-rtdb.firebaseio.com/"
}

const app =  initializeApp(appSettings)
const database = getDatabase(app)
const groceriesInDB = ref(database, "groceries")

onValue(groceriesInDB, function(snapshot) {
    clearShoppingListEl()
    let groceriesArray = Object.values(snapshot.val())
    groceriesArray.reverse();
    for (const grocery of groceriesArray){
        createShoppingListItem(grocery)
    }
})

const inputElement = document.getElementById('input-field')
const addButton = document.getElementById('add-button')
const shoppingListEl = document.getElementById('shopping-list')

function clearInput(inputElement){
    inputElement.value = ''
}
function createShoppingListItem(itemValue){
    shoppingListEl.innerHTML += `<li class="shopping-list-item">${itemValue}</li>`
}
function clearShoppingListEl(){
    shoppingListEl.innerHTML = ''
}

addButton.addEventListener("click", function(){
    let inputValue = inputElement.value
    push(groceriesInDB, inputValue)
    console.log(`${inputValue} successfully pushed to db`)
    // createShoppingListItem(inputValue)
    clearInput(inputElement)
})

