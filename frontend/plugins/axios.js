export default ({ $axios, $auth }) => {
    $axios.onRequest((config) => {
        try {
            const token = $auth.strategy.token.get()
             this.$axios.setToken(token, 'Bearer')
        } catch (error) {
            console.log("Could not update token:", error)
        }
        return config
    })

}