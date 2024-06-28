let nodes = document.getElementsByClassName('node');
let arrows = document.getElementsByClassName('arrow');

const list = document.getElementById('list');
const insertIndexInput = document.getElementById('insert-index');
const insertValueInput = document.getElementById('insert-value');
const addBtn = document.getElementById('insert-node');
const modifyBtn = document.getElementById('modify-node');
const modifyIndexInput = document.getElementById('modify-index');
const modifyValueInput = document.getElementById('modify-value');
const removeBtn = document.getElementById('remove-node');
const removeIndexInput = document.getElementById('remove-index');

let long = 5;
let head = nodes[0];

const onceInsertionEnd = (el, animation) => {
    return new Promise(resolve => {
        const onInsertionEndCallback = () => {
            el.removeEventListener('animationend', onInsertionEndCallback);
            resolve();
        }
        el.addEventListener('animationend', onInsertionEndCallback);
        el.style.animation = animation;
    });
}

function createArrow() {
    let arrow = document.createElement('div');
    let img = document.createElement('img');
    arrow.classList = 'arrow';
    img.src = 'arrow.png';
    img.draggable = false;
    arrow.append(img);
    return arrow;
}

async function addNode() {
    let newNode = document.createElement('div');
    let number = document.createElement('p');
    let newArrow = createArrow();

    newNode.append(number);

    newNode.classList = 'node';
    newArrow.classList = 'arrow';

    newNode.firstChild.innerText = addInput.value;

    addBtn.disabled = true;
    list.appendChild(newNode);
    await onceInsertionEnd(newNode, 'add-node 1.5s ease');
    
    list.appendChild(newArrow);
    await onceInsertionEnd(newArrow, 'fade-in 1.5s linear,rotate-arrow 1.5s ease');
}

function createNode(value) {
    let newNode = document.createElement('div');
    let number = document.createElement('p');

    newNode.append(number);

    newNode.classList = 'node';

    newNode.firstChild.innerText = value;
    return newNode;
}

addBtn.addEventListener('click', () => {
    // addNode().then(() => addBtn.disabled = false);
    insert(insertIndexInput.value, insertValueInput.value);
});

async function insert(index, value) {
    let long = 12;
    let nodeFound, pos;
    if (index < 0 || index >= long) {
        console.error('Index out of bounds');
    } else {
        if (index === 0) {
            let newNode = createNode(value);
            list.insertBefore(newNode, nodes[0]);
            await onceInsertionEnd(newNode, 'add-node 1.5s ease');

            let newArrow = createArrow();
            list.insertBefore(newArrow ,nodes[1]);
            await onceInsertionEnd(newArrow, 'fade-in 1.5s linear,rotate-arrow 1.5s ease');
        } else {
            pos = 0;
            nodeFound = nodes[0];
            while (pos < index) {
                pos = pos + 1;
                nodeFound = nodes[pos];
            }
            let newNode = createNode(value);
            list.insertBefore(newNode, nodeFound);
            await onceInsertionEnd(newNode, 'add-node 1.5s ease');

            let newArrow = createArrow();
            list.insertBefore(newArrow ,nodeFound);
            await onceInsertionEnd(newArrow, 'fade-in 1.5s linear,rotate-arrow 1.5s ease');
        }
        long++;
    }
}
modifyBtn.addEventListener('click', () => {
    modifyNode(modifyIndexInput.value, modifyValueInput.value);
});

removeBtn.addEventListener('click', () => {
    removeNode(removeIndexInput.value);
});

async function modifyNode(index, value) {
    if (index < 0 || index >= long) {
        console.error('Index out of bounds');
    } else {
        nodes[index].firstChild.innerText = value;
    }
}

async function removeNode(index) {
    if (index < 0 || index >= long) {
        console.error('Index out of bounds');
    } else {
        list.removeChild(nodes[index]);
        list.removeChild(arrows[index]);
        long--;
    }
}

