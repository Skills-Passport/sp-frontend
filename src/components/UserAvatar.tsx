import { UserType } from "@/types/auth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { getFullName } from "@/lib"
import { useMemo } from "react"

export default function UserAvatar({ user }: { user: UserType }) {
  const initails = getFullName(user)
    .split(" ")
    .map(n => n[0])
    .join("")

  // For now we dont use the user image because the user cant upload an image yet.
  const userImageUrl = user.image || "/user_image_placeholder.png"

  // Colors
  const colors = [
    { hex: '#4594D320' },
    { hex: '#D5E05B33' },
    { hex: '#878EF233' },
    { hex: '#F287B733' },
    { hex: '#45B97C33' }
  ];

  // Function to select a random color
  const getRandomColorStyle = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return {
      backgroundColor: randomColor.hex,
    };
  }

  // Memoize the color style to prevent changes on re-render
  const colorStyle = useMemo(() => getRandomColorStyle(), []);

  return (
    <Avatar>
      <AvatarImage src={""} />
      <AvatarFallback style={colorStyle}>{initails}</AvatarFallback>
    </Avatar>
  )
}
