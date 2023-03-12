import { isEqual } from "lodash"
import { CommonUtil } from "zhux-utils"

const { children2pid, pid2children } = CommonUtil.TreeTransform

const tree = [
  {
    id: "1",
    children: [{ id: "1-1" }, { id: "1-2", children: [{ id: "1-2-1" }, { id: "1-2-2" }] }],
  },
  { id: "2" },
]

const rawTree = [
  { id: "1" },
  { id: "1-1", pid: "1" },
  { id: "1-2", pid: "1" },
  { id: "1-2-1", pid: "1-2" },
  { id: "1-2-2", pid: "1-2" },
  { id: "2" },
]

const t = [
  {
    MyId: "1",
    MyChildren: [{ MyId: "1-1" }, { MyId: "1-2", MyChildren: [{ MyId: "1-2-1" }, { MyId: "1-2-2" }] }],
  },
  { MyId: "2" },
]

const rt = [
  { MyId: "1" },
  { MyId: "1-1", MyPid: "1" },
  { MyId: "1-2", MyPid: "1" },
  { MyId: "1-2-1", MyPid: "1-2" },
  { MyId: "1-2-2", MyPid: "1-2" },
  { MyId: "2" },
]

const TestTree = () => {
  return (
    <div>
      <button
        onClick={() => {
          const _tree = pid2children(children2pid(tree))
          console.log(_tree, tree, _tree === tree, isEqual(_tree, tree))
        }}
      >
        test1
      </button>
      <button
        onClick={() => {
          const _rawTree = children2pid(pid2children(rawTree))
          console.log(_rawTree, rawTree, _rawTree === rawTree, isEqual(_rawTree, rawTree))
        }}
      >
        test2
      </button>
      <button
        onClick={() => {
          console.log(pid2children(rt, { idStr: "MyId", pidStr: "MyPid", childrenStr: "MyChildren" }))
          console.log(children2pid(t, { idStr: "MyId", pidStr: "MyPid", childrenStr: "MyChildren" }))
        }}
      >
        testOptions
      </button>
    </div>
  )
}

export default TestTree
