import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {/* TODO: fonts, metadata */}
        {children}
      </body>
    </html>
  );
}
