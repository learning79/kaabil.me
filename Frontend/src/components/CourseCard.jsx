import React from 'react';
import cover from '../assets/Dashboard/courseCover.png';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';

const ExampleCard = () => {
  return (
    <Card className="max-w-sm bg-slate-200 px-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="p-5">
        <img src={cover}  className='rounded-lg h-[230px] w-[290px]'/>
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
         UPSC Exam- Complete
        </CardTitle>
        <CardDescription className="font-normal text-gray-700 dark:text-gray-400">
          Card Description
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <p className="font-normal text-gray-700 dark:text-gray-400">Card Content</p>
      </CardContent>
      <CardFooter className="p-5">
        <p className="font-normal text-gray-700 dark:text-gray-400">
            <Button><p className='underline'>Resume Course</p></Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ExampleCard;
