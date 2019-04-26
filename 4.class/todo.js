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

class Todo{
    constructor(template, container){
        this.todoArray = [];
        this.container = document.querySelector(container);
        this.template = Handlebars.compile(template);

        this.container.addEventListener("click", this.onCreateItem.bind(this));
        this.container.addEventListener("keypress", this.onCreateItem.bind(this));
        this.container.addEventListener('change', this.onChangeStatus.bind(this));
        this.container.addEventListener('click', this.onDeleteItem.bind(this));

        this.updateView();
    }
    addArray(title){
        this.todoArray.push({
          title: title,
          id: Date.now(),
          chkState: false
        });
        this.updateView();
    }
    change(id, chkState){
        this.todoArray.find(todo => todo.id === id).chkState = chkState;
        this.updateView();
    }
    remove(id){
        this.todoArray = this.todoArray.filter(todo => todo.id != id);
        this.updateView();
    }
    onCreateItem(e){
        if(e.target.id === 'btnAdd' || e.which === 13){
            let txtInput = document.querySelector('#txtInput');
            if( txtInput.value ){
                this.addArray(txtInput.value);
            }else{
                alert('할 일을 입력해주세요.');
            }
        }
    }
    onChangeStatus(e){
        if(e.target.type === 'checkbox'){
            let id = +e.target.id;
            let chkState = e.target.checked;
            this.change(id, chkState);
        }
    }
    onDeleteItem(e){
        if(e.target.name === 'btnDelete'){
            let id = +e.target.dataset.id;
            this.remove(id);
        }
    }
    updateStatusBar(){
        let totalCnt = this.todoArray.length;
        let comCnt = this.todoArray.filter(todo => todo.chkState).length;
        let incomCnt = this.todoArray.filter(todo => !todo.chkState).length;
        return {
            totalCnt,
            comCnt,
            incomCnt
        };
    }
    updateView(){
        this.container.innerHTML = this.template(Object.assign({ todoArray: this.todoArray }, this.updateStatusBar() ));
    }
}
let app = new Todo(src, '#todoWrap');