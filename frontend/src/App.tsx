import { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, Copy, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TASK_TYPES = [
  { id: 'epics', label: 'Product Epics' },
  { id: 'roadmap', label: 'Product Roadmap' },
  { id: 'strategy', label: 'Product Strategy' },
  { id: 'features', label: 'Feature List' },
  { id: 'personas', label: 'User Personas' }
];

const PRODUCT_BRIEFS = [
  { id: 'smart_notifications', label: 'Smart Notifications System' },
  { id: 'smart_calendar', label: 'AI Calendar Assistant' },
  { id: 'content_curator', label: 'Content Curation Platform' },
  { id: 'task_automator', label: 'Task Automation Tool' }
];

function App() {
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedBrief, setSelectedBrief] = useState('');
  const [generatedContent, setGeneratedContent] = useState<string>(''); // Explicitly type state
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!selectedTask || !selectedBrief) {
      toast({
        title: "Missing Selection",
        description: "Please select both a task type and product brief.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/generate?brief_id=${selectedBrief}&task=${selectedTask}`);
      const data = await response.json();
      // Access data.output instead of data.content
      setGeneratedContent(data.output || ''); // Use empty string fallback if data.output is missing
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard"
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedBrief}_${selectedTask}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <div className="w-72 bg-sidebar text-sidebar-foreground border-r border-border h-full p-6 flex flex-col shadow-lg shrink-0">
        <h1 className="text-2xl font-bold text-sidebar-foreground mb-2">Product Assistant</h1>
        <p className="text-sm text-sidebar-foreground mb-6">AI-powered product planning tool</p>
        <Separator className="mb-6 bg-border" />
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-sidebar-foreground">Task Type</label>
            <Select value={selectedTask} onValueChange={setSelectedTask}>
              <SelectTrigger className="bg-accent text-sidebar-foreground border-input">
                <SelectValue placeholder="Select task" />
              </SelectTrigger>
              <SelectContent>
                {TASK_TYPES.map((task) => (
                  <SelectItem key={task.id} value={task.id}>
                    {task.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block text-sidebar-foreground">Product Brief</label>
            <Select value={selectedBrief} onValueChange={setSelectedBrief}>
              <SelectTrigger className="bg-accent text-sidebar-foreground border-input">
                <SelectValue placeholder="Select brief" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_BRIEFS.map((brief) => (
                  <SelectItem key={brief.id} value={brief.id}>
                    {brief.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            className="w-full bg-accent hover:bg-accent/90 text-sidebar-foreground border border-border"
            onClick={handleGenerate}
            disabled={isLoading || !selectedTask || !selectedBrief}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full flex flex-col p-3">
        <Card className="flex-1 bg-card shadow-lg flex flex-col overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-border">
            <h2 className="text-xl font-semibold text-card-foreground">Generated Output</h2>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!generatedContent}
                className="bg-white hover:bg-accent text-card-foreground border-input"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={!generatedContent}
                className="bg-white hover:bg-accent text-card-foreground border-input"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="flex-1 p-4">
            <ScrollArea className="h-full rounded-md border border-input bg-white">
              <div className="p-4">
                <> {/* Use fragment to avoid unnecessary divs */}
                  {generatedContent && (
                    <div className="prose prose-sm max-w-none"> {/* Removed text-foreground */}
                      <ReactMarkdown>
                        {generatedContent}
                      </ReactMarkdown>
                    </div>
                  )}
                  {!generatedContent && (
                    <div className="text-center text-muted-foreground py-12">
                      Select options and click Generate to create content
                    </div>
                  )}
                </>
              </div>
            </ScrollArea>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;