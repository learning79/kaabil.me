import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ToggleSwitch = ({ onLevelsClick, onContentClick }) => {
  // Ensure these functions are called when the respective tab is selected
  const handleSelectLevels = () => {
    onLevelsClick();
  };

  const handleSelectContent = () => {
    onContentClick();
  };

  return (
    <Tabs defaultValue="levels" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="levels" onInteract={handleSelectLevels}>Levels</TabsTrigger>
        <TabsTrigger value="content" onInteract={handleSelectContent}>Content</TabsTrigger>
      </TabsList>
      <TabsContent value="levels">
        {/* Content or actions related to 'Levels' tab can be placed here */}
        <div>Levels content or actions go here.</div>
      </TabsContent>
      <TabsContent value="content">
        {/* Content or actions related to 'Content' tab can be placed here */}
        <div>Content actions or display here.</div>
      </TabsContent>
    </Tabs>
  );
};

export default ToggleSwitch;
