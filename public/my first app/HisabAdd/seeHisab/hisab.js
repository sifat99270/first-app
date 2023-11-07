const a = document.querySelector(".updateForm");
    let b = document.querySelector(".update");
    b.addEventListener("click", function king() {
      console.log("ok");
      //a.style.backgroundColor = "blue";
      a.style.top = "0px";
      a.classList.toggle("king");
    });
    console.log(a, b);