import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jan Adrian V. Quintana's Portfolio",
    short_name: "Jan's Portfolio",
    description: "Portfolio of Jan Adrian V. Quintana",
    start_url: '/',
    display: 'standalone',
    background_color: '#333',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}