export const format = {
  stringsArr(authors: string[] | undefined, flag: "authors" | "categories") {
    return authors?.map((elem, index) => {
      if (authors.length === index + 1) {
        return elem
      }
      let symbol = ""
      switch (flag) {
        case "authors":
          symbol = ","
          break
        case "categories":
          symbol = " /"
          break
      }
      return `${elem}${symbol} `
    })
  },
}
