// 초기화
var todoList = document.getElementById('todoList');
var btnAdd = document.getElementById('btnAdd');
var inputText = document.getElementById('txtInput');
inputText.focus();

var totalItems = 0;
var todoCount = document.getElementById('todoCount');

// todo 추가
function addNewItem(list, string){
    if( inputText.value === '' || inputText.value === ' ' || !inputText ){
        alert('할 일을 입력해주세요.');
        return false;
    }
    var todoWrap = document.createElement('li');
    var todoTimestamp = new Date().getTime();
    todoWrap.innerHTML = `
        <input type="checkbox" id="`+ todoTimestamp +`">
        <label for="`+ todoTimestamp +`">`+ string +`</label>
        <button type="button" name="btnDelete">X</button>`;
    list.appendChild(todoWrap);

    var chkbox = todoWrap.children[0];
    chkbox.onclick = chkClassToggle;

    var todoTxt = todoWrap.children[1];
    todoTxt.addEventListener("dblclick", renameItem);

    var btnDelete = todoWrap.children[2];
    btnDelete.addEventListener("click", deleteItem);

    inputText.value = '';
    inputText.focus();
    updateState();
}
// todo 삭제
function deleteItem(){
    var todo = this.parentNode;
    todoList.removeChild(todo);
    updateState();
}
// 건수 계산
function updateState(){
    totalItems = todoList.querySelectorAll('li').length;
    var cntItem = todoList.querySelectorAll('.complete').length;
    todoCount.querySelector('#cntTotal').innerHTML = totalItems;
    todoCount.querySelector('#cntComplete').innerHTML = cntItem;
    todoCount.querySelector('#cntIncomplete').innerHTML = totalItems - cntItem;
}
// todo 텍스트 변경 이벤트
function changeTxt(){
    var todo = this.parentNode;
    var todoId = this.previousElementSibling.id;
    var todoValue = this.value;
    if( this.getElementsByTagName('input') ){
        todo.innerHTML = `
            <input type="checkbox" id="`+ todoId +`">
            <label for="`+ todoId +`">`+ todoValue +`</label>
            <button type="button" name="btnDelete">X</button>`;
        var todoTxt = todo.children[1];
        todoTxt.focus();
    }    
    var chkbox = todo.children[0];
    chkbox.onclick = chkClassToggle;

    var todoTxt = todo.children[1];
    todoTxt.addEventListener("dblclick", renameItem);

    var btnDelete = todo.children[2];
    btnDelete.addEventListener("click", deleteItem);

    updateState();
}
// todo 내용 변경
function renameItem(){
    var todo = this.parentNode;
    var todoId = this.previousElementSibling.id;
    var todoValue = this.innerText;

    if( this.getElementsByTagName('label') ){
        todo.innerHTML = `
            <input type="checkbox" id="`+ todoId +`">
            <input type="text" value="`+ todoValue +`" />
            <button type="button" name="btnDelete">X</button>`;
        var todoTxt = todo.children[1];
        todoTxt.focus();
    }
    todoTxt.addEventListener("focusout", changeTxt);

    updateState();
}
// 체크박스 체크 시(= todo 완료 시) 클래스 추가
function chkClassToggle(){
    var todoWrap = this.parentElement;
    if(this.checked){
        todoWrap.className = 'complete';
    }else{
        todoWrap.className = '';
    }
    updateState();
}
// 추가 버튼 이벤트
btnAdd.onclick = function(){
    var todoString = inputText.value;
    addNewItem(todoList, todoString);
};
// 입력 필드 키보드 이벤트
inputText.onkeyup = function(e){
    if(e.which == 13){
        var todoString = inputText.value;
        addNewItem(todoList, todoString);
    }
};