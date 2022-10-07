import Router from './helpers/router.mjs'

const router = Router()

router.get('/registration', () => {})
router.get('/authentication', () => {})

router.post('/verify-registration', () => {})
router.post('/verify-authentication', () => {})

export default {
  fetch: (...args) => router
    .handle(...args)
    .then(response => {
      // can modify response here before final return, e.g. CORS headers
      return response
    })
    .catch(err => {
      // and do something with the errors here, like logging, error status, etc
    })
}
