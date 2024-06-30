import {MenuItem} from '@/types/menu'
import {FC, useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {NavLink, matchPath, useLocation, useParams} from 'react-router-dom'

interface Props {
    className?: string
    item: MenuItem
}

const MenuItem: FC<Props> = ({className = '', item}) => {
    const {user} = useSelector((state: any) => state.auth)

    const menuItemRef = useRef<HTMLLIElement>(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    let {'*': slug} = useParams()
    const {pathname} = useLocation()

    useEffect(() => {
        if (
            item.subMenu &&
            item.subMenu.filter((_item) => {
                return (
                    pathname?.includes(_item.path as string) ||
                    (item.additionalChildRoutes?.filter(
                        (route) => route.includes(pathname as string) || matchPath(route, pathname)
                    )?.length as number) > 0
                )
            }).length > 0
        ) {
            setDropdownOpen(true)
        } else if (item.subMenu || menuItemRef.current?.classList.contains('mm-active')) {
            setDropdownOpen(false)
            menuItemRef.current?.classList.remove('mm-active')
            if (menuItemRef.current?.firstChild) {
                // @ts-ignore
                menuItemRef.current?.firstChild?.setAttribute('aria-expanded', 'false')
            }
        }
    }, [pathname])

    return (
        <li ref={menuItemRef}>
            {item.subMenu ? (
                <NavLink
                    to='#'
                    className={
                        'font-medium hover:text-white has-arrow text-[#9CA3AF] text-base flex items-center gap-3 px-4 py-3 rounded-[4px] hover:bg-[#2A2D32]'
                    }
                >
                    {item.icon && <item.icon className='h-5 w-5 hover:!text-white' />}
                    <span className='leading-none hover:!text-white'>{item.name}</span>
                </NavLink>
            ) : (
                <NavLink
                    to={item.path}
                    className={({isActive}) => {
                        return `${className} font-medium text-base flex items-center gap-3 px-4 py-3 my-1 rounded-[4px] ${
                            isActive
                                ? 'bg-[#2A2D32] hover:bg-[#2A2D32] !text-white focus:no-underline'
                                : 'hover:bg-[#2A2D32] hover:!text-white text-[#9CA3AF]'
                        }`
                    }}
                >
                    {item.icon && <item.icon className='h-5 w-5 ' />}
                    <span className='leading-none '>{item.name}</span>
                </NavLink>
            )}

            {item.subMenu && (
                <ul className={`ml-8 ${dropdownOpen ? 'mm-show' : 'mm-collapse'}`}>
                    {item.subMenu.map((_item: any, index: number) => {
                        return <MenuItem item={_item} key={index} />
                    })}
                </ul>
            )}
        </li>
    )
}

export default MenuItem
