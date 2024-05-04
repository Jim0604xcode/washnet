
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Keyboard, Navigation, Pagination, Scrollbar, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import { IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
type SwipedProps = {
  data: {
    title?: string;
    type: string;
    infos: string | string[] | { text: string, checked: boolean }[] | any;
    image?: any;
  };
};
const Swiped:React.FC<SwipedProps> = ({data}) => {
  return (
    <>
      
        
        <SwiperSlide>
          <IonGrid>
          <IonRow>
            <IonCol size="12">
              <h1>{data.title}</h1>
            </IonCol>
          </IonRow>
            {/* <IonRow>
              <IonCol size="12">
              {(data.image) ? (
              <IonImg className="img" src={data.image}></IonImg>
              ) : (null)
              }
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
              {data.type === "paragraph" &&
                <p>{data.infos}</p>
              }
              </IonCol>
            </IonRow> */}
          </IonGrid>
        </SwiperSlide>
        
      
    </>
  )
}

export default Swiped