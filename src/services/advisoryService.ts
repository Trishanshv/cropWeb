import { AdvisoryBulletin } from '../types/advisory';

export const advisoryService = {
  getBulletins: async (): Promise<AdvisoryBulletin[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: 'adv-1',
        title: 'Uploading of Daily weather data of Raipur station Month of April, 2026',
        publishDate: '05/05/2026',
        region: 'Chhattisgarh Plains',
        pdfLabel: 'April, 2026',
        pdfUrl: '/documents/April_2026.pdf'
      },
      {
        id: 'adv-2',
        title: 'Uploading of Daily weather data of Raipur station for the month of March, 2026.',
        publishDate: '02/04/2026',
        region: 'Chhattisgarh Plains',
        pdfLabel: 'March, 2026',
        pdfUrl: '/documents/March_2026.pdf'
      },
      {
        id: 'adv-3',
        title: 'Uploading of Daily weather data of Raipur station for the month of February, 2026.',
        publishDate: '02/03/2026',
        region: 'Chhattisgarh Plains',
        pdfLabel: 'February, 2026',
        pdfUrl: '/documents/February_2026.pdf'
      },
      {
        id: 'adv-4',
        title: 'Uploading of Daily weather data of Raipur station for the month of January, 2026.',
        publishDate: '03/02/2026',
        region: 'Chhattisgarh Plains',
        pdfLabel: 'January, 2026',
        pdfUrl: '/documents/January_2026.pdf'
      },
      {
        id: 'adv-5',
        title: 'Daily weather data of Raipur station for the month of December, 2025 regarding',
        publishDate: '02/01/2026',
        region: 'Chhattisgarh Plains',
        pdfLabel: 'Month of December 2025',
        pdfUrl: '/documents/December_2025.pdf'
      },
      {
        id: 'adv-6',
        title: 'Weather Based Agro-advisory bulletin for Bastar Plateau Zone of Chhattisgarh and Block level Agromet advisory bulletin for Bastar district - 09 December 2025',
        publishDate: '09/12/2025',
        region: 'Bastar Plateau',
        pdfLabel: '09 12 2025 BP',
        pdfUrl: '/documents/09_12_2025_BP.pdf'
      },
      {
        id: 'adv-7',
        title: 'Weather Based Agro-advisory bulletin for Chhattisgarh Plains Zone of Chhattisgarh - 09 December 2025',
        publishDate: '09/12/2025',
        region: 'Chhattisgarh Plains',
        pdfLabel: '09 12 2025 CP',
        pdfUrl: '/documents/09_12_2025_CP.pdf'
      },
      {
        id: 'adv-8',
        title: 'Weather Based Agro-advisory bulletin for Northern Hills Zone of Chhattisgarh and blocks of Surguja - 09 December 2025',
        publishDate: '09/12/2025',
        region: 'Northern Hills',
        pdfLabel: '09 12 2025 NH',
        pdfUrl: '/documents/09_12_2025_NH.pdf'
      }
    ];
  }
};
