import React, { useEffect } from "react";
import { useReducer } from "react";
import { todoReducer } from "./todoReducer";
import { useState } from "react";
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Card,
  Typography,
} from "@mui/material";
import { CheckCircle, Delete, Edit } from "@mui/icons-material";

const initialState = [];

const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    const todoStore = localStorage.getItem("todos");
    if (todoStore) {
      dispatch({ type: "LOAD", payload: JSON.parse(todoStore) });
    }
  }, []);

  const addTodo = () => {
    if (task.trim()) {
      if (editId) {
        dispatch({ type: "EDIT_TODO", payload: { id: editId, text: task } });
        setEditId(null);
        setTask("");
      } else {
        dispatch({
          type: "ADD_TODO",
          payload: { id: Date.now(), text: task, completed: false },
        });
        setTask("");
      }
    }
  };

  return (
    <Container
      maxWidth="false"
      sx={{
        background: "linear-gradient(45deg, rgb(54, 19, 100), #ff6f61)",
        padding: '50px 0',
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          background: "white",
          padding: '20px',
          borderRadius: '20px',
          boxShadow: 3,
        }}
      >
        <Card raised style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Todo for U
          </Typography>
          <TextField
            fullWidth
            label={editId ? "Updating Task" : "Add Your New Task"}
            variant="outlined"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            fullWidth
            style={{
              marginBottom: "20px",
              backgroundColor: "#3f51b5",
              color: "white",
            }}
          >
            {editId ? "Update" : "Add"}
          </Button>

          <List>
            {todos.map((todo) => (
              <ListItem key={todo.id} divider>
                <Card
                  variant="outlined"
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: todo.completed ? "#e0e0e0" : "white",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <ListItemText
                    primary={todo.text}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "#9e9e9e" : "black",
                      fontSize: "16px",
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                      color={todo.completed ? "success" : "default"}
                      onClick={() =>
                        dispatch({ type: "SUCCESS_TODO", payload: todo.id })
                      }
                      style={{ marginRight: "10px" }}
                    >
                      <CheckCircle />
                    </IconButton>

                    <IconButton
                      color="primary"
                      disabled={todo.completed}
                      onClick={() => {
                        setTask(todo.text);
                        setEditId(todo.id);
                      }}
                      style={{ marginRight: "10px" }}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          "Are you sure you want to delete this task?"
                        );
                        if (confirmDelete) {
                          dispatch({ type: "REMOVE_TODO", payload: todo.id });
                        }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </Card>
              </ListItem>
            ))}
          </List>
        </Card>
      </Container>
    </Container>
  );
};

export default TodoApp;
