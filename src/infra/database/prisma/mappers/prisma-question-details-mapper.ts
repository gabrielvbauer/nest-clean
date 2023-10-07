import {
  Question as PrismaQuestion,
  User as PrismaUser,
  Attachment as PrismaAttachment,
} from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { PrismaAttachmentMapper } from './prisma-attachment-mapper'

type PrismaQuestionDetails = PrismaQuestion & {
  author: PrismaUser
  attachment: PrismaAttachment[]
}

export class PrismaQuestionDetailsMapper {
  static toDomain(raw: PrismaQuestionDetails): QuestionDetails {
    return QuestionDetails.create({
      questionId: new UniqueEntityID(raw.id),
      author: {
        id: new UniqueEntityID(raw.authorId),
        name: raw.author.name,
      },
      title: raw.title,
      slug: Slug.create(raw.slug),
      content: raw.content,
      attachments: raw.attachment.map(PrismaAttachmentMapper.toDomain),
      bestAnswerId: raw.bestAnswerId
        ? new UniqueEntityID(raw.bestAnswerId)
        : null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
