import {
  Cell,
  H1,
  H2,
  H3,
  H4,
  Head,
  HeadCell,
  Img,
  Link,
  OrderedList,
  Row,
  Table,
  TypographyBlockquote,
  TypographyP,
  UnOrderList,
} from '@/components/typography'
import { buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { Article } from '@/lib/content'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Link as RLink,
  ScrollRestoration,
  useLoaderData,
} from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

const HelpDetail = () => {
  const data = useLoaderData() as {
    article: Article
    prev?: Article
    next?: Article
  }

  const { t } = useTranslation('help')

  useDocumentTitle(
    t('page_title_detail', {
      title: data.article.title,
    }),
  )

  return (
    <div className='pt-header'>
      <div className='container py-6'>
        <ScrollRestoration />
        <div className='max-w-3xl mx-auto'>
          <div>
            <div className='mb-8'>
              <H1 className='mb-4'>{data.article.title}</H1>
              <div className='flex items-center gap-2'>
                <span className='text-muted-foreground text-sm'>
                  {format(new Date(data.article.date), 'MMMM dd, yyyy')}
                </span>
                <span className='font-semibold text-sm'>
                  By {data.article.author}
                </span>
              </div>
            </div>
            <div>
              {data.article.content({
                components: {
                  a: (props: any) => (
                    <Link
                      {...props}
                      to={(props.href as string) || props?.to || '#'}
                    />
                  ),
                  h1: (props: any) => <H1 {...props} />,
                  h2: (props: any) => <H2 {...props} />,
                  h3: (props: any) => <H3 {...props} />,
                  h4: (props: any) => <H4 {...props} />,
                  p: (props: any) => <TypographyP {...props} />,
                  blockquote: (props: any) => (
                    <TypographyBlockquote {...props} />
                  ),
                  ul: (props: any) => <UnOrderList {...props} />,
                  table: (props: any) => <Table {...props} />,
                  th: (props: any) => <HeadCell {...props} />,
                  tr: (props: any) => <Row {...props} />,
                  td: (props: any) => <Cell {...props} />,
                  thead: (props: any) => <Head {...props} />,
                  ol: (props: any) => <OrderedList {...props} />,
                  Img: (props: any) => {
                    return <Img {...props} />
                  },
                },
              })}
            </div>

            {data.prev || data.next ? (
              <div>
                <hr className='my-8' />
                <div className='flex flex-col gap-4'>
                  {data.prev ? (
                    <RLink
                      to={`${ROUTES.PUBLIC.HELP}/${data.prev.slug}`}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'min-h-16 justify-start gap-4 ',
                      )}
                    >
                      <ArrowLeft className='flex-shrink-0' />
                      <span className='whitespace-pre break-all line-clamp-1'>
                        {data.prev.title}
                      </span>
                    </RLink>
                  ) : null}
                  {data.next ? (
                    <RLink
                      to={`${ROUTES.PUBLIC.HELP}/${data.next.slug}`}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'min-h-16 justify-end gap-4',
                      )}
                    >
                      <span>{data.next.title}</span>
                      <ArrowRight />
                    </RLink>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpDetail
