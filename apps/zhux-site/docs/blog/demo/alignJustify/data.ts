import { IOption } from "zhux-utils/dist/type"

export const items: IOption[] = ["start", "center", "end", "stretch", ""].map(item => ({ label: item, value: item }))

export const content: IOption[] = ["start", "center", "end", "space-between", "space-evenly", "space-around", ""].map(
  item => ({
    label: item,
    value: item,
  })
)

export const radioList = [
  { name: "alignContent", radios: content },
  { name: "justifyContent", radios: content },
  // { name: "placeContent", radios: content },
  { name: "alignItems", radios: items },
  { name: "justifyItems", radios: items },
  // { name: "placeItems", radios: items },
  { name: "alignSelf", radios: items },
  { name: "justifySelf", radios: items },
  // { name: "placeSelf", radios: items },
]
