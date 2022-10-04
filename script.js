'use strict';
let data = null;
async function prepare() {
   
    let response = await fetch('http://hp-api.herokuapp.com/api/characters');
        data = await response.json()
        createOptions()
        createCards(data)
}
 prepare()

      
const houseSelect = document.getElementById('school')
function createOptions() {
    let arr = data.map((elem) => elem.house)
   
    let uniqueSchools = [...new Set(arr)].sort()
  
    let x = document.createElement('option')
    x.textContent = 'All schools'
    houseSelect.append(x)
    for (let house of uniqueSchools) {
        let option = document.createElement('option')
        if (house === '') { option.textContent = 'No school' } else {
            option.textContent = house
        }
        option.house = house 
        houseSelect.append(option)
    }
}

houseSelect.addEventListener('change', function () {

    let arrNew = filterData()
    clearCards()
    createCards(arrNew)
})
function clearCards() {
    container.innerHTML = ""
}


const container = document.getElementById('wrapper')


function createCards(cards) {
    for (let person of cards) {
        let div1 = document.createElement('div')
        let imgCard = document.createElement('img')
        imgCard.src = person.image;
        if (person.image === "") {
            imgCard.src = './images/istockphoto-526947869-612x612.jpeg';
        }
        
        let h1Card = document.createElement('h1')
        h1Card.textContent = person.name
        let spanCard = document.createElement('span')
        spanCard.textContent = `Actor : ${person.actor}`
        let pCard = document.createElement('p')
        let description = "";
        for (let key in person) {
            if (['gender','house', 'alive'].includes(key)) {
                description += `${key.charAt(0).toUpperCase() +
                    key.slice(1)} : ${(person[key])} <br \>`
            } 
            if (['wand'].includes(key)) {
                description += `${key.charAt(0).toUpperCase() +
                key.slice(1)} : ${person.wand.core} <br \>`
            }
        }
        
    
        
        pCard.innerHTML = description
        div1.append(imgCard)
        div1.append(h1Card)
        div1.append(spanCard)
        div1.append(pCard)
        
        container.append(div1)

    }

}


let inputName = document.getElementById('name')
inputName.addEventListener('input', inputFunction)
function inputFunction(event) {
    let arrNew =  filterData();

    clearCards()
    createCards(arrNew)
    
}

function filterData() {
    let arrNew = data.filter((elem) => elem.name.toLowerCase().includes(inputName.value.trim()));
    if (houseSelect.selectedIndex !== 0) {
        let selectedHouse = houseSelect.children[houseSelect.selectedIndex].house
        console.log(selectedHouse);
        function filterSchool(person) {
            return (person.house === selectedHouse)
        }
    
        arrNew = arrNew.filter(filterSchool)
    } 
    return arrNew
}

