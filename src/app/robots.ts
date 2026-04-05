import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://restoos.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/privado/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
