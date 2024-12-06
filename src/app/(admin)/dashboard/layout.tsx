import StoreProvider from '@/app/components/StoreProvider';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  );
}