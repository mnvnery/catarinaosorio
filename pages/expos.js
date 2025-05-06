import { request } from "../lib/datocms"
import { PROJECTS_QUERY, EXPO_QUERY } from '../lib/queries'
import Header from "../components/Header"
import EmblaCarousel from "../components/EmblaCarousel"
import Image from "next/image"
import { useState } from "react"
import FsLightbox from 'fslightbox-react'; 
import { useRouter } from 'next/router';

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

    const { locale, locales, asPath } = useRouter().locale;

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
                            <Image src={w.imagem.url} width={w.imagem.width} height={w.imagem.height} style={{ objectFit: 'cover' }} />
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
                        width: '30px', 
                        height: '30px',
                        viewBox: '0 0 14.91 27.74',
                        d: 'M13.33,27.74L.2,14.61c-.26-.26-.26-.68,0-.94L13.86,0c.91,.92,1,.82,.84,.98L1.56,14.18l12.74,12.64'
                    },
                    next: {
                        width: '30px', 
                        height: '30px',
                        viewBox: '0 0 14.91 27.74',
                        d: 'M1.44,0L14.57,13.13c.26,.26,.26,.68,0,.94L.9,27.74c-.91-.92-1-.82-.84-.98L13.21,13.56,.47,.93'
                    }
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

export async function getStaticProps({locale}) {
    const formattedLocale = locale;
    const project = await request({
        query: `{
            allProjects(locale: ${formattedLocale}) {
                slug
                titulo
                lista
            }
        allLivros(locale: ${formattedLocale}) {
                slug
                titulo
            }
        }`
    })

    const data = await request({
        query: `{
            expo(locale: ${formattedLocale}) {
                titulo
                texto
                lista
                imagens {
                    imagem {
                    width
                    height
                    url
                    }
                    tamanho
                    alinhamento
                }
                }
            }`
    })


    return {
        props: {
        data: data.expo,
        projects: project.allProjects,
        books: project.allLivros,
        },
    }
}