
import { supabase } from "@/integrations/supabase/client";
import { formatDateString } from "./dateUtils";

/**
 * Create chat settings if they don't exist
 */
export const createChatSettings = async () => {
  console.log("Creating chat settings...");
  try {
    let { data: existingSettings } = await supabase
      .from('chat_settings')
      .select()
      .limit(1);
      
    if (!existingSettings || existingSettings.length === 0) {
      const { error: settingsError } = await supabase
        .from('chat_settings')
        .insert({
          default_session_price: 50,
          default_commission_percentage: 15,
          session_duration_days: 7
        });
        
      if (settingsError) {
        console.error("Error creating chat settings:", settingsError);
        throw new Error(settingsError.message || 'Unknown error creating chat settings');
      }
      
      console.log("Chat settings created successfully");
    } else {
      console.log("Chat settings already exist, skipping creation");
    }
  } catch (error) {
    console.error("Error checking/creating chat settings:", error);
    throw error;
  }
};

/**
 * Create doctor chat settings
 */
export const createDoctorChatSettings = async (doctorId: string) => {
  console.log("Creating doctor chat settings...");
  try {
    // Check if settings already exist for this doctor
    const { data: existingSettings } = await supabase
      .from('doctor_chat_settings')
      .select()
      .eq('doctor_id', doctorId)
      .maybeSingle();
      
    if (existingSettings) {
      console.log("Doctor chat settings already exist, updating instead of creating");
    }
    
    const { error: doctorSettingsError } = await supabase
      .from('doctor_chat_settings')
      .upsert({
        doctor_id: doctorId,
        offers_free_consultation: true,
        session_price: 85
      });
      
    if (doctorSettingsError) {
      console.error("Error creating doctor chat settings:", doctorSettingsError);
      throw new Error(doctorSettingsError.message || 'Unknown error creating doctor chat settings');
    }
    
    console.log("Doctor chat settings created successfully");
  } catch (error) {
    console.error("Error creating doctor chat settings:", error);
    throw error;
  }
};

/**
 * Create vendor doctor chat settings
 */
export const createVendorDoctorSettings = async (vendorId: string) => {
  console.log("Creating vendor doctor chat settings...");
  try {
    // Check if settings already exist for this vendor
    const { data: existingSettings } = await supabase
      .from('doctor_chat_settings')
      .select()
      .eq('doctor_id', vendorId)
      .maybeSingle();
      
    if (existingSettings) {
      console.log("Vendor doctor chat settings already exist, updating instead of creating");
    }
    
    const { error: vendorSettingsError } = await supabase
      .from('doctor_chat_settings')
      .upsert({
        doctor_id: vendorId,
        offers_free_consultation: true,
        session_price: 75
      });
      
    if (vendorSettingsError) {
      console.error("Error creating vendor doctor chat settings:", vendorSettingsError);
      throw new Error(vendorSettingsError.message || 'Unknown error creating vendor doctor chat settings');
    }
    
    console.log("Vendor doctor chat settings created successfully");
  } catch (error) {
    console.error("Error creating vendor doctor settings:", error);
    throw error;
  }
};

/**
 * Create a chat session
 */
