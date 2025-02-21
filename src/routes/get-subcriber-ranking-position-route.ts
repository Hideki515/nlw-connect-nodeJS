import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subcriber-invite-count'
import { getSubcriberRankinPosition } from '../functions/get-subcriber-ranking-position'

export const getSubscriberRanckinPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subcribers/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subcriber ranking position',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params

        const { position } = await getSubcriberRankinPosition({ subscriberId })

        return { position }
      }
    )
  }
