import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export type SubscriptionTier = 'free' | 'premium' | 'pro';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  maxPosts: number;
  hasAds: boolean;
  aiChatLimit: number;
  prioritySupport: boolean;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

interface SubscriptionContextType {
  currentTier: SubscriptionTier;
  subscription: UserSubscription | null;
  plans: SubscriptionPlan[];
  loading: boolean;
  upgradeSubscription: (planId: string) => Promise<{ error: any }>;
  cancelSubscription: () => Promise<{ error: any }>;
  canPost: boolean;
  canUseAIChat: boolean;
  remainingPosts: number;
  remainingAIChats: number;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Student Free',
    description: 'Great for starting your wellness journey',
    price: 0,
    currency: 'INR',
    interval: 'month',
    features: [
      '5 posts per month',
      'AI chat basics (50 messages)',
      'Peer community access',
      'Mood check-ins & streaks',
      'Ad-light experience'
    ],
    maxPosts: 5,
    hasAds: true,
    aiChatLimit: 50,
    prioritySupport: false,
  },
  {
    id: 'premium',
    name: 'Student Plus',
    description: 'Best for active students who want more support',
    price: 99,
    currency: 'INR',
    interval: 'month',
    features: [
      'Unlimited posts',
      'AI chat assistant (300 messages)',
      'Focus mode & study timers',
      'Weekly wellness insights',
      'No ads',
      'Invite-only peer groups'
    ],
    maxPosts: -1, // unlimited
    hasAds: false,
    aiChatLimit: 300,
    prioritySupport: true,
  },
  {
    id: 'pro',
    name: 'Student Pro',
    description: 'For student leaders and creators',
    price: 199,
    currency: 'INR',
    interval: 'month',
    features: [
      'Everything in Plus',
      'Unlimited AI chat',
      '1:1 mentor Q&A (community coaches)',
      'Advanced mood & study analytics',
      'Creator tools & custom themes',
      'Early access features'
    ],
    maxPosts: -1, // unlimited
    hasAds: false,
    aiChatLimit: -1, // unlimited
    prioritySupport: true,
  },
];

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>('free');
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserSubscription();
    } else {
      setCurrentTier('free');
      setSubscription(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserSubscription = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        return;
      }

      if (data) {
        setSubscription(data);
        const plan = SUBSCRIPTION_PLANS.find(p => p.id === data.plan_id);
        setCurrentTier(plan?.id as SubscriptionTier || 'free');
      } else {
        setCurrentTier('free');
        setSubscription(null);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const upgradeSubscription = async (planId: string): Promise<{ error: any }> => {
    if (!user) return { error: 'No user logged in' };

    try {
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
      if (!plan) return { error: 'Invalid plan' };

      // In a real app, you'd integrate with a payment processor here
      // For now, we'll simulate a successful upgrade
      const newSubscription: UserSubscription = {
        id: `sub_${Date.now()}`,
        user_id: user.id,
        plan_id: planId,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancel_at_period_end: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('user_subscriptions')
        .upsert(newSubscription, { onConflict: 'user_id' });

      if (error) return { error };

      setSubscription(newSubscription);
      setCurrentTier(planId as SubscriptionTier);
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const cancelSubscription = async (): Promise<{ error: any }> => {
    if (!subscription) return { error: 'No active subscription' };

    try {
      const { error } = await supabase
        .from('user_subscriptions')
        .update({ 
          cancel_at_period_end: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', subscription.id);

      if (error) return { error };

      setCurrentTier('free');
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === currentTier) || SUBSCRIPTION_PLANS[0];
  
  // For presentation purposes - allow all features for free users
  const canPost = true; // Always allow posting
  const canUseAIChat = true; // Always allow AI chat
  const remainingPosts = -1; // Unlimited posts
  const remainingAIChats = -1; // Unlimited AI chat

  const value = {
    currentTier,
    subscription,
    plans: SUBSCRIPTION_PLANS,
    loading,
    upgradeSubscription,
    cancelSubscription,
    canPost,
    canUseAIChat,
    remainingPosts,
    remainingAIChats,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
