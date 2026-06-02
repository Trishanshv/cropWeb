import { UserProfile } from '../types/profile';

export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      name: 'Tester',
      avatarUrl: '/images/avatar_logo.png', // Hexagon Crop Doctor logo inside
      userInfo: {
        phone: '6264631406',
        email: '-',
        gender: 'Male',
        address: 'India, Chhattisgarh, Durg, Durg'
      },
      crops: [
        {
          id: 'crop-1',
          name: 'Wheat',
          scientificName: 'Triticum aestivum',
          type: 'Cereal',
          svgPath: 'wheat'
        },
        {
          id: 'crop-2',
          name: 'Soybean / Gram',
          scientificName: 'Glycine max',
          type: 'Legume',
          svgPath: 'legume'
        },
        {
          id: 'crop-3',
          name: 'Safflower',
          scientificName: 'Carthamus tinctorius',
          type: 'Oilseed',
          svgPath: 'safflower'
        }
      ]
    };
  },

  updateProfile: async (updatedInfo: Partial<UserProfile['userInfo']>): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('Successfully updated profile info on backend (mock):', updatedInfo);
    return true;
  }
};
