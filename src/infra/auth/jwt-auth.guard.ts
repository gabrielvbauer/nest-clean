import { AuthGuard } from '@nestjs/passport'

export class JwtAuthGUard extends AuthGuard('jwt') {}
