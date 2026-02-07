'use client';

import Card from '@/components/ui/Card';
import { lifePaths } from '@/data/lifePathsData';
import { LifePath } from '@/types';

interface Props {
  lifePath: LifePath;
}

export default function ActionPlan({ lifePath }: Props) {
  const pathData = lifePaths[lifePath];

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Action Plan</h2>
      <p className="text-gray-600 mb-6">3 concrete steps to reach your {pathData.name} goals</p>

      <div className="space-y-4">
        {pathData.actions.map((action, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <p className="text-gray-700 leading-relaxed pt-1">{action}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}