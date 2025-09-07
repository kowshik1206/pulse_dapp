import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const NotificationsPanel = ({ notifications }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'overdue':
        return { icon: 'AlertTriangle', color: 'text-error' };
      case 'upcoming':
        return { icon: 'Clock', color: 'text-warning' };
      case 'paid':
        return { icon: 'CheckCircle', color: 'text-success' };
      default:
        return { icon: 'Bell', color: 'text-muted-foreground' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-error';
      case 'medium':
        return 'border-l-warning';
      case 'low':
        return 'border-l-success';
      default:
        return 'border-l-muted';
    }
  };

  return (
    <div className="glass rounded-2xl border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={16} className="text-white" />
          </div>
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Notifications
          </h2>
          <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
            {notifications?.length}
          </span>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">All caught up!</p>
            <p className="text-sm text-muted-foreground mt-1">No new notifications</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {notifications?.map((notification, index) => {
              const { icon, color } = getNotificationIcon(notification?.type);
              
              return (
                <motion.div
                  key={notification?.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    p-4 rounded-xl border-l-4 bg-muted/20 hover:bg-muted/30 
                    transition-colors duration-200 cursor-pointer
                    ${getPriorityColor(notification?.priority)}
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`mt-0.5 ${color}`}>
                      <Icon name={icon} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground mb-1">
                        {notification?.title}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {notification?.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-caption">
                          {notification?.time}
                        </span>
                        {notification?.amount && (
                          <span className="text-xs font-medium text-foreground">
                            ${notification?.amount?.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;