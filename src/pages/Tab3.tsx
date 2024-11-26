import { IonHeader, IonContent, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonInput, IonButton, IonText, IonCard, IonCardContent, IonIcon, IonAlert,IonAvatar } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        <IonButton slot="start" fill="clear" routerLink='Tab2' className='btn-go-back'>
              <IonIcon icon={arrowBackOutline}/>
        </IonButton>
          <IonGrid>
            <IonRow class='row'>
              <IonCol size="12" size-md="8">
                <IonCard className="payment-card">
                  <IonCardContent>
                    <IonText class='datos-pago'>
                      <h2>Datos de Pago</h2>
                    </IonText>
                    <IonInput placeholder="Nombre" className="input-field" label="Nombre" labelPlacement="floating" fill="outline"></IonInput>
                    <IonInput placeholder="Apellido" className="input-field" label="Apellido" labelPlacement="floating" fill="outline"></IonInput>
                    <IonInput placeholder="Número de Tarjeta" className="input-field"  type="tel" clearInput label="Número de Tarjeta" labelPlacement="floating" fill="outline"></IonInput>
                    <IonInput placeholder="CVV" className="input-field" type="password" label="CVV" labelPlacement="floating" fill="outline"></IonInput>
                    <IonInput placeholder="MM/YY" className="input-field" label="MM/YY" labelPlacement="floating" fill="outline"></IonInput>

                    <div className="payment-icons">
                      <img src="resources/payment-methods.png" alt="Visa-Mastercard-Amex" />
                    </div>
                    <div className='div-btn-pagar'>
                      <IonButton className='btn-pagar' expand="block" onClick={() => setIsOpen(true)} >
                        Pagar
                      </IonButton>
                    </div>
                    <IonAlert
                      isOpen={isOpen}
                      header="¡Pago realizado con éxito!"
                      subHeader="Su transacción ha sido procesada correctamente"
                      message="Gracias por su compra"
                      buttons={['Cerrar']}
                      onDidDismiss={() => setIsOpen(false)}
                    ></IonAlert>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="12" size-md="4">
                <IonCard className="summary-card">
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="6">
                          <img src="resources/scoote-1.jpg" alt="scooter-1" className='img-scooter-rent'/>
                        </IonCol>
                        <IonCol size="6">
                          <IonText className="datos-producto">
                            <h3>Scooter Skupi</h3>
                            <p>Yaxa-Colombia</p>
                            <p>20km de autonomía</p>
                            <p>Días:1</p>
                          </IonText>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                    <IonText class='total-compra'>
                      <h3>Sub-Total:$50,000</h3>
                      <h2>Total:$50,000</h2>
                    </IonText>
                    <hr />
                    <IonText className="terms-text">
                      <p>
                        El uso del casco al conducir scooters es esencial para proteger la
                        cabeza y reducir el riesgo de lesiones graves en caso de accidente.
                        Es importante recordar que la empresa no cubre accidentes personales,
                        por lo que tomar medidas de seguridad adecuadas es responsabilidad del
                        usuario para garantizar un viaje seguro y responsable. Para más
                        detalles, consulta nuestros términos y condiciones.
                      </p>
                    </IonText>
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

export default Tab3;
