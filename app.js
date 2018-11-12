let btn = document.querySelector("#btn");
document.addEventListener("DOMContentLoaded", function(){
  fetch("https://api.icndb.com/jokes/random/4").then(res=> res.json()).then(data =>  {
    if(data.type == "success"){
      // let datas = data.value.joke;
      
      data.value.forEach(function(value){ console.log(value.joke); ui.addToUI(value.joke)
      });

    }else console.log("something went wrong")
  });
  console.log("button has been click");
});

let UI = function(){
  
  
  this.addToFavourite();
  this.scrollEvent(document.querySelector("nav"), document.querySelector(".navbar-brand"), document.querySelector(".fa-smile-o"));
}

  UI.prototype.addToUI = function(joke) {
    let row = document.createElement("div"),
        emptyCol1 = document.createElement("div"),
        firstCol = document.createElement("div"),
        emptyCol2 = document.createElement("div")
        scndCol = document.createElement("div");

        row.className = 'container row';
        emptyCol1.className = "offset-1";
        firstCol.classList = "card col-sm-5";
        const cardTitle = document.createElement("div"),
              b = document.createElement("b"),
              i = document.createElement("i"),
              hr = document.createElement("hr"),
              cardBody = document.createElement("div"),
              p = document.createElement("p");
              cardTitle.className = "card-title mb-0 pb-0 text-primary";
              b.innerText = "Regular Jokes";
              i.className = "fa fa-star-o fa fa-pull-right";
              // card title children
              cardTitle.appendChild(b);
              cardTitle.appendChild(i);
              cardTitle.appendChild(hr);
              // card body children
              cardBody.className = "card-body";
              p.className = 'lead';
              p.appendChild(document.createTextNode(joke));
              cardBody.appendChild(p);
        // first card # main card
        firstCol.appendChild(cardTitle)
        firstCol.appendChild(cardBody);

        // second card
        const cardTitle2 = document.createElement("div"),
              b2 = document.createElement("b"),
              i2 = document.createElement("i"),
              hr2 = document.createElement("hr"),
              cardBody2 = document.createElement("div"),
              p2 = document.createElement("p");
              cardTitle2.className = "card-title mb-0 pb-0 text-primary";
              b2.innerText = "Regular Jokes";
              i2.className = "fa fa-star-o fa fa-pull-right";
              // card title children
              cardTitle2.appendChild(b2);
              cardTitle2.appendChild(i2);
              cardTitle2.appendChild(hr2);
              // card body children
              cardBody2.className = "card-body";
              p2.className = 'lead';
              p2.appendChild(document.createTextNode(joke));
              cardBody2.appendChild(p2);
        scndCol.appendChild(cardTitle2);
        scndCol.appendChild(cardBody2);

        emptyCol2.className = "offset-1";
        scndCol.className = "card col-sm-5";
        row.appendChild(emptyCol1);
        row.appendChild(firstCol);
        row.appendChild(emptyCol2);
        row.appendChild(scndCol);
        
        
      document.getElementById("jumbo").appendChild(row);
      document.getElementById("jumbo").appendChild(document.createElement("br"));
        console.log(row);
  }

 UI.prototype.addToFavourite = function (){

  let cardTitle = document.querySelectorAll('.card-title');
  cardTitle.forEach(title => {
    title.addEventListener("click", e => {
      let star = e.target;
      
      if(star.classList.contains("fa-star-o")) {
        star.className = 'fa fa-star fa fa-pull-right';  
      }else if(star.classList.contains("fa-star")){
      star.className = 'fa fa-star-o fa fa-pull-right';
      }

    })
  });

 }
 
 UI.prototype.scrollEvent = function (nav, navBrand, face) {
  // let winoffset = window.pageYOffset;     
  document.addEventListener('scroll', watch);
  function watch () {
    let winOffset = window.pageYOffset;
    
    if(window.innerWidth > 576){

      if(winOffset >= 920) {
        nav.classList.replace("bg-primary", "bg-dark");
        navBrand.classList.replace("text-light", "text-primary");
        face.classList.replace("text-light", "text-primary");
      }else {
        nav.classList.replace("bg-dark", "bg-primary");
        navBrand.classList.replace("text-primary", "text-light");
        face.classList.replace("text-primary", "text-light");
      }

    }else if(window.innerWidth < 576){
    
      if(winOffset >= 1200) {
        nav.classList.replace("bg-primary", "bg-dark");
        navBrand.classList.replace("text-light", "text-primary");
        face.classList.replace("text-light", "text-primary");
      }else {
        nav.classList.replace("bg-dark", "bg-primary");
        navBrand.classList.replace("text-primary", "text-light");
        face.classList.replace("text-primary", "text-light");
      }

    } 
 }
}

let ui = new UI();