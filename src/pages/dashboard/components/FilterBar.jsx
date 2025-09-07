import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';

const FilterBar = ({ activeFilter, onFilterChange, billCounts }) => {
  const filters = [
    { key: 'all', label: 'All', count: billCounts?.all },
    { key: 'pending', label: 'Pending', count: billCounts?.pending },
    { key: 'paid', label: 'Paid', count: billCounts?.paid },
    { key: 'autopay', label: 'AutoPay Enabled', count: billCounts?.autopay }
  ];

  return (
    <div className="glass rounded-2xl p-4 border border-border">
      <div className="flex flex-wrap gap-2">
        {filters?.map((filter) => (
          <motion.div
            key={filter?.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={activeFilter === filter?.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onFilterChange(filter?.key)}
              className={`
                relative transition-all duration-200
                ${activeFilter === filter?.key ? 'glow-primary' : 'hover:bg-muted/50'}
              `}
            >
              <span>{filter?.label}</span>
              <span className={`
                ml-2 px-2 py-0.5 rounded-full text-xs font-medium
                ${activeFilter === filter?.key 
                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {filter?.count}
              </span>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;