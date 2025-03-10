
import { createChatSession, createPaymentRecord } from "./chatSessionService";
import { createChatMessages, generateChatMessages } from "./chatMessageService";

/**
 * Create a free chat session between doctor and client with messages
 */
export const createFreeChatSession = async (doctorId: string, clientId: string, daysAgo: number, hoursAgo: number, conversationType: string = "consultation") => {
  // Create session with specified days ago and hours ago for last activity
  const sessionData = await createChatSession(clientId, doctorId, true, daysAgo, hoursAgo);
  
  // Calculate timestamp intervals
  const sessionStartTime = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).getTime();
  const sessionEndTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).getTime();
  
  // Generate chat messages
  const messages = generateChatMessages(
    sessionData.id, 
    doctorId, 
    clientId, 
    conversationType, 
    sessionStartTime, 
    sessionEndTime
  );
  
  await createChatMessages(sessionData.id, messages);
  return sessionData;
};

/**
 * Create a paid chat session between vendor and client with messages and payment
 */
export const createPaidChatSession = async (vendorId: string, clientId: string, daysAgo: number, hoursAgo: number, conversationType: string = "products") => {
  // Create session with specified days ago and hours ago for last activity
  const paidSessionData = await createChatSession(clientId, vendorId, false, daysAgo, hoursAgo);
  
  // Create payment record
  await createPaymentRecord(paidSessionData.id, clientId, vendorId);
  
  // Calculate timestamp intervals
  const sessionStartTime = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).getTime();
  const sessionEndTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).getTime();
  
  // Generate chat messages
  const messages = generateChatMessages(
    paidSessionData.id, 
    vendorId, 
    clientId, 
    conversationType, 
    sessionStartTime, 
    sessionEndTime
  );
  
  await createChatMessages(paidSessionData.id, messages);
  return paidSessionData;
};
