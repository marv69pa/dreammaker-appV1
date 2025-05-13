import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const SubscriptionPlans: React.FC = () => {
  const { user } = useAuth();
  
  const handleSubscribe = (plan: string) => {
    // In a real app, this would integrate with a payment processor
    console.log(`Subscribing to ${plan} plan`);
  };
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Choose Your DreamMaker Plan</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <Card className={user?.subscription === 'free' ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Basic dreamscape creation</CardDescription>
            <div className="text-3xl font-bold mt-2">$0</div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>1 dreamscape per month</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>Basic themes</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>10-minute duration</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant={user?.subscription === 'free' ? 'outline' : 'default'} 
              className="w-full"
              disabled={user?.subscription === 'free'}
              onClick={() => handleSubscribe('free')}
            >
              {user?.subscription === 'free' ? 'Current Plan' : 'Select Plan'}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Standard Plan */}
        <Card className="border-primary">
          <CardHeader>
            <div className="py-1 px-3 bg-primary text-primary-foreground rounded-full text-xs font-medium w-fit mb-2">
              Popular
            </div>
            <CardTitle>Standard</CardTitle>
            <CardDescription>Enhanced dreamscape creation</CardDescription>
            <div className="text-3xl font-bold mt-2">$9.99<span className="text-sm font-normal">/month</span></div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>4 dreams per month</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>All themes</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>30-minute duration</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>Custom images</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => handleSubscribe('standard')}
            >
              Subscribe
            </Button>
          </CardFooter>
        </Card>
        
        {/* Premium Plan */}
        <Card className={user?.subscription === 'premium' ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>Ultimate dreamscape experience</CardDescription>
            <div className="text-3xl font-bold mt-2">$19.99<span className="text-sm font-normal">/month</span></div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>Unlimited dreams</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>Premium themes</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>Up to 60-minute duration</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>Priority processing</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>Download dreams offline</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant={user?.subscription === 'premium' ? 'outline' : 'default'}
              className="w-full"
              disabled={user?.subscription === 'premium'}
              onClick={() => handleSubscribe('premium')}
            >
              {user?.subscription === 'premium' ? 'Current Plan' : 'Upgrade'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
