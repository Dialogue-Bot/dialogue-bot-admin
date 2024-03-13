import i18n from '@/i18n'

export type Article = {
  title: string
  description: string
  slug: string
  date: string
  content: any
  path: string
  author: string
}

export const getAllArticles = async ({
  limit,
  page,
  q,
}: {
  q?: string
  limit?: number
  page?: number
}) => {
  const articleFilenames = import.meta.glob(`../contents/*.mdx`, {
    eager: true,
  })

  let articles = await Promise.all(
    Object.entries(articleFilenames).map(([path, _importer]) => {
      const { article, default: content } = _importer as {
        article: Article
        default: any
      }

      return {
        ...article,
        slug: path
          .replace('.mdx', '')
          .replace('../contents/', '')
          .replace('.en', '')
          .replace('.vi', ''),
        content,
        path,
      }
    }),
  )

  if (q) {
    articles = articles.filter((article) =>
      article.title.toLowerCase().includes(q.toLowerCase()),
    )
  }

  if (limit && page) {
    articles = articles.slice(page - 1, page * limit)
  }

  return articles.filter((article) =>
    article.path.includes(`.${i18n.language}.mdx`),
  )
}

export const getArticle = async (slug: string) => {
  const articles = await getAllArticles({})

  const articleIndex = articles.findIndex((article) => article.slug === slug)

  return {
    article: articles[articleIndex],
    prev: articles[articleIndex - 1],
    next: articles[articleIndex + 1],
  }
}
