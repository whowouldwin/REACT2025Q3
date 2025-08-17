import '../index.css';
import '../App.css';
import React from 'react';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }];
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
