'use client';

import React from 'react';

interface InsightEngineProps {
  lifePath: string;
  budget: any;
}

export default function InsightEngine({
  lifePath,
  budget,
}: InsightEngineProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold">Insights</h2>
      <p className="text-gray-600">
        Insights for {lifePath}
      </p>
    </div>
  );
}
