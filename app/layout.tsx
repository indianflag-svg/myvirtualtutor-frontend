import './globals.css'

export const metadata = {
  title: 'MyVirtualTutor',
  description: 'AI Math Tutor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="efge52wviyH_a21ytGJzKA_HUTt5p3Cysu67JZ9da_M" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
