import { IGKVData } from '../types/igkv';

export const igkvService = {
  getIGKVData: async (): Promise<IGKVData> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      news: [
        {
          id: 'news-1',
          date: '22/05/2026',
          category: 'Recruitment > Adhoc/Samvida',
          contentHindi: 'कृषि महाविद्यालय रायपुर के स्थापना दिवस पर होगा पूर्व अधिष्ठाताओं एवं पूर्व छात्रों का सम्मान - 22 मई को वार्षिक समारोह और छात्र संघ शपथ ग्रहण भी होगा'
        },
        {
          id: 'news-2',
          date: '21/05/2026',
          category: 'Press Release > Press Release',
          contentHindi: 'No. Estt-4/2026/596 dt 20/05/2026 - गणित - शासकीय सेवा में निरंतरता एवं कार्यभार ग्रहण'
        },
        {
          id: 'news-3',
          date: '15/05/2026',
          category: 'Governor Message',
          contentHindi: 'नए कृषि अनुसंधानों और नवाचारों से कृषि स्नातक बन सकते हैं देश की तरक्की में भागीदार: राज्यपाल। रायपुर, दिनांक 15 मई 2026। राज्यपाल श्री रमेन डेका ने कहा है कि देश के विकास में कृषि विश्वविद्यालयों की इसमें विशेष भूमिका है...'
        }
      ],
      stats: {
        facultyCount: 3,
        departmentCount: 12,
        studentCount: 12260,
        maleCount: 7033,
        femaleCount: 5227
      },
      constituentColleges: [
        { id: 'cc-1', name: 'College of Agriculture, Raipur', location: 'Raipur', type: 'constituent' },
        { id: 'cc-2', name: 'BTC College Of Agriculture and Research Station, Bilaspur', location: 'Bilaspur', type: 'constituent' },
        { id: 'cc-3', name: 'SG College of Agriculture & Res. Stn., Jagdalpur', location: 'Jagdalpur', type: 'constituent' },
        { id: 'cc-4', name: 'DKS College of Agriculture & Res. Stn., Bhatapara', location: 'Bhatapara', type: 'constituent' }
      ],
      affiliatedColleges: [
        { id: 'ac-1', name: 'Bhartiya College of Agriculture, Durg', location: 'Durg', type: 'affiliated' },
        { id: 'ac-2', name: 'Chhattisgarh College of Agriculture, Bhilai, Durg', location: 'Bhilai, Durg', type: 'affiliated' },
        { id: 'ac-3', name: 'Mahamaya College of Agriculture, Dhamtari', location: 'Dhamtari', type: 'affiliated' },
        { id: 'ac-4', name: 'Bhartiya College of Agril. Engg., Durg', location: 'Durg', type: 'affiliated' }
      ],
      departments: [
        { id: 'dept-1', name: 'Agri-Business Management' },
        { id: 'dept-2', name: 'Agricultural Economics' },
        { id: 'dept-3', name: 'Agricultural Statistics' },
        { id: 'dept-4', name: 'Agronomy' }
      ],
      krishiKendras: [
        { id: 'kvk-1', name: 'Krishi Vigyan Kendra Bilaspur', location: 'Bilaspur', isActive: true },
        { id: 'kvk-2', name: 'Krishi Vigyan Kendra Ambikapur', location: 'Ambikapur', isActive: true },
        { id: 'kvk-3', name: 'Krishi Vigyan Kendra Dhamtari', location: 'Dhamtari', isActive: true },
        { id: 'kvk-4', name: 'Krishi Vigyan Kendra Mahasamund', location: 'Mahasamund', isActive: true }
      ],
      events: [
        { id: 'evt-1', title: '11th Convocation Ceremony', imageUrl: '/images/event_convocation.jpg' },
        { id: 'evt-2', title: '11th Convocation Seating Plan', imageUrl: '/images/seating_plan.jpg' }
      ],
      visitorCount: 13580102
    };
  }
};
