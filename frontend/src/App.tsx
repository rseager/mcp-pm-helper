import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Copy, 
  Wand2,
  FileText,
  ListTodo,
  Users,
  Bot,
  Settings,
  Plus,
  Search,
  Edit,
  Trash,
  BarChart,
  FileOutput,
  Clock,
  Network,
  Shield,
  Bell,
  Database,
  Brain,
  History,
  BookOpen,
  Sliders
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
  const [generatedContent, setGeneratedContent] = useState('');
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get sample data based on selections
      const response = await fetch(`http://localhost:8000/generate?brief_id=${selectedBrief}&task=${selectedTask}`);
      const data = await response.json();
      setGeneratedContent(data.output || 'Content not available.');
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

  const menuItemStyles = "flex items-center w-full select-none rounded-md p-3 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";
  const menuHeaderStyles = "text-sm font-medium leading-none mb-2";
  const menuGroupStyles = "grid gap-2";

  return (
    <div className="min-h-screen h-screen bg-background text-foreground flex flex-col">
      {/* Navigation Menu */}
      <div className="w-full bg-sidebar border-b border-border p-2">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sidebar-foreground">
                <FileText className="w-4 h-4 mr-2" />
                Product Briefs
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4">
                  <NavigationMenuLink asChild>
                    <a className={`${menuItemStyles} mb-4 bg-gradient-to-b from-muted/50 to-muted flex-col items-start justify-end h-24`}>
                      <Plus className="h-6 w-6 mb-2" />
                      <div className="text-lg font-medium">Create New Brief</div>
                      <p className="text-sm text-muted-foreground">Start creating a new product brief</p>
                    </a>
                  </NavigationMenuLink>
                  <div className={menuGroupStyles}>
                    <a className={menuItemStyles}><Search className="w-4 h-4 mr-2" />Search/Filter Briefs</a>
                    <a className={menuItemStyles}><Edit className="w-4 h-4 mr-2" />Edit Brief</a>
                    <a className={menuItemStyles}><Trash className="w-4 h-4 mr-2" />Delete Brief</a>
                    <a className={menuItemStyles}><BarChart className="w-4 h-4 mr-2" />Brief Analytics</a>
                    <a className={menuItemStyles}><FileOutput className="w-4 h-4 mr-2" />Export Brief</a>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sidebar-foreground">
                <ListTodo className="w-4 h-4 mr-2" />
                Task Management
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4">
                  <div className={menuGroupStyles}>
                    <a className={menuItemStyles}><Plus className="w-4 h-4 mr-2" />Create Task</a>
                    <a className={menuItemStyles}><Search className="w-4 h-4 mr-2" />View Tasks by Brief</a>
                    <a className={menuItemStyles}><Edit className="w-4 h-4 mr-2" />Edit Task Details</a>
                    <a className={menuItemStyles}><Users className="w-4 h-4 mr-2" />Assign Roles</a>
                    <a className={menuItemStyles}><Network className="w-4 h-4 mr-2" />Set Dependencies</a>
                    <a className={menuItemStyles}><BarChart className="w-4 h-4 mr-2" />Track Progress</a>
                    <a className={menuItemStyles}><Clock className="w-4 h-4 mr-2" />Task Timeline</a>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sidebar-foreground">
                <Users className="w-4 h-4 mr-2" />
                Role Management
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4">
                  <div className={menuGroupStyles}>
                    <a className={menuItemStyles}><Plus className="w-4 h-4 mr-2" />Create Role</a>
                    <a className={menuItemStyles}><Users className="w-4 h-4 mr-2" />View All Roles</a>
                    <a className={menuItemStyles}><Shield className="w-4 h-4 mr-2" />Edit Role Permissions</a>
                    <a className={menuItemStyles}><Users className="w-4 h-4 mr-2" />Assign Users</a>
                    <a className={menuItemStyles}><Network className="w-4 h-4 mr-2" />Role-Task Matrix</a>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sidebar-foreground">
                <Bot className="w-4 h-4 mr-2" />
                AI Assistant
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4">
                  <div>
                    <div className={menuHeaderStyles}>Brief Analysis</div>
                    <div className={menuGroupStyles}>
                      <a className={menuItemStyles}><Brain className="w-4 h-4 mr-2" />Ask Questions</a>
                      <a className={menuItemStyles}><BarChart className="w-4 h-4 mr-2" />Generate Insights</a>
                      <a className={menuItemStyles}><Network className="w-4 h-4 mr-2" />Review Dependencies</a>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className={menuHeaderStyles}>Interactive Refinement</div>
                    <div className={menuGroupStyles}>
                      <a className={menuItemStyles}><Edit className="w-4 h-4 mr-2" />Iterate Content</a>
                      <a className={menuItemStyles}><Plus className="w-4 h-4 mr-2" />Expand Features</a>
                      <a className={menuItemStyles}><History className="w-4 h-4 mr-2" />Version History</a>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className={menuHeaderStyles}>Knowledge Base</div>
                    <div className={menuGroupStyles}>
                      <a className={menuItemStyles}><BookOpen className="w-4 h-4 mr-2" />Browse Queries</a>
                      <a className={menuItemStyles}><FileOutput className="w-4 h-4 mr-2" />Export Conversations</a>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sidebar-foreground">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4">
                  <div className={menuGroupStyles}>
                    <a className={menuItemStyles}><Sliders className="w-4 h-4 mr-2" />User Preferences</a>
                    <a className={menuItemStyles}><Network className="w-4 h-4 mr-2" />Integration Settings</a>
                    <a className={menuItemStyles}><Bell className="w-4 h-4 mr-2" />Notification Rules</a>
                    <a className={menuItemStyles}><Shield className="w-4 h-4 mr-2" />Access Control</a>
                    <a className={menuItemStyles}><Database className="w-4 h-4 mr-2" />System Backup</a>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 h-[calc(100vh-64px)]">
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

        {/* Content Area */}
        <div className="flex flex-1 h-full flex-col items-center p-6">
          <div className="w-full flex-1 flex flex-col">
            <Card className="w-full flex-1 flex flex-col shadow-lg bg-card overflow-hidden">
              {/* Header */}
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

              {/* Scrollable Output */}
              <div className="flex-1 overflow-y-auto px-6 py-4 bg-white text-card-foreground w-full">
                <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                  {generatedContent ? (
                    <ReactMarkdown>{generatedContent}</ReactMarkdown>
                  ) : (
                    <div className="text-center text-muted-foreground py-12">
                      Select options and click Generate to create content
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;