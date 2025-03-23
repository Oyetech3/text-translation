export default async function handler (req, res) {
    if(req.method !== 'GET') {
        return res.status(405).send('Method not allowed')
    }
    try {
        const {text, source, target} = req.query

        if(!text || !source || !target) {
            return res.status(400).send('Misiing required parameters')
        }

        
        const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${source}|${target}`
        const response = await fetch(url)

        if(!response.ok) {
            throw new Error(`An error occurred: ${response.status}`)
        }

        const data = await response.json()
        const matches  = data.matches
        const translation = matches?.[matches.length - 1]?.translation || 'No translation found'

        res.send(translation)
    }
    catch (error) {
        console.log('Error during translation', error)
        res.status(500).send('An error occurred during translation')
    }
}