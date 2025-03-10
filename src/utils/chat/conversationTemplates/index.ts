
// Export all conversation templates
import { consultationTemplate } from "./consultationTemplate";
import { skinConditionTemplate } from "./skinConditionTemplate";
import { followUpTemplate } from "./followUpTemplate";
import { productsTemplate } from "./productsTemplate";
import { treatmentPlanTemplate } from "./treatmentPlanTemplate";

/**
 * Conversation templates for different chat types
 */
export const conversationTemplates: Record<string, string[][]> = {
  "consultation": consultationTemplate,
  "skin-condition": skinConditionTemplate,
  "follow-up": followUpTemplate,
  "products": productsTemplate,
  "treatment-plan": treatmentPlanTemplate
};

/**
 * Get message content for a conversation
 */
export const getMessageContent = (conversationType: string, messageIndex: number, isDoctor: boolean) => {
  const conversation = conversationTemplates[conversationType] || conversationTemplates["consultation"];
  const messageArray = isDoctor ? conversation[0] : conversation[1];
  return messageArray[Math.min(messageIndex, messageArray.length - 1)];
};
