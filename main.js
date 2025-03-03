//-----------------------------------------toggle icon navbar--------------------------
let menuIcon = document.querySelector('#menu-icon');
  let navbar=document.querySelector('.navbar');

menuIcon.onclick=()=>{
  menuIcon.classList.toggle('fa-xmark');
  navbar.classList.toggle('active')
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop -150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    };
  });

  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  // -----------------------remove toggle icon and navbar--------------------------

  menuIcon.classList.remove('fa-xmark');
  navbar.classList.remove('active');
};

// --------------------------Scroll reveal---------------
ScrollReveal({
  distance:'80px',
  duration:2000,
  delay:200,
});
ScrollReveal().reveal('.home-content, heading',{origin:'top'});
ScrollReveal().reveal('.home-img, .portfolio-box ',{origin:'buttom'});
ScrollReveal().reveal('.about-img, .skill-container, .contact form',{origin:'left'});
ScrollReveal().reveal('.about-content',{origin:'right'});

// ----------------------------form----------------------
const form=document.querySelector("form");
const fullName=document.getElementById("name");
const email=document.getElementById("email");
const phone=document.getElementById("phone");
const subject=document.getElementById("subject");
const mess=document.getElementById("message");



function sendEmail() {
  const bodyMessage = `Full Name : ${fullName.value} <br> Email : ${email.value} <br> Phone Number : ${phone.value} <br> Message : ${mess.value} `;
  Email.send({
    SecureToken :"cfaf0596-2812-4d06-8fcd-9e97df45ffdf",
    To : 'eswarimadavarapu@gmail.com',
    From : "eswarimadavarapu@gmail.com",
    Subject : subject.value,
    Body : bodyMessage
  }).then(
    message => {
      if(message=="OK"){
        Swal.fire({
          title: "Success!",
          text: "Message sent Successfully!",
          icon: "success"
        });
      }
    }
  );
}

function checkInputs(){
  const items = document.querySelectorAll(".item");

  for (const item of items){
    if(item.value == ""){
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != ""){
      checkEmail();
    }

    items[1].addEventListener("keyup", ()=>{
      checkEmail();
    })

    item.addEventListener("keyup", () => {
      if(item.value !== ""){
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      }
      else{
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    })
  }
}

function checkEmail(){
  const emailRegex=/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

  const errorTxtEmail = document.querySelector(".error-txt.email");

  if(!email.value.match(emailRegex)){
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value!=""){
      errorTxtEmail.innerText= "Enter a Valid email address";
    }
    else{
      errorTxtEmail.innerText= "Email Address can't be blank";
    }
  }
  else{
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  checkInputs();

  if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") 
    && !subject.classList.contains("error") && !mess.classList.contains("error")) {
  sendEmail();
  form.reset();
  return false;
  }
 
});