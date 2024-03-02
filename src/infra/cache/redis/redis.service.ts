import { EnvService } from '@/infra/env/env.service'
import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(envSerice: EnvService) {
    super({
      host: envSerice.get('REDIS_HOST'),
      port: envSerice.get('REDIS_PORT'),
      db: envSerice.get('REDIS_DB'),
    })
  }

  onModuleDestroy() {
    return this.disconnect()
  }
}
