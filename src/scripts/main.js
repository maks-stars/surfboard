;(function() {
let openBurgerMenu = document.querySelector(".hamburger");
let burgerMenu = document.querySelector(".burger-menu");
let closeBurgerMenu = document.querySelector(".burger-menu__close");
let burgerMenuLink = document.querySelectorAll(".burger-menu__link");

openBurgerMenu.addEventListener("click", (e) => {
  e.preventDefault();
  burgerMenu.classList.add("burger-menu-active");
});

burgerMenuLink.forEach(item => {
  item.addEventListener("click", (e) => {
    burgerMenuLink.forEach(link => {
      link.classList.remove("burger-link-active");
    });

    item.classList.add("burger-link-active")
    if (item.classList.contains("burger-link-active")) {
      burgerMenu.classList.remove("burger-menu-active");
    }
  });
});

closeBurgerMenu.addEventListener("click", (e) => {
  e.preventDefault();
  burgerMenu.classList.remove("burger-menu-active");
});
})()



// $(".hamburger").on("click", function (event) {
//   $('.burger-menu').addClass("burger-menu-active");
// });

// $(".burger-menu__close").on("click", function (event) {
//   $('.burger-menu').removeClass("burger-menu-active");
// });

// $(".burger-item").on("click", function (event) {
//   $('.burger-menu').removeClass("burger-menu-active");
// });;//jquery
const mesureWidth = item => {
  let reqItemWidth = 0;

  const screenWidth = $(window).width();
  const container = item.closest(".menu-acco__list");
  const titlesBlocks = container.find(".menu-acco__button");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".menu-acco__desc");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 786px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }
};

const closeEveryItemInContainer = container => {
  const items = container.find(".menu-acco__item");
  const content = container.find(".menu-acco__content");

  items.removeClass("active");
  content.width(0);
}

const openItem = (item) => {
  const hiddenContent = item.find(".menu-acco__content");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".menu-acco__desc");

  item.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
}

$(".menu-acco__button").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".menu-acco__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".menu-acco__list");

  if (itemOpened) {
    closeEveryItemInContainer(container)
  } else {
    closeEveryItemInContainer(container)
    openItem(item);
  }
});


//js 
// const menu = document.querySelector("#horizontalMenu");
// const items = document.querySelectorAll(".menu-acco__item");

// const getItemWidth = (item) => {
//   let resultWidth = 524;
//   const windowWidth = window.innerWidth;
//   const itemWidth = item.offsetWidth;

//   const isTablet = window.matchMedia("(max-width: 768px)").matches;
//   const isMobile = window.matchMedia("(max-width: 480px)").matches;

//   if (isTablet) {
//     resultWidth = windowWidth - itemWidth * items.length;
//   }

//   if (isMobile) {
//     resultWidth = windowWidth - itemWidth;
//   }

//   return resultWidth;
// };

// const setItemWidth = (item, width) => {
//   const itemContent = item.nextElementSibling;
//   const itemText = itemContent.firstElementChild;
//   itemContent.style.width = `${width}px`;
//   itemText.style.width = `${width}px`;
// };

// const closeItem = (item) => {
//   const itemParent = item.parentElement;
//   itemParent.classList.remove("menu-acco__item--active");
//   item.classList.remove("menu-acco__button--active");
//   setItemWidth(item, 0);
// };

// const openItem = (item) => {
//   const itemParent = item.parentElement;
//   itemParent.classList.add("menu-acco__item--active");
//   item.classList.add("menu-acco__button--active");
//   const width = getItemWidth(item);
//   setItemWidth(item, width);
// };

// menu.addEventListener("click", (e) => {
//   e.preventDefault();
//   const target = e.target;
//   const isActive = target.classList.contains("menu-acco__button--active");
//   const activeElement = document.querySelector(".menu-acco__button--active");

//   if (target.classList.contains("menu-acco__button") && isActive) {
//     if (activeElement) {
//       closeItem(activeElement);
//     }
//   }
//   if (target.classList.contains("menu-acco__button") && !isActive) {
//     if (activeElement) {
//       closeItem(activeElement);
//     }
//     openItem(target);
//   }
// });

// window.addEventListener("resize", () => {
//   const activeButton = document.querySelector(".menu-acco__button--active");
//   if (activeButton) {
//     closeItem(activeButton);
//   }
// });

;let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
  center: [55.752004, 37.576133],
   zoom: 16,
   controls: [],
 });
 
 let coords = [
     [55.752004, 37.576133],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './img/icons/geo.svg',
     iconImageSize: [58, 73],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);;const validateFields = (form, fieldsArray) => {
 
  fieldsArray.forEach((field) => {
    field.removeClass("input-error");
    if (field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length === 0;  
}

$(".form").submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");

  modal.removeClass("error-modal");

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
    });

    request.done(data => {
      content.text(data.message)
      modal.addClass("success-modal");
    });

    request.fail(data => {
      const message = data.responseJSON.message;
      content.text(message);
      modal.addClass("error-modal");
    });

    request.always(() => {
      $.fancybox.open({
        src: "#modal",
        type: "inline",
        smallBtn: false
      });
    });
  }
});

$(".app-submit-btn").click(e => {
  e.preventDefault();

  $.fancybox.close();
});;(function() {
const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();


let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error("передано неверное значение в countSectionPosition");
    return 0;
  }

  return position;
}

const changeMenuThemeForSection = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const sideMenuLink = $(".fixed-menu__link");
  const activeClass = ("fixed-menu--shadowed");


  if (menuTheme === "black") {
    sideMenu.addClass(activeClass),
      sideMenuLink.addClass("fixed-menu__link--shadowed");
  } else {
    sideMenu.removeClass("fixed-menu--shadowed"),
      sideMenuLink.removeClass("fixed-menu__link--shadowed");
  }
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {
  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 0;

  inScroll = true;

  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform: `translateY(${position}%)`,
  });

  resetActiveClassForItem(sections, sectionEq, "active");

  setTimeout(() => {
    inScroll = false;

    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
  }, transitionOver + mouseInertiaOver);

};

const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },
  };
};

