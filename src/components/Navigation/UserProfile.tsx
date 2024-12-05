"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { languageNames, Link, locales, usePathname, useRouter } from "@/i18n/routing"
import { useUser } from "@/providers/UserProvider"
import { LogOutIcon, UserIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import UserAvatar from "../UserAvatar"
import { Skeleton } from "../ui/skeleton"
import { getFullName } from "@/lib"
import { logout } from "@/lib/auth/client"
import { EXPIRED_SESSION_ROUTE } from "@/constants"

export default function UserProfile() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const t = useTranslations("general")
  let { user, deleteUser } = useUser()

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  if (!user) return <Skeleton className="w-10 h-10 rounded-full bg-border" />

  user.image = "https://xsgames.co/randomusers/avatar.php?g=male"

  const onLogout = async () => {
    await logout();
    router.push(`/${EXPIRED_SESSION_ROUTE}`);
    deleteUser();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" w-40">
        <DropdownMenuLabel className="pb-0">{getFullName(user)}</DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal pt-1">{user.role.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* View profile */}
        <Link href="#">
          <DropdownMenuItem>
            <UserIcon size={16} strokeWidth={2.5} />
            <span>{t("viewProfile")}</span>
          </DropdownMenuItem>
        </Link>

        {/* Langauges */}
        {locales.map(locale => {
          const countryCode = locale === "en" ? "gb" : locale
          return (
            <DropdownMenuItem key={locale} onClick={() => switchLanguage(locale)}>
              <Image src={`https://flagcdn.com/56x42/${countryCode}.png`} width={16} height={12} alt={locale} />
              <span>{languageNames[locale as keyof typeof languageNames]}</span>
            </DropdownMenuItem>
          )
        })}

        {/*Logout */}
        <DropdownMenuItem onClick={onLogout}>
          <LogOutIcon size={16} strokeWidth={2.5} />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
