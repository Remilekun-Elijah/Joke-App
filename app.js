let outerJumbo = document.querySelector("#outer-jumbo"),
  btn = document.getElementById("bars")
i = document.querySelector("#fa-bars");


/****   FOR FAVOURITES PAGE *****/
function getJokesFromLS() {
  let ui = new UI();
  jokes = JSON.parse(localStorage.getItem("fav"));
  jokes.forEach(joke => {
    ui.addToUI("#fav", "Favourite Jokes", joke, "fa fa-star fa fa-pull-right");
    console.log(joke);
  })
}



document.addEventListener("DOMContentLoaded", function () {

  // getJokesFromLS();
  console.log("Dom Content Loaded");

})


// UI OBJECT
let UI = function () {

  this.addToFavourite();
  this.scrollEvent(document.querySelector("nav"), document.querySelector(".navbar-brand"), document.querySelector(".fa-smile-o"));
}
// UI Prototype Method > AddToUI = create all the html cards to insert the jokes
UI.prototype.addToUI = function (tag, jokeType, joke, icon, CardTitleClass, colClass) {
  /**** COL DIV ****/
  const col = document.createElement("div");
  col.classList = colClass || "col-xl-3 col-lg-4 col-md-5 col-sm-11 col-xs-11 mb-5 mx-auto card-deck col";

  /**** MAIN CARD DIV***/
  const card = document.createElement("div");
  card.classList = "card";
  const cardTitle = document.createElement("div"),
    b = document.createElement("b"),
    i = document.createElement("i"),
    hr = document.createElement("hr"),
    cardBody = document.createElement("div"),
    p = document.createElement("p");

  /**** CARD TITLE ****/
  cardTitle.className = CardTitleClass || "card-title mb-0 pb-0 pt-2 px-2 text-primary";
  b.innerText = jokeType || "Regular Jokes";
  i.className = icon || "fa fa-star-o fa fa-pull-right";
  /**** insert children in CARD TITLE ****/
  cardTitle.appendChild(b);
  cardTitle.appendChild(i);
  cardTitle.appendChild(hr);

  /**** CARD BODY ****/
  cardBody.className = "card-body";
  p.className = 'lead';
  p.innerHTML += joke;
  /**** insert child in CARD BODY ****/
  cardBody.appendChild(p);

  /**** Add CARD TITLE and CARD BODY to main card div****/
  card.appendChild(cardTitle);
  card.appendChild(cardBody);

  /**** Add main card to COL DIV****/
  col.appendChild(card);

  /**** Add col div to our ROW DIV that is already in the UI > html pages ****/
  document.querySelector(tag).appendChild(col);
  document.querySelector(tag).appendChild(document.createElement("br"));

}

// UI Prototype Method > Add To Favourite = add favorites to user local storage
UI.prototype.addToFavourite = function () {

  /**** Grab all star icons and loop through em ***/
  let getStars = document.querySelectorAll('.get-star');
  getStars.forEach(getStar => {
    /*** add a click event on all the star icons ***/
    getStar.addEventListener("click", e => {
      let star = e.target;
      /*** NOT FILLED:: Check if STAR ICON is clicked and filled then add the jokes to local storage***/
      if (star.classList.contains("fa-star-o")) {
        joke = star.parentElement.parentElement.children[1].firstElementChild.innerText;
        let arr;
        if (localStorage.getItem('fav') == null) {
          arr = [];
        } else {
          arr = JSON.parse(localStorage.getItem('fav'));
        }
        arr.push(joke)
        localStorage.setItem('fav', JSON.stringify(arr));
        star.className = 'fa fa-star fa fa-pull-right';
      }
      /*** FILLED:: if STAR ICON is not filled and it's clicked fill it***/
      else if (star.classList.contains("fa-star")) {
        star.className = 'fa fa-star-o fa fa-pull-right';
      }

    })
  });

};

// UI prototype > fetchJokes = fetch the jokes from the API
UI.prototype.fetchJokes = (numberOfJokes, elem, jokeType) => {

  // this.numOfJokes = numOfJokes;
  fetch(`https://api.icndb.com/jokes/random/${numberOfJokes}`).then(res => {
      if (res && res.status === 200) return res.json();

      else {
        ui.addToUI(elem, "Error 404!", "We know this ain't funny but something went wrong :)", "fa fa-warning fa fa-pull-right", "card-title mb-0 pb-0 pt-2 px-2 text-warning", "col-8 mx-auto");
        // ui.addToUI(elem, "Error 404!", "We know this ain't funny but something went wrong :)", "fa fa-warning fa fa-pull-right", "card-title mb-0 pb-0 pt-2 px-2 text-warning", "col-8 mx-auto");

      };
    })
    .then(data => {
      if (data.type == "success") {

        data.value.forEach(value => {
          joke = value.joke;
          console.log(`big joke is ${joke}`);
          ui.addToUI(elem, jokeType, joke);
          //  return callBack;

        });

      } else console.log("something went wrong");
    });
}
// End fetch prototype

// UI Prototype Method > scrollEvent = change the background color of the navbar and navbar-brands color
UI.prototype.scrollEvent = function (nav, navBrand, face) {

  function replacer(Elem, New, Old) {
    Elem.classList.replace(New, Old);
  };

  document.addEventListener('scroll', watch);

  function watch() {
    //  ******* Floating element class below > CHECK LINE 1 to 20 *****//
    if (btn){
      btn.classList = '';
      btn.innerHTML = `
      <i class='fa fa-bars text-primary rounded-circle bg-white p-3 stay' id="fa-bars"></i>
      `;
    } else {
      console.error("")
    }
    //  ******* Floating element class above > CHECK LINE 1 to 20 *****//

    let winOffset = window.pageYOffset;
    // console.log(winOffset);
    if (window.innerWidth > 576) {

      if (winOffset >= 920) {
        replacer(nav, "bg-primary", "bg-dark");
        replacer(navBrand, "text-light", "text-primary");
        replacer(face, "text-light", "text-primary");
      } else {
        replacer(nav, "bg-dark", "bg-primary");
        replacer(navBrand, "text-primary", "text-light");
        replacer(face, "text-primary", "text-light")
      }

    } else if (window.innerWidth < 576) {

      if (winOffset >= 1200) {
        replacer(nav, "bg-primary", "bg-dark");
        replacer(navBrand, "text-light", "text-primary");
        replacer(face, "text-light", "text-primary");
      } else {
        replacer(nav, "bg-dark", "bg-primary");
        replacer(navBrand, "text-primary", "text-light");
        replacer(face, "text-primary", "text-light");
      }

    }

  };

};

(function () {

  $('.row').on("click", e => {
    if (e.target.classList.contains('fa-star')) {
      let p = e.target.parentElement.parentElement.children[1].firstElementChild;
      let arr;
      if (localStorage.getItem("fav") == null) {
        arr = []
      } else {
        arr = JSON.parse(localStorage.getItem("fav"));
      }


      arr.forEach((fav, index) => {
        if (p.textContent == fav) {
          p.parentElement.parentElement.remove();
          console.log(fav + ' ' + index);
          arr.splice(index, 1)
        }
      });

      localStorage.setItem("fav", JSON.stringify(arr));
    }

  });



  let p = e.target.parentElement.parentElement.children[1].firstElementChild;
  let arr;
  if (localStorage.getItem("fav") == null) {
    arr = []
  } else {
    arr = JSON.parse(localStorage.getItem("fav"));
  }

})();
