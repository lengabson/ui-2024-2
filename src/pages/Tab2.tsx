import {IonHeader, IonContent, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText, IonCard, IonCardContent, IonAvatar } from '@ionic/react';
import { arrowBackOutline, peopleOutline, keyOutline, speedometerOutline, documentTextOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { useState } from 'react';


const Tab2: React.FC = () => {
  const [days, setDays] = useState(1);
  const handleIncrease = () => setDays(days + 1);
  const handleDecrease = () => {
    if (days > 1) setDays(days - 1);
  };
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
        <IonContent className="ion-padding">
        <div className='d-content'>
        <IonButton slot="start" fill="clear" routerLink='Tab1' className='btn-go-back'>
              <IonIcon icon={arrowBackOutline}  />
        </IonButton>
          <IonGrid>
            <IonRow>
              <IonCol size="11" size-md="6">
                <IonCard className="scooter-card">
                  <IonCardContent>
                    <IonText className='Name-scooter'>
                      <h1>Scooter Skupi</h1>
                    </IonText>
                    <img src="resources/scoote-1.jpg" alt="Scooter Skupi" className="scooter-image" />
                    <IonText class='dias'>
                      <h3>Días</h3>
                    </IonText>
                    <div className="days-selector">
                      <IonButton onClick={handleDecrease} className='plus-button'>-</IonButton>
                      <IonText className="days-count">{days}</IonText>
                      <IonButton onClick={handleIncrease} className='minus-button'>+</IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="11" size-md="6">
                <IonCard className="details-card">
                  <IonCardContent>
                    <IonText className="details">
                      <h2>Detalles</h2>
                      <p><IonIcon icon={peopleOutline} /> Máximo de pasajeros: 1</p>
                      <p><IonIcon icon={keyOutline} /> Autonomía: 20km</p>
                      <p><IonIcon icon={speedometerOutline} /> Máxima velocidad: 25km/h</p>
                      <p><IonIcon icon={documentTextOutline} /> Totalmente asegurado</p>
                    </IonText>
                    <hr />
                    <IonText className="total-section">
                      <h2>Total: ${50000 * days}</h2>
                    </IonText>
                    <hr />
                    <div className='btn-alquilar'>
                      <IonButton expand="block" routerLink='Tab3' className='alquilar'>
                        Alquilar
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
          </div>
        </IonContent>
    </IonPage>
  );
};

export default Tab2;
