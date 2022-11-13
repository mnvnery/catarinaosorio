import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import headerNavLinks from '../data/headerNavLinks'
import Image from 'next/image'
import siteMetadata from '../data/siteMetadata'
import { useRouter } from 'next/router';


const Nav = ({projects, books}) => {
const router = useRouter();

const { locale } = useRouter();

const [navShow, setNavShow] = useState(false)


const ref = useRef()
const [subNavShow, setSubNavShow] = useState(false)

const onToggleSubNav = () => {
    setSubNavShow((status) => {
        return !status
    })
}

useEffect(() => {
    const checkIfClickedOutside = e => {
        // If the menu is open and the clicked target is not within the menu,
        // then close the menu
        if (navShow && ref.current && !ref.current.contains(e.target)) {
        setNavShow(false)
        }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", checkIfClickedOutside)
    }
}, [navShow])

const forceReload = () => {
    router.reload();
}

return (
<div>
    <button
    type="button"
    className="ml-1 mr-1 h-8 w-8 rounded py-1 3xl:h-10 3xl:w-10"
    aria-label="Toggle Menu"
    onClick={() => setNavShow(true)}
    >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="text-black
        "
    >
        <path
        fillRule="evenodd"
        d="M 0 5 a 0 1 0 0 1 0 -1 h 8 a 0 1 0 1 1 0 1 H 0 z M 0 10 a 0 1 0 0 1 0 -1 h 8 a 0 1 0 1 1 0 1 H 0 z z"
        clipRule="evenodd"
        />
    </svg>
    </button>
    {setNavShow &&(
    <div
    className={`fixed top-2 md:absolute md:top-0 right-1.5 md:right-2.5 z-20 min-w-60 pb-10 min-w-[97vw] md:min-w-[28vw] 3xl:min-w-[22vw] 3xl:pb-14 transform bg-[#FEFCF9] border border-orange-200 fill-white text-black duration-300 ease-in-out ${
        navShow ? 'block' : 'hidden'
    }`} ref={ref}
    >
    <div className="mt-3.5 mr-1 md:mt-1 md:mr-0 float-right 3xl:mt-2 3xl:mr-2">
        <button
        type="button"
        className="mr-2 h-4 w-4 rounded"
        aria-label="Toggle Menu"
        onClick={() => setNavShow(false)}
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 25 25"
            overflow="visible"
            stroke="rgb(254 215 170)"
            strokeWidth="3"
        >
            <line x2="25" y2="25" />
            <line x1="25" y2="25" />
            </svg>
        </button>
    </div>
    <nav className="mt-20 md:mt-12 flex flex-col justify-between text-center md:text-sm 2xl:text-lg 3xl:text-xl">
        <div>
            {projects.filter(project => project.lista == 'lista 1').map((project, i) => (
                <div key={i} className="px-5 2xl:px-20">
                <Link
                    href={`/projects/${project.slug}`}
                >
                    <a
                    onClick={() => { setNavShow(false)}} className="cursor-pointer hover:underline leading-3 text-black tracking-widest">{project.titulo}
                    </a>
                </Link>
                </div>
            ))}
        </div>
        <div className='mt-4 3xl:mt-6'>
            {projects.filter(project => project.lista == 'lista 2').map((project, i) => (
                <div key={i} className="px-5 2xl:px-20">
                <Link
                    href={`/projects/${project.slug}`}
                >
                    <a
                        onClick={() => { setNavShow(false)}} className="cursor-pointer hover:underline leading-3 text-black tracking-widest">{project.titulo}
                    </a>
                </Link>
                </div>
            ))}
        </div>
        <div className='mt-8'>
            <div><button onClick={onToggleSubNav} className="cursor-pointer hover:underline leading-3 text-black font-decay tracking-widest">{locale === 'pt' ? 'Livros' : 'Books'}</button></div>
            <div className={`${subNavShow ? 'block' : 'hidden'} mb-5 mt-2`}>
                {books.map((book, i) => (
                    <div key={i} className="px-5">
                    <Link
                        href={`/books/${book.slug}`}
                    >
                        <a
                            className="cursor-pointer hover:underline leading-3 text-black tracking-widest">{book.titulo}
                        </a>
                    </Link>
                    </div>
                ))}
            </div>
            <div><Link href='/expos'><a className={`cursor-pointer hover:underline leading-3 text-black font-decay tracking-widest ${router.pathname == '/expos' ? 'underline' : ''}`}>{locale === 'pt' ? 'Exposições' : 'Exibitions'}</a></Link></div>
            <div><Link href='/textos'><a className={`cursor-pointer hover:underline leading-3 text-black font-decay tracking-widest ${router.pathname == '/textos' ? 'underline' : ''}`}>{locale === 'pt' ? 'Textos' : 'Texts'}</a></Link></div>
        </div>
        <div className='mt-3'>
            <div><Link href='/contacts'><a className={`cursor-pointer hover:underline leading-3 font-decay tracking-widest ${router.pathname == '/contacts' ? 'underline' : ''}`}>Bio</a></Link></div>
        </div>
    </nav>
    </div>
    )}
</div>
)
}

export default Nav
