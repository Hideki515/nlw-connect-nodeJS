import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscriptionToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe to the event',
        tags: ['subscriptions'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberID: z.string(),
          }),
        },
      },
    },
    async (resquest, reply) => {
      const { name, email } = resquest.body

      const { subscriberID } = await subscribeToEvent({
        name,
        email,
      })

      return reply.status(201).send({
        subscriberID,
      })
    }
  )
}
