import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { DomainEvents } from '@/core/events/domain-events'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  public constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) return null

    return answer
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)

    this.answerAttachmentsRepository.createMany(answer.attachments.getItems())

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer

    this.answerAttachmentsRepository.createMany(
      answer.attachments.getNewItems(),
    )

    this.answerAttachmentsRepository.deleteMany(
      answer.attachments.getRemovedItems(),
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(answerIndex, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }
}
