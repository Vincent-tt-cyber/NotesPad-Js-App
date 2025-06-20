document.addEventListener("DOMContentLoaded", function () {
  const nodeList = document.querySelector(".note__list");
  const noteEditor = document.querySelector(".note__editor");
  const noteTitle = document.querySelector(".note__title");
  const addNoteBtn = document.querySelector(".add-note");

  let currentNoteID = null;

  // Показать данные заметки
  nodeList.addEventListener("click", showNoteDetails);

  // Удаление записи
  nodeList.addEventListener("click", deleteNote);

  // Добавить новую заметку
  addNoteBtn.addEventListener("click", handleNoteActions);

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  // Отображение данных при перезагрузке/открытии страницы
  notes.forEach((note) => renderNotesList(note));

  function handleNoteActions() {
    if (currentNoteID) {
      saveNoteChanges(currentNoteID);
    } else {
      addNote();
    }
  }

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

    addNoteBtn.textContent = "Новая запись";
    noteTitle.value = "";
    noteEditor.value = "";
  }

  // Отображение заметки
  function showNoteDetails(e) {
    // Если клие по кнопке "Удалить"
    if (e.target.dataset.action === "delete") return;

    // Поиск родительского элемента - заметка
    let parentNode = e.target.closest(".note__item");
    if (!parentNode) {
      // parentNode.classList.remove("active");
      return;
    }

    // Удаляем у всех класс active
    document
      .querySelectorAll(".note__item")
      .forEach((item) => item.classList.remove("active"));

    // Если есть клик по заметке
    if (parentNode) {
      parentNode.classList.add("active");

      // Поиск нужной заметки
      let currentNote = notes.find((item) => item.id == parentNode.id);

      currentNoteID = currentNote.id;

      addNoteBtn.textContent = "Сохранить";

      noteTitle.value = currentNote.title;
      noteEditor.value = currentNote.description;
    } else {
      parentNode.classList.remove("active");
      noteTitle.value = "";
      noteEditor.value = "";
    }
  }

  // Сохранение изменений заметки
  function saveNoteChanges(noteID) {
    let currentNote = notes.find((note) => note.id == noteID);

    currentNote.title = noteTitle.value;
    currentNote.description = noteEditor.value;

    console.log(currentNote);

    saveToLocalStorage();
    renderNotesList();

    currentNoteID = null;

    noteTitle.value = "";
    noteEditor.value = "";
    addNoteBtn.textContent = "Новая запись";
  }
});
