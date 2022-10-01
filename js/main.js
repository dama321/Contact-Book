// ! 27/09/2022 Task: Contact Book.
// Создать 3 инпута(name, email, imageUrl)
// -Реализовать весь функционал CRUD:
// ---Create (Создание контакта)
// ---Read (Вывести список контактов)
// ---Update (Сделать редактирование)
// ---Delete (Сделать удаление)
// сдать необходимо ссылку на GitHub, zip файл не будет проверяться

let body = document.getElementById("block");
let name1 = document.getElementById("1");
let email1 = document.getElementById("2");
let imgUrl1 = document.getElementById("3");
let btnSend = document.getElementById("btn-send");
let list = document.getElementById("text-list");

//! ===== create =======

function createText(liText) {
  if (!localStorage.getItem("texts")) {
    localStorage.setItem("texts", "[]");
  }
  let data = JSON.parse(localStorage.getItem("texts"));
  data.push(liText);
  localStorage.setItem("texts", JSON.stringify(data));
}
// createText();
// ? созадем событие КНОПКУ
btnSend.addEventListener("click", () => {
  if (!name1.value.trim()) {
    alert("Enter name!");
    return;
  } else if (!email1.value.trim()) {
    alert("Enter email!");
    return;
  } else if (!imgUrl1.value.trim()) {
    alert("Enter URL of IMG!");
    return;
  }
  let obj = {
    name: name1.value,
    email: email1.value,
    imgUrl: imgUrl1.value,
  };
  createText(obj);

  readText();

  name1.value = "";
  email1.value = "";
  imgUrl1.value = "";
  // console.log(obj);
  // console.log(JSON.parse(JSON.stringify(localStorage.getItem("texts"))));
});

//!  ==== Read =============

function readText() {
  if (!localStorage.getItem("texts")) {
    localStorage.setItem("texts", "[]");
  }
  let data1 = JSON.parse(localStorage.getItem("texts"));
  list.innerHTML = "";
  // img.setAttribute("src", imgUrl1.value);
  data1.forEach((elem, index) => {
    let li = document.createElement("li");
    let imgReal = document.createElement("img");
    imgReal.style.width = "100px";
    imgReal.style.height = "120px";
    let br = document.createElement("br");
    imgReal.setAttribute("src", elem.imgUrl);
    li.innerText = `name: ${elem.name},
    email: ${elem.email}`;

    let btnDelete = document.createElement("button");
    btnDelete.innerText = "Удалить";

    li.append(btnDelete);
    btnDelete.addEventListener("click", () => {
      deleteText(index);
    });
    let btnEdit = document.createElement("button");
    btnEdit.innerText = "Изменить";
    li.append(btnEdit);
    btnEdit.addEventListener("click", () => {
      editText(index, elem);
    });
    li.append(br);
    li.append(imgReal);
    list.append(li);
  });
}
//!  ==== Read ===FINISH==========

//todo delete ========== start
function deleteText(elem) {
  let data2 = JSON.parse(localStorage.getItem("texts"));
  data2.splice(elem, 1);
  localStorage.setItem("texts", JSON.stringify(data2));
  readText();
}
//todo delete ========== end

//todo edit ======start

let btnSave = document.getElementById("btnSave");

let mainModal = document.querySelector(".main-modal");
let inpModalN = document.getElementById("modalText1");
let inpModalE = document.getElementById("modalText2");
let inpModalI = document.getElementById("modalText3");

let id = "";

function editText(index, elem) {
  mainModal.style.display = "block";

  inpModalN.value = elem.name;
  inpModalE.value = elem.email;
  inpModalI.value = elem.imgUrl;

  id = index;
}

btnSave.addEventListener("click", () => {
  console.log("ok");
  if (inpModalN.value.trim() === "") {
    alert("Заполните поле!");
    return;
  } else if (inpModalE.value.trim() === "") {
    alert("Заполните поле!");
    return;
  } else if (inpModalI.value.trim() === "") {
    alert("Заполните поле!");
    return;
  }
  let data4 = JSON.parse(localStorage.getItem("texts"));

  let editedText = {
    name: inpModalN.value,
    email: inpModalE.value,
    imgUrl: inpModalI.value,
  };

  data4.splice(id, 1, editedText);

  localStorage.setItem("texts", JSON.stringify(data4));

  mainModal.style.display = "none";

  readText();
});

readText();
