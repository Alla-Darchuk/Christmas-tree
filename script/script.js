let firstToys = document.getElementsByClassName('imgBtn');
let parent = document.querySelector('.content');
let package = document.getElementsByClassName('dropParent');
let numberToy = 0;
let tree, coordinat_x, coordinat_y, createdToy, newToy, removeToy, toysInLocalStorage;
// window.localStorage.clear()



if (window.localStorage.getItem('position') !== null) {
    toysInLocalStorage = JSON.parse(window.localStorage.getItem('position'));
    for (let i = 0; i < toysInLocalStorage.length; i++){
        newToy = renderToy(toysInLocalStorage[i]);
        addDragListeners(newToy);
        numberToy = toysInLocalStorage[i].id;
    };
} else {
    toysInLocalStorage = [];
};

for (let i = 0; i < firstToys.length; i++) {
    firstToys[i].addEventListener('dragend', dragendForFirstToys);
};

package[0].addEventListener('dragover', function (event) {
    event.preventDefault();
});

package[0].addEventListener('drop', dropListener);



// for listeners 
function dragendForFirstToys(event) {
    let coordinates = getCoodinates(event, this);
    let object = generateToy(createdToy, coordinates);
    newToy = renderToy(object);
    addDragListeners(newToy);
    saveElement(object);
};

function dropListener(event) {
    let index = toysInLocalStorage.findIndex(n => n.id == removeToy.id);
    toysInLocalStorage.splice(index, 1);
    window.localStorage.setItem('position', JSON.stringify(toysInLocalStorage))
    parent.removeChild(removeToy);
};

function addDragListeners(toy) {
    toy.addEventListener('dragstart', function (event) {
        removeToy = toy;
    });
    toy.addEventListener('dragend', dragendForToys);
};

function dragendForToys(event) {
    let coordinates = getCoodinates(event, this);
    this.style.left = coordinates.x + '%';
    this.style.top = coordinates.y + '%';
    updatePosition(this.id, coordinates);
};



function getId() {
    numberToy++;
    return numberToy;
};

function getCoodinates(event, object) {
    tree = document.getElementsByClassName('tree')[0].getBoundingClientRect();
    coordinat_x = (event.clientX - tree.x - object.getBoundingClientRect().width / 2) * (100 / tree.width);
    coordinat_y = (event.clientY - object.getBoundingClientRect().height / 2 - 5) * (100 / tree.height);
    let coordinates = { x: coordinat_x, y: coordinat_y };
    return coordinates;
};

function saveElement(object) {
    toysInLocalStorage.push(object);
    window.localStorage.setItem('position', JSON.stringify(toysInLocalStorage));
};

function generateToy(type, coordinates) {
    let object = {
        type: type.typeClass,
        size: type.size,
        src: type.src,
        id: getId(),
        left: coordinates.x,
        top: coordinates.y,
    };
    return object;
};

function changeCreatedElement(toy) {
    createdToy = toy;
};

function renderToy(object) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    parent.appendChild(div);
    div.appendChild(img);
    div.classList.add('elem');
    div.draggable = true;
    div.id = object.id;
    div.classList.add(object.typeClass);
    div.style.width = object.size;
    div.style.top = object.top + '%';
    div.style.left = object.left + '%';
    img.src = object.src;
    return div;
};

function updatePosition(id, coordinates) {
    let index = toysInLocalStorage.findIndex(n => n.id == id);
    if (index !== -1) {
        toysInLocalStorage[index].left = coordinates.x;
        toysInLocalStorage[index].top = coordinates.y;
        window.localStorage.setItem('position', JSON.stringify(toysInLocalStorage));
    };
};


function snow(snowClassName) {
    let snow = document.getElementsByClassName(snowClassName);
    if (snow[0].style.display === 'block') {
        snow[0].style.display = 'none';
    } else {
        snow[0].style.display = 'block';
    }
};

function toggleElementOnTree(className) {
    let elements = document.querySelectorAll(className);
    for (let i = 0; i < elements.length; i++){
        if (elements[i].style.display === 'none') {
            elements[i].style.display = 'block';
        } else {
            elements[i].style.display = 'none';
        }
    }
};
