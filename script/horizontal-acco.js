//jquery
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

