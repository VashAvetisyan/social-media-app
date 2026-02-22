import React from 'react'
import { HomeIcon, HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, UserIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline"
import Image from 'next/image'
import SidebarUserInfo from './SidebarUserInfo'

const Sidebar = () => {


	return (
		<nav className='h-screen flex flex-col sticky  top-0 p-3 xl:ml-20 xl:mr-10'>
			<div className='h-full relative flex flex-col '>
				<div className='py-3'>
					<Image src={'/assets/logo.png'} width={56} height={56} alt='logo' />
				</div>
				<ul>
					<SidebarLink Icon={HomeIcon} text="Home" />
					<SidebarLink Icon={HashtagIcon} text="Explore" />
					<SidebarLink Icon={BellIcon} text="Notifications" />
					<SidebarLink Icon={InboxIcon} text="Messages" />
					<SidebarLink Icon={BookmarkIcon} text="Bookmarks" />
					<SidebarLink Icon={UserIcon} text="Profile" />
					<SidebarLink Icon={EllipsisHorizontalCircleIcon} text="More" />
				</ul>
				<SidebarUserInfo />
			</div>
		</nav>
	)
}

interface SidebarLinkProps {
	text: string,
	Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
		title?: string;
		titleId?: string;
	} & React.RefAttributes<SVGSVGElement>>;
}

function SidebarLink({ text, Icon }: SidebarLinkProps) {
	return (
		<li className='flex items-center text-xl mb-6 space-x-3 p-2.5'>
			<Icon className="h-7" />
			<span className='hidden xl:block'>{text}</span>
		</li>
	)
}


export default Sidebar