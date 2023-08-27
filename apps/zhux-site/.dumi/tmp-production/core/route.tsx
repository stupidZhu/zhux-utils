// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from "react"

export async function getRoutes() {
  const routes = {
    "404": { id: "404", path: "*", parentId: "DocLayout" },
    "dumi-context-layout": { id: "dumi-context-layout", path: "/", isLayout: true },
    DocLayout: { id: "DocLayout", path: "/", parentId: "dumi-context-layout", isLayout: true },
    "docs/utils-doc/CreatePortalHelper": {
      path: "utils-doc/create-portal-helper",
      id: "docs/utils-doc/CreatePortalHelper",
      parentId: "DocLayout",
    },
    "docs/utils-doc/useWhyDidYouRender": {
      path: "utils-doc/use-why-did-you-render",
      id: "docs/utils-doc/useWhyDidYouRender",
      parentId: "DocLayout",
    },
    "docs/utils-doc/ListenValueHelper": {
      path: "utils-doc/listen-value-helper",
      id: "docs/utils-doc/ListenValueHelper",
      parentId: "DocLayout",
    },
    "docs/utils-doc/useCtrlComponent": {
      path: "utils-doc/use-ctrl-component",
      id: "docs/utils-doc/useCtrlComponent",
      parentId: "DocLayout",
    },
    "docs/utils-doc/useCustomFields": {
      path: "utils-doc/use-custom-fields",
      id: "docs/utils-doc/useCustomFields",
      parentId: "DocLayout",
    },
    "docs/utils-doc/useStorageStore": {
      path: "utils-doc/use-storage-store",
      id: "docs/utils-doc/useStorageStore",
      parentId: "DocLayout",
    },
    "docs/utils-doc/useStorageValue": {
      path: "utils-doc/use-storage-value",
      id: "docs/utils-doc/useStorageValue",
      parentId: "DocLayout",
    },
    "docs/utils-doc/useWatchEffect": {
      path: "utils-doc/use-watch-effect",
      id: "docs/utils-doc/useWatchEffect",
      parentId: "DocLayout",
    },
    "docs/utils-doc/StorageHelper": {
      path: "utils-doc/storage-helper",
      id: "docs/utils-doc/StorageHelper",
      parentId: "DocLayout",
    },
    "docs/utils-doc/useOnceEffect": {
      path: "utils-doc/use-once-effect",
      id: "docs/utils-doc/useOnceEffect",
      parentId: "DocLayout",
    },
    "docs/utils-doc/usePagination": {
      path: "utils-doc/use-pagination",
      id: "docs/utils-doc/usePagination",
      parentId: "DocLayout",
    },
    "docs/utils-doc/useScrollUtil": {
      path: "utils-doc/use-scroll-util",
      id: "docs/utils-doc/useScrollUtil",
      parentId: "DocLayout",
    },
    "docs/utils-doc/useStoreState": {
      path: "utils-doc/use-store-state",
      id: "docs/utils-doc/useStoreState",
      parentId: "DocLayout",
    },
    "docs/utils-doc/useAsyncMemo": {
      path: "utils-doc/use-async-memo",
      id: "docs/utils-doc/useAsyncMemo",
      parentId: "DocLayout",
    },
    "docs/utils-doc/CatchHelper": {
      path: "utils-doc/catch-helper",
      id: "docs/utils-doc/CatchHelper",
      parentId: "DocLayout",
    },
    "docs/utils-doc/useDateTime": {
      path: "utils-doc/use-date-time",
      id: "docs/utils-doc/useDateTime",
      parentId: "DocLayout",
    },
    "docs/utils-doc/CommonUtil": { path: "utils-doc/common-util", id: "docs/utils-doc/CommonUtil", parentId: "DocLayout" },
    "docs/utils-doc/useDialog": { path: "utils-doc/use-dialog", id: "docs/utils-doc/useDialog", parentId: "DocLayout" },
    "docs/blog/align-justify": { path: "blog/align-justify", id: "docs/blog/align-justify", parentId: "DocLayout" },
    "docs/blog/githubActions": { path: "blog/github-actions", id: "docs/blog/githubActions", parentId: "DocLayout" },
    "docs/utils-doc/type": { path: "utils-doc/type", id: "docs/utils-doc/type", parentId: "DocLayout" },
    "docs/blog/hook-1": { path: "blog/hook-1", id: "docs/blog/hook-1", parentId: "DocLayout" },
    "docs/blog/hook-2": { path: "blog/hook-2", id: "docs/blog/hook-2", parentId: "DocLayout" },
    "docs/blog/resume": { path: "blog/resume", id: "docs/blog/resume", parentId: "DocLayout" },
    "docs/blog/rollup": { path: "blog/rollup", id: "docs/blog/rollup", parentId: "DocLayout" },
    "docs/blog/order": { path: "blog/order", id: "docs/blog/order", parentId: "DocLayout" },
    "docs/blog/blog": { path: "blog/blog", id: "docs/blog/blog", parentId: "DocLayout" },
    "docs/blog/lint": { path: "blog/lint", id: "docs/blog/lint", parentId: "DocLayout" },
    "docs/index": { path: "", id: "docs/index", parentId: "DocLayout" },
    "demo-render": { id: "demo-render", path: "~demos/:id", parentId: "dumi-context-layout", prerender: false },
  } as const
  return {
    routes,
    routeComponents: {
      "404": React.lazy(() => import(/* webpackChunkName: "dumi__pages__404" */ "@/dumi__pages/404")),
      "dumi-context-layout": React.lazy(
        () => import(/* webpackChunkName: "dumi__theme__ContextWrapper" */ "@/dumi__theme/ContextWrapper")
      ),
      DocLayout: React.lazy(
        () => import(/* webpackChunkName: "dumi__theme__layouts__DocLayout" */ "@/dumi__theme/layouts/DocLayout")
      ),
      "docs/utils-doc/CreatePortalHelper": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__CreatePortalHelper.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/CreatePortalHelper.md"
          )
      ),
      "docs/utils-doc/useWhyDidYouRender": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useWhyDidYouRender.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useWhyDidYouRender.md"
          )
      ),
      "docs/utils-doc/ListenValueHelper": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__ListenValueHelper.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/ListenValueHelper.md"
          )
      ),
      "docs/utils-doc/useCtrlComponent": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useCtrlComponent.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useCtrlComponent.md"
          )
      ),
      "docs/utils-doc/useCustomFields": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useCustomFields.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useCustomFields.md"
          )
      ),
      "docs/utils-doc/useStorageStore": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useStorageStore.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useStorageStore.md"
          )
      ),
      "docs/utils-doc/useStorageValue": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useStorageValue.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useStorageValue.md"
          )
      ),
      "docs/utils-doc/useWatchEffect": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useWatchEffect.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useWatchEffect.md"
          )
      ),
      "docs/utils-doc/StorageHelper": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__StorageHelper.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/StorageHelper.md"
          )
      ),
      "docs/utils-doc/useOnceEffect": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useOnceEffect.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useOnceEffect.md"
          )
      ),
      "docs/utils-doc/usePagination": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__usePagination.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/usePagination.md"
          )
      ),
      "docs/utils-doc/useScrollUtil": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useScrollUtil.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useScrollUtil.md"
          )
      ),
      "docs/utils-doc/useStoreState": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useStoreState.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useStoreState.md"
          )
      ),
      "docs/utils-doc/useAsyncMemo": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useAsyncMemo.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useAsyncMemo.md"
          )
      ),
      "docs/utils-doc/CatchHelper": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__CatchHelper.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/CatchHelper.md"
          )
      ),
      "docs/utils-doc/useDateTime": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useDateTime.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useDateTime.md"
          )
      ),
      "docs/utils-doc/CommonUtil": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__CommonUtil.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/CommonUtil.md"
          )
      ),
      "docs/utils-doc/useDialog": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__useDialog.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/useDialog.md"
          )
      ),
      "docs/blog/align-justify": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__blog__align-justify.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/blog/align-justify.md"
          )
      ),
      "docs/blog/githubActions": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__blog__githubActions.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/blog/githubActions.md"
          )
      ),
      "docs/utils-doc/type": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__utils-doc__type.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/utils-doc/type.md"
          )
      ),
      "docs/blog/hook-1": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__blog__hook-1.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/blog/hook-1.md"
          )
      ),
      "docs/blog/hook-2": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__blog__hook-2.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/blog/hook-2.md"
          )
      ),
      "docs/blog/resume": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__blog__resume.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/blog/resume.md"
          )
      ),
      "docs/blog/rollup": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__blog__rollup.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/blog/rollup.md"
          )
      ),
      "docs/blog/order": React.lazy(
        () =>
          import(
            /* webpackChunkName: "docs__blog__order.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/blog/order.md"
          )
      ),
      "docs/blog/blog": React.lazy(
        () =>
          import(/* webpackChunkName: "docs__blog__blog.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/blog/blog.md")
      ),
      "docs/blog/lint": React.lazy(
        () =>
          import(/* webpackChunkName: "docs__blog__lint.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/blog/lint.md")
      ),
      "docs/index": React.lazy(
        () => import(/* webpackChunkName: "docs__index.md" */ "D:/code/@turbo/zhux-utils/apps/zhux-site/docs/index.md")
      ),
      "demo-render": React.lazy(() => import(/* webpackChunkName: "dumi__pages__Demo" */ "@/dumi__pages/Demo")),
    },
  }
}
