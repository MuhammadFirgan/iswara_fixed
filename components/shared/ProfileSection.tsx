'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ResetPassword from './ResetPassword';
import { Button } from '../ui/button';
import UploadFile from './UploadFile';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { User } from 'lucide-react';

interface User {
  fullName: string;
  email: string;
  nip: string;
  photo: string;
}

interface ProfileSectionProps {
  user: User;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  // const [activeTab, setActiveTab] = useState<'audio' | 'reset_password'>('audio');

  const tabs: { id: 'profile' | 'security'; label: string }[] = [
    { id: 'profile', label: 'Profile Info' },
    { id: 'security', label: 'Security' },
  ];
  

  return (
    <section className="pb-10">

      <div className="rounded-2xl p-2 cyber-border">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            // const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-transparent ${
                  isActive
                    ? 'border border-green-500/30 text-white shadow-lg shadow-green-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {/* <Icon className="w-5 h-5" /> */}
                <span>{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="animate-fade-in">
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <div className="hologram-effect rounded-2xl p-8 cyber-border">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-3 justify-center sm:justify-start">
              {/* <Camera className="w-6 h-6 text-green-500" /> */}
                <span>Profile Picture</span>
              </h3>
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative group">
                  <div className="absolute inset-0 w-32 h-32 bg-primary rounded-full opacity-20 animate-pulse"></div>
                  <Image
                    src={user.photo || '/profile.jpg'} 
                    width={200} 
                    height={200}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-green-500/30 animate-glow relative z-10 floating"
                  />
                </div>
                <UploadFile />
              </div>
            </div>

          {/* Personal Information */}
          <div className="glassmorphism-black rounded-2xl p-8 cyber-border">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-white flex items-center space-x-3">
                      <User className="w-6 h-6 text-green-500" />
                      <span>Personal Information</span>
                  </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                  <Label className="block text-sm font-medium text-gray-300">Full Name</Label>
                  <div className="relative">
                  
                    <Input
                        type="text"
                        value={user.fullName}
                        disabled
                        className="shad-input bg-black border-none w-full"
                    />
                  </div>
              </div>
              <div className="space-y-2">
                  <Label className="block text-sm font-medium text-gray-300">Email</Label>
                  <div className="relative">
                  
                    <Input
                        type="text"
                        value={user.email}
                        disabled
                        className="shad-input bg-black border-none w-full"
                    />
                  </div>
              </div>
              <div className="space-y-2">
                  <Label className="block text-sm font-medium text-gray-300">Nip</Label>
                  <div className="relative">
                  
                    <Input
                        type="text"
                        value={user.nip}
                        disabled
                        className="shad-input bg-black border-none w-full"
                    />
                  </div>
              </div>
              

            </div>

          </div>
          </div>
        )}
        {activeTab === 'security' && <ResetPassword />}
      
      </div>

      {/* <div className="mt-8">
        {activeTab === 'audio' && (
          <div className='flex justify-center gap-6 flex-wrap'>
            {audios.length > 0 ? (
              audios.map((audio: any) => (
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
      </div> */}
    </section>
  );
}
