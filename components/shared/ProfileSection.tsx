'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ResetPassword from './ResetPassword';

export default function ProfileSection() {
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
            <div className="w-40 sm:w-52">
              <Link href="/audio/1">
                <Image src="/horizontal.jpg" width={100} height={100} alt="cover audio" className="w-full aspect-square" />
                <h3 className="line-clamp-2 pt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus libero, atque suscipit quo error ullam consequatur magni totam excepturi
                  impedit.
                </h3>
              </Link>
            </div>
            <div className="w-40 sm:w-52">
              <Link href="/audio/1">
                <Image src="/horizontal.jpg" width={100} height={100} alt="cover audio" className="w-full aspect-square" />
                <h3 className="line-clamp-2 pt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus libero, atque suscipit quo error ullam consequatur magni totam excepturi
                  impedit.
                </h3>
              </Link>
            </div>
            <div className="w-40 sm:w-52">
              <Link href="/audio/1">
                <Image src="/horizontal.jpg" width={100} height={100} alt="cover audio" className="w-full aspect-square" />
                <h3 className="line-clamp-2 pt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus libero, atque suscipit quo error ullam consequatur magni totam excepturi
                  impedit.
                </h3>
              </Link>
            </div>
            <div className="w-40 sm:w-52">
              <Link href="/audio/1">
                <Image src="/horizontal.jpg" width={100} height={100} alt="cover audio" className="w-full aspect-square" />
                <h3 className="line-clamp-2 pt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus libero, atque suscipit quo error ullam consequatur magni totam excepturi
                  impedit.
                </h3>
              </Link>
            </div>
          </div>
        )}
        {activeTab === 'reset_password' && <ResetPassword />}
      </div>
    </section>
  );
}
