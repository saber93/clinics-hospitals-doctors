
// Re-export all session services from their respective files
// This maintains backward compatibility

export {
  fetchUserChatSessions,
  getChatSessionById,
  checkFreeSessionExists
} from './fetchSessionService';

export {
  createChatSession,
  updateSessionActivity,
  markAllMessagesAsRead
} from './updateSessionService';
