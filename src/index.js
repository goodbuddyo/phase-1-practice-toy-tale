

let addToy=false;

document.addEventListener("DOMContentLoaded",() => {
  const addBtn=document.querySelector("#new-toy-btn");
  const toyFormContainer=document.querySelector(".container");
  addBtn.addEventListener("click",() => {
    // hide & seek with the form
    addToy=!addToy;
    if(addToy) {
      toyFormContainer.style.display="block";
    } else {
      toyFormContainer.style.display="none";
    }
  });
  // end starter code 
  getAllToys();
});

// Event Listeners
document.querySelector('.add-toy-form').addEventListener('submit',handleSubmit)

// Event handlers
function handleSubmit(e) {
  e.preventDefault()
  let toyObj={
    //"name": "Jessie",
    //"image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    //"likes": 0
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  renderOneToy(toyObj)
  createToy(toyObj)
}

// renderOneToy Dom Manipulator
function renderOneToy(toy) {
  let card=document.createElement('div')
  card.className='card'
  //  use innerHTML data is from us
  card.innerHTML=`
  <img src="${toy.image}" class="toy-avatar">
  <div class="content">
  <h2>${toy.name}</h2>
  <p> <span>${toy.likes}</span> Likes! </p>
  </div>
  <div>
  <div class="buttons">
  <button class="like-btn" id="${toy.id}">Like ❤️</button>
  </div>
  `
  document.querySelector('#toy-collection').appendChild(card)

  // need this listener inside render function
  card.querySelector('button.like-btn').addEventListener('click',() => {
    toy.likes+=1
    card.querySelector('span').textContent=toy.likes
    updateLikes(toy)
  })
}


// PATCH likes - (the UPDATE part of Crud)
function updateLikes(toyObj) {
  //console.log(JSON.stringify(toyObj))
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
    .then(res => res.json())
    .then(toy => console.log(toy))
}

// POST new toy
function createToy(toyObj) {
  //console.log(JSON.stringify(toyObj))
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  })
    .then(res => res.json())
    .then(toy => console.log(toy))
}

// GET is the default so no need to method: GET
function getAllToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    //.then(data => console.log(data))
    .then(toyData => toyData.forEach(toy => renderOneToy(toy)))
}
