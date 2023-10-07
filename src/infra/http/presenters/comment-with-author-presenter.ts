import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

export class CommentWithAuthorPresenter {
  static present(CommentWithAuthor: CommentWithAuthor) {
    return {
      commentId: CommentWithAuthor.commentId.toString(),
      author: {
        id: CommentWithAuthor.author.id.toString(),
        name: CommentWithAuthor.author.name,
      },
      content: CommentWithAuthor.content,
      createdAt: CommentWithAuthor.createdAt,
      updatedAt: CommentWithAuthor.updatedAt,
    }
  }
}
