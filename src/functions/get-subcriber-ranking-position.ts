import { redis } from '../redis/client'

interface GetSubcriberRankinPositionParams {
  // Interface serve para definir o formato dos parâmetros
  subscriberId: string
}

export async function getSubcriberRankinPosition({
  subscriberId,
}: GetSubcriberRankinPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
