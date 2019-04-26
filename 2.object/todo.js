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

let template = Handlebars.compile(src);

let Todo = {
    todoArray: [],
    init(){
        // this는 Todo 이다.
        // this(Todo)는 todoArray(배열)와 init(메서드), addArray(메서드) 등을 가지고 있다.
        this.container = document.querySelector('#todoWrap');
        this.container.addEventListener("click", this.onCreateItem.bind(this));
        this.container.addEventListener("keypress", this.onCreateItem.bind(this));
        this.container.addEventListener('change', this.onChangeStatus.bind(this));
        this.container.addEventListener('click', this.onDeleteItem.bind(this));
        /*
            onCreateItem만쓰면
            작동은 하지만, 대상?을 넘겨받지 못한다.
            
            this.onCreateItem.bind(this) 
            => TodoApp의 onCreateItem에 this를 bind 해준다.
            => TodoApp의 onCreateItem에 this를 값으로 넘겨준다. (인수로 사용할 수 있게)
        */
       this.updateView();
    },
    addArray(title){
        this.todoArray.push({
          title: title,
          id: Date.now(),
          chkState: false
        });
    },
    onCreateItem(e){
        if(e.target.id === 'btnAdd' || e.which === 13){
            let txtInput = document.querySelector('#txtInput');
            if( txtInput.value ){
                this.addArray(txtInput.value);
                this.updateView();
            }else{
                alert('할 일을 입력해주세요.');
            }
        }
    },
    onChangeStatus(e){
        if (e.target.type === 'checkbox') {
            let id = +e.target.id;
            this.todoArray.find(todo => todo.id === id).chkState = e.target.checked;
            this.updateView();
        }
    },
    onDeleteItem(e){
        if(e.target.name === 'btnDelete'){
            let id = +e.target.dataset.id;
            this.todoArray = this.todoArray.filter(todo => todo.id != id);
            this.updateView();
        }
    },
    updateStatusBar(){
        let totalCnt = this.todoArray.length;
        let comCnt = this.todoArray.filter(todo => todo.chkState).length;
        let incomCnt = this.todoArray.filter(todo => !todo.chkState).length;
        return {
            totalCnt,
            comCnt,
            incomCnt
        };
    },
    updateView(){
        this.container.innerHTML = template(Object.assign({ todoArray: this.todoArray }, this.updateStatusBar() ));
    }
};
Todo.init();