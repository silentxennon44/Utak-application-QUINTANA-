import { MetadataRoute } from 'next'
import moment from "moment";
import { getGitInfo } from '@/utils/getGitInfo';


 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://portfolio-silentxennon44.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}