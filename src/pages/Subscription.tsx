import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, CreditCard, Smartphone, QrCode } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { formatCurrency } from '@/lib/currency';

const Subscription: React.FC = () => {
  const { plans, currentTier, upgradeSubscription, loading } = useSubscription();

  const handleUpgrade = async (planId: string) => {
    if (planId === currentTier) return;
    
    // For prototype, allow any upgrade
    const { error } = await upgradeSubscription(planId);
    if (error) {
      console.error('Upgrade failed:', error);
      // In a real app, show a toast notification
    }
  };

  const handlePayment = (planId: string, paymentMethod: string) => {
    // Simulate payment processing
    console.log(`Processing ${paymentMethod} payment for ${planId}`);
    // In a real app, integrate with payment gateway
    handleUpgrade(planId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free':
        return <Star className="h-6 w-6" />;
      case 'premium':
        return <Crown className="h-6 w-6" />;
      case 'pro':
        return <Zap className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  const getPlanGradient = (planId: string) => {
    switch (planId) {
      case 'free':
        return 'from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20';
      case 'premium':
        return 'from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20';
      case 'pro':
        return 'from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20';
      default:
        return 'from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Unlock the full potential of your mental health journey with our flexible subscription plans
          </p>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium">
            🎯 Demo Mode - All features available for presentation
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => {
            const isCurrentPlan = plan.id === currentTier;
            const isPopular = plan.id === 'premium';
            
            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className="relative"
              >
                {isPopular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-medium">
                      Most Popular
                    </Badge>
                  </motion.div>
                )}
                
                <Card className={`relative h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isCurrentPlan 
                    ? 'ring-2 ring-primary shadow-xl' 
                    : 'hover:shadow-lg'
                } ${isPopular ? 'border-purple-200 dark:border-purple-800' : ''}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${getPlanGradient(plan.id)} opacity-50 rounded-lg`} />
                  
                  <CardHeader className="relative text-center pb-8">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full ${
                        isCurrentPlan 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {getPlanIcon(plan.id)}
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
                    
                    <div className="mt-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">{formatCurrency(plan.price)}</span>
                        {plan.price > 0 && (
                          <span className="text-muted-foreground ml-1">/{plan.interval}</span>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 + featureIndex * 0.05 }}
                          className="flex items-start space-x-3"
                        >
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {isCurrentPlan ? (
                      <Button
                        disabled
                        className="w-full bg-primary/20 text-primary cursor-not-allowed"
                        size="lg"
                      >
                        Current Plan
                      </Button>
                    ) : plan.price === 0 ? (
                      <Button
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={loading}
                        className="w-full"
                        size="lg"
                      >
                        Get Started Free
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <Button
                          onClick={() => handleUpgrade(plan.id)}
                          disabled={loading}
                          className={`w-full ${
                            isPopular 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                              : ''
                          }`}
                          size="lg"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay with Card
                        </Button>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => handlePayment(plan.id, 'UPI')}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            <Smartphone className="h-3 w-3 mr-1" />
                            UPI
                          </Button>
                          <Button
                            onClick={() => handlePayment(plan.id, 'QR')}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            <QrCode className="h-3 w-3 mr-1" />
                            QR Code
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, UPI, and net banking through secure payment gateways."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! Start with our free plan and upgrade when you're ready for more features."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Absolutely. You can cancel your subscription at any time with no cancellation fees."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="p-6 bg-card rounded-lg border"
              >
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;
