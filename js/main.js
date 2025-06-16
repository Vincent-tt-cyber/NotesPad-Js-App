document.addEventListener("DOMContentLoaded", function () {
  const nodeList = document.querySelector(".note__list");
  const noteEditor = document.querySelector(".note__editor");
  const noteTitle = document.querySelector(".note__title");
  const addNoteBtn = document.querySelector(".add-note");

  // Добавить новую заметку
  addNoteBtn.addEventListener("click", addNote);

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Создание заметки
  function addNote() {
    console.log("Создание");
    let titleNote = noteTitle.value;
    const newNote = {
      id: Date.now().toString(),
      title: titleNote || "Без названия",
      description: "",
    };

    notes.unshift(newNote);

    renderNotesList(newNote);

    console.log(notes);

    noteTitle.focus();
    noteTitle.value = "";
  }

  //   Отображение списка заметок
  function renderNotesList(note) {
    nodeList.innerHTML = "";

    notes.forEach((note) => {
      const noteHtml = `<li class="note__item">${note.title}</li>`;
      nodeList.insertAdjacentHTML("beforeend", noteHtml);
    });
  }
});
