import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subcriptions'
import { redis } from '../redis/client'

interface AccessInviteLinkParams {
  subscriberId: string
}

export async function accessInviteLink({
  subscriberId,
}: AccessInviteLinkParams) {
  await redis.hincrby('referral:acess-cont', subscriberId, 1)
}
