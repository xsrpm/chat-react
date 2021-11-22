import { useState } from 'react'

export const usePageVisibility = (
  pages = [{ name: 'welcome', visibility: true }]
) => {
  const [pageVisibility, setPageVisibility] = useState(pages)
  const pageChange = (pageName) => {
    const tmpPageVisibility = [...pageVisibility]
    tmpPageVisibility.forEach((page) => {
      if (page.name === pageName) {
        page.visibility = true
      } else {
        page.visibility = false
      }
    })
    setPageVisibility(tmpPageVisibility)
  }
  return [pageVisibility, pageChange]
}
