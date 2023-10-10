
export const getSearchParams = () => {
    const location = window.location
    const searchParamsString = location.search
    let searchParams = {}

    if(searchParamsString) {
        const arr = searchParamsString.replace('?', '').split('&')
        arr.forEach(item => {
            const [key, value] = item.split('=')
            if(key && value) {
                searchParams[key] = value
            }
        })
    }

    return searchParams
}