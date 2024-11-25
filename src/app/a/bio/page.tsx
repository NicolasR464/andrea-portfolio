import BioForm from './BioForm'

const bioFetch = async () => {
    try {
        const bio = await fetch(process.env.DOMAIN + '/api/about')

        if (!bio.ok) {
            throw new Error('Failed to fetch bio')
        }

        return bio.json()
    } catch (error) {
        console.error('Error fetching bio:', error)
        return { bio: { text: '', image: { url: '' } } }
    }
}
export default async function Bio() {
    const data = (await bioFetch()) as {
        bio: { text: string; image: { url: string } }
    }
    const bioText = data.bio.text
    const bioImgUrl = data.bio.image.url

    return (
        <div>
            <h1 className="text-center text-5xl">BIO</h1>
            <BioForm bioText={bioText} bioImgUrl={bioImgUrl} />
        </div>
    )
}
