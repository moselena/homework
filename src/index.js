import './style.css';

ymaps.ready(init);

function init() {
    var myPlacemark,
        myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 12,
        controls: ['zoomControl']
    }),
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    );

    

    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        // if (myPlacemark) {
        //     myPlacemark.geometry.setCoordinates(coords);
        // }
        // Если нет – создаем.
        // else {
            myPlacemark = createPlacemark(coords);
            clusterer.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            // myPlacemark.events.add('dragend', function () {
            //     getAddress(myPlacemark.geometry.getCoordinates());
            // });
        // }
        getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
      
        return new ymaps.Placemark(coords, {}, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'src/img/mark.png',
            // Размеры метки.
            iconImageSize: [36, 46],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-18, -23]
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            
            myPlacemark.properties
                .set({
                    balloonContent: `<div class="modal_window">
                                        <div class="modal_window_header">
                                            <div class="modal_window_header_field">
                                                <img src='src/img/mini_mark.png' class="modal_window_mini_mark"></img>
                                                <div class="modal_window_adress">
                                                ${firstGeoObject.getAddressLine()}
                                                </div>
                                                <img src='src/img/close.png' class="modal_window_close"></img>
                                            </div>
                                        </div>
                                        <ul class="review">
                                            <li class="review_item">
                                                Отзывов пока нет
                                            </li>
                                        </ul>
                                        <form action="" id="forms">
                                            <div class="rewiev_form_container">
                                                <h3 class="rewiev_h3">ВАШ ОТЗЫВ</h3>
                                                <input type="text" placeholder="Ваше имя" name="autor_name" class="rewiev_input rewiev_name">
                                                <input type="text" placeholder="Укажите место" name="place" class="rewiev_input rewiev_place">
                                                <textarea name="rewiev_comment" placeholder="Поделитесь впечатлениями" class="rewiev_input rewiev_comment"></textarea>
                                                <div class="btn_container">
                                                  <button type="button" class="rewiev_button_add">Добавить</button>
                                              </div>
                                            </div>
                                        </form>
                                    </div>`
                });
                
        });
    }
  

    const clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
              href: 'src/img/mark.png',
              size: [36, 46],
            // Отступ, чтобы центр картинки совпадал с центром кластера.
                offset: [-18, -23]
            }
        ]
        
        // preset: "islands#darkOrangeClusterIcons",
        // groupByCoordinates: false,
        // clusterDisableClickZoom: true,
        // clusterHideIconOnBalloonOpen: false,
        // geoObjectHideIconOnBalloonOpen: false,
        // clusterOpenBalloonOnClick: true,
        // clusterBalloonContentLayout: "cluster#balloonCarousel",
        // clusterBalloonPanelMaxMapArea: 0,
        // clusterBalloonContentLayoutWidth: 200,
        // clusterBalloonContentLayoutHeight: 250,
        // clusterBalloonPagerSize: 5,
        // clusterBalloonPagerType: "marker"
        
      });
    
      
      myMap.geoObjects.add(clusterer);
      
      
      const date = new Date();
      let year = date.getFullYear();
      let month = `${date.getMonth() + 1}`;
      let day = `${date.getDate()}`;
      if (month.length === 1) {
          month = `0${month}`
      }
      if (day.length === 1) {
        month = `0${day}`
      }

      const currentDate = `${day}.${month}.${year}`;
};



 