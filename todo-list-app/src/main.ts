import "./style.css";
import { v4 as uuidV4 } from "uuid";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const list = document.querySelector<HTMLUListElement>(".task-list");
const form = document.getElementById("new-task-form") as HTMLFormElement;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();
tasks.forEach(addNewTask);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  addNewTask(newTask);
  input.value = "";
});

function addNewTask(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("click", () => {
    task.completed = checkbox.checked;
    // console.log(task);
    saveTask();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTask() {
  localStorage.setItem("TASK", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const tasksJSON = localStorage.getItem("TASK");
  if (!tasksJSON) return [];
  return JSON.parse(tasksJSON);
}
