const src   = `
    <h1>Todo</h1>
    <div class="input_wrap">
        <input type="text" id="txtInput" placeholder="할 일을 입력해주세요.">
        <button type="button" id="btnAdd">추가</button>
    </div>
    <ul id="todoList" class="todo_list">
        {{#each todoArray}}
            <li>
                <input type="checkbox" id="{{id}}" {{#if chkState}}checked{{/if}}>
                <label for="{{id}}" {{#if chkState}}class="complete"{{/if}}>{{title}}</label>
                <button type="button" name="btnDelete" data-id="{{id}}">X</button>
            </li>
        {{/each}}
    </ul>
    <div id="todoCount" class="todo_count">
        <span>
            총 <strong>{{totalCnt}}</strong>건
        </span>
        <span>
            완료 <strong>{{comCnt}}</strong>건
        </span>
        <span>
            미완료 <strong>{{incomCnt}}</strong>건
        </span>
    </div>
`;

function Todo(){
    this.todoArray = [];
    this.template = Handlebars.compile(src);

    this.container = document.querySelector('#todoWrap');
    this.container.addEventListener("click", this.onCreateItem.bind(this));
    this.container.addEventListener("keypress", this.onCreateItem.bind(this));
    this.container.addEventListener('change', this.onChangeStatus.bind(this));
    this.container.addEventListener('click', this.onDeleteItem.bind(this));

    this.updateView();
};
Todo.prototype.addArray = function(title){
        this.todoArray.push({
          title: title,
          id: Date.now(),
          chkState: false
        });
};
Todo.prototype.onCreateItem = function(e){
    if(e.target.id === 'btnAdd' || e.which === 13){
        let txtInput = document.querySelector('#txtInput');
        if( txtInput.value ){
            this.addArray(txtInput.value);
            this.updateView();
        }else{
            alert('할 일을 입력해주세요.');
        }
    }
};
Todo.prototype.onChangeStatus = function(e){
    if(e.target.type === 'checkbox'){
        let id = +e.target.id;
        this.todoArray.find(todo => todo.id === id).chkState = e.target.checked;
        this.updateView();
    }
};
Todo.prototype.onDeleteItem = function(e){
    if(e.target.name === 'btnDelete'){
        let id = +e.target.dataset.id;
        this.todoArray = this.todoArray.filter(todo => todo.id != id);
        this.updateView();
    }
};
Todo.prototype.updateStatusBar = function(){
    let totalCnt = this.todoArray.length;
    let comCnt = this.todoArray.filter(todo => todo.chkState).length;
    let incomCnt = this.todoArray.filter(todo => !todo.chkState).length;
    return {
        totalCnt,
        comCnt,
        incomCnt
    };
};
Todo.prototype.updateView = function(){
    this.container.innerHTML = this.template(Object.assign({ todoArray: this.todoArray }, this.updateStatusBar() ));
};

let app = new Todo();