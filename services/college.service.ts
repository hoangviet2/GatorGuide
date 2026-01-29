// services/college.service.ts
// College matching and data service
// Currently returns stub data, will connect to College Scorecard API later

import { isStubMode } from './config';

export type College = {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  tuition: number;
  size: 'small' | 'medium' | 'large';
  setting: 'urban' | 'suburban' | 'rural';
  admissionRate: number;
  programs: string[];
  matchScore?: number;
};

export type CollegeMatchCriteria = {
  major?: string;
  gpa?: string;
  testScores?: string;
  location?: string;
  budget?: string;
  size?: string;
  setting?: string;
  environment?: string;
};

class CollegeService {
  /**
   * Get college matches based on user criteria
   * STUB: Returns mock college data
   * TODO: Replace with College Scorecard API + Firebase Function
   */
  async getMatches(criteria: CollegeMatchCriteria): Promise<College[]> {
    if (isStubMode()) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return stub data
      return [
        {
          id: '1',
          name: 'University of Florida',
          location: { city: 'Gainesville', state: 'FL' },
          tuition: 28659,
          size: 'large',
          setting: 'suburban',
          admissionRate: 0.23,
          programs: ['Computer Science', 'Engineering', 'Business'],
          matchScore: 95,
        },
        {
          id: '2',
          name: 'Florida State University',
          location: { city: 'Tallahassee', state: 'FL' },
          tuition: 21683,
          size: 'large',
          setting: 'suburban',
          admissionRate: 0.32,
          programs: ['Computer Science', 'Liberal Arts', 'Engineering'],
          matchScore: 88,
        },
        {
          id: '3',
          name: 'University of Central Florida',
          location: { city: 'Orlando', state: 'FL' },
          tuition: 22467,
          size: 'large',
          setting: 'urban',
          admissionRate: 0.41,
          programs: ['Computer Science', 'Engineering', 'Hospitality'],
          matchScore: 82,
        },
      ];
    }

    // TODO: Real implementation
    // Call Firebase Function that queries College Scorecard API
    // const matches = await functions.httpsCallable('matchColleges')(criteria);
    // return matches.data;

    throw new Error('College Scorecard API not configured yet');
  }

  /**
   * Get detailed info for a specific college
   * STUB: Returns mock detail data
   * TODO: Replace with College Scorecard API lookup
   */
  async getCollegeDetails(collegeId: string): Promise<College> {
    if (isStubMode()) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        id: collegeId,
        name: 'University of Florida',
        location: { city: 'Gainesville', state: 'FL' },
        tuition: 28659,
        size: 'large',
        setting: 'suburban',
        admissionRate: 0.23,
        programs: ['Computer Science', 'Engineering', 'Business', 'Medicine', 'Law'],
      };
    }

    // TODO: Real implementation
    throw new Error('College Scorecard API not configured yet');
  }

  /**
   * Search colleges by name
   * STUB: Returns filtered stub data
   * TODO: Replace with College Scorecard search endpoint
   */
  async searchColleges(query: string): Promise<College[]> {
    if (isStubMode()) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const allColleges = await this.getMatches({});
      return allColleges.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // TODO: Real implementation
    throw new Error('College Scorecard API not configured yet');
  }
}

export const collegeService = new CollegeService();
