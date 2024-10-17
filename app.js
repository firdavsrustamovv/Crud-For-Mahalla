let inputs = document.querySelectorAll("input");
let selectedElements = document.querySelectorAll(".form-select");
let btn = document.querySelector("#btn");
let btn2 = document.querySelector("#btn2");
let deleteBtn = document.querySelector("#btn3");
let res = document.querySelector("#res");
let searchRes = document.querySelector("#searchRes");

const products = JSON.parse(localStorage.getItem("products")) || [
  {
    id: 1,
    userName: "Rustamov Firdavs",
    userTel: "915682148",
    userDate: "03.05.2003",
    userPassport: "AB0000000",
    userProb: "Yo'q",
    isDisabled: "Nogiron emas",
    IsStudent: "Oliy Ta'lim",
    userFamily: "Tinch",
    userStreet: "Navbahor",
    userWork: "Ishsiz",
    userSituation: "O'qish uchun",
  },
];

btn.addEventListener("click", () => {
  createProduct();
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
  inputs[3].value = "";
  saveProducts();
  // window.location.reload();
});
btn2.addEventListener("click", () => {
  searchProducts();
  inputs[4].value = "";
});

function createProduct() {
  products.push({
    id: products.length + 1,
    userName: inputs[0].value,
    userTel: inputs[1].value,
    userPassport: inputs[2].value,
    userDate: inputs[3].value,
    userProb: selectedElements[0].value,
    isDisabled: selectedElements[1].value,
    IsStudent: selectedElements[2].value,
    userFamily: selectedElements[3].value,
    userStreet: selectedElements[4].value,
    userWork: selectedElements[5].value,
    userSituation: selectedElements[6].value,
  });
  // updateTable();
  renderTable();
}
function renderTable() {
  let tableRows = "";
  products.forEach((val, idx) => {
    tableRows += `
   
        <tr>
            <th scope="row">${idx + 1}</th>
            <td>${val.userName}</td>
            <td>${val.userTel}</td>
            <td>${val.userDate}</td>
            <td>${val.userPassport}</td>
            <td>${val.userProb}</td>
            <td>${val.isDisabled}</td>
            <td>${val.IsStudent}</td>
            <td>${val.userFamily}</td>
            <td>${val.userStreet}</td>
            <td>${val.userWork}</td>
            <td>${val.userSituation}</td>
            <td>
                <button class="success" onclick="updateProducts(${
                  val.id
                })" >o'zgartirish</button>
                <button class="danger" onclick="deleteUser()" id="btn3">o'chirish</button>
            </td>
        </tr>
        </div>`;
  });
  res.innerHTML = `
 
      <table class="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">FISH</th>
            <th scope="col">TEL</th>
            <th scope="col">Tug'ilgan yili</th>
            <th scope="col">Passport</th>
            <th scope="col">Probatsiya</th>
            <th scope="col">Nogironlik</th>
            <th scope="col">O'qish</th>
            <th scope="col">Oila</th>
            <th scope="col">Ko'cha</th>
            <th scope="col">Ish Joyi</th>
            <th scope="col">Migratsiya</th>
            <th scope="col">O'zgartirish kiritish</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      </div>`;
}

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}
function searchProducts() {
  let searchValue = inputs[4].value.toLocaleLowerCase();
  let searchResult = products.filter(
    (val) =>
      val.userName.toLocaleLowerCase().includes(searchValue) ||
      val.userStreet.toLocaleLowerCase().includes(searchValue)
  );
  if (searchResult.length > 0) {
    let tableRows = "";
    searchResult.map((val, idx) => {
      tableRows += `
     
          <tr>
              <th scope="row">${idx + 1}</th>
              <td>${val.userName}</td>
              <td>${val.userTel}</td>
              <td>${val.userDate}</td>
              <td>${val.userPassport}</td>
              <td>${val.userProb}</td>
              <td>${val.isDisabled}</td>
              <td>${val.IsStudent}</td>
              <td>${val.userFamily}</td>
              <td>${val.userStreet}</td>
              <td>${val.userWork}</td>
              <td>${val.userSituation}</td>
             
          </tr>
          </div>`;
    });
    searchRes.innerHTML = `
   
        <table class="table table-success table-striped">
          <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">FISH</th>
            <th scope="col">TEL</th>
            <th scope="col">Tug'ilgan yili</th>
            <th scope="col">Passport</th>
            <th scope="col">Probatsiya</th>
            <th scope="col">Nogironlik</th>
            <th scope="col">O'qish</th>
            <th scope="col">Oila</th>
            <th scope="col">Ko'cha</th>
            <th scope="col">Ish Joyi</th>
            <th scope="col">Migratsiya</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
        </div>`;
  } else {
    alert("Products not found");
  }
}

function updateProducts(id) {
  let productToUpdate = products.find((product) => product.id === id);
  if (productToUpdate) {
    let newName = prompt("Enter new product name:", productToUpdate.userName);
    let newTel = prompt("Enter new product userTel:", productToUpdate.userTel);
    if (newName && newTel) {
      productToUpdate.userName = newName;
      productToUpdate.userTel = newTel;
      saveProducts();
      renderTable();
    }
  }
}

function deleteUser() {
  let ids = products.map((product) => product.id);
  const index = products.findIndex((idx) => idx.id === ids);
  products.splice(index, 1);
  renderTable();
  saveProducts();
}

renderTable();
