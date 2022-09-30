import { request } from "../lib/datocms"
import Image from "next/image"
import { PROJECTS_QUERY, CONTACTS_QUERY } from '../lib/queries'
import Header from "../components/Header"


export async function getStaticProps() {
const contacts = await request({
    query: CONTACTS_QUERY,
})

const project = await request({
    query: PROJECTS_QUERY,
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

    return (
        <>
        <Header projects={projects} books={books} />
        <div className="grid grid-cols-3 mx-10 mt-20 2xl:mt-40">
            <div className="ml-10 2xl:text-lg">
                <div className="mb-5">Contactos</div>
                <div><a href={`mailto:${contacts.email}`} className="hover:underline">{contacts.email}</a></div>
                <div><a href={`tel:${contacts.telefone}`} className="hover:underline">{contacts.telefone}</a></div>
            </div>
            <div className="relative w-[10vw] h-[10vw] mt-[25%] mx-auto">
                <Image src={contacts.imagem.url} objectFit='cover' layout='fill'/>
            </div>
            <div className="mx-10 text-sm 2xl:text-lg">
                <div dangerouslySetInnerHTML={{__html: contacts.bio}} className='paragraph'/>
                <div className="font-decay mt-10 hover:underline">CV</div>
            </div>
        </div>
        </>
    )
}