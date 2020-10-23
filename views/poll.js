let title = document.getElementById("pollTitle"),
    description = document.getElementById("pollDesc"),
    option = document.getElementById("pollOption"),
    addOption = document.querySelector(".addOption"),
    submit = document.getElementById("submit"),
    optionsList = document.querySelector('.optionsList');
    let loader = document.querySelector('.loader');

window.onload = () => {
  loader.classList.add('loaded')
  loader.addEventListener('transitionend', () => {
    loader.style.display="none";
  })
}
function addOptionToList() {
  if (option.value.length == 0) {
    alert("You must write something.")
  } else {
  let optionCreate = document.createElement("li");
  optionCreate.innerHTML = option.value;
  option.value = "";
  optionsList.appendChild(optionCreate);
  optionCreate.classList.add('option');

  }}

addOption.addEventListener("click", addOptionToList);

optionsList.addEventListener("click", event => {
  if(event.target.classList.contains('option')) {
    event.target.remove();
  }
})

submit.addEventListener("click", () => {
  options = document.querySelectorAll('.option');
  if (title.value.length == 0) {
    alert("you must enter a title.")
  } else if (optionsList.length == 0) {
    alert("You must enter at least one option.")
  } else {
  const firstOptions = [];
  const allZeros = [];
  options.forEach(o => {
    firstOptions.push(o.textContent);
    allZeros.push('0');
  })
  const finalPoll = {
    'title': title.value,
    'description': description.value,
    'options': firstOptions,
    'votes': allZeros
  };

  let xhttp = new XMLHttpRequest;
  xhttp.open("POST", "/submitPoll", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(finalPoll));
      let clockAnim = setInterval(() => {
        document.getElementById('clock').classList.toggle("active");
      }, 250);
      console.log("DonE");
      setTimeout(() => {
        document.querySelector('.waiting').style.left = "0";
      }, 500)
      setTimeout(() => {
        document.querySelector('.finished').style.left = "0";
      }, 1250)
      clearInterval(clockAnim);
      let goBack1 = setTimeout(() => {
          document.querySelector('.finished').style.left = "-100%";
      }, 2250);
      let goBack2 = setTimeout(() => {
          document.querySelector('.waiting').style.left = "-100%";
      }, 2300);



  /*fetch('/submitPoll', reqOptions)
  .then(() => {
  })
  .then(response => {
    if (response.ok) {
    }
  })
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }
}
const reqOptions = {
  method: "POST",
  body: JSON.stringify(finalPoll),
  headers: {
    'Content-type': 'application/json'*/
  }
}
);
