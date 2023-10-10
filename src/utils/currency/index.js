const keyName = 'currency'

export const getCurrency = () => JSON.parse(localStorage.getItem(keyName)) || ''

export const setCurrency = (value) => {
    const currency = getCurrency()
    
    if(!currency || !['azn', 'usd'].includes(currency?.toLowerCase())) {
        localStorage.setItem(keyName, JSON.stringify(value))
    }
}

export const changeCurrency = (value) => {
    if(['azn', 'usd'].includes(value?.toLowerCase())) {
        localStorage.setItem(keyName, JSON.stringify(value))
    }
}
