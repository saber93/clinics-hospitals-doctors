
# Chat Services Architecture

This directory contains all the services related to chat functionality in the application. The architecture follows a modular approach to improve maintainability and separation of concerns.

## Directory Structure

```
src/services/chat/
├── index.ts                # Main export file
├── sessionService.ts       # Re-exports session services (backwards compatibility)
├── fetchSessionService.ts  # Session retrieval operations
├── updateSessionService.ts # Session creation and update operations
├── messageService.ts       # Message CRUD operations
├── paymentService.ts       # Chat payment handling
├── settingsService.ts      # Global and doctor-specific chat settings
├── subscriptionService.ts  # Real-time message subscriptions
└── utils/                  # Utility functions
    └── sessionHelpers.ts   # Helper functions for session operations
```

## Service Overview

### Session Services

- **sessionService.ts**: Acts as a facade for backward compatibility, re-exporting functions from fetchSessionService and updateSessionService.
  
- **fetchSessionService.ts**: Handles all read operations for chat sessions.
  - `fetchUserChatSessions`: Retrieves all chat sessions for a user
  - `getChatSessionById`: Gets a specific chat session by ID
  - `checkFreeSessionExists`: Checks if a free session exists between a patient and doctor

- **updateSessionService.ts**: Handles all write operations for chat sessions.
  - `createChatSession`: Creates a new chat session
  - `updateSessionActivity`: Updates the last activity timestamp for a session
  - `markAllMessagesAsRead`: Marks all messages in a session as read

### Message Services

- **messageService.ts**: Manages chat message operations.
  - `fetchChatMessages`: Retrieves messages for a specific chat session
  - `sendChatMessage`: Sends a new message in a chat session
  - `markMessagesAsRead`: Marks messages as read for a specific user

### Payment Services

- **paymentService.ts**: Handles payment operations for chat sessions.
  - `createChatPayment`: Creates a payment record for a chat session
  - `updatePaymentStatus`: Updates the status of a payment
  - `getPaymentMethods`: Retrieves available payment methods

### Settings Services

- **settingsService.ts**: Manages global and doctor-specific chat settings.
  - `getGlobalChatSettings`: Retrieves global chat settings
  - `updateGlobalChatSettings`: Updates global chat settings
  - `getDoctorChatSettings`: Retrieves settings for a specific doctor
  - `createDoctorChatSettings`: Creates default settings for a doctor
  - `updateDoctorChatSettings`: Updates a doctor's chat settings

### Subscription Services

- **subscriptionService.ts**: Manages real-time subscriptions for chat messages.
  - `subscribeToMessages`: Sets up a real-time subscription for new chat messages

### Utilities

- **utils/sessionHelpers.ts**: Provides helper functions for chat session operations.
  - `extractName`: Safely extracts names from profile objects
  - `formatSessionData`: Formats session data from Supabase
  - `handleSessionError`: Standard error handler for chat session operations

## Data Flow

1. The application interacts with these services to perform chat-related operations.
2. The services use Supabase to interact with the database.
3. After database operations, the services format the data to match the application's type definitions.
4. The formatted data is then returned to the application.

## Error Handling

Error handling is standardized across all services:
- Errors are caught and logged
- User-friendly error messages are displayed using toast notifications
- Functions return appropriate fallback values (empty arrays, null, false, etc.)

## Type Safety

All services are strongly typed using TypeScript interfaces defined in `src/types/chat.ts`.
