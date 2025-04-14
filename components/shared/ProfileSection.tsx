'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ResetPassword from './ResetPassword';

interface Audio {
  _id: string;
  thumbnail: string;
  slug: string;
  title: string;
}

export default function ProfileSection(data: Array<Audio>) {
  const [activeTab, setActiveTab] = useState<'audio' | 'reset_password'>('audio');
  

  return (
    <section className="pb-10">
      <div className="flex gap-3">
        <span
          className={`text-sm cursor-pointer ${activeTab === 'audio' ? 'font-bold text-primary' : ''}`}
          onClick={() => setActiveTab('audio')}
        >
          Audio Saya
        </span>
        <span
          className={`text-sm cursor-pointer ${activeTab === 'reset_password' ? 'font-bold text-primary' : ''}`}
          onClick={() => setActiveTab('reset_password')}
        >
          Ubah Password
        </span>
      </div>

      <div className="mt-8">
        {activeTab === 'audio' && (
          <div className='flex justify-center gap-6 flex-wrap'>
            {data.audios.length > 0 ? (
              data.audios.map((audio: any) => (
                <div className="w-40 sm:w-52" key={audio._id}>
                  <Link href={`/audio/${audio.slug}`}>
                    <Image src={audio.thumbnail} width={100} height={100} alt="cover audio" className="w-full aspect-square" />
                    <h3 className="line-clamp-2 pt-4">
                      {audio.title}
                    </h3>
                  </Link>
                </div>
              ))
            ) : (
              <h5 className="text-xl text-center text-white">Belum Ada Music yang dibuat</h5>
            )}
          </div>
        )}
        {activeTab === 'reset_password' && <ResetPassword />}
      </div>
    </section>
  );
}
