let data = [];
let emptyKey = [];
const noPrice = document.querySelector("#no-price");
const noPeople = document.querySelector("#no-people");
const noTip = document.querySelector("#no-tip");
const mainDiv = document.querySelector("#main-div");
const noDiv = document.querySelector("#no-div");
const tip = document.querySelector("#tip-amount");
const totalAmount = document.querySelector("#total-amount");
const individualOwed = document.querySelector("#per-person");
const totalDiv = document.querySelector("#total-div");
const loading = document.querySelector("#loading");
//fix button breakpoint

function emptyChecker() {
  mainDiv.style.height = "550px";
  noDiv.style.display = "block";
  emptyKey.forEach((item) => {
    if (item == "price") {
      noPrice.textContent = "You Need To Input A Price";
      noPrice.style.display = "block";
    } else if (item == "people") {
      noPeople.textContent =
        "Please Enter The Amount Of People Sharing The Bill";
      noPeople.style.display = "block";
    } else if (item == "select-options") {
      noTip.textContent = "Please Enter A Correct Tip Amount";
      noTip.style.display = "block";
    }
  });
  setTimeout(clear, 5000);
}

function handForm(ev) {
  ev.preventDefault();
  let myForm = ev.target;
  let fd = new FormData(myForm); // the for loop checks for any empty values and adds their key to an array
  for (const [key, value] of fd) {
    if (value == 0) {
      emptyKey.push(key);
    } else {
      data.push(value);
    }
  }
  console.log(emptyKey);
  console.log(data);
  if (emptyKey.length > 0) {
    emptyChecker();
  } else if (emptyKey.length === 0) {
    mainDiv.style.height = "580px";
    loading.style.display = "block";
    setTimeout(calculate, 3000);
  }
}

function clear() {
  noDiv.style.display = "none";
  mainDiv.style.height = "420px"; //reformatting the main-div to it's original size
  noTip.style.display = "none";
  noPeople.style.display = "none";
  noPrice.style.display = "none";
  totalDiv.style.display = "none";
  data = [];
  emptyKey = [];
  document.location.reload();
  document.querySelector("#my-form").reset(); //this resets the form's input field to the default
  clearTimeout();
}

function calculate() {
  let price = parseFloat(data[0]);
  let people = parseInt(data[1]);
  let percentage = parseInt(data[2]);
  const tipAmount = (price / 100) * percentage;
  const total = price + tipAmount;
  let totalRounded = total.toFixed(2);
  const perPerson = total / people;
  let perPersonRounded = perPerson.toFixed(2);
  mainDiv.style.height = "550px";
  loading.style.display = "none";
  totalDiv.style.display = "block";
  tip.style.display = "block";
  tip.textContent = `Tip Amount $ ${tipAmount}`;
  totalAmount.style.display = "block";
  totalAmount.textContent = `The Total Bill is $ ${totalRounded}`;
  individualOwed.style.display = "block";
  individualOwed.textContent = `Each Person Owes $ ${perPersonRounded}`;
  clearTimeout();
  setTimeout(clear, 8000);
}

document.querySelector("#my-form").addEventListener("submit", handForm);
