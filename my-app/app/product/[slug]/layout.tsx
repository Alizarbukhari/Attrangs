import PageLayout from '@/app/components/sliderNavebar';
import { ReactNode } from 'react';

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <div>
    <PageLayout/>
    {children}
    </div>;
}
