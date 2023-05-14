let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
  center: [55.748452, 37.629044],
   zoom: 16,
   controls: [],
 });
 
 let coords = [
     [55.748452, 37.629044],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: '..//./img/icons/geo.svg',
     iconImageSize: [58, 74],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);