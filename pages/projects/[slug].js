import { request } from "../../lib/datocms"
import { PROJECTS_QUERY } from '../../lib/queries'
import Header from "../../components/Header"
import EmblaCarousel from '../../components/EmblaCarousel'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import FsLightbox from 'fslightbox-react'; 
import { useRouter } from 'next/router';


function size(size) {
    if (size === 'small') {
        return 'w-[40vw] h-[40vw] md:w-[20vw] md:h-[20vw] md:m-20'
    }
    if (size === 'medium') {
        return 'w-[55vw] h-[55vw] md:w-[30vw] md:h-[30vw] md:m-10'
    }
    if (size === 'large') {
        return 'w-[103vw] h-[50vh] md:w-[40vw] md:h-[40vw]'
    }
}

function align(align) {
    if (align === 'top') {
        return 'self-start mt-[2vh]'
    }
    if (align === 'middle') {
        return 'self-center'
    }
    if (align === 'bottom') {
        return 'self-end'
    }
}

export default function Project({ data, projects, books, moreProjects }) {
    
    const { locale, locales, asPath } = useRouter().locale
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
        <div className="mt-[-1em] 2xl:mt-0">
        <EmblaCarousel>
                {data.imagens.map((w, i) => (
                    <div className="embla__slide" key={i}>
                        <div className={`relative ${size(w.tamanho)} ${align(w.alinhamento)}`} onClick={() => openLightboxOnSlide(i + 1)}>
                            <Image src={w.imagem.url} objectFit="cover" layout="fill" />
                        </div>
                    </div>
                ))}
        </EmblaCarousel>
        </div>
        <FsLightbox 
            toggler={lightboxController.toggler} 
            sources={allImages} 
            slide={lightboxController.slide} 
            disableThumbs={true} 
            disableZoom={true}
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
        <div className="mx-8 grid grid-cols-2 justify-center items-center md:justify-start md:items-start md:mx-0 md:grid-cols-3 3xl:mt-5">
            <div className="md:hidden text-center text-lg font-bold 2xl:text-xl 3xl:text-2xl">{data.titulo}</div>
            <div className="font-decay text-center text-sm 3xl:text-lg">
                <div>{data.ano}</div>
                <div>{data.local}</div>
            </div>
            <div className="hidden md:block text-center text-lg font-bold 2xl:text-xl 3xl:text-2xl">{data.titulo}</div>
            <div>
            <div dangerouslySetInnerHTML={{__html: data.texto}} className='paragraph mt-10 col-span-2 md:mt-0 md:ml-0 md:col-span-1 md:mr-20 2xl:mr-36 3xl:text-xl 3xl:mr-56'/>
            {data.text === null 
                ? ''
                : <Link href='/textos'><a className="font-decay text-2xl hover:text-orange-200">+</a></Link>
            }
            </div>
        </div>
        <div className="font-decay flex justify-between mx-8 md:mx-14 text-sm my-12 3xl:text-lg 3xl:my-16">
            <Link href={moreProjects[0].slug}><div className="hover:underline">projeto anterior</div></Link>
            <Link href={moreProjects[1].slug}><div className="hover:underline">projeto seguinte</div></Link>
        </div>
        </>
    )
}
export async function getStaticPaths({locales}) {
    const data = await request({ query: `{ allProjects { slug } }` });
    const pathsArray = [];
    data.allProjects.map((post) => {
        locales.map((language) => {
        pathsArray.push({ params: { slug: post.slug }, locale: language });
        });
    });

    return {
        paths: pathsArray,
        fallback: false,
    };
}

export async function getStaticProps({ params, locale }) {
    const formattedLocale = locale;
    const data = await request({
        query: `{
            allProjects(locale: ${formattedLocale}) {
                titulo
                slug
                imagens {
                    imagem {
                    url
                    }
                    tamanho
                    alinhamento
                }
                text {
                    texto
                }
                ano
                local
                texto
            }
        }`,
        variables: { slug: params.slug },
    })

    const projects = data.allProjects;

    const currentProject = projects.find((project) => project.slug === params.slug);
    const currentProjectIndex = projects.findIndex((project) => project.slug === params.slug);
    const prevProject = projects[currentProjectIndex - 1] || projects[projects.length - 1];
    const nextProject = projects[currentProjectIndex + 1] || projects[0];

    if (!currentProject) {
        return {
            project: false,
        };
    }

    const headerData = await request({
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

    return {
        props: {
            data: currentProject,
            moreProjects: [prevProject, nextProject],
            projects: headerData.allProjects,
            books: headerData.allLivros,
        },
    }
}