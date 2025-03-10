
/**
 * Conversation templates for different chat types
 */
const conversationTemplates: Record<string, string[][]> = {
  "consultation": [
    // Doctor messages for consultation
    [
      "Hello! How can I help you today?",
      "Of course, I'd be happy to help. Could you describe the symptoms you're experiencing?",
      "Thank you for the details. Have you used any new skincare products or detergents recently?",
      "Based on what you've described, it sounds like contact dermatitis. I'd recommend stopping use of any new products and applying a mild hydrocortisone cream.",
      "You're welcome! If the symptoms persist for more than a week, please let me know and we can discuss next steps."
    ],
    // Patient messages for consultation
    [
      "Hi doctor, I have a question about my recent skin condition.",
      "I have a red rash that appeared yesterday. It's slightly itchy and on my forearm.",
      "Yes, I started using a new laundry detergent last week.",
      "That makes sense. I'll try that. How long should it take to clear up?",
      "Thank you so much for your help, doctor."
    ]
  ],
  "skin-condition": [
    // Doctor messages for skin condition
    [
      "Good day! I see you have questions about a skin condition?",
      "Acne can definitely be frustrating. Could you tell me about your current skincare routine?",
      "I see. First, I'd recommend a gentle cleanser with salicylic acid. Also, try to avoid touching your face throughout the day.",
      "For severe acne, we might need to consider prescription options. Would you be interested in discussing those?",
      "Great! I'll prepare some recommendations for our next session."
    ],
    // Patient messages for skin condition
    [
      "Hello doctor. I've been struggling with acne for months now.",
      "I use a basic face wash in the morning and night, and moisturize after. But I still get breakouts.",
      "Thank you for the advice. The breakouts are mainly on my cheeks and chin.",
      "Yes, I would be interested in learning about prescription options.",
      "Looking forward to it. Thank you!"
    ]
  ],
  "follow-up": [
    // Doctor messages for follow-up
    [
      "Hello again! How are you doing with the treatment we discussed last time?",
      "That's great to hear! Are there any side effects or concerns you'd like to discuss?",
      "That's quite normal. The dryness should subside as your skin adjusts to the treatment. Make sure to moisturize well.",
      "Perfect. Continue with the current regimen for two more weeks, then we'll reassess.",
      "You're welcome! Don't hesitate to reach out if you have any questions before our next check-in."
    ],
    // Patient messages for follow-up
    [
      "Hi doctor. The treatment is working well - my skin is much clearer!",
      "Just a little dryness around my nose and mouth. Is that normal?",
      "I'll make sure to apply more moisturizer in those areas.",
      "Sounds good. Thank you for the follow-up.",
      "Will do. Have a great day!"
    ]
  ],
  "products": [
    // Vendor messages for products
    [
      "Welcome to your paid consultation. How may I assist you today?",
      "For combination skin, I recommend a gentle cleanser, alcohol-free toner, lightweight moisturizer, and sunscreen during the day.",
      "I'd suggest trying our Balanced Skin line. The cleanser contains natural surfactants, and the moisturizer has hyaluronic acid for hydration without oiliness.",
      "SPF 30 or higher is essential, even on cloudy days. Our Clear Protection sunscreen is lightweight and won't clog pores.",
      "You're very welcome! Let me know how these products work for you after a few weeks of use."
    ],
    // Client messages for products
    [
      "Thank you. I'm looking for advice on a good skincare routine for combination skin.",
      "That sounds like a good routine. Do you have specific product recommendations?",
      "Those sound perfect. What about sunscreen? Is that important year-round?",
      "I'll definitely try these products. Thank you for the personalized recommendations.",
      "I will! Thank you for your expertise."
    ]
  ],
  "treatment-plan": [
    // Vendor messages for treatment plan
    [
      "Hello and welcome to your personalized skin consultation. What specific concerns would you like to address?",
      "Hyperpigmentation can be effectively treated with a combination of in-clinic treatments and at-home care. Let me outline a plan for you.",
      "I recommend a series of three chemical peels spaced 4 weeks apart, combined with daily use of vitamin C serum in the morning and retinol at night.",
      "Absolutely. I'll also include detailed instructions on how to gradually introduce retinol to minimize irritation.",
      "Perfect. I'm sending your treatment plan now. We can start with the first peel next week if that works for you."
    ],
    // Client messages for treatment plan
    [
      "Hi, I'm concerned about hyperpigmentation spots on my cheeks from sun damage.",
      "That sounds promising. Would this be aggressive? I have somewhat sensitive skin.",
      "That makes sense. Could you also include recommendations for sun protection?",
      "This is very comprehensive, thank you. How soon might I see results?",
      "Next week works great. I'm looking forward to starting the treatment."
    ]
  ]
};

/**
 * Get message content for a conversation
 */
export const getMessageContent = (conversationType: string, messageIndex: number, isDoctor: boolean) => {
  const conversation = conversationTemplates[conversationType] || conversationTemplates["consultation"];
  const messageArray = isDoctor ? conversation[0] : conversation[1];
  return messageArray[Math.min(messageIndex, messageArray.length - 1)];
};
