
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'read' | 'unread';
  created_at: string;
}

const ContactMessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = React.useState<ContactMessage | null>(null);
  const queryClient = useQueryClient();
  
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data as ContactMessage[];
    }
  });
  
  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: 'read' })
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast.success('Message deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete message: ${error.message}`);
    }
  });
  
  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    
    // If message is unread, mark it as read
    if (message.status === 'unread') {
      markAsReadMutation.mutate(message.id);
    }
  };
  
  const handleDeleteMessage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMutation.mutate(id);
    }
  };
  
  if (error) {
    return (
      <div className="p-6 pt-24 pb-16">
        <div className="p-4 text-red-500">Error loading contact messages: {error.toString()}</div>
      </div>
    );
  }
  
  return (
    <div className="p-6 pt-24 pb-16">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : messages && messages.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium">{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>{format(new Date(message.created_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <Badge variant={message.status === 'unread' ? 'default' : 'outline'}>
                    {message.status === 'unread' ? 'Unread' : 'Read'}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewMessage(message)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">No contact messages found.</p>
        </div>
      )}
      
      {/* Message details dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription className="flex justify-between items-center">
              <span>From: {selectedMessage?.name}</span>
              <span className="text-xs text-muted-foreground">
                {selectedMessage && format(new Date(selectedMessage.created_at), 'PPpp')}
              </span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email:</p>
              <p className="font-medium">{selectedMessage?.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Message:</p>
              <div className="mt-2 p-4 border rounded-md whitespace-pre-wrap">
                {selectedMessage?.message}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactMessagesPage;
