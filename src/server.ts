import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getRankingRoute } from './routes/get-ranking-routes'
import { getSubscriberInviteCountRoute } from './routes/get-subcriber-envites-count-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subcriber-invite-clicks-route'
import { getSubscriberRanckinPositionRoute } from './routes/get-subcriber-ranking-position-route'
import { subscriptionToEventRoute } from './routes/subcription-to-event-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscriptionToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInviteCountRoute)
app.register(getSubscriberRanckinPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT }, () => {
  console.log('HTTP server is running on port 3333')
})
