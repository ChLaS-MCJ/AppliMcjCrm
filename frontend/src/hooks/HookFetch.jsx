import { useState, useEffect } from 'react'

/**
 * useFetch custom hook to handle API calls
 * @function useFetch
 * @param {string} [url] - URL of the API
 * @returns {object} - Object with: data {array}, isLoading {boolean} and error {boolean}
 */
export function useFetch(url) {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url) return
        setLoading(true)
        async function fetchData() {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
            } catch (err) {
                console.log(err)
                setError(true)
            } finally {
                const timeout = 0 //Modify in order to test Loader component
                setTimeout(() => {
                    setLoading(false)
                }, timeout)
            }
        }
        fetchData()
    }, [url])
    return { data, isLoading, error }
}