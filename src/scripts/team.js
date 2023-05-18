;(function() {
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
})()