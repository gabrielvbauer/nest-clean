import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static present(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toString(),
      author: {
        id: questionDetails.author.id.toString(),
        name: questionDetails.author.name,
      },
      title: questionDetails.title,
      slug: questionDetails.slug.value,
      content: questionDetails.content,
      attachments: questionDetails.attachments.map(AttachmentPresenter.present),
      bestAnswerId: questionDetails.bestAnswerId?.toString(),
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }
}
