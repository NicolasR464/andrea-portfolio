import Gallery from '@/components/Gallery'
import GallerySwipper from '@/components/GallerySwipper'
import { headers } from 'next/headers'

const getImgs = async () => {
    const imgs: any = await fetch(process.env.DOMAIN + '/api/art?p=home', {
        next: { tags: ['drawings'] },
    })

    const imgsParsed = await imgs.json()
    return imgsParsed
}

export default async function Home() {
    const imgs = await getImgs()
    const collections: any = new Object()
    const headersList = await headers()
    const userAgent = headersList.get('user-agent')
    let isMobileView = userAgent!.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )

    if (imgs.data.length > 0) {
        imgs.data.forEach((img: any) => {
            const coll = img.drawing_collection
            if (!collections.hasOwnProperty(img.drawing_collection)) {
                collections[coll] = new Array()
                collections[coll].push(img.image.url)
            } else {
                collections[coll].push(img.image.url)
            }
        })
    }

    return (
        <div>
            {!isMobileView && (
                <h1 className="hidden tablet:block text-xl tablet:text-2xl laptop:text-3xl fixed top-[30px] translate-x-[-50%] -translate-y-3 left-[50%] z-[100] text-center tracking-[.20em]">
                    <span className=" tracking-[.18em] ">ANDREA</span>
                    <br />
                    <span className=" tracking-[.40em] -translate-y-3">
                        ROCAGEL
                    </span>
                    <br />
                    <span className=" tracking-[.60em]">DRAWINGS</span>
                </h1>
            )}

            {imgs && !isMobileView && <Gallery collections={collections} />}
            {imgs && isMobileView && (
                <GallerySwipper collections={collections} />
            )}
        </div>
    )
}
