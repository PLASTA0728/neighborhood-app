// app/test-map/page.tsx (Next.js route)
'use client';

import dynamic from 'next/dynamic';

const TestMap = dynamic(() => import('../TestMap'), { ssr: false });

export default function Page() {
  return (
    <div className="w-full h-screen">
      <TestMap />
    </div>
  );
}
