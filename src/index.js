document.addEventListener('DOMContentLoaded', () => {
  getTheDogs()
})

const dogTable = document.querySelector("tbody#table-body")
const editDogForm = document.querySelector("form#dog-form")
let lastClickedId = 0

dogTable.addEventListener("click", event => {
  if (event.target.nodeName === "BUTTON") 
    {editThisDog(event)}
 })
editDogForm.addEventListener("submit", submitDogEdit)


function getTheDogs(){
  return fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(dogs => displayTheDogs(dogs))
}

function displayTheDogs(dogs){
  dogTable.innerHTML = ""
  dogs.forEach(dog => {
    const dogRow = document.createElement("tr")
    dogRow.dataset.id = dog.id
    dogRow.innerHTML = `<td class="dog-name">${dog.name}</td> <td class="dog-breed">${dog.breed}</td> <td class="dog-sex">${dog.sex}</td> <td><button>Edit</button></td>`
    dogTable.append(dogRow)
  })
}

function editThisDog(event){
  const dogRow = event.target.closest("tr")
  const dogId = dogRow.dataset.id

  // fetch(`http://localhost:3000/dogs/${dogId}`)
  //   .then(resp => resp.json())
  //   .then(dog => {
  //     editDogForm.name.value = dog.name
  //     editDogForm.breed.value = dog.breed
  //     editDogForm.sex.value = dog.sex
  //   })
    
    editDogForm.name.value = dogRow.querySelector(".dog-name").textContent
    editDogForm.breed.value = dogRow.querySelector(".dog-breed").textContent
    editDogForm.sex.value = dogRow.querySelector(".dog-sex").textContent
    // editDogForm.dogid.value = dogId

    lastClickedId = dogId
  }
  
function submitDogEdit(event){
  event.preventDefault()

  const appObj = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Accept" : "application/json",
      "Access-Control-Allow-Origin" : "*",
    },
    body: JSON.stringify({
      name: editDogForm.name.value,
      breed: editDogForm.breed.value,
      sex: editDogForm.sex.value
    })
  }

  fetch(`http://localhost:3000/dogs/${lastClickedId}`, appObj)
    .then(resp => resp.json())
    .then(getTheDogs)

  editDogForm.reset()

}