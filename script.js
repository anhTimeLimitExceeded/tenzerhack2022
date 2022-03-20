places = ["Admission", "Asbury", "Campus Farm", "CDI", "East College", "GCPA", "Harrison",
"Hoover", "Julian", "Lilly", "Lucy", "Mason", "Nature Park", "Olin", "Peeler", "Prindle",
"Roy Library", "UB"]

facts = {}
facts['Admission'] = ["There is a museum within the Admission Building, the Emison Galleries"]
facts['Asbury'] = ["As first bishop of American Methodism, Francis Asbury’s contributions to the denomination earned him the title, the father of American Methodism",]
facts['Campus Farm'] = ["90% of the farm’s yield is sold to DePauw’s dining services, Bon Appetit, to be turned into meals at Hoover Dining Hall",
"Campus farm house has all the kitchenware and a large table for you and your friend to hang out and cook together",
"People actually made a 360 tour of the farmhouse before its reconstruction in 2017"]
facts['CDI'] = ["The Justin and Darrianne Christian Center for Diversity and Inclusion (CDI), is named after Justin P. Christian, the CEO and Founder of BCforward",]
facts['East College'] = ["During the 1970s, the old East College was forgotten by DePauw, and was almost torn down when DePauw’s Board of Trustees voted to renew it externally and internally",
"On October 17, 1975, East College received the decision to enter the National Register of Historic Places",
"Meharry Hall, one of the biggest room in East College, has the pictures of previous DePauw Presidents",
"The large organ in Meharry Hall was donated by former President Bowman’s daughter, Sallie Bowman Caldwell, and her husband"]
facts['GCPA'] = ["Green was in the corporate boards of DreamWorks Animation SKG, Inc.",
"Green’s illustrious career goes on to include nearly 20 years with The Walt Disney Company with 10 of those as President of Walt Disney Theme Parks and Resorts",
"Green served as the Chief Financial Officer of The Walt Disney Company. Under his leadership, Disney revenues doubled to $6 billion and in 1999, Disney properties experienced record attendance"]
facts['Harrison'] = ["Harrison actually never graduated from the university due to his ailing father and financial difficulties, but was later awarded with an honorary M.A. degree and sat on the university’s board of trustees."]
facts['Hoover'] = ["Hoover was elected to the board of directors of Eli Lilly and Company effective June 1, 2009",
"Hoover Hall costs $32 million, and was designed by Robert A.M. Stern Architects"]
facts['Julian'] = ["Percy Lavon Julian was a friend of Kenneth C. Hogate, who both lived in Sigma Chi Fraternity",
"Denied a masters education from DePauw, Julian instead earned his M.A. from Harvard in 1923"]
facts['Lilly'] = ["In 1979, Ruth Lilly gave DePauw University more than $3 million – at the time the largest donation in the University’s history. Her donation made possible the Lilly Physical Education and Recreation Center.",
"The Lilly center is named after the Lilly Family, who owned Eli Lilly"]
facts['Lucy'] = ["Lucy Rowland & Edward Rector were husband and wife, they were also friends of Percy L. Julian",
"Lucy Rowland Hall was originally built as a women's dormitory around 1926, but is now co-ed.",
"After the fire and destruction of Rector Hall in 2002, Lucy Rowland is now the oldest dormitory at DePauw."]
facts['Mason'] = ["You can find Thrifty Tiger under Mason Hall’s basement"]
facts['Nature Park'] = ["520 Acres, flor and fauna, hiking trails, the DePauw Nature Park is open every day",
"Hidden just outside the limits of DePauw University's campus, the nature park is an escape from the flatlands and cornfields of Putnam County.",
"Tent camping is permitted on weekends for DePauw groups (students, employees, parents, alumni) by reservation"]
facts['Olin'] = ["The iguana in Olin is named Diaz",
"The botanical garden in Olin is accessible to student if you want to come in and see what biology students are doing with the plants"]
facts['Peeler'] = ["Richard E. Peeler was one of Indiana’s best-known ceramicists",
"The Peeler Art Center features three spacious galleries and hosts approximately 10 exhibitions annually",]
facts['Prindle'] = ["The Prindle Institute has proudly sponsored DePauw teams competing in collegiate ethics bowl competitions for several years.",
"Dedicated in 2007, the Prindle Institute for Ethics is nestled in the heart of DePauw’s Nature Park near the main DePauw campus.",
"The Bartlett Reflection Center, connected by a series of streams and waterfalls to the Prindle Institute, is a complementary space conducive to meditation and contemplation."]
facts['Roy Library'] = ["Roy O. West became a member of DePauw’s Board of Trustees in 1914 and in 1924, he took on the role of president of the board, maintaining his presidency until his retirement in 1950",]
facts['UB'] = ["There used to be a bowling alley under UB’s basement",
"The Memorial Student Union Building was completed at DePauw University in 1952 in memory of the DePauw students who died in World War II"]

