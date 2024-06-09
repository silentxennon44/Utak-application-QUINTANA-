import { Poppins } from 'next/font/google'
import "./globals.css";
import Providers from "@/store/provider/provider";
import { Toaster } from "react-hot-toast";
import '@/styles/reset.css'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Simple CRUD for Menu',
  description: 'an Adrian V. Quintana - Utak Application (Simple CRUD for Menu)',
  robots: 'follow, index',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName="toastContainer"
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: 'toast',
              duration: 2000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              // Default options for specific types
              success: {
                duration: 3000,
                // theme: {
                //   primary: 'green',
                //   secondary: 'black',
                // },
              },
            }}
          />
          </Providers>
      </body>
    </html>
  );
}
