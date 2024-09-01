import Cookies from "cookies"
import keys from "./keys"
const secret = process.env.SECRET.split("-")

export const setCookie = ({ cookieName, value, cookieMaxAge, req, res }) => {
  console.log("******SECRET", secret)
  const cookies = new Cookies(req, res, { keys: secret })
  cookies.set(cookieName, value, {
    httpOnly: true, // true by default
    maxAge: cookieMaxAge,
  })
}

export const clearAuthCookies = ({ req, res }) => {
  const cookies = new Cookies(req, res, { keys: secret })
  const { cookieName } = keys.cookie
  cookies.set(cookieName)
  cookies.set(`${cookieName}.sig`)
}
