import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: any;
  newTodo: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.http.get('http://localhost:8080/todos').subscribe((data) => {
      this.todos = data;
    });
  }
  
  deleteTodo(id: number) {
    this.http.delete(`http://localhost:8080/todos/${id}`).subscribe(() => {
      this.refreshTodos();
    });
  }
  
  refreshTodos() {
    this.fetchTodos();
  }
  
  addTodo() {
    this.http.post('http://localhost:8080/todos', this.newTodo).subscribe(() => {
      this.newTodo = {};
      this.refreshTodos();
    });
  }
}
