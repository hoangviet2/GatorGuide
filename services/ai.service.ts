// services/ai.service.ts
// AI chat assistant service (Gemini API)
// Currently returns stub responses, will connect to Firebase Function + Gemini later

import { isStubMode } from './config';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

class AIService {
  /**
   * Send message to AI assistant and get response
   * STUB: Returns canned responses
   * TODO: Replace with Firebase Function that calls Gemini API
   */
  async chat(message: string, context?: string): Promise<ChatMessage> {
    if (isStubMode()) {
      // Simulate thinking delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Return stub response based on message keywords
      let response = this.getStubResponse(message);

      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
    }

    // TODO: Real implementation
    // Call Firebase Function that uses Gemini API
    // const result = await functions.httpsCallable('chatAssistant')({
    //   message,
    //   context,
    // });
    // return result.data;

    throw new Error('Gemini API not configured yet');
  }

  /**
   * Generate stub responses based on message content
   */
  private getStubResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('deadline') || lowerMessage.includes('application')) {
      return "Most colleges have application deadlines between November and January. Early Action/Early Decision deadlines are typically in November, while Regular Decision deadlines are in January. I recommend starting your applications at least 2 months before the deadline.";
    }

    if (lowerMessage.includes('essay') || lowerMessage.includes('personal statement')) {
      return "For college essays, focus on showing who you are rather than just listing achievements. Start with a compelling hook, share a specific story or experience, and reflect on what you learned. Most essays are 500-650 words. Would you like tips on brainstorming topics?";
    }

    if (lowerMessage.includes('recommendation') || lowerMessage.includes('letter')) {
      return "Ask teachers who know you well and can speak to your strengths. Approach them at least 4-6 weeks before the deadline. Provide them with your resume, goals, and specific things you'd like them to highlight. Don't forget to send a thank-you note!";
    }

    if (lowerMessage.includes('test') || lowerMessage.includes('sat') || lowerMessage.includes('act')) {
      return "Many colleges are now test-optional, but strong scores can still help your application. The SAT is scored out of 1600 and the ACT out of 36. Consider which format suits your strengths better. Most students take them in junior year with time for a retake if needed.";
    }

    if (lowerMessage.includes('financial aid') || lowerMessage.includes('scholarship')) {
      return "Fill out the FAFSA (Free Application for Federal Student Aid) as soon as possible after October 1st. Many colleges also require the CSS Profile. Look into merit scholarships at your target schools and search for external scholarships through sites like Fastweb and Scholarships.com.";
    }

    // Default response
    return "I'm here to help with your college transfer journey! I can assist with application deadlines, essay tips, recommendation letters, test prep, financial aid, and more. What specific questions do you have?";
  }

  /**
   * Generate personalized roadmap tasks based on user profile
   * STUB: Returns generic tasks
   * TODO: Use Gemini to generate personalized tasks
   */
  async generateRoadmap(userProfile: any): Promise<string[]> {
    if (isStubMode()) {
      await new Promise((resolve) => setTimeout(resolve, 800));

      return [
        'Research colleges that offer your major',
        'Request transcripts from current institution',
        'Draft personal statement about transfer reasons',
        'Identify 2-3 professors for recommendation letters',
        'Create spreadsheet tracking application deadlines',
        'Review transfer credit policies at target schools',
      ];
    }

    // TODO: Real implementation with Gemini
    throw new Error('Gemini API not configured yet');
  }
}

export const aiService = new AIService();
