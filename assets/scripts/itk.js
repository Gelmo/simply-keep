function sendForm(form) {
  var error = "";
  var spamTime = 3600;
  var hookurl = INQUIRYHOOKURL;
  if (!document.forms[0][0].checkValidity()) {
    error += "Name ";
  }
  if (!document.forms[0][1].checkValidity()) {
    error += "email ";
  }
  if (!document.forms[0][2].checkValidity()) {
    error += "Message ";
  }
  if (document.forms[0][2].value.length >= 2000) {
    error += "Message is too long (max. 2000 chars)";
  }
  if (error == "") {
    var request = new XMLHttpRequest();
    request.open("POST", hookurl);

    request.setRequestHeader("Content-type", "application/json");

    var params = {
      embeds: [
        {
          fields: [
            {
              name: "Name",
              value: form.name.value,
              inline: true,
            },
            {
              name: "email",
              value: form.email.value,
              inline: true,
            },
            {
              name: "Message",
              value: form.message.value,
            },
          ],
        },
      ],
    };
    if (
      Math.round(Date.now() / 1000) -
        parseInt(localStorage.getItem("formTimeStamp")) >
        spamTime &&
      form.firstname.value == ""
    ) {
      request.send(JSON.stringify(params));
    } else {
      alert("Spam Protection!\nTry again in an hour.");
    }
    request.onerror = function () {
      alert("Message could not be sent. \nPlease try later.");
    };

    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
        var status = request.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          localStorage.setItem("formTimeStamp", Math.round(Date.now() / 1000));
          document.getElementById("inqform").style.display = "none";
          document.getElementById("formresponse").style.display = "block";
        } else {
          alert("Message could not be sent. \nPlease try later.");
        }
      }
    };
  } else {
    alert(
      "Message could not be sent. \nPlease check your input values :\n" + error
    );
  }
}

function opentab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
