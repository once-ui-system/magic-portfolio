"use client";
import { PersonalInfo } from '@/common/interface';
import { mapUserInfoToPersonalInfo } from '@/utils/userInfoMapper';
import React, { useEffect, useContext, useState } from 'react';

const PersonalInfoContext = React.createContext<PersonalInfo | undefined>(undefined);

export const PersonalInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/google-sheet');
        if (response.ok) {
          const result = await response.json();
          setPersonalInfo(mapUserInfoToPersonalInfo(result.data.values));
        } else {
          console.error('Failed to fetch personal info', response.status);
        }
      } catch (error) {
        console.error('Error fetching personal info:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <PersonalInfoContext.Provider value={personalInfo}>
      {children}
    </PersonalInfoContext.Provider>
  );
}

export const usePersonalInfo = () => {
  // const context = useContext(PersonalInfoContext);
  // if (!context) {
  //   throw new Error('usePersonalInfo must be used within a PersonalInfoProvider');
  // }
  // return context;
  return useContext(PersonalInfoContext);
}