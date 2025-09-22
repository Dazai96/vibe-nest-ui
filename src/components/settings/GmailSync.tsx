import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Mail, Calendar, Users, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface GmailData {
  emails: number;
  contacts: number;
  calendarEvents: number;
  lastSync: Date | null;
}

const GmailSync: React.FC = () => {
  const { user } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gmailData, setGmailData] = useState<GmailData>({
    emails: 0,
    contacts: 0,
    calendarEvents: 0,
    lastSync: null,
  });
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  const handleGmailAuth = async () => {
    setIsLoading(true);
    setSyncStatus('syncing');

    try {
      // In a real implementation, you would:
      // 1. Redirect to Google OAuth
      // 2. Handle the callback
      // 3. Store the access token
      // 4. Use the Gmail API to fetch data
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful sync
      setGmailData({
        emails: 1247,
        contacts: 89,
        calendarEvents: 23,
        lastSync: new Date(),
      });
      
      setIsEnabled(true);
      setSyncStatus('success');
    } catch (error) {
      console.error('Gmail sync failed:', error);
      setSyncStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsEnabled(false);
    setGmailData({
      emails: 0,
      contacts: 0,
      calendarEvents: 0,
      lastSync: null,
    });
    setSyncStatus('idle');
  };

  const getStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'Syncing...';
      case 'success':
        return 'Connected';
      case 'error':
        return 'Connection failed';
      default:
        return 'Not connected';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                <Mail className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Gmail Integration</CardTitle>
                <CardDescription>
                  Sync your Gmail data to personalize your experience
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isEnabled ? 'default' : 'secondary'}>
                {getStatusIcon()}
                <span className="ml-1">{getStatusText()}</span>
              </Badge>
              <Switch
                checked={isEnabled}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleGmailAuth();
                  } else {
                    handleDisconnect();
                  }
                }}
                disabled={isLoading}
              />
            </div>
          </div>
        </CardHeader>

        {isEnabled && (
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{gmailData.emails.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Emails synced</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{gmailData.contacts}</p>
                    <p className="text-xs text-muted-foreground">Contacts</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{gmailData.calendarEvents}</p>
                    <p className="text-xs text-muted-foreground">Calendar events</p>
                  </div>
                </div>
              </div>

              {gmailData.lastSync && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Last synced: {gmailData.lastSync.toLocaleString()}
                  </p>
                </div>
              )}

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-medium">What we sync:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Email contacts for friend suggestions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Calendar events for mood correlation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Profile information (name, photo)</span>
                  </li>
                </ul>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGmailAuth}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    'Refresh Data'
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDisconnect}
                  disabled={isLoading}
                >
                  Disconnect
                </Button>
              </div>
            </div>
          </CardContent>
        )}

        {!isEnabled && (
          <CardContent>
            <div className="text-center py-8">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">Connect your Gmail</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Sync your Gmail data to get personalized friend suggestions and better mood tracking insights.
              </p>
              <Button onClick={handleGmailAuth} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Connect Gmail
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default GmailSync;
