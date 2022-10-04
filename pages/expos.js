import { request } from "../lib/datocms"
import { PROJECTS_QUERY, EXPO_QUERY } from '../lib/queries'
import Header from "../components/Header"
import EmblaCarousel from "../components/EmblaCarousel"
import Image from "next/image"

function size(size) {
    if (size === 'small') {
        return 'w-[40vw] md:w-[20vw] h-fit md:m-20'
    }
    if (size === 'medium') {
        return 'w-[55vw] md:w-[30vw] h-fit md:m-10'
    }
    if (size === 'large') {
        return 'w-[103vw] md:w-[42vw] h-fit'
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
    const [lightboxController, setLightboxController] = useState({ 
        toggler: false, 
        slide: 1 
        }); 
        
        function openLightboxOnSlide(number) { 
            setLightboxController({ 
                toggler: !lightboxController.toggler, 
                slide: number 
            }); 
        }         

    const allImages = data.imagens.map((img) => img.imagem.url)
return (
    <>
    <Header projects={projects} books={books} />
        <div className="mt-[-1em] 2xl:mt-5">
        <EmblaCarousel>
                {data.imagens.map((w, i) => (
                    <div className="embla__slide__books flex" key={i}>
                        
                        <div className={`relative ${size(w.tamanho)} ${align(w.alinhamento)}`} onClick={() => openLightboxOnSlide(i + 1)}>
                            <Image src={w.imagem.url} width={w.imagem.width} height={w.imagem.height} objectFit='cover' />
                        </div>
                        
                    </div>
                ))}
        </EmblaCarousel>
        </div>
        <FsLightbox 
            toggler={lightboxController.toggler} 
            sources={allImages} 
            slide={lightboxController.slide} 
            svg={{
                slideButtons: {
                    previous: {
                        viewBox: '0 0 100 100',
                        d: 'M71 3L29 52.5L71 96.5'
                    },
                }
            }}
        /> 
        <div className="grid grid-cols-1 mx-8 md:mx-0 md:grid-cols-3 mb-16 3xl:mt-5 3xl:mb-24">
        <div className="md:hidden text-center mb-10 text-lg font-bold 2xl:text-xl 3xl:text-2xl">{data.titulo}</div>
            <div className="font-decay text-center text-sm 3xl:text-lg">
                <div dangerouslySetInnerHTML={{__html: data.lista}} className='paragraph'/>
            </div>
            <div className="hidden md:block text-center text-lg font-bold 2xl:text-xl 3xl:text-2xl">{data.titulo}</div>
            <div dangerouslySetInnerHTML={{__html: data.texto}} className='paragraph mt-10 md:mt-0 md:ml-0 md:mr-20 2xl:mr-36 3xl:text-xl 3xl:mr-56'/>
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