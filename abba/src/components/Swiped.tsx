
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Navigation, Pagination, Scrollbar, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import "./swiper.scss";
import { IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
function Swiped() {
  return (
    <>
      <Swiper
        modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation]}
        navigation={true}
        autoplay={true}
        keyboard={true}
        pagination={false}
        scrollbar={false}
        zoom={true}
      >
        <SwiperSlide>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonImg className="img" src="assets/icon/sw1.png"></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <h1>h1</h1>
                <h3>h3</h3>
                <h5>h5</h5>
              </IonCol>
            </IonRow>
          </IonGrid>
        </SwiperSlide>
        <SwiperSlide>
        <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonImg className="img" src="assets/icon/sw2.png"></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <h1>h1</h1>
                <h3>h3</h3>
                <h5>h5</h5>
              </IonCol>
            </IonRow>
          </IonGrid>
        </SwiperSlide>
        <SwiperSlide>
        <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonImg className="img" src="assets/icon/sw3.png"></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <h1>h1</h1>
                <h3>h3</h3>
                <h5>h5</h5>
              </IonCol>
            </IonRow>
          </IonGrid>
        </SwiperSlide>
        <SwiperSlide>
        <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonImg className="img" src="assets/icon/sw4.png"></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <h1>h1</h1>
                <h3>h3</h3>
                <h5>h5</h5>
              </IonCol>
            </IonRow>
          </IonGrid>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default Swiped