export const createChatSession = async (patientId: string, doctorId: string, isFree: boolean, daysAgo: number, hoursAgo: number) => {
  console.log("Creating chat session...");
  try {
    // Check if doctor and patient exist before creating session
    const { data: doctorExists, error: doctorError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', doctorId)
      .maybeSingle();
      
    if (doctorError || !doctorExists) {
      throw new Error(`Doctor with ID ${doctorId} does not exist`);
    }
    
    const { data: patientExists, error: patientError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', patientId)
      .maybeSingle();
      
    if (patientError || !patientExists) {
      throw new Error(`Patient with ID ${patientId} does not exist`);
    }
    
    // Check if session already exists between these users
    const { data: existingSession } = await supabase
      .from('chat_sessions')
      .select('id')
      .eq('patient_id', patientId)
      .eq('doctor_id', doctorId)
      .maybeSingle();
      
    if (existingSession) {
      console.log("Chat session already exists between these users, skipping creation");
      return existingSession;
    }
    
    const { data: sessionData, error: sessionError } = await supabase
      .from('chat_sessions')
      .insert({
        patient_id: patientId,
        doctor_id: doctorId,
        is_free: isFree,
        status: 'active',
        started_at: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        last_activity: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString()
      })
      .select()
      .single();
      
    if (sessionError) {
      console.error("Error creating chat session:", sessionError);
      throw new Error(sessionError.message || 'Unknown error creating chat session');
    }
    
    console.log("Chat session created successfully:", sessionData);
    return sessionData;
  } catch (error) {
    console.error("Error creating chat session:", error);
    throw error;
  }
};

/**
 * Create chat messages for a session
 */
export const createChatMessages = async (sessionId: string, messages: any[]) => {
  console.log("Creating chat messages...");
  
  const { error: messagesError } = await supabase
    .from('chat_messages')
    .insert(messages);
    
  if (messagesError) {
    console.error("Error creating chat messages:", messagesError);
    throw new Error(messagesError.message || 'Unknown error creating chat messages');
  }
  
  console.log("Chat messages created successfully");
};

/**
 * Generate message content based on conversation type
 */
const getMessageContent = (conversationType: string, messageIndex: number, isDoctor: boolean) => {
  const templates: Record<string, string[][]> = {
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

  const conversation = templates[conversationType] || templates["consultation"];
  const messageArray = isDoctor ? conversation[0] : conversation[1];
  return messageArray[Math.min(messageIndex, messageArray.length - 1)];
};

/**
 * Create a free chat session between doctor and client with messages
 */
export const createFreeChatSession = async (doctorId: string, clientId: string, daysAgo: number, hoursAgo: number, conversationType: string = "consultation") => {
  // Create session with specified days ago and hours ago for last activity
  const sessionData = await createChatSession(clientId, doctorId, true, daysAgo, hoursAgo);
  
  // Create realistic chat messages based on conversation type
  const messagesCount = 5; // Number of messages to create
  const messages = [];
  
  // Calculate timestamp intervals
  const sessionStartTime = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).getTime();
  const sessionEndTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).getTime();
  const timeInterval = (sessionEndTime - sessionStartTime) / (messagesCount * 2);
  
  // Create alternating messages between doctor and client
  for (let i = 0; i < messagesCount; i++) {
    // Doctor message
    messages.push({
      session_id: sessionData.id,
      sender_id: doctorId,
      message: getMessageContent(conversationType, i, true),
      is_read: i < messagesCount - 1, // Last message might be unread
      created_at: new Date(sessionStartTime + timeInterval * (i * 2)).toISOString()
    });
    
    // Client message (if not the last iteration)
    if (i < messagesCount - 1) {
      messages.push({
        session_id: sessionData.id,
        sender_id: clientId,
        message: getMessageContent(conversationType, i, false),
        is_read: true,
        created_at: new Date(sessionStartTime + timeInterval * (i * 2 + 1)).toISOString()
      });
    }
  }
  
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
  console.log("Creating payment record...");
  const { error: paymentError } = await supabase
    .from('chat_payments')
    .insert({
      session_id: paidSessionData.id,
      patient_id: clientId,
      doctor_id: vendorId,
      amount: 75.00,
      commission_percentage: 15.00,
      commission_amount: 11.25,
      doctor_amount: 63.75,
      payment_method: 'credit_card',
      payment_status: 'completed',
      payment_provider: 'stripe'
    });
    
  if (paymentError) {
    console.error("Error creating payment record:", paymentError);
    throw new Error(paymentError.message || 'Unknown error creating payment record');
  }
  
  console.log("Payment record created successfully");
  
  // Create chat messages for paid session with realistic conversation
  const messagesCount = 5; // Number of messages to create
  const messages = [];
  
  // Calculate timestamp intervals
  const sessionStartTime = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).getTime();
  const sessionEndTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).getTime();
  const timeInterval = (sessionEndTime - sessionStartTime) / (messagesCount * 2);
  
  // Create alternating messages between vendor and client
  for (let i = 0; i < messagesCount; i++) {
    // Vendor message
    messages.push({
      session_id: paidSessionData.id,
      sender_id: vendorId,
      message: getMessageContent(conversationType, i, true),
      is_read: true,
      created_at: new Date(sessionStartTime + timeInterval * (i * 2)).toISOString()
    });
    
    // Client message (if not the last iteration)
    if (i < messagesCount - 1) {
      messages.push({
        session_id: paidSessionData.id,
        sender_id: clientId,
        message: getMessageContent(conversationType, i, false),
        is_read: true,
        created_at: new Date(sessionStartTime + timeInterval * (i * 2 + 1)).toISOString()
      });
    }
  }
  
  await createChatMessages(paidSessionData.id, messages);
  return paidSessionData;
};
