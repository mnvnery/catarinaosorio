import { request } from "../lib/datocms"
import Image from "next/image"
import { PROJECTS_QUERY, CONTACTS_QUERY } from '../lib/queries'
import Header from "../components/Header"
import { useRouter } from 'next/router';


export async function getStaticProps({locale}) {
    const formattedLocale = locale;
    const contacts = await request({
        query: `{
            contact(locale: ${formattedLocale}) {
                bio
                email
                telefone
                imagem {
                    url
                }
                cv {
                    url
                }
            }
        }`
    })

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


    return {
        props: {
            contacts: contacts.contact,
            projects: project.allProjects,
            books: project.allLivros,
        },
    }
}

export default function Contacts({contacts, projects, books}) {
    const { locale, locales, asPath } = useRouter().locale;
    
    return (
        <>
        <Header projects={projects} books={books} />
        <div className="grid grid-cols-1 md:grid-cols-3 mx-10 mt-20 2xl:mt-10 3xl:mt-40 3xl:mx-32">
            <div className="ml-10 2xl:text-lg 3xl:text-xl">
                <div><a href={`mailto:${contacts.email}`} className="hover:underline">{contacts.email}</a></div>
                <div><a href={`tel:${contacts.telefone}`} className="hover:underline">{contacts.telefone}</a></div>
            </div>
            <div className="relative w-[20vw] h-[20vw] md:w-[10vw] md:h-[10vw] my-10 md:mb-0 md:mt-2 mx-auto">
                <Image src={contacts.imagem.url} objectFit='cover' layout='fill'/>
            </div>
            <div className="pb-14 mx-10 text-sm md:pb-0 2xl:text-lg 3xl:text-xl">
                <div dangerouslySetInnerHTML={{__html: contacts.bio}} className='paragraph 3xl:mr-32'/>
                {contacts.cv 
                    ? <a href={contacts.cv.url} target="_blank"><div className="font-decay mt-10 hover:underline">CV</div></a>
                    : <div></div>
                }
            </div>
        </div>
        </>
    )
}