
export const getPriceFormat = (price, currency) => {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: currency || 'usd',
    }).format(price || 0)
}