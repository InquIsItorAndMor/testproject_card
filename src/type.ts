export interface TypeArticles {
    title: string
    date: string
    author: string
    description: string
    product: string
    visibility: string
    popularity: number
}

export interface TypeDB {
    data: TypeArticles[]
}

export interface TypeFilter {
    filterName: (keyof TypeArticles)[],
    db: TypeDB,
    card: TypeDB,
    setCard: React.Dispatch<React.SetStateAction<TypeDB>>
}