transformations = []
freezeClick = false;
questionCount = 1;
maxQuestions = 5;
roundTime = 59;
score = 0;
window.onload = function() {
  try {
      var canvas = fx.canvas();
  } catch (e) {
      alert(e);
      return;
  }
};

document.addEventListener("click", e => {
  if (freezeClick) {
      e.stopPropagation();
      e.preventDefault();
  }
}, true);

$(document).ready(function(){
  $("#start-button").click(function (event) {
    transformations = []
    checkedValue = $('.option-checkbox:checked');
    if (checkedValue.length === 0) {
      $("#error").css("visibility", "visible")
      return
    }
    for (let i = 0; i < checkedValue.length; i++) {
      transformations.push(checkedValue[i].value)
    }
    $("#error").css("visibility", "hidden")
    $("#form").css("visibility", "hidden")
    startGame()
  });

  $("#select-all").click(function (event) {
    checkboxes = document.getElementsByClassName('option-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
    }
  });

  $("#deselect-all").click(function (event) {
    checkboxes = document.getElementsByClassName('option-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  });

  $(".answer").click(function (event) {
    $(this).css( "background-color", "red" );
    if ($(this).attr('id') === right_answer.attr('id')) score += timer;
    document.getElementById("score").innerText = "Score: " + ('0000'+score).slice(-4);
    facts_array = facts[right_answer_place]; 
    document.getElementById("did-you-know").innerText = facts_array[getRandomInt(facts_array.length)];
    $("#did-you-know").css("visibility", "visible");
    endQuestion()
  });

  $("#continue-button").click(function (event) {
    clearTimeout(openForm)
    $("#credit").css("visibility", "hidden")
    $("#form").css("visibility", "visible")
  });

  $("#how-to-play").click(function (event) {
    $("#instructions-overlay").css("visibility", "visible")
  });

  $("#back-button").click(function (event) {
    $("#instructions-overlay").css("visibility", "hidden")
  });

  example_imgs = document.getElementsByClassName('example-image');
  let example_imgs_count = example_imgs.length;
  for (let i = 0; i < example_imgs_count; i++) {
    let example_img = example_imgs[0];
    let type = example_img.id
    let canvas = fx.canvas();
    let texture = canvas.texture(example_img);
    example_img.parentNode.insertBefore(canvas, example_img);
    example_img.parentNode.removeChild(example_img);
    let time = 100;
    canvas.height=""
    canvas.draw(texture)
    randomX = canvas.width/2;
    randomY = canvas.height/2;
    setInterval(function () {
      switch (type) {
        case "brightness": brightness(canvas, texture, randomX, randomY, time/100); break;
        case "noise": noise(canvas, texture, randomX, randomY, time/100); break;
        case "triangular_blur": triangleBlur(canvas, texture, randomX, randomY, time/100); break;
        case "lens_blur": lensBlur(canvas, texture, randomX, randomY, time/100); break;
        case "swirl": swirl(canvas, texture, randomX, randomY, time/100); break;
        case "pixelate": pixelate(canvas, texture, randomX, randomY, time/100); break;
      }
      if (time-- < 0) time = 100;
    }, 100);
  }
});

function startGame() {
  score = 0;
  questionCount = 1;
  startQuestion()
}

function startQuestion() {
  if (questionCount === maxQuestions+1) {
    endGame()
    return
  }

  //refreshHTML
  freezeClick = false;
  document.getElementById("question-count").innerText = "Question " + questionCount++ + "/" + maxQuestions; 
  img_container = document.getElementById("img-container");
  img_container.innerHTML = '';
  $('.answer').css("background-color", "yellow")  
  $("#did-you-know").css("visibility", "hidden");

  //generateQuestion
  answers = getAnswers();
  right_answer_index = getRandomInt(answers.length);
  right_answer = $('#answer' + String(right_answer_index+1));
  right_answer_place = answers[right_answer_index];
  for (let i = 1; i <= answers.length; i++) {
    $('#answer' + i).text(answers[i-1]);
  }
  transformation = transformations[getRandomInt(transformations.length)]
  src = "./img/" + right_answer_place + "/" + getRandomInt(5) +".jpg"
  img = document.createElement('img');
  img.src = src;
  img.crossOrigin = "anonymous";
  img.id = "image";
  img.onload = function() {
    var css_transformation = (transformation === "rotate" || transformation === "zoom_in" || transformation === "zoom_out") 

    if (css_transformation) {
      img_container.appendChild(img)
      switch (transformation) {
        case "rotate": $('#image').css("animation", "rotate " + roundTime + "s ease"); break;
        case "zoom_in": $('#image').css("animation", "zoom_in " + roundTime + "s ease"); break;
        case "zoom_out": $('#image').css("animation", "zoom_out " + roundTime + "s ease"); break;
      }
    } else {
      canvas = fx.canvas();
      texture = canvas.texture(img);
      img_container.appendChild(canvas)
      canvas.draw(texture)
      randomX = Math.floor(canvas.width/4 + (Math.random() * canvas.width/2));
      randomY = Math.floor(canvas.height/4 + (Math.random() * canvas.height/2));
      leftRight = Math.round(Math.random()) ? 1 : -1
    }
    
    countdown = roundTime * 10,
    display = document.querySelector('#time');
    timer = countdown,
    minutes = 0;
    seconds = 0;
      roundInterval = setInterval(function () {
        if (!css_transformation) {
          ratio = timer/countdown
          switch (transformation) {
            case "brightness": brightness(canvas, texture, randomX, randomY, ratio); break;
            case "noise": noise(canvas, texture, randomX, randomY, ratio); break;
            case "triangular_blur": triangleBlur(canvas, texture, randomX, randomY, ratio); break;
            case "lens_blur": lensBlur(canvas, texture, randomX, randomY, ratio); break;
            case "swirl": swirl(canvas, texture, randomX, randomY, leftRight*ratio); break;
            case "pixelate": pixelate(canvas, texture, randomX, randomY, ratio); break;
          }
        }
      
        minutes = parseInt((timer / 10) / 60, 10)
        seconds = parseInt((timer / 10)  % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
  
        if (--timer < 0) {
          endQuestion()
        }

      }, 100);
  };
}

function endGame() {
  freezeClick = false;
  scoreMessage = "You scored " + String(score);
  if (score <= 1000) scoreMessage += ". Better luck next time!"
  else scoreMessage += ". Good job!"
  document.getElementById("final_score").innerText = scoreMessage;
  $("#did-you-know").css("visibility", "hidden");
  $("#credit").css("visibility", "visible")
  openForm = setTimeout(function() {
    $("#credit").css("visibility", "hidden")
    $("#form").css("visibility", "visible")
  }, 60 * 1000);
}
 
function endQuestion() {
  freezeClick = true;
  clearInterval(roundInterval)
  img_container.innerHTML = '';
  img.style.animation = '';
  img_container.appendChild(img);
  right_answer.css( "background-color", "#00FF00" );
  setTimeout(startQuestion, 5000);
}

function getAnswers() {
  places.sort(() => 0.5 - Math.random());
  return places.slice(0, 4);
}

function getRandomInt(upper) {
  return Math.floor(Math.random()*upper)
}

function brightness(canvas, texture, randomX, randomY, ratio) {
  canvas.draw(texture).brightnessContrast(-(ratio*0.8), 0).update();
}

function noise(canvas, texture, randomX, randomY, ratio) {
  canvas.draw(texture).noise(ratio*1).update();
}

function zoomBlur(canvas, texture, randomX, randomY, ratio) {
  canvas.draw(texture).zoomBlur(randomX, randomY, ratio).update();
}

function triangleBlur(canvas, texture, randomX, randomY, ratio) {
  canvas.draw(texture).triangleBlur(ratio*50).update();
}

function pixelate(canvas, texture, randomX, randomY, ratio) {
  canvas.draw(texture).hexagonalPixelate(320, 239.5, (ratio+0.0001)*20).update();
}

function lensBlur(canvas, texture, randomX, randomY, ratio) {
  canvas.draw(texture).lensBlur(ratio*20, 1, 0).update();
}

function swirl(canvas, texture, randomX, randomY, ratio) {
  canvas.draw(texture).swirl(randomX, randomY, canvas.width, ratio*5).update();
}
