import './config/firebaseConfig'; 
import { getMessaging } from 'firebase-admin/messaging';

export class NotificationService {
  static async sendPushNotification(token: string, title: string, body: string) {
    try {
      await getMessaging().send({
        token,
        notification: {
          title,
          body,
        },
      });
      console.log('Notificación enviada con éxito');
    } catch (error) {
      console.error('Error al enviar notificación:', error);
    }
  }
}
