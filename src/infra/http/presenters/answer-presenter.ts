import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class AnswerPreseter {
  static present(answer: Answer) {
    return {
      id: answer.id.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}
