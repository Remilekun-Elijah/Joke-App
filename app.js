let btn = document.querySelector("#btn");
document.addEventListener("DOMContentLoaded", function(){

  fetch("https://api.icndb.com/jokes/random/10").then(res =>res.json()).then(data =>  {
    console.log(data);
    if(data.type == "success"){

      data.value.forEach(function(value){ console.log(value.joke); ui.addToUI("#jumbo","Regular Jokes",value.joke)
      });

    }else console.log("something went wrong")
  });
  console.log("button has been click");
});

  // UI OBJECT
let UI = function(){

  this.addToFavourite();
  this.scrollEvent(document.querySelector("nav"), document.querySelector(".navbar-brand"), document.querySelector(".fa-smile-o"));
}
    // UI Prototype Method > AddToUI
  UI.prototype.addToUI = function(tag,jokeType,joke) {
    let row = document.createElement("div"),
        emptyCol1 = document.createElement("div"),
        firstCol = document.createElement("div"),
        emptyCol2 = document.createElement("div")
        scndCol = document.createElement("div");

        row.className = 'container row';
        emptyCol1.className = "offset-1";
        // emptyCol1.appendChild(document.createElement("br"));
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
              b2.innerText = jokeType;
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
        emptyCol2.appendChild(document.createElement("br"));
        scndCol.className = "card col-sm-5";
        row.appendChild(emptyCol1);
        row.appendChild(firstCol);
        
        row.appendChild(emptyCol2);
        row.appendChild(scndCol);
        
        
        document.querySelector(tag).appendChild(row);
        document.querySelector(tag).appendChild(document.createElement("br"));
        console.log(row);
  }

  // UI Prototype Method > Add To Favourite
 UI.prototype.addToFavourite = function (){

  let getStars = document.querySelectorAll('.get-star');
  getStars.forEach(getStar => {
    getStar.addEventListener("click", e => {
      let star = e.target;
      
      if(star.classList.contains("fa-star-o")) {
        joke = star.parentElement.parentElement.children[1].firstElementChild.innerText;
        let arr;
        if(localStorage.getItem('fav') == null){
          arr = [];
        }else{
          arr = JSON.parse(localStorage.getItem('fav'));  
        }
        arr.push(joke)
        localStorage.setItem('fav',JSON.stringify(arr));
        
        star.className = 'fa fa-star fa fa-pull-right';  
      }else if(star.classList.contains("fa-star")){

        
        star.className = 'fa fa-star-o fa fa-pull-right';
      }

    })
  });

 }

    // UI Prototype Method > scrollEvent
 UI.prototype.scrollEvent = function (nav, navBrand, face) {
  function replacer(Elem, New, Old){
    Elem.classList.replace(New,Old);
  }
  document.addEventListener('scroll', watch);
  function watch () {
    let winOffset = window.pageYOffset;  
    if(window.innerWidth > 576){

      if(winOffset >= 920) {
        replacer(nav, "bg-primary", "bg-dark");
        replacer(navBrand, "text-light", "text-primary");
        replacer(face, "text-light", "text-primary");
      }else {
        replacer(nav,"bg-dark", "bg-primary");
        replacer(navBrand, "text-primary", "text-light");
        replacer(face, "text-primary", "text-light");

      }

    }else if(window.innerWidth < 576){
    
      if(winOffset >= 1200) {
        replacer(nav, "bg-primary", "bg-dark");
        replacer(navBrand, "text-light", "text-primary");
        replacer(face, "text-light", "text-primary");
      }else {
        replacer(nav,"bg-dark", "bg-primary");
        replacer(navBrand, "text-primary", "text-light");
        replacer(face, "text-primary", "text-light");
      }

    } 
 }
}


let ui = new UI();