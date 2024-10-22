import { Link } from "@/i18n/routing"
import { Menu } from '@headlessui/react'
import { LinkProps } from "next/link"
import { ComponentProps, ReactNode } from 'react'

interface DropdownLinkProps extends LinkProps {
  children: ReactNode
}

interface DropdownButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}

const DropdownLink = ({ children, ...props }: DropdownLinkProps) => (
  <Menu.Item>
    {({ active }) => (
      <Link
        {...props}
        locale={props.locale === false ? undefined : props.locale}
        className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
          active ? 'bg-gray-100' : ''
        } focus:outline-none transition duration-150 ease-in-out`}>
        {children}
      </Link>
    )}
  </Menu.Item>
)

export const DropdownButton = ({ children, ...props }: DropdownButtonProps) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
          active ? 'bg-gray-100' : ''
        } focus:outline-none transition duration-150 ease-in-out`}
        {...props}>
        {children}
      </button>
    )}
  </Menu.Item>
)

export default DropdownLink