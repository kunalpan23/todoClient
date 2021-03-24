class API {
    private BASE_URL:String = 'https://todo-test-kunal.herokuapp.com/';
    private ALL_TODO:String = "getAllTodo";
    private ADD_TODO:String = "addTodo";
    private UPDATE_TODO:String = "updateTodo";
    private DELETE_TODO:String = "deleteTodo";

    get allTodo(){
        return `${this.BASE_URL}${this.ALL_TODO}`;
    }

    get addTodo(){
        return `${this.BASE_URL}${this.ADD_TODO}`;
    }

    get updateTodo(){
        return `${this.BASE_URL}${this.UPDATE_TODO}`;
    }

    get deleteTodo(){
        return `${this.BASE_URL}${this.DELETE_TODO}`;
    }
}

export default API;