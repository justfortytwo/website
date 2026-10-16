import { pages, type PageKey } from '~/data/pages'
import { site } from '~/data/site'

/** Per-page meta, canonical and (for inner pages) WebPage + breadcrumb JSON-LD. */
export function usePageSeo(key: PageKey) {
  const p = pages[key]
  const url = key === 'home' ? `${site.url}/` : `${site.url}${p.path}`
  useSeoMeta({
    title: p.title,
    description: p.description,
    ogTitle: p.ogTitle,
    ogDescription: p.ogDescription,
    ogType: 'website',
    ogUrl: url,
    ogImage: '/og.png',
    twitterCard: 'summary_large_image',
    twitterTitle: p.ogTitle,
    twitterDescription: p.ogDescription,
    twitterImage: '/og.png',
  })
  const script = key === 'home' ? [] : [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [{
        '@type': 'WebPage',
        name: p.title,
        description: p.description,
        url,
        isPartOf: { '@type': 'WebSite', name: site.name, url: `${site.url}/` },
      }, {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: site.name, item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name: p.label, item: url },
        ],
      }],
    }),
  }]
  useHead({ link: [{ rel: 'canonical', href: url }], script })
}
