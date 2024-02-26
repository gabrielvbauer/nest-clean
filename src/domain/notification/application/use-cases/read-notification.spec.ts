import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'
import { makeNotification } from 'test/factories/make-notification'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: notification.recipientId.toString(),
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notifcation from another user', async () => {
    const notifcation = makeNotification(
      {
        recipientId: new UniqueEntityId('recipient-1'),
      },
      new UniqueEntityId('notification-1'),
    )

    await inMemoryNotificationsRepository.create(notifcation)

    const response = await sut.execute({
      recipientId: 'recipient-2',
      notificationId: 'notification-1',
    })

    expect(response.isFailure()).toBe(true)
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })
})