$(window).on("wheel", (e) => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on("keydown", (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

  switch (e.keyCode) {
    case 38:
      scroller.prev();
      break;

    case 40:
      scroller.next();
      break;
  }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

if (isMobile) {
//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

$("body").swipe({
  swipe: function (event, direction) {
    const scroller = viewportScroller();
    let scrollDirection = "";
    
    if (direction === "up") scrollDirection = "next";
    if (direction === "down") scrollDirection = "prev";

    if (scrollDirection) {
      scroller[scrollDirection]();
    }
  },
});
}
})();;(function() {
const findBlockByAlias = (alias) => {
  return $(".review__item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") === alias;
  });
};

$(".interactive-avatar__link").click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest(".review__switcher-item",".interactive-avatar");

  itemToShow.addClass("review__item--active").siblings().removeClass("review__item--active");
  curItem.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");
});
})();;(function() {
const slider = $('.products__list').bxSlider({
  pager: false,
  controls: false,
});

$(".products__arrow--prev").click((e) => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$(".products__arrow--next").click((e) => {
  e.preventDefault();
  slider.goToNextSlide();
});
})();;(function() {
const openItem = item => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block"); 
  const reqHeight = textBlock.height();
  const svgIcon = container.find(".team__icon-img");
  const colorText = container.find(".team__name");

  container.addClass("active");
  svgIcon.addClass("team__icon-img--active");
  colorText.addClass("team__name--color");
  contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
  const items = container.find(".team__content");
  const itemContainer = container.find(".team__item");
  const itemSvgIcon = container.find(".team__icon-img");
  const itemColorText = container.find(".team__name");

  itemContainer.removeClass("active");
  itemSvgIcon.removeClass("team__icon-img--active");
  itemColorText.removeClass("team__name--color");
  items.height(0);
}

$(".team__button").click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest(".team__list");
  const elemContainer = $this.closest(".team__item");

  if (elemContainer.hasClass("active")) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }
});
})();;(function() {
const playBtn = document.querySelector('.video__player-img');
const video = document.getElementById('player');
const playerPlayBrn = document.querySelector('.duration__img');
const durationControl = document.getElementById('durationLevel');
const soundControl = document.getElementById('micLevel');
const soundBtn = document.getElementById('soundBtn');
const dynamicBtn = document.getElementById('dynamic');

let intervalId; 
let soundLevel;

// video.addEventListener("loadeddata", function () {
  window.addEventListener('load', function() {

video.addEventListener('click', playStop); 
let playButtons = document.querySelectorAll('.play');

for (let i = 0; i < playButtons.length; i++) {
  playButtons[i].addEventListener('click', playStop);
}

durationControl.min = 0;
durationControl.value = 0;
durationControl.max = video.duration;
durationControl.addEventListener('input', setVideoDuration);

soundControl.min = 0;
soundControl.max = 10;
soundControl.value = soundControl.max;
soundControl.addEventListener('input', changeSoundVolume);

dynamicBtn.addEventListener('click', soundOf);
});

video.addEventListener('ended', () => {
  playBtn.classList.toggle('video__player-img--active');
  playerPlayBrn.classList.remove('duration__img-pause');
  video.currentTime = 0;
})

function playStop() {
  playBtn.classList.toggle('video__player-img--active');
  playerPlayBrn.classList.toggle('duration__img-pause');
  if (video.paused) {
    video.play();
    intervalId = setInterval(updateDuration, 1000 / 60);
  } else {
    clearInterval(intervalId);
    video.pause();
  }
}

function setVideoDuration() {
  video.currentTime = durationControl.value;
  updateDuration();
}

function updateDuration() {
  durationControl.value = video.currentTime;
  let step = video.duration / 100;
  let percent = video.currentTime / step;
  durationControl.style.background = `linear-gradient(90deg, #FEDB3F 0%, #FEDB3F ${percent}%, #626262 ${percent}%)`;
}

function changeSoundVolume() {
  video.volume = soundControl.value / 10;
  if (video.volume === 0) {
    soundBtn.classList.add('active');
  } else {
    soundBtn.classList.remove('active');
  }
}

function soundOf() {
  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 10;
    soundBtn.classList.remove('active');
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
    soundBtn.classList.add('active');
  }
}
})()
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1cmdlci1tZW51LmpzIiwiaG9yaXpvbnRhbC1hY2NvLmpzIiwibWFwLmpzIiwibW9kYWwuanMiLCJvcHMuanMiLCJyZXZpZXdzLmpzIiwic2xpZGVyLmpzIiwidGVhbS5qcyIsInZpZGVvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9DMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQ3RKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLm1pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIjsoZnVuY3Rpb24oKSB7XHJcbmxldCBvcGVuQnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGFtYnVyZ2VyXCIpO1xyXG5sZXQgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVyZ2VyLW1lbnVcIik7XHJcbmxldCBjbG9zZUJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1cmdlci1tZW51X19jbG9zZVwiKTtcclxubGV0IGJ1cmdlck1lbnVMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXJnZXItbWVudV9fbGlua1wiKTtcclxuXHJcbm9wZW5CdXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBidXJnZXJNZW51LmNsYXNzTGlzdC5hZGQoXCJidXJnZXItbWVudS1hY3RpdmVcIik7XHJcbn0pO1xyXG5cclxuYnVyZ2VyTWVudUxpbmsuZm9yRWFjaChpdGVtID0+IHtcclxuICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgYnVyZ2VyTWVudUxpbmsuZm9yRWFjaChsaW5rID0+IHtcclxuICAgICAgbGluay5jbGFzc0xpc3QucmVtb3ZlKFwiYnVyZ2VyLWxpbmstYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiYnVyZ2VyLWxpbmstYWN0aXZlXCIpXHJcbiAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJidXJnZXItbGluay1hY3RpdmVcIikpIHtcclxuICAgICAgYnVyZ2VyTWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYnVyZ2VyLW1lbnUtYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuXHJcbmNsb3NlQnVyZ2VyTWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgYnVyZ2VyTWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYnVyZ2VyLW1lbnUtYWN0aXZlXCIpO1xyXG59KTtcclxufSkoKVxyXG5cclxuXHJcblxyXG4vLyAkKFwiLmhhbWJ1cmdlclwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4vLyAgICQoJy5idXJnZXItbWVudScpLmFkZENsYXNzKFwiYnVyZ2VyLW1lbnUtYWN0aXZlXCIpO1xyXG4vLyB9KTtcclxuXHJcbi8vICQoXCIuYnVyZ2VyLW1lbnVfX2Nsb3NlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbi8vICAgJCgnLmJ1cmdlci1tZW51JykucmVtb3ZlQ2xhc3MoXCJidXJnZXItbWVudS1hY3RpdmVcIik7XHJcbi8vIH0pO1xyXG5cclxuLy8gJChcIi5idXJnZXItaXRlbVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4vLyAgICQoJy5idXJnZXItbWVudScpLnJlbW92ZUNsYXNzKFwiYnVyZ2VyLW1lbnUtYWN0aXZlXCIpO1xyXG4vLyB9KTsiLCIvL2pxdWVyeVxyXG5jb25zdCBtZXN1cmVXaWR0aCA9IGl0ZW0gPT4ge1xyXG4gIGxldCByZXFJdGVtV2lkdGggPSAwO1xyXG5cclxuICBjb25zdCBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGl0ZW0uY2xvc2VzdChcIi5tZW51LWFjY29fX2xpc3RcIik7XHJcbiAgY29uc3QgdGl0bGVzQmxvY2tzID0gY29udGFpbmVyLmZpbmQoXCIubWVudS1hY2NvX19idXR0b25cIik7XHJcbiAgY29uc3QgdGl0bGVzV2lkdGggPSB0aXRsZXNCbG9ja3Mud2lkdGgoKSAqIHRpdGxlc0Jsb2Nrcy5sZW5ndGg7XHJcblxyXG4gIGNvbnN0IHRleHRDb250YWluZXIgPSBpdGVtLmZpbmQoXCIubWVudS1hY2NvX19kZXNjXCIpO1xyXG4gIGNvbnN0IHBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQodGV4dENvbnRhaW5lci5jc3MoXCJwYWRkaW5nLWxlZnRcIikpO1xyXG4gIGNvbnN0IHBhZGRpbmdSaWdodCA9IHBhcnNlSW50KHRleHRDb250YWluZXIuY3NzKFwicGFkZGluZy1yaWdodFwiKSk7XHJcblxyXG4gIGNvbnN0IGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA3ODZweClcIikubWF0Y2hlcztcclxuXHJcbiAgaWYgKGlzTW9iaWxlKSB7XHJcbiAgICByZXFJdGVtV2lkdGggPSBzY3JlZW5XaWR0aCAtIHRpdGxlc1dpZHRoO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXFJdGVtV2lkdGggPSA1MDA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY29udGFpbmVyOiByZXFJdGVtV2lkdGgsXHJcbiAgICB0ZXh0Q29udGFpbmVyOiByZXFJdGVtV2lkdGggLSBwYWRkaW5nUmlnaHQgLSBwYWRkaW5nTGVmdFxyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGNsb3NlRXZlcnlJdGVtSW5Db250YWluZXIgPSBjb250YWluZXIgPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gY29udGFpbmVyLmZpbmQoXCIubWVudS1hY2NvX19pdGVtXCIpO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBjb250YWluZXIuZmluZChcIi5tZW51LWFjY29fX2NvbnRlbnRcIik7XHJcblxyXG4gIGl0ZW1zLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIGNvbnRlbnQud2lkdGgoMCk7XHJcbn1cclxuXHJcbmNvbnN0IG9wZW5JdGVtID0gKGl0ZW0pID0+IHtcclxuICBjb25zdCBoaWRkZW5Db250ZW50ID0gaXRlbS5maW5kKFwiLm1lbnUtYWNjb19fY29udGVudFwiKTtcclxuICBjb25zdCByZXFXaWR0aCA9IG1lc3VyZVdpZHRoKGl0ZW0pO1xyXG4gIGNvbnN0IHRleHRCbG9jayA9IGl0ZW0uZmluZChcIi5tZW51LWFjY29fX2Rlc2NcIik7XHJcblxyXG4gIGl0ZW0uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgaGlkZGVuQ29udGVudC53aWR0aChyZXFXaWR0aC5jb250YWluZXIpO1xyXG4gIHRleHRCbG9jay53aWR0aChyZXFXaWR0aC50ZXh0Q29udGFpbmVyKTtcclxufVxyXG5cclxuJChcIi5tZW51LWFjY29fX2J1dHRvblwiKS5vbihcImNsaWNrXCIsIGUgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgY29uc3QgaXRlbSA9ICR0aGlzLmNsb3Nlc3QoXCIubWVudS1hY2NvX19pdGVtXCIpO1xyXG4gIGNvbnN0IGl0ZW1PcGVuZWQgPSBpdGVtLmhhc0NsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9ICR0aGlzLmNsb3Nlc3QoXCIubWVudS1hY2NvX19saXN0XCIpO1xyXG5cclxuICBpZiAoaXRlbU9wZW5lZCkge1xyXG4gICAgY2xvc2VFdmVyeUl0ZW1JbkNvbnRhaW5lcihjb250YWluZXIpXHJcbiAgfSBlbHNlIHtcclxuICAgIGNsb3NlRXZlcnlJdGVtSW5Db250YWluZXIoY29udGFpbmVyKVxyXG4gICAgb3Blbkl0ZW0oaXRlbSk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG4vL2pzIFxyXG4vLyBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3Jpem9udGFsTWVudVwiKTtcclxuLy8gY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1lbnUtYWNjb19faXRlbVwiKTtcclxuXHJcbi8vIGNvbnN0IGdldEl0ZW1XaWR0aCA9IChpdGVtKSA9PiB7XHJcbi8vICAgbGV0IHJlc3VsdFdpZHRoID0gNTI0O1xyXG4vLyAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbi8vICAgY29uc3QgaXRlbVdpZHRoID0gaXRlbS5vZmZzZXRXaWR0aDtcclxuXHJcbi8vICAgY29uc3QgaXNUYWJsZXQgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDc2OHB4KVwiKS5tYXRjaGVzO1xyXG4vLyAgIGNvbnN0IGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA0ODBweClcIikubWF0Y2hlcztcclxuXHJcbi8vICAgaWYgKGlzVGFibGV0KSB7XHJcbi8vICAgICByZXN1bHRXaWR0aCA9IHdpbmRvd1dpZHRoIC0gaXRlbVdpZHRoICogaXRlbXMubGVuZ3RoO1xyXG4vLyAgIH1cclxuXHJcbi8vICAgaWYgKGlzTW9iaWxlKSB7XHJcbi8vICAgICByZXN1bHRXaWR0aCA9IHdpbmRvd1dpZHRoIC0gaXRlbVdpZHRoO1xyXG4vLyAgIH1cclxuXHJcbi8vICAgcmV0dXJuIHJlc3VsdFdpZHRoO1xyXG4vLyB9O1xyXG5cclxuLy8gY29uc3Qgc2V0SXRlbVdpZHRoID0gKGl0ZW0sIHdpZHRoKSA9PiB7XHJcbi8vICAgY29uc3QgaXRlbUNvbnRlbnQgPSBpdGVtLm5leHRFbGVtZW50U2libGluZztcclxuLy8gICBjb25zdCBpdGVtVGV4dCA9IGl0ZW1Db250ZW50LmZpcnN0RWxlbWVudENoaWxkO1xyXG4vLyAgIGl0ZW1Db250ZW50LnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xyXG4vLyAgIGl0ZW1UZXh0LnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xyXG4vLyB9O1xyXG5cclxuLy8gY29uc3QgY2xvc2VJdGVtID0gKGl0ZW0pID0+IHtcclxuLy8gICBjb25zdCBpdGVtUGFyZW50ID0gaXRlbS5wYXJlbnRFbGVtZW50O1xyXG4vLyAgIGl0ZW1QYXJlbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1lbnUtYWNjb19faXRlbS0tYWN0aXZlXCIpO1xyXG4vLyAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIm1lbnUtYWNjb19fYnV0dG9uLS1hY3RpdmVcIik7XHJcbi8vICAgc2V0SXRlbVdpZHRoKGl0ZW0sIDApO1xyXG4vLyB9O1xyXG5cclxuLy8gY29uc3Qgb3Blbkl0ZW0gPSAoaXRlbSkgPT4ge1xyXG4vLyAgIGNvbnN0IGl0ZW1QYXJlbnQgPSBpdGVtLnBhcmVudEVsZW1lbnQ7XHJcbi8vICAgaXRlbVBhcmVudC5jbGFzc0xpc3QuYWRkKFwibWVudS1hY2NvX19pdGVtLS1hY3RpdmVcIik7XHJcbi8vICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwibWVudS1hY2NvX19idXR0b24tLWFjdGl2ZVwiKTtcclxuLy8gICBjb25zdCB3aWR0aCA9IGdldEl0ZW1XaWR0aChpdGVtKTtcclxuLy8gICBzZXRJdGVtV2lkdGgoaXRlbSwgd2lkdGgpO1xyXG4vLyB9O1xyXG5cclxuLy8gbWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbi8vICAgY29uc3QgaXNBY3RpdmUgPSB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWVudS1hY2NvX19idXR0b24tLWFjdGl2ZVwiKTtcclxuLy8gICBjb25zdCBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LWFjY29fX2J1dHRvbi0tYWN0aXZlXCIpO1xyXG5cclxuLy8gICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1lbnUtYWNjb19fYnV0dG9uXCIpICYmIGlzQWN0aXZlKSB7XHJcbi8vICAgICBpZiAoYWN0aXZlRWxlbWVudCkge1xyXG4vLyAgICAgICBjbG9zZUl0ZW0oYWN0aXZlRWxlbWVudCk7XHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vLyAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWVudS1hY2NvX19idXR0b25cIikgJiYgIWlzQWN0aXZlKSB7XHJcbi8vICAgICBpZiAoYWN0aXZlRWxlbWVudCkge1xyXG4vLyAgICAgICBjbG9zZUl0ZW0oYWN0aXZlRWxlbWVudCk7XHJcbi8vICAgICB9XHJcbi8vICAgICBvcGVuSXRlbSh0YXJnZXQpO1xyXG4vLyAgIH1cclxuLy8gfSk7XHJcblxyXG4vLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcbi8vICAgY29uc3QgYWN0aXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LWFjY29fX2J1dHRvbi0tYWN0aXZlXCIpO1xyXG4vLyAgIGlmIChhY3RpdmVCdXR0b24pIHtcclxuLy8gICAgIGNsb3NlSXRlbShhY3RpdmVCdXR0b24pO1xyXG4vLyAgIH1cclxuLy8gfSk7XHJcblxyXG4iLCJsZXQgbXlNYXA7XHJcbmNvbnN0IGluaXQgPSAoKSA9PiB7XHJcbiBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJtYXBcIiwge1xyXG4gIGNlbnRlcjogWzU1Ljc1MjAwNCwgMzcuNTc2MTMzXSxcclxuICAgem9vbTogMTYsXHJcbiAgIGNvbnRyb2xzOiBbXSxcclxuIH0pO1xyXG4gXHJcbiBsZXQgY29vcmRzID0gW1xyXG4gICAgIFs1NS43NTIwMDQsIDM3LjU3NjEzM10sXHJcbiAgIF0sXHJcbiAgIG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKHt9LCB7XHJcbiAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcbiAgICAgaWNvbkltYWdlSHJlZjogJy4vaW1nL2ljb25zL2dlby5zdmcnLFxyXG4gICAgIGljb25JbWFnZVNpemU6IFs1OCwgNzNdLFxyXG4gICAgIGljb25JbWFnZU9mZnNldDogWy0zNSwgLTUyXVxyXG4gICB9KTtcclxuIFxyXG4gZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgbXlDb2xsZWN0aW9uLmFkZChuZXcgeW1hcHMuUGxhY2VtYXJrKGNvb3Jkc1tpXSkpO1xyXG4gfVxyXG4gXHJcbiBteU1hcC5nZW9PYmplY3RzLmFkZChteUNvbGxlY3Rpb24pO1xyXG4gXHJcbiBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZSgnc2Nyb2xsWm9vbScpO1xyXG59O1xyXG4gXHJcbnltYXBzLnJlYWR5KGluaXQpOyIsImNvbnN0IHZhbGlkYXRlRmllbGRzID0gKGZvcm0sIGZpZWxkc0FycmF5KSA9PiB7XHJcbiBcclxuICBmaWVsZHNBcnJheS5mb3JFYWNoKChmaWVsZCkgPT4ge1xyXG4gICAgZmllbGQucmVtb3ZlQ2xhc3MoXCJpbnB1dC1lcnJvclwiKTtcclxuICAgIGlmIChmaWVsZC52YWwoKS50cmltKCkgPT09IFwiXCIpIHtcclxuICAgICAgZmllbGQuYWRkQ2xhc3MoXCJpbnB1dC1lcnJvclwiKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgY29uc3QgZXJyb3JGaWVsZHMgPSBmb3JtLmZpbmQoXCIuaW5wdXQtZXJyb3JcIik7XHJcblxyXG4gIHJldHVybiBlcnJvckZpZWxkcy5sZW5ndGggPT09IDA7ICBcclxufVxyXG5cclxuJChcIi5mb3JtXCIpLnN1Ym1pdChlID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIGNvbnN0IGZvcm0gPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgY29uc3QgbmFtZSA9IGZvcm0uZmluZChcIltuYW1lPSduYW1lJ11cIik7XHJcbiAgY29uc3QgcGhvbmUgPSBmb3JtLmZpbmQoXCJbbmFtZT0ncGhvbmUnXVwiKTtcclxuICBjb25zdCBjb21tZW50ID0gZm9ybS5maW5kKFwiW25hbWU9J2NvbW1lbnQnXVwiKTtcclxuICBjb25zdCB0byA9IGZvcm0uZmluZChcIltuYW1lPSd0byddXCIpO1xyXG5cclxuICBjb25zdCBtb2RhbCA9ICQoXCIjbW9kYWxcIik7XHJcbiAgY29uc3QgY29udGVudCA9IG1vZGFsLmZpbmQoXCIubW9kYWxfX2NvbnRlbnRcIik7XHJcblxyXG4gIG1vZGFsLnJlbW92ZUNsYXNzKFwiZXJyb3ItbW9kYWxcIik7XHJcblxyXG4gIGNvbnN0IGlzVmFsaWQgPSB2YWxpZGF0ZUZpZWxkcyhmb3JtLCBbbmFtZSwgcGhvbmUsIGNvbW1lbnQsIHRvXSk7XHJcblxyXG4gIGlmIChpc1ZhbGlkKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcclxuICAgICAgdXJsOiBcImh0dHBzOi8vd2ViZGV2LWFwaS5sb2Z0c2Nob29sLmNvbS9zZW5kbWFpbFwiLFxyXG4gICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbmFtZTogbmFtZS52YWwoKSxcclxuICAgICAgICBwaG9uZTogcGhvbmUudmFsKCksXHJcbiAgICAgICAgY29tbWVudDogY29tbWVudC52YWwoKSxcclxuICAgICAgICB0bzogdG8udmFsKCksXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXF1ZXN0LmRvbmUoZGF0YSA9PiB7XHJcbiAgICAgIGNvbnRlbnQudGV4dChkYXRhLm1lc3NhZ2UpXHJcbiAgICAgIG1vZGFsLmFkZENsYXNzKFwic3VjY2Vzcy1tb2RhbFwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJlcXVlc3QuZmFpbChkYXRhID0+IHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGRhdGEucmVzcG9uc2VKU09OLm1lc3NhZ2U7XHJcbiAgICAgIGNvbnRlbnQudGV4dChtZXNzYWdlKTtcclxuICAgICAgbW9kYWwuYWRkQ2xhc3MoXCJlcnJvci1tb2RhbFwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJlcXVlc3QuYWx3YXlzKCgpID0+IHtcclxuICAgICAgJC5mYW5jeWJveC5vcGVuKHtcclxuICAgICAgICBzcmM6IFwiI21vZGFsXCIsXHJcbiAgICAgICAgdHlwZTogXCJpbmxpbmVcIixcclxuICAgICAgICBzbWFsbEJ0bjogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuJChcIi5hcHAtc3VibWl0LWJ0blwiKS5jbGljayhlID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICQuZmFuY3lib3guY2xvc2UoKTtcclxufSkiLCI7KGZ1bmN0aW9uKCkge1xyXG5jb25zdCBzZWN0aW9ucyA9ICQoXCJzZWN0aW9uXCIpO1xyXG5jb25zdCBkaXNwbGF5ID0gJChcIi5tYWluY29udGVudFwiKTtcclxuY29uc3Qgc2lkZU1lbnUgPSAkKFwiLmZpeGVkLW1lbnVcIik7XHJcbmNvbnN0IG1lbnVJdGVtcyA9IHNpZGVNZW51LmZpbmQoXCIuZml4ZWQtbWVudV9faXRlbVwiKTtcclxuXHJcbmNvbnN0IG1vYmlsZURldGVjdCA9IG5ldyBNb2JpbGVEZXRlY3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG5jb25zdCBpc01vYmlsZSA9IG1vYmlsZURldGVjdC5tb2JpbGUoKTtcclxuXHJcblxyXG5sZXQgaW5TY3JvbGwgPSBmYWxzZTtcclxuXHJcbnNlY3Rpb25zLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG5jb25zdCBjb3VudFNlY3Rpb25Qb3NpdGlvbiA9IHNlY3Rpb25FcSA9PiB7XHJcbiAgY29uc3QgcG9zaXRpb24gPSBzZWN0aW9uRXEgKiAtMTAwO1xyXG5cclxuICBpZiAoaXNOYU4ocG9zaXRpb24pKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwi0L/QtdGA0LXQtNCw0L3QviDQvdC10LLQtdGA0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LIgY291bnRTZWN0aW9uUG9zaXRpb25cIik7XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIHJldHVybiBwb3NpdGlvbjtcclxufVxyXG5cclxuY29uc3QgY2hhbmdlTWVudVRoZW1lRm9yU2VjdGlvbiA9IHNlY3Rpb25FcSA9PiB7XHJcbiAgY29uc3QgY3VycmVudFNlY3Rpb24gPSBzZWN0aW9ucy5lcShzZWN0aW9uRXEpO1xyXG4gIGNvbnN0IG1lbnVUaGVtZSA9IGN1cnJlbnRTZWN0aW9uLmF0dHIoXCJkYXRhLXNpZGVtZW51LXRoZW1lXCIpO1xyXG4gIGNvbnN0IHNpZGVNZW51TGluayA9ICQoXCIuZml4ZWQtbWVudV9fbGlua1wiKTtcclxuICBjb25zdCBhY3RpdmVDbGFzcyA9IChcImZpeGVkLW1lbnUtLXNoYWRvd2VkXCIpO1xyXG5cclxuXHJcbiAgaWYgKG1lbnVUaGVtZSA9PT0gXCJibGFja1wiKSB7XHJcbiAgICBzaWRlTWVudS5hZGRDbGFzcyhhY3RpdmVDbGFzcyksXHJcbiAgICAgIHNpZGVNZW51TGluay5hZGRDbGFzcyhcImZpeGVkLW1lbnVfX2xpbmstLXNoYWRvd2VkXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzaWRlTWVudS5yZW1vdmVDbGFzcyhcImZpeGVkLW1lbnUtLXNoYWRvd2VkXCIpLFxyXG4gICAgICBzaWRlTWVudUxpbmsucmVtb3ZlQ2xhc3MoXCJmaXhlZC1tZW51X19saW5rLS1zaGFkb3dlZFwiKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHJlc2V0QWN0aXZlQ2xhc3NGb3JJdGVtID0gKGl0ZW1zLCBpdGVtRXEsIGFjdGl2ZUNsYXNzKSA9PiB7XHJcbiAgaXRlbXMuZXEoaXRlbUVxKS5hZGRDbGFzcyhhY3RpdmVDbGFzcykuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbn1cclxuXHJcbmNvbnN0IHBlcmZvcm1UcmFuc2l0aW9uID0gKHNlY3Rpb25FcSkgPT4ge1xyXG4gIGlmIChpblNjcm9sbCkgcmV0dXJuO1xyXG5cclxuICBjb25zdCB0cmFuc2l0aW9uT3ZlciA9IDEwMDA7XHJcbiAgY29uc3QgbW91c2VJbmVydGlhT3ZlciA9IDA7XHJcblxyXG4gIGluU2Nyb2xsID0gdHJ1ZTtcclxuXHJcbiAgY29uc3QgcG9zaXRpb24gPSBjb3VudFNlY3Rpb25Qb3NpdGlvbihzZWN0aW9uRXEpO1xyXG5cclxuICBjaGFuZ2VNZW51VGhlbWVGb3JTZWN0aW9uKHNlY3Rpb25FcSk7XHJcblxyXG4gIGRpc3BsYXkuY3NzKHtcclxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHtwb3NpdGlvbn0lKWAsXHJcbiAgfSk7XHJcblxyXG4gIHJlc2V0QWN0aXZlQ2xhc3NGb3JJdGVtKHNlY3Rpb25zLCBzZWN0aW9uRXEsIFwiYWN0aXZlXCIpO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGluU2Nyb2xsID0gZmFsc2U7XHJcblxyXG4gICAgcmVzZXRBY3RpdmVDbGFzc0Zvckl0ZW0obWVudUl0ZW1zLCBzZWN0aW9uRXEsIFwiZml4ZWQtbWVudV9faXRlbS0tYWN0aXZlXCIpO1xyXG4gIH0sIHRyYW5zaXRpb25PdmVyICsgbW91c2VJbmVydGlhT3Zlcik7XHJcblxyXG59O1xyXG5cclxuY29uc3Qgdmlld3BvcnRTY3JvbGxlciA9ICgpID0+IHtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gc2VjdGlvbnMuZmlsdGVyKFwiLmFjdGl2ZVwiKTtcclxuICBjb25zdCBuZXh0U2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb24ubmV4dCgpO1xyXG4gIGNvbnN0IHByZXZTZWN0aW9uID0gYWN0aXZlU2VjdGlvbi5wcmV2KCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuZXh0KCkge1xyXG4gICAgICBpZiAobmV4dFNlY3Rpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgcGVyZm9ybVRyYW5zaXRpb24obmV4dFNlY3Rpb24uaW5kZXgoKSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwcmV2KCkge1xyXG4gICAgICBpZiAocHJldlNlY3Rpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgcGVyZm9ybVRyYW5zaXRpb24ocHJldlNlY3Rpb24uaW5kZXgoKSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfTtcclxufTtcclxuXHJcbiQod2luZG93KS5vbihcIndoZWVsXCIsIChlKSA9PiB7XHJcbiAgY29uc3QgZGVsdGFZID0gZS5vcmlnaW5hbEV2ZW50LmRlbHRhWTtcclxuICBjb25zdCBzY3JvbGxlciA9IHZpZXdwb3J0U2Nyb2xsZXIoKTtcclxuXHJcbiAgaWYgKGRlbHRhWSA+IDApIHtcclxuICAgIHNjcm9sbGVyLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGlmIChkZWx0YVkgPCAwKSB7XHJcbiAgICBzY3JvbGxlci5wcmV2KCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbiQod2luZG93KS5vbihcImtleWRvd25cIiwgKGUpID0+IHtcclxuICBjb25zdCB0YWdOYW1lID0gZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IHVzZXJUeXBpbmdJbklucHV0cyA9IHRhZ05hbWUgPT09IFwiaW5wdXRcIiB8fCB0YWdOYW1lID09PSBcInRleHRhcmVhXCI7XHJcbiAgY29uc3Qgc2Nyb2xsZXIgPSB2aWV3cG9ydFNjcm9sbGVyKCk7XHJcblxyXG4gIGlmICh1c2VyVHlwaW5nSW5JbnB1dHMpIHJldHVybjtcclxuXHJcbiAgc3dpdGNoIChlLmtleUNvZGUpIHtcclxuICAgIGNhc2UgMzg6XHJcbiAgICAgIHNjcm9sbGVyLnByZXYoKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA0MDpcclxuICAgICAgc2Nyb2xsZXIubmV4dCgpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbn0pO1xyXG5cclxuJChcIi53cmFwcGVyXCIpLm9uKFwidG91Y2htb3ZlXCIsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcclxuXHJcbiQoXCJbZGF0YS1zY3JvbGwtdG9dXCIpLmNsaWNrKChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBjb25zdCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICBjb25zdCB0YXJnZXQgPSAkdGhpcy5hdHRyKFwiZGF0YS1zY3JvbGwtdG9cIik7XHJcbiAgY29uc3QgcmVxU2VjdGlvbiA9ICQoYFtkYXRhLXNlY3Rpb24taWQ9JHt0YXJnZXR9XWApO1xyXG5cclxuICBwZXJmb3JtVHJhbnNpdGlvbihyZXFTZWN0aW9uLmluZGV4KCkpO1xyXG59KTtcclxuXHJcbmlmIChpc01vYmlsZSkge1xyXG4vL2h0dHBzOi8vZ2l0aHViLmNvbS9tYXR0YnJ5c29uL1RvdWNoU3dpcGUtSnF1ZXJ5LVBsdWdpblxyXG5cclxuJChcImJvZHlcIikuc3dpcGUoe1xyXG4gIHN3aXBlOiBmdW5jdGlvbiAoZXZlbnQsIGRpcmVjdGlvbikge1xyXG4gICAgY29uc3Qgc2Nyb2xsZXIgPSB2aWV3cG9ydFNjcm9sbGVyKCk7XHJcbiAgICBsZXQgc2Nyb2xsRGlyZWN0aW9uID0gXCJcIjtcclxuICAgIFxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ1cFwiKSBzY3JvbGxEaXJlY3Rpb24gPSBcIm5leHRcIjtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiZG93blwiKSBzY3JvbGxEaXJlY3Rpb24gPSBcInByZXZcIjtcclxuXHJcbiAgICBpZiAoc2Nyb2xsRGlyZWN0aW9uKSB7XHJcbiAgICAgIHNjcm9sbGVyW3Njcm9sbERpcmVjdGlvbl0oKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxufVxyXG59KSgpIiwiOyhmdW5jdGlvbigpIHtcclxuY29uc3QgZmluZEJsb2NrQnlBbGlhcyA9IChhbGlhcykgPT4ge1xyXG4gIHJldHVybiAkKFwiLnJldmlld19faXRlbVwiKS5maWx0ZXIoKG5keCwgaXRlbSkgPT4ge1xyXG4gICAgcmV0dXJuICQoaXRlbSkuYXR0cihcImRhdGEtbGlua2VkLXdpdGhcIikgPT09IGFsaWFzO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuJChcIi5pbnRlcmFjdGl2ZS1hdmF0YXJfX2xpbmtcIikuY2xpY2soKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gIGNvbnN0IHRhcmdldCA9ICR0aGlzLmF0dHIoXCJkYXRhLW9wZW5cIik7XHJcbiAgY29uc3QgaXRlbVRvU2hvdyA9IGZpbmRCbG9ja0J5QWxpYXModGFyZ2V0KTtcclxuICBjb25zdCBjdXJJdGVtID0gJHRoaXMuY2xvc2VzdChcIi5yZXZpZXdfX3N3aXRjaGVyLWl0ZW1cIixcIi5pbnRlcmFjdGl2ZS1hdmF0YXJcIik7XHJcblxyXG4gIGl0ZW1Ub1Nob3cuYWRkQ2xhc3MoXCJyZXZpZXdfX2l0ZW0tLWFjdGl2ZVwiKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwicmV2aWV3X19pdGVtLS1hY3RpdmVcIik7XHJcbiAgY3VySXRlbS5hZGRDbGFzcyhcImludGVyYWN0aXZlLWF2YXRhci0tYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJpbnRlcmFjdGl2ZS1hdmF0YXItLWFjdGl2ZVwiKTtcclxufSk7XHJcbn0pKCkiLCI7KGZ1bmN0aW9uKCkge1xyXG5jb25zdCBzbGlkZXIgPSAkKCcucHJvZHVjdHNfX2xpc3QnKS5ieFNsaWRlcih7XHJcbiAgcGFnZXI6IGZhbHNlLFxyXG4gIGNvbnRyb2xzOiBmYWxzZSxcclxufSk7XHJcblxyXG4kKFwiLnByb2R1Y3RzX19hcnJvdy0tcHJldlwiKS5jbGljaygoZSkgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBzbGlkZXIuZ29Ub1ByZXZTbGlkZSgpO1xyXG59KTtcclxuXHJcbiQoXCIucHJvZHVjdHNfX2Fycm93LS1uZXh0XCIpLmNsaWNrKChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHNsaWRlci5nb1RvTmV4dFNsaWRlKCk7XHJcbn0pO1xyXG59KSgpIiwiOyhmdW5jdGlvbigpIHtcclxuY29uc3Qgb3Blbkl0ZW0gPSBpdGVtID0+IHtcclxuICBjb25zdCBjb250YWluZXIgPSBpdGVtLmNsb3Nlc3QoXCIudGVhbV9faXRlbVwiKTtcclxuICBjb25zdCBjb250ZW50QmxvY2sgPSBjb250YWluZXIuZmluZChcIi50ZWFtX19jb250ZW50XCIpO1xyXG4gIGNvbnN0IHRleHRCbG9jayA9IGNvbnRlbnRCbG9jay5maW5kKFwiLnRlYW1fX2NvbnRlbnQtYmxvY2tcIik7IFxyXG4gIGNvbnN0IHJlcUhlaWdodCA9IHRleHRCbG9jay5oZWlnaHQoKTtcclxuICBjb25zdCBzdmdJY29uID0gY29udGFpbmVyLmZpbmQoXCIudGVhbV9faWNvbi1pbWdcIik7XHJcbiAgY29uc3QgY29sb3JUZXh0ID0gY29udGFpbmVyLmZpbmQoXCIudGVhbV9fbmFtZVwiKTtcclxuXHJcbiAgY29udGFpbmVyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIHN2Z0ljb24uYWRkQ2xhc3MoXCJ0ZWFtX19pY29uLWltZy0tYWN0aXZlXCIpO1xyXG4gIGNvbG9yVGV4dC5hZGRDbGFzcyhcInRlYW1fX25hbWUtLWNvbG9yXCIpO1xyXG4gIGNvbnRlbnRCbG9jay5oZWlnaHQocmVxSGVpZ2h0KTtcclxufVxyXG5cclxuY29uc3QgY2xvc2VFdmVyeUl0ZW0gPSBjb250YWluZXIgPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gY29udGFpbmVyLmZpbmQoXCIudGVhbV9fY29udGVudFwiKTtcclxuICBjb25zdCBpdGVtQ29udGFpbmVyID0gY29udGFpbmVyLmZpbmQoXCIudGVhbV9faXRlbVwiKTtcclxuICBjb25zdCBpdGVtU3ZnSWNvbiA9IGNvbnRhaW5lci5maW5kKFwiLnRlYW1fX2ljb24taW1nXCIpO1xyXG4gIGNvbnN0IGl0ZW1Db2xvclRleHQgPSBjb250YWluZXIuZmluZChcIi50ZWFtX19uYW1lXCIpO1xyXG5cclxuICBpdGVtQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIGl0ZW1TdmdJY29uLnJlbW92ZUNsYXNzKFwidGVhbV9faWNvbi1pbWctLWFjdGl2ZVwiKTtcclxuICBpdGVtQ29sb3JUZXh0LnJlbW92ZUNsYXNzKFwidGVhbV9fbmFtZS0tY29sb3JcIik7XHJcbiAgaXRlbXMuaGVpZ2h0KDApO1xyXG59XHJcblxyXG4kKFwiLnRlYW1fX2J1dHRvblwiKS5jbGljayhlID0+IHtcclxuICBjb25zdCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICBjb25zdCBjb250YWluZXIgPSAkdGhpcy5jbG9zZXN0KFwiLnRlYW1fX2xpc3RcIik7XHJcbiAgY29uc3QgZWxlbUNvbnRhaW5lciA9ICR0aGlzLmNsb3Nlc3QoXCIudGVhbV9faXRlbVwiKTtcclxuXHJcbiAgaWYgKGVsZW1Db250YWluZXIuaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcclxuICAgIGNsb3NlRXZlcnlJdGVtKGNvbnRhaW5lcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNsb3NlRXZlcnlJdGVtKGNvbnRhaW5lcik7XHJcbiAgICBvcGVuSXRlbSgkdGhpcyk7XHJcbiAgfVxyXG59KTtcclxufSkoKSIsIjsoZnVuY3Rpb24oKSB7XHJcbmNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW9fX3BsYXllci1pbWcnKTtcclxuY29uc3QgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyJyk7XHJcbmNvbnN0IHBsYXllclBsYXlCcm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHVyYXRpb25fX2ltZycpO1xyXG5jb25zdCBkdXJhdGlvbkNvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVyYXRpb25MZXZlbCcpO1xyXG5jb25zdCBzb3VuZENvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWljTGV2ZWwnKTtcclxuY29uc3Qgc291bmRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmRCdG4nKTtcclxuY29uc3QgZHluYW1pY0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkeW5hbWljJyk7XHJcblxyXG5sZXQgaW50ZXJ2YWxJZDsgXHJcbmxldCBzb3VuZExldmVsO1xyXG5cclxuLy8gdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZGRhdGFcIiwgZnVuY3Rpb24gKCkge1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblxyXG52aWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlTdG9wKTsgXHJcbmxldCBwbGF5QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5Jyk7XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IHBsYXlCdXR0b25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgcGxheUJ1dHRvbnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5U3RvcCk7XHJcbn1cclxuXHJcbmR1cmF0aW9uQ29udHJvbC5taW4gPSAwO1xyXG5kdXJhdGlvbkNvbnRyb2wudmFsdWUgPSAwO1xyXG5kdXJhdGlvbkNvbnRyb2wubWF4ID0gdmlkZW8uZHVyYXRpb247XHJcbmR1cmF0aW9uQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHNldFZpZGVvRHVyYXRpb24pO1xyXG5cclxuc291bmRDb250cm9sLm1pbiA9IDA7XHJcbnNvdW5kQ29udHJvbC5tYXggPSAxMDtcclxuc291bmRDb250cm9sLnZhbHVlID0gc291bmRDb250cm9sLm1heDtcclxuc291bmRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hhbmdlU291bmRWb2x1bWUpO1xyXG5cclxuZHluYW1pY0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNvdW5kT2YpO1xyXG59KTtcclxuXHJcbnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xyXG4gIHBsYXlCdG4uY2xhc3NMaXN0LnRvZ2dsZSgndmlkZW9fX3BsYXllci1pbWctLWFjdGl2ZScpO1xyXG4gIHBsYXllclBsYXlCcm4uY2xhc3NMaXN0LnJlbW92ZSgnZHVyYXRpb25fX2ltZy1wYXVzZScpO1xyXG4gIHZpZGVvLmN1cnJlbnRUaW1lID0gMDtcclxufSlcclxuXHJcbmZ1bmN0aW9uIHBsYXlTdG9wKCkge1xyXG4gIHBsYXlCdG4uY2xhc3NMaXN0LnRvZ2dsZSgndmlkZW9fX3BsYXllci1pbWctLWFjdGl2ZScpO1xyXG4gIHBsYXllclBsYXlCcm4uY2xhc3NMaXN0LnRvZ2dsZSgnZHVyYXRpb25fX2ltZy1wYXVzZScpO1xyXG4gIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgIHZpZGVvLnBsYXkoKTtcclxuICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh1cGRhdGVEdXJhdGlvbiwgMTAwMCAvIDYwKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcclxuICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRWaWRlb0R1cmF0aW9uKCkge1xyXG4gIHZpZGVvLmN1cnJlbnRUaW1lID0gZHVyYXRpb25Db250cm9sLnZhbHVlO1xyXG4gIHVwZGF0ZUR1cmF0aW9uKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUR1cmF0aW9uKCkge1xyXG4gIGR1cmF0aW9uQ29udHJvbC52YWx1ZSA9IHZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gIGxldCBzdGVwID0gdmlkZW8uZHVyYXRpb24gLyAxMDA7XHJcbiAgbGV0IHBlcmNlbnQgPSB2aWRlby5jdXJyZW50VGltZSAvIHN0ZXA7XHJcbiAgZHVyYXRpb25Db250cm9sLnN0eWxlLmJhY2tncm91bmQgPSBgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjRkVEQjNGIDAlLCAjRkVEQjNGICR7cGVyY2VudH0lLCAjNjI2MjYyICR7cGVyY2VudH0lKWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVNvdW5kVm9sdW1lKCkge1xyXG4gIHZpZGVvLnZvbHVtZSA9IHNvdW5kQ29udHJvbC52YWx1ZSAvIDEwO1xyXG4gIGlmICh2aWRlby52b2x1bWUgPT09IDApIHtcclxuICAgIHNvdW5kQnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzb3VuZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNvdW5kT2YoKSB7XHJcbiAgaWYgKHZpZGVvLnZvbHVtZSA9PT0gMCkge1xyXG4gICAgdmlkZW8udm9sdW1lID0gc291bmRMZXZlbDtcclxuICAgIHNvdW5kQ29udHJvbC52YWx1ZSA9IHNvdW5kTGV2ZWwgKiAxMDtcclxuICAgIHNvdW5kQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzb3VuZExldmVsID0gdmlkZW8udm9sdW1lO1xyXG4gICAgdmlkZW8udm9sdW1lID0gMDtcclxuICAgIHNvdW5kQ29udHJvbC52YWx1ZSA9IDA7XHJcbiAgICBzb3VuZEJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICB9XHJcbn1cclxufSkoKSJdfQ==
