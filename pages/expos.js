import { request } from "../lib/datocms"
import { PROJECTS_QUERY, EXPO_QUERY } from '../lib/queries'
import Header from "../components/Header"
import EmblaCarousel from "../components/EmblaCarousel"
import Image from "next/image"

function size(size) {
    if (size === 'small') {
        return 'w-[20vw] h-fit m-20'
    }
    if (size === 'medium') {
        return 'w-[30vw] h-fit m-10'
    }
    if (size === 'large') {
        return 'w-[42vw] h-fit'
    }
}

function align(align) {
    if (align === 'top') {
        return 'self-start'
    }
    if (align === 'middle') {
        return 'self-center'
    }
    if (align === 'bottom') {
        return 'self-end'
    }
}

export default function Expos({ data, projects, books }) {
return (
    <>
    <Header projects={projects} books={books} />
        <div className="mt-[-1em] 2xl:mt-5">
        <EmblaCarousel>
                {data.imagens.map((w, i) => (
                    <div className="embla__slide__books flex" key={i}>
                        
                        <div className={`relative ${size(w.tamanho)} ${align(w.alinhamento)}`}>
                            <Image src={w.imagem.url} width={w.imagem.width} height={w.imagem.height} objectFit='cover' />
                        </div>
                        
                    </div>
                ))}
        </EmblaCarousel>
        </div>
        <div className="grid grid-cols-3">
            <div className="font-decay text-center text-sm">
                <div dangerouslySetInnerHTML={{__html: data.lista}} className='paragraph'/>
            </div>
            <div className="text-center text-lg font-bold 2xl:text-xl">{data.titulo}</div>
            <div dangerouslySetInnerHTML={{__html: data.texto}} className='paragraph mr-20'/>
        </div>
    </>
)
}

export async function getStaticProps() {

    const project = await request({
        query: PROJECTS_QUERY,
    })

    const data = await request({
        query: EXPO_QUERY,
    })


    return {
        props: {
        data: data.expo,
        projects: project.allProjects,
        books: project.allLivros,
        },
    }
}