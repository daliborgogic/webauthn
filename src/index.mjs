import Router from './helpers/router.mjs'
import { registration } from './registration/index.mjs'

const router = Router()

const inMemoryUserDeviceDB = request => {
  const loggedInUserId = 'abc'
  const rpID = 'asasas'
  request.user = {
    [loggedInUserId]: {
      id: loggedInUserId,
      username: `user@${rpID}`,
      devices: [],
      /**
       * A simple way of storing a user's current challenge being signed by registration or authentication.
       * It should be expired after `timeout` milliseconds (optional argument for `generate` methods,
       * defaults to 60000ms)
       */
      currentChallenge: undefined
    }
  }
  // request.authentication = { name: 'Mittens', age: 3 }
}

router.get('/authentication', inMemoryUserDeviceDB, request => Response.json(request.user))
router.get('/registration', inMemoryUserDeviceDB, request => {
  const user = request.user
  const userKey = Object.keys(user)[0]
  const { username, loggedInUserId, devices } = user[userKey]
  //  request.user[loggedInUserId].currentChallenge = options.challenge;
  const opts = {
    rpName: 'SimpleWebAuthn Example',
    rpID: username.split('@')[1],
    userID: loggedInUserId,
    userName: username,
    timeout: 60000,
    attestationType: 'none',
    /**
     * Passing in a user's list of already-registered authenticator IDs here prevents users from
     * registering the same device multiple times. The authenticator will simply throw an error in
     * the browser if it's asked to perform registration when one of these ID's already resides
     * on it.
     */
    excludeCredentials: devices.map(dev => ({
      id: dev.credentialID,
      type: 'public-key',
      transports: dev.transports
    })),
    /**
     * The optional authenticatorSelection property allows for specifying more constraints around
     * the types of authenticators that users to can use for registration
     */
    authenticatorSelection: {
      userVerification: 'required',
      residentKey: 'required'
    },
    /**
     * Support the two most common algorithms: ES256, and RS256
     */
    supportedAlgorithmIDs: [-7, -257]
  }

  const options = registration(opts)
  /**
   * The server needs to temporarily remember this value for verification, so don't lose it until
   * after you verify an authenticator response.
   */
  request.user[userKey].currentChallenge = options.challenge
  return Response.json(options)
})
// router.post('/verify-registration', () => {})
// router.post('/verify-authentication', () => {})

export default {
  fetch: (...args) =>
    router
      .handle(...args)
      .then(response => {
        // can modify response here before final return, e.g. CORS headers
        return response
      })
      .catch(err => {
        // and do something with the errors here, like logging, error status, etc
        return Response.json({ error: err.message })
      })
}
