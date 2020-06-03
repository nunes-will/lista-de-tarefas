var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
    // Remove todo o conteúdo que estiver no listElement
    listElement.innerHTML = '';

    for (todo of todos) {
        // Cria o elemento lista
        var todoElement = document.createElement('li');
        // Cria o texto que será acrescentado ao elemento lista
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');
        var linkText = document.createTextNode('\uD83D\uDDD1');
        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('class', 'wastebasket');

        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');
        
        linkElement.appendChild(linkText);

        // Adiciona um li a ul
        todoElement.appendChild(todoText);
        todoElement.append(linkElement);
        // Adiciona a String a lista
        listElement.append(todoElement);
    }
}

renderTodos();

function addTodo() {
    var todoText = inputElement.value;

    todos.push(todoText);
    inputElement.value = '';
    renderTodos();
    saveToStorage();
}

buttonElement.onclick = addTodo;

function deleteTodo(pos) {
    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

// Adiciona o texto ao pressionar enter
var inputEle = document.getElementById('enter');
inputEle.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) { // codigo da tecla enter
    // colocas aqui a tua função a rodar
    addTodo();
  }
});

function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}