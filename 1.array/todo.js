// 전역 객체
let todoArray = [];

// 최초 실행 함수
function todoInit(){
    let btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener("click", addNewItem);
    counting();
}
// TODO 추가
function addNewItem(){
    let listWrap = document.querySelector('#todoList'),
        todoString = document.querySelector('#txtInput').value,
        id = new Date().getTime();
    let list = document.createElement("li");
    const addTmpl = `
            <input type="checkbox" id="${id}">
            <label for="${id}">${todoString}</label>
            <button type="button">X</button>
    `;
    list.innerHTML = addTmpl;
    listWrap.appendChild(list);
    todoArray.push({id:id, item:todoString, chckState:false});

    list.querySelector('button').addEventListener("click", deleteItem);
    list.querySelector('input').addEventListener("change", completeItem);

    counting();
}

function deleteItem(e){
    let listWrap = document.querySelector('#todoList'),
        targetParent = event.currentTarget.parentNode,
        targetId = targetParent.querySelector('input').id;

    listWrap.removeChild(targetParent);
    todoArray = todoArray.filter(todo => todo.id != targetId);
    
    counting();
}
function completeItem(e){
    let targetId = e.currentTarget.id,
        parent = e.currentTarget.parentNode,
        curChckState = document.getElementById(targetId).checked;
    todoArray.map(todo => {
        if(todo.id == targetId){
            if(curChckState){
                todo.chckState = true;
                parent.className = 'complete';
            }else{
                todo.chckState = false;
                parent.className = '';
            }
        }
    });
    counting();
}
function counting(){
    let cntWrap = document.querySelector('#todoCount'),
        totalCnt = todoArray.length,
        comCnt = todoArray.filter(todo => todo.chckState).length,
        incomCnt = todoArray.filter(todo => !todo.chckState).length;
    const cntTmpl = `
        <span>
            완료 <strong>${comCnt}</strong>건
        </span>
        <span>
            미완료 <strong>${incomCnt}</strong>건
        </span>
        <span>
            총 <strong>${totalCnt}</strong>건
        </span>
    `;
    cntWrap.innerHTML = cntTmpl;
}
todoInit();