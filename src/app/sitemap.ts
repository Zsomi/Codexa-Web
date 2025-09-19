import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://codexa.hu',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://codexa.hu/en',
      lastModified: new Date(),
      changeFrequency: 'weekly', 
      priority: 0.8,
    },
  ]
}