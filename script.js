const button = document.getElementById("btn_createAcc");
const inputs = document.querySelectorAll("input");
const reqList = document.querySelector(".form_card div:nth-child(2)");
const requirements = document.querySelectorAll(
  ".form_card div:nth-child(2) ul li"
);
const password = document.getElementById("user_password");
const cpassword = document.getElementById("user_cpassword");

const InvalidAlerts = [
  "Your name should only contain letters",
  "Last name should only contain letters",
  "The email format is wrong",
  "",
  "",
  "Passwords do not match",
];

button.addEventListener("mouseenter", () => {
  button.innerHTML += '<i class="fa-solid fa-angles-right"></i>';
});

button.addEventListener("mouseleave", () => {
  button.innerHTML = "Create account ";
});

for (let i = 0; i < requirements.length; i++) {
  console.log(requirements[i].textContent);
}
//Setting all the inputs to grey at the beggining
inputs.forEach((input) => {
  checkContent(input);
});

inputs.forEach((input) => {
  //Tell you what's wrong when you focus out, "eager behaviour"
  input.addEventListener("input", () => {
    checkContent(input);
    if (input.checkValidity()) {
      input.nextSibling.nextSibling.style.visibility = "hidden";
    }
  });

  //Tell you what's wrong when you focus out, "eager behaviour"
  input.addEventListener("focusout", () => {
    if (!input.checkValidity()) {
      input.nextSibling.nextSibling.style.visibility = "visible";
    } else {
      input.nextSibling.nextSibling.style.visibility = "hidden";
    }
    checkContent(input);
  });
});

//Don't mark empty imputs as "invalid" right away

function checkContent(input) {
  if (input.value == "") {
    input.classList.add("empty");
    if (input.getAttribute("required") == "") {
      input.nextSibling.nextSibling.textContent =
        "You cannot leave this field empty";
    } else {
      return;
    }
  } else {
    input.classList.remove("empty");
    input.nextSibling.nextSibling.textContent =
      InvalidAlerts[input.getAttribute("data-number")];
    //Restores the empty error message for the actual error message
  }
}

// If confirm password has the same value as password, check's it as valid
password.addEventListener("focusout", () => {
  //Disables confirm password button, until a password is written
  if (password.checkValidity()) {
    cpassword.removeAttribute("disabled");
    let cpassValue = password.value;
    cpassword.setAttribute("pattern", `${cpassValue}`);
  } else {
    cpassword.setAttribute("disabled", "");
    cpassword.nextSibling.nextSibling.style.visibility = "hidden";
  }
  reqList.style.visibility = "hidden";
});

password.addEventListener("click", () => {
  reqList.style.visibility = "visible";
});

//Password requirement requirements
const lengthRegex = /.{8,20}/;
const uppercaseRegex = /[A-Z]+/;
const lowercaseRegex = /[a-z]+/;
const numberSymbolRegex = /(\W+)|([0-9]+)/;

password.addEventListener("input", () => {
  let passValue = password.value;
  if (passValue.match(lengthRegex)) {
    requirements[0].classList.add("reqMeet");
  } else {
    requirements[0].classList.remove("reqMeet");
  }

  if (passValue.match(uppercaseRegex)) {
    requirements[1].classList.add("reqMeet");
  } else {
    requirements[1].classList.remove("reqMeet");
  }
  if (passValue.match(lowercaseRegex)) {
    requirements[2].classList.add("reqMeet");
  } else {
    requirements[2].classList.remove("reqMeet");
  }
  if (passValue.match(numberSymbolRegex)) {
    requirements[3].classList.add("reqMeet");
  } else {
    requirements[3].classList.remove("reqMeet");
  }
});
