import * as notificationRepository from '../api/repository';

export async function getNotificationSettings(userId: string) {
  const settings = await notificationRepository.findNotificationSettings(userId);

  if (!settings) {
    // Create default settings if not exists
    return await notificationRepository.createNotificationSettings(userId);
  }

  return settings;
}
