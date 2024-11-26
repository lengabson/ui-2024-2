import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonButton,IonSearchbar, IonAvatar  } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';



const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <div className='header'>
              <img src="resources/velocity-high-resolution-logo-transparent.png" alt="Velocity" className='logo'/>
              <IonAvatar className="avatar">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar>
            </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <div className='d-content'>
        <div className='search'> 
          <IonSearchbar className='searchbar'></IonSearchbar>
          <div className='filtro'>
          <IonButton>Scooter</IonButton>
          <IonButton disabled={true}>Carros</IonButton>
          </div>
        </div>
        <div className='card-grid'>
        <IonCard className='b-card'>
          <img alt="Scooter-1" src="resources/scoote-1.jpg" className='img-card'/>
          <IonCardHeader>
            <IonCardTitle className='titulo'>Scooter Skupi</IonCardTitle>
            <IonCardSubtitle class='precio-tab1'><b>$50,000</b>/día</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>Yaxa-Colombia</IonCardContent>
          <div className='div-btn-card'>
            <IonButton routerLink='Tab2' className='btncard'>Alquilar</IonButton>
          </div>
        </IonCard>
        <IonCard className='b-card'>
          <img alt="Scooter-2" src="resources/scooter-2.jpg" className='img-card'/>
            <IonCardHeader>
              <IonCardTitle className='titulo'>Ducati Cross E Sport</IonCardTitle>
              <IonCardSubtitle class='precio-tab1'><b>$60,000</b>/día</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>EMOVE</IonCardContent>
            <div className='div-btn-card'>
              <IonButton routerLink='Tab2' className='btncard'>Alquilar</IonButton>
            </div>
        </IonCard>
        <IonCard className='b-card'>
          <img alt="Scooter-3" src="resources/scooter-3.jpg" className='img-card'/>
            <IonCardHeader>
              <IonCardTitle className='titulo'>VSETT 10+ 28A</IonCardTitle>
              <IonCardSubtitle class='precio-tab1'><b>$40,000</b>/día</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>PlugBike</IonCardContent>
            <div className='div-btn-card'>
              <IonButton routerLink='Tab2' className='btncard'>Alquilar</IonButton>
            </div>
        </IonCard>
        <IonCard className='b-card'>
          <img alt="Scooter-4" src="resources/scooter-4.jpg" className='img-card'/>
            <IonCardHeader>
              <IonCardTitle className='titulo'> Emove T9PRO</IonCardTitle>
              <IonCardSubtitle class='precio-tab1'><b>$70,000/día</b></IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>falabella</IonCardContent>
            <div className='div-btn-card'>
              <IonButton routerLink='Tab2' className='btncard'>Alquilar</IonButton>
            </div>
        </IonCard>
        <IonCard className='b-card'>
          <img alt="Scooter-5" src="resources/scooter-5.jpg" className='img-card'/>
          <IonCardHeader>
            <IonCardTitle className='titulo'>Wolf Warrior King GT - Kaabo</IonCardTitle>
            <IonCardSubtitle class='precio-tab1'><b>$60,000</b>/día</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>KAABO</IonCardContent>
          <div className='div-btn-card'>
            <IonButton routerLink='Tab2' className='btncard'>Alquilar</IonButton>
          </div>
        </IonCard>
        <IonCard className='b-card'>
          <img alt="Scooter-6" src="resources/scooter-6.jpg" className='img-card'/>
            <IonCardHeader>
              <IonCardTitle className='titulo'>Inokim OX</IonCardTitle>
              <IonCardSubtitle class='precio-tab1'><b>$80,000</b>/día</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>INOKIM</IonCardContent>
            <div className='div-btn-card'>
              <IonButton routerLink='Tab2' className='btncard'>Alquilar</IonButton>
            </div>
        </IonCard>
        <IonCard className='b-card'>
          <img alt="Scooter-7" src="resources/scooter-7.png" className='img-card'/>
            <IonCardHeader>
              <IonCardTitle className='titulo'>Scooter Scoop Speed</IonCardTitle>
              <IonCardSubtitle class='precio-tab1'><b>$65,000</b>/día</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>Scoop</IonCardContent>
            <div className='div-btn-card'>
              <IonButton routerLink='Tab2' className='btncard'>Alquilar</IonButton>
            </div>
        </IonCard>
        <IonCard className='b-card'>
          <img alt="Scooter-8" src="resources/scooter-8.jpg" className='img-card'/>
            <IonCardHeader>
              <IonCardTitle className='titulo'>350w Lite</IonCardTitle>
              <IonCardSubtitle class='precio-tab1'><b>$55,000</b>/día</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>MINCA</IonCardContent>
            <div className='div-btn-card'>
              <IonButton routerLink='Tab2' className='btncard'>Alquilar</IonButton>
            </div>
        </IonCard>
        </div>
        </div>
        <IonHeader collapse="condense">
          
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
