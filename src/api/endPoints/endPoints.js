export const baseURL = "https://api.coincap.io/v2/assets"

export const endPoints = {
    getCoins: '/',
    getCoinsById:(id)=>`/${id}`,
    updateCoins:(id)=>`/${id}`

}