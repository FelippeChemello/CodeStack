import { ReactNode } from 'react'
import {
    Block,
    ExtendedRecordMap,
    PageMap,
    RecordMap,
    BlockMap,
} from 'notion-types'
import { SearchNotion } from 'react-notion-x'

export * from 'notion-types'

export type PageError = {
    message?: string
    statusCode: number
}

export type PageProps = {
    site?: Site
    recordMap?: ExtendedRecordMap
    pageId?: string
    error?: PageError
}

export type Model = {
    id: string
    userId: string

    createdAt: number
    updatedAt: number
}

export type Site = Model & {
    name: string
    domain: string

    rootNotionPageId: string
    rootNotionSpaceId: string

    // settings
    html?: string
    fontFamily?: string
    darkMode?: boolean
    previewImages?: boolean

    // opengraph metadata
    description?: string
    image?: string

    timestamp: Date

    isDisabled: boolean
}

export type SiteMap = {
    site: Site
    pageMap: PageMap
    canonicalPageMap: CanonicalPageMap
}

export type CanonicalPageMap = {
    [canonicalPageId: string]: string
}

export type PageUrlOverridesMap = {
    // maps from a URL path to the notion page id the page should be resolved to
    // (this overrides the built-in URL path generation for these pages)
    [pagePath: string]: string
}

export type PageUrlOverridesInverseMap = {
    // maps from a notion page id to the URL path the page should be resolved to
    // (this overrides the built-in URL path generation for these pages)
    [pageId: string]: string
}

export type PreviewImage = {
    url: string
    originalWidth: number
    originalHeight: number
    width: number
    height: number
    type: string
    dataURIBase64: string

    error?: string
    statusCode?: number
}

export type PreviewImageMap = {
    [url: string]: PreviewImage
}

export type Breadcrumb = {
    active: boolean
    block: Block
    icon: string // URL or EMOJI
    pageId: string
    title: string
}

export type Header = {
    activePageId: string
    blockIds: string[]
    blockMap: BlockMap
    breadcrumbs: Breadcrumb[]
    className: string
    darkMode: boolean
    fullPage: boolean
    hasSearch: boolean
    isSearchOpen: boolean
    minTableOfContentsItems: number
    onCloseSearch: () => void
    onOpenSearch: () => void
    previewImages: boolean
    recordMap: RecordMap
    rootPageId: string
    searchNotion: SearchNotion
    setIsSearchOpen: (isSearchOpen: boolean) => void
    showCollectionViewDropdown: boolean
    showTableOfContents: boolean
    headerComponents: ReactNode[]
    isBlogPost: boolean
}
