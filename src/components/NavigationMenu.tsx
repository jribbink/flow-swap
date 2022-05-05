import Link from 'next/link'
import { useRouter } from 'next/router'

const menuItems = [
    {
        name: 'Swap',
        path: '/swap'
    },
    {
        name: 'Pool',
        path: '/pool'
    }
]

interface MenuProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export default ({className, ...props}: MenuProps) => {
    const router = useRouter()

    return (
        <div className={"d-flex flex-column justify-content-center " + (className ?? "")} {...props}>
            <div className="nav navbar-nav d-flex flex-row bg-white rounded-4 p-1">
                { menuItems.map(({name, path}, idx) => (
                    <Link
                        key={idx}
                        href={path}
                    >
                        <div
                            className={"btn btn-outline-success border-0 py-2 px-3 rounded-4 " + (router.pathname.startsWith(path) ? "active" : "")}
                            style={{margin: '2px'}}
                        >
                            {name}
                        </div>
                    </Link>
                )) }
            </div>
        </div>
    )
}