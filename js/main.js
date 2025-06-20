document.addEventListener("DOMContentLoaded", function () {
  const nodeList = document.querySelector(".note__list");
  const noteEditor = document.querySelector(".note__editor");
  const noteTitle = document.querySelector(".note__title");
  const addNoteBtn = document.querySelector(".add-note");

  // Показать данные заметки
  nodeList.addEventListener("click", showNoteDetails);

  // Удаление записи
  nodeList.addEventListener("click", deleteNote);

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
      const noteHtml = `<li id="${note.id}" class="note__item">
      <h2 class="note__item-title">${note.title}</h2>
      <button data-action="delete" class="note__btn-delete">
            DEL
          </button></li>`;
      nodeList.insertAdjacentHTML("beforeend", noteHtml);
    });
  }

  // Сохранить данные в LocalStorage
  function saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Удаление записи
  function deleteNote(e) {
    if (e.target.dataset.action !== "delete") {
      return;
    }

    let parentNode = e.target.closest(".note__item");

    let noteID = parentNode.id;

    notes = notes.filter((note) => note.id !== noteID);
    saveToLocalStorage();

    parentNode.remove();

    noteTitle.value = "";
    noteEditor.value = "";
  }

  // Отображение заметки
  function showNoteDetails(e) {
    if (e.target.dataset.action === "delete") return;

    let parentNode = e.target.closest(".note__item");
    if (!parentNode) return;

    document
      .querySelectorAll(".note__item")
      .forEach((item) => item.classList.remove("active"));

    if (parentNode) {
      parentNode.classList.add("active");

      let currentNote = notes.find((item) => item.id == parentNode.id);
      console.log(currentNote);

      noteTitle.value = currentNote.title;
      noteEditor.value = currentNote.description;

      // TODO: Сделать логику клика за пределами note__item чтобы убрать класс active

      // noteTitle.addEventListener("input", function () {
      //   addNoteBtn.textContent = "Сохранить изменения";
      //   noteTitle = this.value;

      //   this.addEventListener("blur", saveToLocalStorage());
      // });
    } else {
      noteTitle.value = "";
      noteEditor.value = "";
    }
  }
});
