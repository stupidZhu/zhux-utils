import CommonUtil from "../CommonUtil/CommonUtil"

export const getBase64 = (file: File | Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export const downloadFile = (blob: Blob, fileName: string) => {
  const link = document.createElement("a")
  const href = URL.createObjectURL(blob)
  link.download = fileName
  link.style.display = "none"
  link.href = href
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(href)
}

export const translateUrl = (fileName: string, type: "addPrefix" | "removePrefix", baseUrl: string) => {
  if (!fileName) return fileName
  const regExp = /(^http(s?):\/\/)|(^\/\/)/
  if (type === "addPrefix") return regExp.test(fileName) ? fileName : baseUrl + fileName
  return regExp.test(fileName) ? fileName.replace(baseUrl, "") : fileName
}

export const _loadImage = (src: string): Promise<HTMLImageElement> => {
  const img = new Image()
  img.crossOrigin = "Anonymous"
  img.src = src

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = err => reject(err)
  })
}

export default { getBase64, downloadFile, translateUrl, loadImage: CommonUtil.addCacheWrapper(_loadImage) }
