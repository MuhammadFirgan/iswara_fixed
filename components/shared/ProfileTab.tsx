'use client'

import { useState } from "react";
import UploadFile from "./UploadFile";

export default function ProfileTab() {

    const [activeTab, setActiveTab] = useState('profile');
    const tabs = [
        { id: 'profile', label: 'Profile Info' },
        { id: 'security', label: 'Security'},
        // { id: 'profile', label: 'Profile Info', icon: User },
        // { id: 'security', label: 'Security', icon: Shield },
    
      ];
  return (
    <div>
  
      <div className="glass-effect rounded-2xl p-2 cyber-border">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            // const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-electric-500/20 to-purple-600/20 border border-electric-500/30 text-electric-500 shadow-lg shadow-electric-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {/* <Icon className="w-5 h-5" /> */}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'profile' && (
            <div className="space-y-8">
       
                <div className="glass-effect rounded-2xl p-8 cyber-border">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-3">
                    {/* <Camera className="w-6 h-6 text-electric-500" /> */}
                        <span>Profile Picture</span>
                    </h3>
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative group">
                    <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-electric-500 to-purple-600 rounded-full opacity-20 pulse-ring"></div>
                    {/* <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-electric-500/30 animate-glow relative z-10 floating"
                    /> */}
                    <div className="absolute inset-0 w-32 h-32 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    {/* <Camera className="w-8 h-8 text-white" /> */}
                    </div>
                </div>
                <UploadFile />
                </div>
            </div>

            {/* Personal Information */}
            <div className="glass-effect rounded-2xl p-8 cyber-border">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-white flex items-center space-x-3">
                        {/* <User className="w-6 h-6 text-electric-500" /> */}
                        <span>Personal Information</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Full Name</label>
                    <div className="relative">
                    {/* <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                    {/* <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 bg-dark-800 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 ${
                        isEditing 
                            ? 'border-gray-600 focus:border-electric-500 focus:outline-none' 
                            : 'border-gray-700 cursor-not-allowed opacity-75'
                        }`}
                    /> */}
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Email Address</label>
                    <div className="relative">
                    {/* <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                    {/* <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 bg-dark-800 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 ${
                        isEditing 
                            ? 'border-gray-600 focus:border-electric-500 focus:outline-none' 
                            : 'border-gray-700 cursor-not-allowed opacity-75'
                        }`}
                    /> */}
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Phone Number</label>
                    <div className="relative">
                    {/* <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 bg-dark-800 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 ${
                        isEditing 
                            ? 'border-gray-600 focus:border-electric-500 focus:outline-none' 
                            : 'border-gray-700 cursor-not-allowed opacity-75'
                        }`}
                    /> */}
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Address</label>
                    <div className="relative">
                    {/* <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 bg-dark-800 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 ${
                        isEditing 
                            ? 'border-gray-600 focus:border-electric-500 focus:outline-none' 
                            : 'border-gray-700 cursor-not-allowed opacity-75'
                        }`}
                    /> */}
                    </div>
                </div>
                </div>

                {/* Bio */}
                <div className="mt-6 space-y-2">
                <label className="block text-sm font-medium text-gray-300">Professional Bio</label>
                {/* <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={4}
                    className={`w-full px-4 py-3 bg-dark-800 border rounded-lg text-white placeholder-gray-400 resize-none transition-all duration-200 ${
                    isEditing 
                        ? 'border-gray-600 focus:border-electric-500 focus:outline-none' 
                        : 'border-gray-700 cursor-not-allowed opacity-75'
                    }`}
                    placeholder="Tell us about your professional background and expertise..."
                /> */}
                </div>

                {/* {isEditing && (
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-700">
                    <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 font-medium rounded-lg border border-gray-600 transition-all duration-200"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={handleProfileUpdate}
                    className="px-6 py-2 bg-gradient-to-r from-electric-500 to-purple-600 hover:from-electric-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center space-x-2"
                    >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                    </button>
                </div>
                )} */}
            </div>
            </div>
        )}
        {/* {activeTab === 'security' && renderSecurityTab()} */}
      
      </div>
    </div>
  )
}
