document.addEventListener("DOMContentLoaded", function () {
  const nodeList = document.querySelector(".note__list");
  const noteEditor = document.querySelector(".note__editor");
  const noteTitle = document.querySelector(".note__title");
  const addNoteBtn = document.querySelector(".add-note");

  // Добавить новую заметку
  addNoteBtn.addEventListener("click", addNote);

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  // Отображение данных при перезагрузке/открытии страницы
  notes.forEach((note) => renderNotesList(note));

  // Создание заметки
  function addNote() {
    let titleNote = noteTitle.value;
    let descriptionNote = noteEditor.value;

    const newNote = {
      id: Date.now().toString(),
      title: titleNote || "Без названия",
      description: descriptionNote,
    };

    notes.unshift(newNote);

    renderNotesList(newNote);

    saveToLocalStorage();

    noteTitle.focus();
    noteTitle.value = "";
    noteEditor.value = "";
  }

  // Отображение списка заметок
  function renderNotesList(note) {
    nodeList.innerHTML = "";

    notes.forEach((note) => {
      const noteHtml = `<li class="note__item">${note.title}<button data-action="delete" class="note__btn-delete">
            <img src="./img/delete-icon.svg" alt="delete" />
          </button></li>`;
      nodeList.insertAdjacentHTML("beforeend", noteHtml);
    });
  }

  // Сохранить данные в LocalStorage
  function saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Удаление записи
  function deleteNote(id) {
    console.log(id);
    
  }
});
