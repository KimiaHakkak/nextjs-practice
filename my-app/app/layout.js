import QueryProvider from "./providers";
import ColorModeProvider from "./theme-provider";
import { Geist, Geist_Mono } from "next/font/google"; 
import "@/styles/globals.css";                        

const geistSans = Geist({                             
  variable: "--font-geist-sans",                      
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {                            

  title: "Weather App",
  description: "Next.js + MUI + TanStack Query demo",
};

export default function RootLayout({ children }) {    
  
  return (                                           
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
        style={{ margin: 0 }}
      >
            <QueryProvider>
              <ColorModeProvider>
                {children}
              </ColorModeProvider>
            </QueryProvider>                                                         
      </body>                                                                 
    </html>
  );                                     
}