import { useEffect } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { privateRoutes, publicRoutes } from "."
import { useActions, useTypedSelector } from "@/shared/hooks"
import { RouteNames } from "@/shared/types"

const AppRouter = () => {
  const { isLogged } = useTypedSelector((state) => state.common)

  const { checkUserLogin } = useActions()

  useEffect(() => {
    checkUserLogin()
  }, [checkUserLogin, isLogged])

  return isLogged ? (
    <div className="app">
      <div className="wrap">
        <Routes>
          {privateRoutes.map((route) => (
            <Route path={route.path} element={<route.element />} key={route.path} />
          ))}

          <Route path="*" element={<Navigate to={RouteNames.HOME} />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div className="app">
      <Routes>
        {publicRoutes.map((route) => (
          <Route path={route.path} element={<route.element />} key={route.path} />
        ))}

        <Route path="*" element={<Navigate to={RouteNames.LOGIN} />} />
      </Routes>
    </div>
  )
}

export default AppRouter
