import Nav from "./Nav"
import Link from "next/link"
import {useRouter} from "next/router"

const Header = ({projects, books}) => {
    const { locale, locales, asPath } = useRouter();
    return (
        <>
        <div className="h-20 md:h-20"></div>
        <div className="fixed top-0 w-[95%] flex justify-between m-5 md:mx-10 md:my-5 z-10">
            <div className="font-decay text-xs 2xl:text-sm 3xl:text-base mt-1.5 uppercase">
                    {locales.map((l, i) => (
                        <span key={i}>
                        <Link href={asPath} locale={l}>
                            <a className={l === locale ? 'underline' : ''}>{l}</a>
                        </Link>
                        <span className={l === 'pt' ? 'inline-block px-2' : 'hidden'}>/</span>
                    </span>
                    ))}
            </div>
            <Link href='/'><a className="z-30 font font-grottaMedium text-lg md:text-xl md:z-0 2xl:text-2xl 3xl:text-3xl">Catarina Osório de Castro</a></Link>
            <Nav projects={projects} books={books} />
        </div>
        </>
    )
}

export default Header