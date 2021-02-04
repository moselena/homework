import './style.css';

ymaps.ready(init);

function init() {
    var myPlacemark,
        myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 12,
        controls: ['zoomControl']
    });

    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            // iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        // myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    // // Формируем строку с данными об объекте.
                    // iconCaption: [
                    //     // Название населенного пункта или вышестоящее административно-территориальное образование.
                    //     firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                    //     // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                    //     firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    // ].filter(Boolean).join(', '),
                    balloonContent: [`<div class="modal_window">
                                        <div class="modal_window_header">
                                            <div class="modal_window_rewiev">
                                                <svg class="svg"></svg>
                                                <div class="modal_window_adress">
                                                ${firstGeoObject.getAddressLine()}
                                                </div>
                                            </div>
                                            <button type="button" class="modal_window_close"></button>
                                        </div>
                                        <ul class="review">
                                            <li class="review-item">
                                                Отзывов пока нет
                                            </li>
                                        </ul>
                                        <form action="" id="forms">
                                            <p class="rewiev">ВАШ ОТЗЫВ</p>
                                            <input type="text" placeholder="Ваше имя" name="autor-name" class="rewiev_name">
                                            <input type="text" placeholder="Укажите место" name="place" class="rewiev_place">
                                            <textarea name="rewiev_comment" placeholder="Поделитесь впечатлениями" class="rewiev_comment"></textarea>
                                            <div class="btn_container">
                                                <button type="button" class="rewiev_button_add">Добавить</button>
                                            </div>
                                        </form>
                                        <img class="logo"></img>
                                    </div>`]
                });
        });
    }
};
// firstGeoObject.getAddressLine() adres

 