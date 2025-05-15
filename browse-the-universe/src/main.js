import './style.css'
import {fetchAPOD}from "./api/api"
(async function () {
  const data = await fetchAPOD()
  console.log(data)
}) ()