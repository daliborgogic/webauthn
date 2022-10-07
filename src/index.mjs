export default {
  fetch () {
    try {
      return Response.json({ status: 200 })
    } catch (error) {
      return Response.json({ error: error.message} , { status: 500 })
    }
  }
}
