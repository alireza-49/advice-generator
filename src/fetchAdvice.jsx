const fetchAdvice = async ({queryKey}) => {
    const id = queryKey[1]
    const res = await fetch('https://api.adviceslip.com/advice/' + id)
        if (!res.ok) {
            throw new Error('fetch data failed')
        }
        const json = await res.json()
        return json.slip
}
export default fetchAdvice;