import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { CommentWithAuthorPresenter } from '../presenters/comment-with-author-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/questions/:questionId/comments')
export class FetchQuestionCommentsController {
  constructor(private fetchQuestionComments: FetchQuestionCommentsUseCase) {}

  @Get()
  async handle(
    @Param('questionId') questionId: string,
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const result = await this.fetchQuestionComments.execute({
      page,
      questionId,
    })

    if (result.isFailure()) {
      throw new BadRequestException()
    }

    const { comments } = result.value

    return {
      comments: comments.map(CommentWithAuthorPresenter.present),
    }
  }
}
