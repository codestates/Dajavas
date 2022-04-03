import loadable from '@loadable/component'
import React  from "react";

export const Home = loadable(() => import('./components/Home/Home'))
export const Ranking = loadable(() => import('./components/Nav/Ranking/Ranking'))
export const Map= loadable(() => import('./components/Nav/Map/Map'))
export const FishBoard = loadable(() => import('./components/Nav/FishBoard/FishBoard'))
export const FishData = loadable(() => import('./components/Sidebar/FishData'))
export const ClosedSeason = loadable(() => import('./components/Sidebar/ClosedSeason'))
export const CheckList = loadable(() => import('./components/Sidebar/CheckList'))
export const MyPage = loadable(() => import('./components/Sidebar/MyPage'))
export const BoardContent = loadable(() => import('./components/Nav/FishBoard/BoardContent'))
export const ErrorPage = loadable(() => import('./ErrorPage'))
export const Login = loadable(() => import('./components/Login/Login'))
export const Signup = loadable(() => import('./components/Login/Signup'))
export const UpdateFish = loadable(() => import('./components/Nav/FishBoard/UpdateFish'))

export const ClosedFishDataList = React.lazy(() => import("./components/Sidebar/ClosedFishDataList"));