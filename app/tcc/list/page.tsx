'use client';

import TccList from '@/app/components/TCC/TCCList';

export default function Tccpage(){
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 mb-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Lista de TCCs</h1>
        <TccList />
    </div>
  );
}


